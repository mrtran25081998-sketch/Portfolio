import * as THREE from 'three';

export type CharacterAction = 'idle' | 'walk' | 'run' | 'jump';

export class VoxelCharacter {
  public mesh: THREE.Group;
  public action: CharacterAction = 'idle';
  public velocity = new THREE.Vector3();
  public isGrounded: boolean = true;
  public jumpTime: number = 0;

  // Character body parts for hierarchical animation
  private bodyGroup: THREE.Group;
  private headGroup: THREE.Group;
  private leftArmGroup: THREE.Group;
  private rightArmGroup: THREE.Group;
  private leftLegGroup: THREE.Group;
  private rightLegGroup: THREE.Group;
  private laptopGroup: THREE.Group;
  private laptopScreenMesh: THREE.Mesh;

  // Animation timing
  private animTimer: number = 0;
  private idleGlanceTimer: number = 0;

  constructor() {
    this.mesh = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.mesh.add(this.bodyGroup);

    // Common voxel materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1f1e1c, roughness: 0.7 });
    const whiteShirtMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const darkVestMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const darkPantsMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
    const backpackMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const laptopMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.3, roughness: 0.4 });
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    // 1. Torso
    const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.28), darkVestMat);
    torsoMesh.position.y = 0.85;
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    this.bodyGroup.add(torsoMesh);

    // White shirt collar/center strip
    const shirtMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.66, 0.29), whiteShirtMat);
    shirtMesh.position.y = 0.85;
    shirtMesh.position.z = 0.01;
    this.bodyGroup.add(shirtMesh);

    // Backpack on back
    const backpackMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.48, 0.18), backpackMat);
    backpackMesh.position.set(0, 0.88, -0.22);
    backpackMesh.castShadow = true;
    this.bodyGroup.add(backpackMesh);

    // 2. Head & Hair
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 1.25, 0);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), skinMat);
    headMesh.castShadow = true;
    this.headGroup.add(headMesh);

    // Hair top and sides
    const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.18, 0.46), hairMat);
    hairTop.position.set(0, 0.16, 0.01);
    this.headGroup.add(hairTop);

    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.28, 0.12), hairMat);
    hairBack.position.set(0, 0.06, -0.18);
    this.headGroup.add(hairBack);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    leftEye.position.set(-0.11, 0.02, 0.22);
    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    rightEye.position.set(0.11, 0.02, 0.22);
    this.headGroup.add(leftEye, rightEye);

    this.bodyGroup.add(this.headGroup);

    // 3. Legs
    // Left Leg
    this.leftLegGroup = new THREE.Group();
    this.leftLegGroup.position.set(-0.15, 0.55, 0);
    const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.55, 0.22), darkPantsMat);
    leftLegMesh.position.y = -0.275;
    leftLegMesh.castShadow = true;
    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.12, 0.26), shoeMat);
    leftShoe.position.set(0, -0.5, 0.02);
    this.leftLegGroup.add(leftLegMesh, leftShoe);
    this.bodyGroup.add(this.leftLegGroup);

    // Right Leg
    this.rightLegGroup = new THREE.Group();
    this.rightLegGroup.position.set(0.15, 0.55, 0);
    const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.55, 0.22), darkPantsMat);
    rightLegMesh.position.y = -0.275;
    rightLegMesh.castShadow = true;
    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.12, 0.26), shoeMat);
    rightShoe.position.set(0, -0.5, 0.02);
    this.rightLegGroup.add(rightLegMesh, rightShoe);
    this.bodyGroup.add(this.rightLegGroup);

    // 4. Arms & Laptop
    // Left Arm (holding side of laptop)
    this.leftArmGroup = new THREE.Group();
    this.leftArmGroup.position.set(-0.34, 1.1, 0);
    const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.18), whiteShirtMat);
    leftArmMesh.position.y = -0.275;
    leftArmMesh.castShadow = true;
    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), skinMat);
    leftHand.position.y = -0.55;
    this.leftArmGroup.add(leftArmMesh, leftHand);
    this.bodyGroup.add(this.leftArmGroup);

    // Right Arm
    this.rightArmGroup = new THREE.Group();
    this.rightArmGroup.position.set(0.34, 1.1, 0);
    const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.18), whiteShirtMat);
    rightArmMesh.position.y = -0.275;
    rightArmMesh.castShadow = true;
    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), skinMat);
    rightHand.position.y = -0.55;
    this.rightArmGroup.add(rightArmMesh, rightHand);
    this.bodyGroup.add(this.rightArmGroup);

    // 5. Laptop held in front (Hidden by user request)
    this.laptopGroup = new THREE.Group();
    this.laptopGroup.position.set(0, 0.72, 0.32);
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.03, 0.26), laptopMat);
    const laptopLid = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.03), laptopMat);
    laptopLid.position.set(0, 0.12, -0.12);
    laptopLid.rotation.x = -0.3;

    this.laptopScreenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.20, 0.01), screenMat);
    this.laptopScreenMesh.position.set(0, 0.12, -0.10);
    this.laptopScreenMesh.rotation.x = -0.3;

    this.laptopGroup.add(laptopBase, laptopLid, this.laptopScreenMesh);
    // Hide laptop in front of character as requested
    this.laptopGroup.visible = false;
    this.bodyGroup.add(this.laptopGroup);

    // Arms start in natural resting posture at sides
    this.leftArmGroup.rotation.x = 0;
    this.leftArmGroup.rotation.z = 0.08;
    this.rightArmGroup.rotation.x = 0;
    this.rightArmGroup.rotation.z = -0.08;
  }

  update(delta: number, isMoving: boolean, isRunning: boolean, isJumping: boolean) {
    this.animTimer += delta * (isRunning ? 14 : 9);
    this.idleGlanceTimer += delta;

    if (isJumping) {
      this.action = 'jump';
      // Jump pose with arms raised slightly back
      this.leftLegGroup.rotation.x = -0.4;
      this.rightLegGroup.rotation.x = 0.4;
      this.bodyGroup.position.y = 0.1;
      this.headGroup.rotation.x = 0;
      this.headGroup.rotation.y = 0;
      this.leftArmGroup.rotation.x = -0.7;
      this.rightArmGroup.rotation.x = -0.7;
      this.leftArmGroup.rotation.z = 0.2;
      this.rightArmGroup.rotation.z = -0.2;
    } else if (isMoving) {
      this.action = isRunning ? 'run' : 'walk';
      const swing = Math.sin(this.animTimer);
      const bob = Math.abs(Math.cos(this.animTimer)) * (isRunning ? 0.08 : 0.04);

      this.bodyGroup.position.y = bob;
      // Slight forward torso lean when moving
      this.bodyGroup.rotation.x = isRunning ? 0.08 : 0.03;

      // Legs swing
      this.leftLegGroup.rotation.x = swing * (isRunning ? 0.95 : 0.65);
      this.rightLegGroup.rotation.x = -swing * (isRunning ? 0.95 : 0.65);

      // Arms swing naturally opposite legs
      this.leftArmGroup.rotation.x = -swing * (isRunning ? 0.85 : 0.55);
      this.rightArmGroup.rotation.x = swing * (isRunning ? 0.85 : 0.55);
      this.leftArmGroup.rotation.z = 0.08;
      this.rightArmGroup.rotation.z = -0.08;

      // Head remains upright and focuses forward on the path
      this.headGroup.rotation.y = 0;
      this.headGroup.rotation.x = isRunning ? -0.06 : -0.02;
    } else {
      this.action = 'idle';
      // Idle breath bob
      const breath = Math.sin(this.idleGlanceTimer * 2.2) * 0.02;
      this.bodyGroup.position.y = breath;
      this.bodyGroup.rotation.x = 0;

      this.leftLegGroup.rotation.x = 0;
      this.rightLegGroup.rotation.x = 0;

      // Relaxed resting arms at sides with gentle breathing sway
      const armBreath = Math.sin(this.idleGlanceTimer * 2.2) * 0.03;
      this.leftArmGroup.rotation.x = armBreath;
      this.leftArmGroup.rotation.z = 0.08 + armBreath * 0.5;
      this.rightArmGroup.rotation.x = -armBreath;
      this.rightArmGroup.rotation.z = -0.08 - armBreath * 0.5;

      // Occasional gentle glance around
      if (this.idleGlanceTimer % 6 > 3.5) {
        this.headGroup.rotation.y = Math.sin(this.idleGlanceTimer * 1.5) * 0.25;
        this.headGroup.rotation.x = 0;
      } else {
        this.headGroup.rotation.y = 0;
        this.headGroup.rotation.x = 0;
      }
    }
  }
}

/**
 * Voxel Companion Dog (Bông)
 * White fur, red collar, following AI, sitting when stopped, wagging tail.
 */
export class VoxelDog {
  public mesh: THREE.Group;
  private bodyGroup: THREE.Group;
  private headGroup: THREE.Group;
  private tailGroup: THREE.Group;
  private legFL: THREE.Group;
  private legFR: THREE.Group;
  private legBL: THREE.Group;
  private legBR: THREE.Group;

  private animTimer: number = 0;
  private idleTime: number = 0;
  public isSitting: boolean = false;

  constructor() {
    this.mesh = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.mesh.add(this.bodyGroup);

    const furMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const earMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6 });
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    // 1. Torso
    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.46), furMat);
    bodyMesh.position.y = 0.32;
    bodyMesh.castShadow = true;
    this.bodyGroup.add(bodyMesh);

    // Red collar
    const collarMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.12), collarMat);
    collarMesh.position.set(0, 0.38, 0.18);
    this.bodyGroup.add(collarMesh);

    // 2. Head & Snout
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.46, 0.26);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.26, 0.26), furMat);
    headMesh.castShadow = true;
    this.headGroup.add(headMesh);

    // Snout
    const snoutMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), furMat);
    snoutMesh.position.set(0, -0.05, 0.18);
    const noseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.04), noseMat);
    noseMesh.position.set(0, -0.02, 0.27);
    this.headGroup.add(snoutMesh, noseMesh);

    // Eyes
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.02), eyeMat);
    leftEye.position.set(-0.08, 0.04, 0.14);
    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.02), eyeMat);
    rightEye.position.set(0.08, 0.04, 0.14);
    this.headGroup.add(leftEye, rightEye);

    // Ears
    const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), earMat);
    leftEar.position.set(-0.14, 0.14, -0.02);
    leftEar.rotation.z = 0.25;
    const rightEar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), earMat);
    rightEar.position.set(0.14, 0.14, -0.02);
    rightEar.rotation.z = -0.25;
    this.headGroup.add(leftEar, rightEar);

    this.bodyGroup.add(this.headGroup);

    // 3. Legs
    const createLeg = (x: number, z: number) => {
      const g = new THREE.Group();
      g.position.set(x, 0.22, z);
      const legM = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.1), furMat);
      legM.position.y = -0.11;
      legM.castShadow = true;
      g.add(legM);
      return g;
    };

    this.legFL = createLeg(-0.11, 0.14);
    this.legFR = createLeg(0.11, 0.14);
    this.legBL = createLeg(-0.11, -0.14);
    this.legBR = createLeg(0.11, -0.14);
    this.bodyGroup.add(this.legFL, this.legFR, this.legBL, this.legBR);

    // 4. Tail
    this.tailGroup = new THREE.Group();
    this.tailGroup.position.set(0, 0.38, -0.24);
    const tailMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), furMat);
    tailMesh.position.set(0, 0.08, -0.06);
    tailMesh.rotation.x = -0.5;
    this.tailGroup.add(tailMesh);
    this.bodyGroup.add(this.tailGroup);
  }

  update(delta: number, playerPos: THREE.Vector3, playerVelocity: THREE.Vector3) {
    this.animTimer += delta * 12;

    // Follow player AI
    const toPlayer = new THREE.Vector3().subVectors(playerPos, this.mesh.position);
    const distToPlayer = Math.hypot(toPlayer.x, toPlayer.z);

    const targetDistance = 1.3;
    const isMoving = distToPlayer > targetDistance;

    if (isMoving) {
      this.idleTime = 0;
      this.isSitting = false;

      // Rotate towards player
      const angle = Math.atan2(toPlayer.x, toPlayer.z);
      this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, angle, delta * 8);

      // Move speed scales with distance
      const speed = distToPlayer > 3.0 ? 5.5 : 3.2;
      const dir = new THREE.Vector3(toPlayer.x, 0, toPlayer.z).normalize();
      this.mesh.position.addScaledVector(dir, speed * delta);

      // Trotting animation
      const legSwing = Math.sin(this.animTimer) * 0.7;
      this.legFL.rotation.x = legSwing;
      this.legBR.rotation.x = legSwing;
      this.legFR.rotation.x = -legSwing;
      this.legBL.rotation.x = -legSwing;

      // Head and body bob
      this.bodyGroup.position.y = Math.abs(Math.cos(this.animTimer)) * 0.04;
      this.bodyGroup.rotation.x = 0;
    } else {
      this.idleTime += delta;

      // Reset leg rotation
      this.legFL.rotation.x = 0;
      this.legFR.rotation.x = 0;
      this.legBL.rotation.x = 0;
      this.legBR.rotation.x = 0;

      // Sit down if player stopped for > 1.8 seconds
      if (this.idleTime > 1.8) {
        this.isSitting = true;
        this.bodyGroup.position.y = -0.08;
        this.bodyGroup.rotation.x = -0.3;
        this.legBL.rotation.x = -0.9;
        this.legBR.rotation.x = -0.9;
        this.legFL.rotation.x = 0.3;
        this.legFR.rotation.x = 0.3;
      } else {
        this.isSitting = false;
        this.bodyGroup.position.y = 0;
        this.bodyGroup.rotation.x = 0;
      }
    }

    // Always wag tail happily!
    this.tailGroup.rotation.y = Math.sin(this.animTimer * 1.5) * 0.6;
  }
}
