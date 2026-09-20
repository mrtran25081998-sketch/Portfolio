import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';
import { VoxelCharacter, VoxelDog } from '../game/character';
import { CollisionSystem } from '../game/collision';
import { VoxelWorld } from '../game/voxelWorld';
import { ZONES_CONFIG } from '../data/portfolioData';
import { ZoneId } from '../types';
import { soundManager } from '../audio/soundManager';

interface GameCanvasProps {
  gameStarted: boolean;
  activeModal: ZoneId | null;
  exploredZones: Record<ZoneId, boolean>;
  onOpenZone: (zoneId: ZoneId) => void;
  onNearZoneChange: (zoneId: ZoneId | null) => void;
  mobileInput: {
    moveX: number;
    moveY: number;
    isRunning: boolean;
    isJumping: boolean;
    isInteracting: boolean;
  };
  currentProjectTitle?: string;
  triggerFireworksSignal?: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameStarted,
  activeModal,
  exploredZones,
  onOpenZone,
  onNearZoneChange,
  mobileInput,
  currentProjectTitle,
  triggerFireworksSignal
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<VoxelWorld | null>(null);
  const nearZoneRef = useRef<ZoneId | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mouseDragRef = useRef<{ isDown: boolean; startX: number; camAngleOffset: number }>({
    isDown: false,
    startX: 0,
    camAngleOffset: 0
  });

  // Keep ref for current modal to stop movement while reading
  const activeModalRef = useRef<ZoneId | null>(activeModal);
  activeModalRef.current = activeModal;

  // Keep ref for mobile input to avoid stale closure in game loop
  const mobileInputRef = useRef(mobileInput);
  mobileInputRef.current = mobileInput;

  const headPromptRef = useRef<HTMLDivElement>(null);

  const onOpenZoneRef = useRef(onOpenZone);
  onOpenZoneRef.current = onOpenZone;

  const onNearZoneChangeRef = useRef(onNearZoneChange);
  onNearZoneChangeRef.current = onNearZoneChange;

  // React to current project change to update 3D screens in studio
  useEffect(() => {
    if (worldRef.current && currentProjectTitle) {
      worldRef.current.updateProjectScreens(currentProjectTitle);
    }
  }, [currentProjectTitle]);

  // React to fireworks signal
  useEffect(() => {
    if (triggerFireworksSignal && worldRef.current) {
      worldRef.current.triggerFireworks();
      soundManager.playFireworks();
    }
  }, [triggerFireworksSignal]);

  // React to explored zones to update sign stars
  useEffect(() => {
    if (worldRef.current) {
      ZONES_CONFIG.forEach((z) => {
        worldRef.current!.setZoneHighlight(z.id, nearZoneRef.current === z.id, !!exploredZones[z.id]);
      });
    }
  }, [exploredZones]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. SETUP THREE.JS SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(48, container.clientWidth / container.clientHeight, 0.1, 200);
    // Initial cinematic intro camera view
    camera.position.set(0, 16, 26);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // --- 2. BUILD WORLD, CHARACTERS, COLLISION ---
    const world = new VoxelWorld(scene);
    worldRef.current = world;

    const collision = new CollisionSystem();

    const player = new VoxelCharacter();
    // Start at bottom entrance path facing up the stairs
    player.mesh.position.set(0, 0.25, 8.2);
    player.mesh.rotation.y = Math.PI;
    scene.add(player.mesh);

    const dog = new VoxelDog();
    dog.mesh.position.set(0.8, 0.25, 8.8);
    scene.add(dog.mesh);

    // Sync initial explored states to sign stars
    ZONES_CONFIG.forEach((z) => {
      world.setZoneHighlight(z.id, false, !!exploredZones[z.id]);
    });

    // --- CLICK DESTINATION VISUAL MARKER (Hệ thống điểm neo hiển thị khi click chuột) ---
    const markerGroup = new THREE.Group();
    markerGroup.name = 'clickMarker';
    markerGroup.visible = false;

    // Glowing outer ring (Vòng tròn sáng lan tỏa)
    const ringGeo = new THREE.RingGeometry(0.24, 0.38, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf4c542,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    markerGroup.add(ringMesh);

    // Inner glowing core
    const dotGeo = new THREE.CircleGeometry(0.1, 16);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.rotation.x = -Math.PI / 2;
    markerGroup.add(dotMesh);

    // Floating 3D voxel pin / diamond
    const pinGeo = new THREE.ConeGeometry(0.12, 0.32, 4);
    const pinMat = new THREE.MeshLambertMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f
    });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.rotation.x = Math.PI; // Point down towards ground
    pinMesh.position.y = 0.48;
    markerGroup.add(pinMesh);

    scene.add(markerGroup);

    // --- 3. INPUT EVENT LISTENERS & CLICK-TO-MOVE ---
    let targetDestination: THREE.Vector3 | null = null;
    let stuckFrames = 0;
    let mouseDownPos = { x: 0, y: 0, time: 0 };
    let hasDragged = false;

    // 1. Kiểm tra Hover qua biển hiệu / công trình của phân vùng -> đổi con trỏ chuột
    let currentHoveredZone: ZoneId | null = null;
    const checkHoverZone = (clientX: number, clientY: number) => {
      if (!container || activeModalRef.current || !gameStarted) {
        if (currentHoveredZone) {
          currentHoveredZone = null;
          container.style.cursor = 'default';
        }
        return;
      }
      const rect = container.getBoundingClientRect();
      const mouseX = ((clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((clientY - rect.top) / container.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const hits = raycaster.intersectObjects(scene.children, true);
      let detectedZone: ZoneId | null = null;

      for (const hit of hits) {
        let curr: THREE.Object3D | null = hit.object;
        let isActor = false;
        let isGround = false;
        let zone: ZoneId | null = null;
        let isSign = false;

        while (curr) {
          if (curr === player.mesh || curr === dog.mesh || (curr as any).isPoints || curr === markerGroup) {
            isActor = true;
            break;
          }
          if (curr.userData) {
            if (curr.userData.isGround) isGround = true;
            if (curr.userData.isZoneSign) isSign = true;
            if (curr.userData.zoneId && !zone) zone = curr.userData.zoneId as ZoneId;
          }
          curr = curr.parent;
        }

        if (isActor) continue;

        if (zone && isSign) {
          detectedZone = zone;
          break;
        }

        if (zone && !isGround) {
          const groundCheck = collision.getWalkableHeight(hit.point.x, hit.point.z, hit.point.y);
          if (hit.point.y > groundCheck.y + 0.35 || !groundCheck.walkable) {
            detectedZone = zone;
            break;
          }
        }
      }

      if (detectedZone) {
        currentHoveredZone = detectedZone;
        container.style.cursor = 'pointer';
      } else {
        if (currentHoveredZone) {
          currentHoveredZone = null;
          container.style.cursor = 'default';
        }
      }
    };

    // 2. Hàm xử lý Click chuột hoặc Chạm màn hình:
    // - Nếu click vào phân vùng (biển hiệu, công trình) -> Mở xem chi tiết
    // - Nếu click vào mặt đất -> Di chuyển nhân vật tới vị trí tương ứng (Click-to-Move)
    const performClickOrMove = (clientX: number, clientY: number) => {
      if (!container || activeModalRef.current || !gameStarted) return;
      const rect = container.getBoundingClientRect();
      const mouseX = ((clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((clientY - rect.top) / container.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const hits = raycaster.intersectObjects(scene.children, true);

      // Ưu tiên 1: Kiểm tra xem người dùng có click vào một phân vùng để xem chi tiết không
      let targetZoneId: ZoneId | null = null;
      for (const hit of hits) {
        let curr: THREE.Object3D | null = hit.object;
        let isActor = false;
        let isGround = false;
        let zone: ZoneId | null = null;
        let isSign = false;

        while (curr) {
          if (curr === player.mesh || curr === dog.mesh || (curr as any).isPoints || curr === markerGroup) {
            isActor = true;
            break;
          }
          if (curr.userData) {
            if (curr.userData.isGround) isGround = true;
            if (curr.userData.isZoneSign) isSign = true;
            if (curr.userData.zoneId && !zone) zone = curr.userData.zoneId as ZoneId;
          }
          curr = curr.parent;
        }

        if (isActor) continue;

        // Click trúng biển hiệu hoặc ngôi sao
        if (zone && isSign) {
          targetZoneId = zone;
          break;
        }

        // Click trúng khối kiến trúc của zone (trên mặt đất)
        if (zone && !isGround) {
          const groundCheck = collision.getWalkableHeight(hit.point.x, hit.point.z, hit.point.y);
          if (hit.point.y > groundCheck.y + 0.35 || !groundCheck.walkable) {
            targetZoneId = zone;
            break;
          }
        }
      }

      if (targetZoneId) {
        // MỞ XEM CHI TIẾT PHÂN VÙNG
        targetDestination = null;
        markerGroup.visible = false;
        soundManager.playInteractChime();
        onOpenZoneRef.current(targetZoneId);
        nearZoneRef.current = targetZoneId;
        onNearZoneChangeRef.current(targetZoneId);

        // Định vị nhân vật đứng ở vị trí ngắm nhìn phân vùng
        const targetZone = ZONES_CONFIG.find((z) => z.id === targetZoneId);
        if (targetZone) {
          player.mesh.position.set(
            targetZone.targetPosition[0],
            targetZone.targetPosition[1],
            targetZone.targetPosition[2]
          );
          const dx = targetZone.position[0] - targetZone.targetPosition[0];
          const dz = targetZone.position[2] - targetZone.targetPosition[2];
          player.mesh.rotation.y = Math.atan2(dx, dz);
        }
        return;
      }

      // Ưu tiên 2: Di chuyển nhân vật đến vị trí click trên mặt đất (Click-to-Move)
      let bestPoint: THREE.Vector3 | null = null;
      for (const hit of hits) {
        let curr: THREE.Object3D | null = hit.object;
        let isActor = false;
        while (curr) {
          if (curr === player.mesh || curr === dog.mesh || (curr as any).isPoints || curr === markerGroup) {
            isActor = true;
            break;
          }
          curr = curr.parent;
        }
        if (isActor) continue;

        // 1. Kiểm tra trực tiếp tại vị trí click có thể đi được không
        const groundCheck = collision.getWalkableHeight(hit.point.x, hit.point.z, hit.point.y);
        if (groundCheck.walkable) {
          bestPoint = new THREE.Vector3(hit.point.x, groundCheck.y, hit.point.z);
          break;
        }

        // 2. Tìm kiếm các điểm xung quanh trong bán kính gần nếu click vào mép/cạnh vật thể
        const offsets = [
          [0, 0.4], [0, -0.4], [0.4, 0], [-0.4, 0],
          [0.4, 0.4], [-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4],
          [0, 0.9], [0, -0.9], [0.9, 0], [-0.9, 0],
          [0, 1.5], [0, -1.5], [1.5, 0], [-1.5, 0]
        ];
        let found = false;
        for (const [ox, oz] of offsets) {
          const testGround = collision.getWalkableHeight(hit.point.x + ox, hit.point.z + oz, hit.point.y);
          if (testGround.walkable) {
            bestPoint = new THREE.Vector3(hit.point.x + ox, testGround.y, hit.point.z + oz);
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // 3. Fallback: Cắt mặt phẳng độ cao của nhân vật
      if (!bestPoint) {
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -player.mesh.position.y);
        const planePt = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(groundPlane, planePt)) {
          const planeGround = collision.getWalkableHeight(planePt.x, planePt.z, player.mesh.position.y);
          if (planeGround.walkable) {
            bestPoint = new THREE.Vector3(planePt.x, planeGround.y, planePt.z);
          }
        }
      }

      if (bestPoint) {
        targetDestination = bestPoint;
        stuckFrames = 0;
        soundManager.playClickTarget();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      keysRef.current[code] = true;

      // Toggle sound
      if (code === 'KeyM') {
        soundManager.toggleMute();
      }

      // Interact with zone (Support Space & KeyE)
      if ((code === 'Space' || code === 'KeyE') && nearZoneRef.current && !activeModalRef.current) {
        e.preventDefault();
        soundManager.playInteractChime();
        onOpenZoneRef.current(nearZoneRef.current);
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Chỉ xử lý chuột trái
      mouseDragRef.current.isDown = true;
      mouseDragRef.current.startX = e.clientX;
      mouseDownPos = { x: e.clientX, y: e.clientY, time: performance.now() };
      hasDragged = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDragRef.current.isDown) {
        checkHoverZone(e.clientX, e.clientY);
        return;
      }
      const dx = e.clientX - mouseDragRef.current.startX;
      mouseDragRef.current.startX = e.clientX;

      // Nếu kéo rê chuột lớn hơn ngưỡng 6px -> chuyển sang chế độ xoay camera góc nhìn
      if (Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y) > 6) {
        hasDragged = true;
        mouseDragRef.current.camAngleOffset += dx * 0.005;
        if (currentHoveredZone) {
          currentHoveredZone = null;
          if (container) container.style.cursor = 'default';
        }
      }
    };

    const handleMouseLeave = () => {
      currentHoveredZone = null;
      if (container) container.style.cursor = 'default';
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!mouseDragRef.current.isDown) return;
      mouseDragRef.current.isDown = false;

      const dragDistance = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      const clickDuration = performance.now() - mouseDownPos.time;

      // Click chuột tinh tế (không phải kéo xoay camera) -> Mở xem phần tương ứng hoặc di chuyển nhân vật
      if (!hasDragged && dragDistance <= 8 && clickDuration < 450) {
        performClickOrMove(e.clientX, e.clientY);
      }
    };

    // Hỗ trợ chạm cảm ứng trên màn hình di động/tablet
    let touchStartPos = { x: 0, y: 0, time: 0 };
    let hasTouchMoved = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartPos = { x: t.clientX, y: t.clientY, time: performance.now() };
        hasTouchMoved = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - touchStartPos.x;
        const dy = t.clientY - touchStartPos.y;
        if (Math.hypot(dx, dy) > 8) {
          hasTouchMoved = true;
          // Cho phép vuốt trên màn hình để xoay góc nhìn camera
          mouseDragRef.current.camAngleOffset += dx * 0.004;
          touchStartPos.x = t.clientX;
          touchStartPos.y = t.clientY;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!hasTouchMoved && e.changedTouches.length === 1) {
        const t = e.changedTouches[0];
        const duration = performance.now() - touchStartPos.time;
        if (duration < 450) {
          performClickOrMove(t.clientX, t.clientY);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // --- 4. GAME LOOP STATE ---
    let prevTime = performance.now();
    let introOrbitAngle = 0;
    let footstepTimer = 0;
    let jumpVelocityY = 0;
    let isJumping = false;
    let animationFrameId: number;

    const currentCamPos = new THREE.Vector3().copy(camera.position);
    const currentCamTarget = new THREE.Vector3(0, 4, 0);

    // --- 5. RENDER & UPDATE LOOP ---
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - prevTime) / 1000, 0.1);
      prevTime = time;

      // Update animated voxel world meshes (water, clouds, lights, screens)
      world.update(delta, time / 1000);

      const isModalOpen = !!activeModalRef.current;

      // Update destination marker animation
      if (targetDestination && !isModalOpen) {
        markerGroup.visible = true;
        markerGroup.position.set(targetDestination.x, targetDestination.y + 0.04, targetDestination.z);
        const pulse = ((time / 1000) * 3.6) % 1;
        ringMesh.scale.setScalar(1.0 + pulse * 0.35);
        ringMat.opacity = 0.85 * (1 - pulse * 0.4);
        pinMesh.position.y = 0.44 + Math.sin((time / 1000) * 6) * 0.08;
        pinMesh.rotation.y += delta * 2.8;
      } else {
        markerGroup.visible = false;
      }

      if (!gameStarted) {
        // CINEMATIC INTRO FLYBY: Camera slowly orbits around the sunset voxel world
        introOrbitAngle += delta * 0.15;
        const radius = 28;
        const camX = Math.sin(introOrbitAngle) * radius;
        const camZ = Math.cos(introOrbitAngle) * radius + 5;
        const camY = 14 + Math.sin(introOrbitAngle * 0.6) * 3;

        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), delta * 2.0);
        camera.lookAt(0, 3.5, 0);

        // Player & dog idle in the intro
        player.update(delta, false, false, false);
        dog.update(delta, player.mesh.position, new THREE.Vector3());
      } else {
        // PLAYER IS EXPLORING!
        let moveDirX = 0;
        let moveDirZ = 0;

        // Kiểm tra xem người dùng có đang dùng phím điều hướng hoặc joystick không
        const hasKeyInput =
          keysRef.current['KeyW'] || keysRef.current['ArrowUp'] ||
          keysRef.current['KeyS'] || keysRef.current['ArrowDown'] ||
          keysRef.current['KeyA'] || keysRef.current['ArrowLeft'] ||
          keysRef.current['KeyD'] || keysRef.current['ArrowRight'];

        const mobile = mobileInputRef.current;
        const hasJoystickInput = Math.hypot(mobile.moveX, mobile.moveY) > 0.05;

        // Nếu người dùng bấm phím/joystick hoặc mở modal, hủy tự động di chuyển click-to-move
        if (hasKeyInput || hasJoystickInput || isModalOpen) {
          targetDestination = null;
        }

        if (!isModalOpen) {
          if (hasKeyInput || hasJoystickInput) {
            // DI CHUYỂN BẰNG BÀN PHÍM HOẶC JOYSTICK
            let rawX = 0;
            let rawZ = 0;
            if (keysRef.current['KeyW'] || keysRef.current['ArrowUp']) rawZ -= 1;
            if (keysRef.current['KeyS'] || keysRef.current['ArrowDown']) rawZ += 1;
            if (keysRef.current['KeyA'] || keysRef.current['ArrowLeft']) rawX -= 1;
            if (keysRef.current['KeyD'] || keysRef.current['ArrowRight']) rawX += 1;

            if (hasJoystickInput) {
              rawX = mobile.moveX;
              // mobile.moveY: kéo lên là âm (trùng hướng KeyW rawZ = -1), kéo xuống là dương (trùng hướng KeyS rawZ = +1)
              rawZ = mobile.moveY;
            }

            const inputAngle = Math.atan2(rawX, rawZ);
            const moveAngle = inputAngle + mouseDragRef.current.camAngleOffset;
            const joystickMagnitude = hasJoystickInput && !hasKeyInput ? Math.min(1, Math.hypot(rawX, rawZ)) : 1;
            moveDirX = Math.sin(moveAngle) * joystickMagnitude;
            moveDirZ = Math.cos(moveAngle) * joystickMagnitude;
          } else if (targetDestination) {
            // DI CHUYỂN ĐẾN VỊ TRÍ CLICK CHUỘT (CLICK-TO-MOVE)
            const toTargetX = targetDestination.x - player.mesh.position.x;
            const toTargetZ = targetDestination.z - player.mesh.position.z;
            const distToTarget = Math.hypot(toTargetX, toTargetZ);

            if (distToTarget < 0.28) {
              // Đã đến điểm click!
              targetDestination = null;
            } else {
              moveDirX = toTargetX / distToTarget;
              moveDirZ = toTargetZ / distToTarget;
            }
          }

          // Mobile interact trigger
          if (mobile.isInteracting && nearZoneRef.current) {
            soundManager.playInteractChime();
            onOpenZoneRef.current(nearZoneRef.current);
            mobile.isInteracting = false;
          }
        }

        const isRunning = (keysRef.current['ShiftLeft'] || keysRef.current['ShiftRight'] || mobile.isRunning) && !isModalOpen;
        const moveSpeed = isRunning ? 5.8 : 3.4;

        // Jump physics (Space jumps unless interacting at a zone; mobile jump always triggers)
        const wantsJump =
          ((keysRef.current['Space'] && !nearZoneRef.current) || mobile.isJumping) &&
          !isJumping &&
          !isModalOpen;
        if (wantsJump) {
          isJumping = true;
          jumpVelocityY = 5.2;
          soundManager.playJump();
          mobile.isJumping = false;
        }

        if (isJumping) {
          jumpVelocityY -= 14.0 * delta; // gravity
        }

        const isMoving = Math.hypot(moveDirX, moveDirZ) > 0.05;

        if (isMoving) {
          // Calculate movement direction
          const targetRotation = Math.atan2(moveDirX, moveDirZ);
          let diff = targetRotation - player.mesh.rotation.y;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          player.mesh.rotation.y += diff * Math.min(1, delta * 14);

          // Căn chỉnh khoảng cách bước đi, không vượt quá đích đến click
          let step = moveSpeed * delta;
          if (targetDestination) {
            const distLeft = Math.hypot(
              targetDestination.x - player.mesh.position.x,
              targetDestination.z - player.mesh.position.z
            );
            step = Math.min(step, distLeft);
          }

          const targetX = player.mesh.position.x + moveDirX * step;
          const targetZ = player.mesh.position.z + moveDirZ * step;

          // Clamp movement with collision system (won't walk off cliffs or through walls)
          const clamped = collision.clampMovement(
            player.mesh.position,
            { x: targetX, y: player.mesh.position.y, z: targetZ }
          );

          // Kiểm tra xem có bị kẹt vào tường/vật cản khi di chuyển click-to-move không
          if (targetDestination) {
            const actualMoved = Math.hypot(clamped.x - player.mesh.position.x, clamped.z - player.mesh.position.z);
            if (actualMoved < 0.003) {
              stuckFrames++;
              if (stuckFrames > 18) {
                targetDestination = null;
              }
            } else {
              stuckFrames = 0;
            }
          }

          player.mesh.position.x = clamped.x;
          player.mesh.position.z = clamped.z;

          // Handle height & jumping
          if (isJumping) {
            player.mesh.position.y += jumpVelocityY * delta;
            if (player.mesh.position.y <= clamped.y) {
              player.mesh.position.y = clamped.y;
              isJumping = false;
              jumpVelocityY = 0;
              soundManager.playLand();
            }
          } else {
            // When moving on slopes/stairs:
            if (clamped.y >= player.mesh.position.y) {
              player.mesh.position.y = THREE.MathUtils.lerp(player.mesh.position.y, clamped.y, Math.min(1, delta * 32));
              if (player.mesh.position.y < clamped.y) {
                player.mesh.position.y = clamped.y;
              }
            } else {
              player.mesh.position.y = THREE.MathUtils.lerp(player.mesh.position.y, clamped.y, Math.min(1, delta * 20));
            }
          }

          // Footstep audio
          footstepTimer += delta;
          const stepInterval = isRunning ? 0.25 : 0.38;
          if (footstepTimer >= stepInterval && !isJumping) {
            soundManager.playFootstep(clamped.surface);
            footstepTimer = 0;
          }
        } else {
          // Standing still
          const groundCheck = collision.getWalkableHeight(player.mesh.position.x, player.mesh.position.z, player.mesh.position.y);
          if (isJumping) {
            player.mesh.position.y += jumpVelocityY * delta;
            if (player.mesh.position.y <= groundCheck.y) {
              player.mesh.position.y = groundCheck.y;
              isJumping = false;
              jumpVelocityY = 0;
              soundManager.playLand();
            }
          } else {
            if (player.mesh.position.y < groundCheck.y) {
              player.mesh.position.y = groundCheck.y;
            } else {
              player.mesh.position.y = THREE.MathUtils.lerp(player.mesh.position.y, groundCheck.y, Math.min(1, delta * 20));
            }
          }
        }

        // Update player animations
        player.update(delta, isMoving, isRunning, isJumping);

        // Update dog companion AI & animations
        dog.update(delta, player.mesh.position, new THREE.Vector3(moveDirX, 0, moveDirZ));

        // Keep dog on walkable terrain height
        const dogGround = collision.getWalkableHeight(dog.mesh.position.x, dog.mesh.position.z, dog.mesh.position.y);
        if (dog.mesh.position.y < dogGround.y) {
          dog.mesh.position.y = dogGround.y;
        } else {
          dog.mesh.position.y = THREE.MathUtils.lerp(dog.mesh.position.y, dogGround.y, Math.min(1, delta * 22));
        }

        // --- PROXIMITY CHECK WITH THE 5 THEMATIC ZONES ---
        let detectedZone: ZoneId | null = null;
        let minZoneDist = Infinity;

        for (const zone of ZONES_CONFIG) {
          const dx = player.mesh.position.x - zone.targetPosition[0];
          const dz = player.mesh.position.z - zone.targetPosition[2];
          const dy = player.mesh.position.y - zone.targetPosition[1];
          const dist2D = Math.hypot(dx, dz);

          // Kiểm tra chênh lệch chiều cao: chỉ hiển thị khi người chơi đã lên đến cùng mặt bằng cao độ với khu vực
          // Ngăn việc hiển thị sớm khi người chơi còn đang ở dưới chân thang/dốc
          const maxAllowedHeightDiff = zone.id === 'experience' ? 0.65 : 0.85;
          const isAtSameHeightLevel = Math.abs(dy) <= maxAllowedHeightDiff;

          if (isAtSameHeightLevel && dist2D < zone.interactionRadius && dist2D < minZoneDist) {
            minZoneDist = dist2D;
            detectedZone = zone.id;
          }
        }

        if (detectedZone !== nearZoneRef.current) {
          // Update zone highlight in 3D world
          if (nearZoneRef.current) {
            world.setZoneHighlight(nearZoneRef.current, false, !!exploredZones[nearZoneRef.current]);
          }
          if (detectedZone) {
            world.setZoneHighlight(detectedZone, true, !!exploredZones[detectedZone]);
          }
          nearZoneRef.current = detectedZone;
          onNearZoneChangeRef.current(detectedZone);
        }

        // --- CAMERA FOLLOW SYSTEM ---
        const playerPos = player.mesh.position;
        const camAngle = mouseDragRef.current.camAngleOffset;

        let targetCamPos: THREE.Vector3;
        let targetLookAt: THREE.Vector3;

        if (isModalOpen && activeModalRef.current) {
          // Zone focus camera view
          const activeCfg = ZONES_CONFIG.find((z) => z.id === activeModalRef.current);
          if (activeCfg) {
            targetCamPos = new THREE.Vector3(
              activeCfg.position[0] + activeCfg.cameraOffset[0],
              activeCfg.position[1] + activeCfg.cameraOffset[1],
              activeCfg.position[2] + activeCfg.cameraOffset[2]
            );
            targetLookAt = new THREE.Vector3(
              activeCfg.position[0],
              activeCfg.position[1] + 1.2,
              activeCfg.position[2]
            );
          } else {
            targetCamPos = new THREE.Vector3(playerPos.x, playerPos.y + 4.5, playerPos.z + 8.5);
            targetLookAt = new THREE.Vector3(playerPos.x, playerPos.y + 1.2, playerPos.z);
          }
        } else {
          // 3rd-person isometric cinematic follow camera (matches reference image angle)
          const camDist = 9.8;
          const camHeight = 5.2;

          const offsetX = Math.sin(camAngle) * camDist;
          const offsetZ = Math.cos(camAngle) * camDist;

          targetCamPos = new THREE.Vector3(
            playerPos.x + offsetX,
            playerPos.y + camHeight,
            playerPos.z + offsetZ
          );
          targetLookAt = new THREE.Vector3(
            playerPos.x,
            playerPos.y + 1.2,
            playerPos.z
          );
        }

        // Smooth camera damping
        currentCamPos.lerp(targetCamPos, delta * 4.5);
        currentCamTarget.lerp(targetLookAt, delta * 5.0);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentCamTarget);
      }

      // Update floating head interaction prompt directly above character's head
      if (headPromptRef.current) {
        const currentNearZone = nearZoneRef.current;
        if (gameStarted && currentNearZone && !isModalOpen) {
          const headVec = new THREE.Vector3(
            player.mesh.position.x,
            player.mesh.position.y + 1.95,
            player.mesh.position.z
          );
          headVec.project(camera);

          // Render only when in front of camera
          if (headVec.z < 1) {
            const screenX = (headVec.x * 0.5 + 0.5) * container.clientWidth;
            const screenY = (-(headVec.y * 0.5) + 0.5) * container.clientHeight;

            headPromptRef.current.style.display = 'flex';
            headPromptRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -100%)`;
          } else {
            headPromptRef.current.style.display = 'none';
          }
        } else {
          headPromptRef.current.style.display = 'none';
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gameStarted]);

  return (
    <div
      ref={containerRef}
      id="game-viewport"
      className="absolute inset-0 w-full h-full cursor-pointer active:cursor-grabbing overflow-hidden touch-none"
    >
      {/* Floating Head Interaction Prompt directly above character */}
      <div
        ref={headPromptRef}
        id="character-head-prompt"
        style={{
          display: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform'
        }}
        className="pointer-events-auto z-30 flex flex-col items-center cursor-pointer select-none group"
        onClick={(e) => {
          e.stopPropagation();
          if (nearZoneRef.current && !activeModalRef.current) {
            soundManager.playInteractChime();
            onOpenZoneRef.current(nearZoneRef.current);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Floating Bubble Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-amber-400/90 shadow-[0_8px_24px_rgba(245,158,11,0.45)] backdrop-blur-md font-sans text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap group-hover:scale-105 group-hover:border-amber-300 transition-all duration-150 active:scale-95 animate-bounce-subtle">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-300">Nhấn Space để xem</span>
        </div>

        {/* Downward pointer triangle pointing directly at character's head */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-amber-400 -mt-[1px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
};
