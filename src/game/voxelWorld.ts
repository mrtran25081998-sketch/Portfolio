import * as THREE from 'three';
import { ZONES_CONFIG } from '../data/portfolioData';
import { ZoneId } from '../types';

export interface Waypoint {
  x: number;
  y: number;
  z: number;
  waitTime?: number;
}

export interface RoamingPlayer {
  name: string;
  group: THREE.Group;
  legPivotL: THREE.Group;
  legPivotR: THREE.Group;
  armPivotL: THREE.Group;
  armPivotR: THREE.Group;
  head: THREE.Group;
  torso: THREE.Mesh;
  waypoints: Waypoint[];
  currentWpIndex: number;
  targetWpIndex: number;
  isReversing: boolean;
  speed: number;
  waitTimer: number;
  walkCycle: number;
  idleCycle: number;
}

export class VoxelWorld {
  public scene: THREE.Scene;
  public animatedMeshes: {
    update: (delta: number, elapsed: number) => void;
  }[] = [];

  // Interactive zone signs & glowing star markers
  public zoneSigns: Map<
    ZoneId,
    {
      signMesh: THREE.Mesh;
      starMesh: THREE.Mesh;
      rimMesh: THREE.Mesh;
      pointLight: THREE.PointLight;
    }
  > = new Map();

  // Dynamic studio screen textures
  private screenCanvases: HTMLCanvasElement[] = [];
  private screenTextures: THREE.CanvasTexture[] = [];
  private currentProjectTitle: string = 'Aura Fintech Wallet';

  // Fireworks system for 5/5 celebration
  private fireworksParticles: THREE.Points | null = null;
  private fireworksActive: boolean = false;
  private fireworksPositions: Float32Array | null = null;
  private fireworksVelocities: Float32Array | null = null;
  private fireworksColors: Float32Array | null = null;

  // Waterfall particles
  private waterfallDropMeshes: THREE.InstancedMesh[] = [];

  // Wandering Co-Players (Simulated Online Players)
  private roamingPlayers: RoamingPlayer[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.buildLightingAndAtmosphere();
    this.buildSkyAndClouds();
    this.buildTerrainAndWater();
    this.buildCentralPathAndStairs();
    this.buildAboutMeGazebo();
    this.buildMyWorkStudio();
    this.buildMyCXFloatingIsland();
    this.buildExperienceLibrary();
    this.buildContactCabin();
    this.buildDistantMountainsAndIslands();
    this.buildAmbientParticles();
    this.initRoamingPlayers();
  }

  // --- 1. LIGHTING & SUNSET ATMOSPHERE ---
  private buildLightingAndAtmosphere() {
    // Warm sunset fog
    this.scene.fog = new THREE.Fog(0xe29578, 35, 110);

    // Warm ambient light
    const ambientLight = new THREE.AmbientLight(0xffecd1, 0.75);
    this.scene.add(ambientLight);

    // Hemisphere light (warm peach sky, deep earthy ground)
    const hemiLight = new THREE.HemisphereLight(0xffcaa5, 0x4a3b32, 0.65);
    this.scene.add(hemiLight);

    // Golden hour sun directional light
    const sunLight = new THREE.DirectionalLight(0xffaa5e, 2.2);
    sunLight.position.set(-25, 22, -18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -28;
    sunLight.shadow.camera.right = 28;
    sunLight.shadow.camera.top = 28;
    sunLight.shadow.camera.bottom = -28;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Subtle blue fill light from the opposite direction for contrast
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.45);
    fillLight.position.set(20, 15, 25);
    this.scene.add(fillLight);
  }

  // --- 2. SKY GRADIENT, SUN DISC, & VOXEL CLOUDS ---
  private buildSkyAndClouds() {
    // Sky Dome with Sunset Canvas Gradient
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 16;
    skyCanvas.height = 512;
    const ctx = skyCanvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#312e81'); // deep indigo zenith
    grad.addColorStop(0.35, '#6366f1'); // violet transition
    grad.addColorStop(0.65, '#f43f5e'); // rose pink
    grad.addColorStop(0.85, '#f97316'); // vibrant orange
    grad.addColorStop(1.0, '#fef08a'); // golden yellow horizon
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 512);

    const skyTex = new THREE.CanvasTexture(skyCanvas);
    skyTex.mapping = THREE.EquirectangularReflectionMapping;

    const skyGeo = new THREE.SphereGeometry(95, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide,
      fog: false
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyMesh);

    // Glowing Sun Disc (voxel style layered square)
    const sunGroup = new THREE.Group();
    sunGroup.position.set(-38, 22, -35);

    const sunCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false });
    const sunHaloMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6, fog: false });
    const sunOuterMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.3, fog: false });

    const sunCore = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.5, 0.5), sunCoreMat);
    const sunHalo = new THREE.Mesh(new THREE.BoxGeometry(7.5, 7.5, 0.4), sunHaloMat);
    const sunOuter = new THREE.Mesh(new THREE.BoxGeometry(12.0, 12.0, 0.3), sunOuterMat);

    sunGroup.add(sunOuter, sunHalo, sunCore);
    sunGroup.lookAt(0, 5, 0);
    this.scene.add(sunGroup);

    // Voxel Clouds
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xfff7ed,
      roughness: 0.9,
      metalness: 0.05
    });

    const cloudClusterCoords = [
      { x: -22, y: 16, z: -15, w: 14, h: 2.2, d: 8 },
      { x: 14, y: 19, z: -22, w: 18, h: 2.5, d: 10 },
      { x: -5, y: 22, z: -30, w: 22, h: 3.0, d: 12 },
      { x: 26, y: 17, z: 8, w: 16, h: 2.4, d: 9 },
      { x: -28, y: 20, z: 12, w: 20, h: 2.8, d: 11 }
    ];

    const cloudsGroup = new THREE.Group();
    cloudClusterCoords.forEach((c) => {
      const cluster = new THREE.Group();
      cluster.position.set(c.x, c.y, c.z);

      // Assemble tiered voxel blocks for fluffy cloud look
      const base = new THREE.Mesh(new THREE.BoxGeometry(c.w, c.h, c.d), cloudMat);
      base.castShadow = true;
      cluster.add(base);

      const top1 = new THREE.Mesh(new THREE.BoxGeometry(c.w * 0.65, c.h * 0.9, c.d * 0.7), cloudMat);
      top1.position.set(c.w * 0.1, c.h * 0.8, 0);
      cluster.add(top1);

      const top2 = new THREE.Mesh(new THREE.BoxGeometry(c.w * 0.4, c.h * 0.7, c.d * 0.5), cloudMat);
      top2.position.set(-c.w * 0.2, c.h * 0.65, -c.d * 0.1);
      cluster.add(top2);

      cloudsGroup.add(cluster);
    });

    this.scene.add(cloudsGroup);

    // Cloud drift animation
    this.animatedMeshes.push({
      update: (delta) => {
        cloudsGroup.children.forEach((c) => {
          c.position.x += delta * 0.6;
          if (c.position.x > 45) c.position.x = -45;
        });
      }
    });
  }

  // --- 3. TERRAIN, WATER LAKE & LILY PADS ---
  private buildTerrainAndWater() {
    // Water plane
    const waterGeo = new THREE.PlaneGeometry(120, 120, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.65,
      transparent: true,
      opacity: 0.88
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.y = -0.85;
    waterMesh.receiveShadow = true;
    this.scene.add(waterMesh);

    // Water wave animation
    const waterPos = waterGeo.attributes.position;
    const initialY = new Float32Array(waterPos.count);
    for (let i = 0; i < waterPos.count; i++) {
      initialY[i] = waterPos.getY(i);
    }

    this.animatedMeshes.push({
      update: (_delta, elapsed) => {
        for (let i = 0; i < waterPos.count; i++) {
          const u = waterPos.getX(i);
          const v = waterPos.getZ(i);
          const wave = Math.sin(elapsed * 2.2 + u * 0.4 + v * 0.3) * 0.08 + Math.cos(elapsed * 1.6 + u * 0.2) * 0.04;
          waterPos.setY(i, initialY[i] + wave);
        }
        waterPos.needsUpdate = true;
      }
    });

    // Lily pads on water
    const padMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });

    const lilyCoords = [
      { x: -5, z: 2 },
      { x: -7, z: 1 },
      { x: -4, z: -1 },
      { x: -6, z: 4 },
      { x: 4, z: 1 },
      { x: 6, z: 3 },
      { x: -2, z: 3 }
    ];

    lilyCoords.forEach((p) => {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 8), padMat);
      pad.position.set(p.x, -0.8, p.z);
      this.scene.add(pad);

      if (Math.random() > 0.5) {
        const flower = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.12), flowerMat);
        flower.position.set(p.x, -0.74, p.z);
        this.scene.add(flower);
      }
    });

    // Grass & Dirt Materials
    const grassTopMat = new THREE.MeshStandardMaterial({ color: 0x5bba38, roughness: 0.8 });
    const dirtMat = new THREE.MeshStandardMaterial({ color: 0x784a28, roughness: 0.9 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });

    // Lower Main Island (holds ABOUT ME, entrance, MY WORK)
    const mainIsland = new THREE.Group();

    // Base dirt blocks
    const baseDirt = new THREE.Mesh(new THREE.BoxGeometry(26, 3.2, 14), dirtMat);
    baseDirt.position.set(0, -1.6, 7.5);
    baseDirt.receiveShadow = true;
    mainIsland.add(baseDirt);

    // Base grass top
    const baseGrass = new THREE.Mesh(new THREE.BoxGeometry(26.2, 0.4, 14.2), grassTopMat);
    baseGrass.position.set(0, 0.05, 7.5);
    baseGrass.receiveShadow = true;
    mainIsland.add(baseGrass);

    // Decorative stepped block edges for voxel aesthetic
    const addVoxelBlock = (x: number, y: number, z: number, mat: THREE.Material, sx = 1, sy = 1, sz = 1) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      b.position.set(x, y, z);
      b.castShadow = true;
      b.receiveShadow = true;
      mainIsland.add(b);
    };

    // Layered cliff edges around bottom-left & bottom-right
    addVoxelBlock(-13.5, -0.4, 7.5, dirtMat, 1.2, 2.0, 12);
    addVoxelBlock(13.5, -0.4, 7.5, dirtMat, 1.2, 2.0, 12);
    addVoxelBlock(-13.2, 0.2, 7.5, grassTopMat, 1.0, 0.35, 12);
    addVoxelBlock(13.2, 0.2, 7.5, grassTopMat, 1.0, 0.35, 12);

    this.scene.add(mainIsland);
  }

  // --- 4. CENTRAL STONE PATH & STAIRS ---
  private buildCentralPathAndStairs() {
    const stonePathMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.65 });
    const stoneStepMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      roughness: 0.6,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x8d5b32, roughness: 0.7 });

    const pathGroup = new THREE.Group();

    // 1. Entrance stone pathway (z: 11 to z: 5, width 3.2)
    const entrancePath = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.15, 6.2), stonePathMat);
    entrancePath.position.set(0, 0.25, 8.0);
    entrancePath.receiveShadow = true;
    pathGroup.add(entrancePath);

    // 2. Fork pathway going left to ABOUT ME
    const toAboutPath = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.15, 2.6), stonePathMat);
    toAboutPath.position.set(-5.5, 0.25, 7.0);
    toAboutPath.receiveShadow = true;
    pathGroup.add(toAboutPath);

    // 3. Fork pathway going right to MY WORK
    const toWorkPath = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.15, 2.6), stonePathMat);
    toWorkPath.position.set(5.5, 0.25, 7.0);
    toWorkPath.receiveShadow = true;
    pathGroup.add(toWorkPath);

    // 4. Stepped Grand Stone Staircase going up from z: 4.8 to z: 1.1 (meeting Experience Island at y=4.2)
    const stepCount = 10;
    const startZ = 4.8;
    const endZ = 1.1;
    const startY = 0.25;
    // Top surface elevated cleanly to 4.07 + 0.16 = 4.23 (strictly above y=4.20 grass to completely prevent z-fighting / flickering)
    const endY = 4.07;

    for (let i = 0; i < stepCount; i++) {
      const t = i / (stepCount - 1);
      const z = THREE.MathUtils.lerp(startZ, endZ, t);
      const y = THREE.MathUtils.lerp(startY, endY, t);

      // Top step given slightly extra depth to create a clean seamless landing curb
      const stepDepth = i === stepCount - 1 ? 0.6 : 0.52;
      const step = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.32, stepDepth), stoneStepMat);
      step.position.set(0.4, y, z);
      step.castShadow = true;
      step.receiveShadow = true;
      pathGroup.add(step);

      // Stone blocks supporting the staircase sides
      const sideL = new THREE.Mesh(new THREE.BoxGeometry(1.0, y + 1.0, stepDepth), stoneStepMat);
      sideL.position.set(-1.9, y / 2, z);
      sideL.castShadow = true;
      sideL.receiveShadow = true;
      pathGroup.add(sideL);

      const sideR = new THREE.Mesh(new THREE.BoxGeometry(1.0, y + 1.0, stepDepth), stoneStepMat);
      sideR.position.set(2.7, y / 2, z);
      sideR.castShadow = true;
      sideR.receiveShadow = true;
      pathGroup.add(sideR);
    }

    // 5. Upper Landing Plaza (y ~ 4.2, z ~ -2.5 to -5.0)
    // Sized so that its right edge leaves clear water space for the East Bridge without overlapping or submerging the bridge
    const upperPlaza = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.35, 4.5), stonePathMat);
    upperPlaza.position.set(1.0, 4.2, -3.8);
    upperPlaza.receiveShadow = true;
    pathGroup.add(upperPlaza);

    // Path extension towards EXPERIENCE library (right, z: -5.5 to -8)
    const toExpPath = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.35, 4.0), stonePathMat);
    toExpPath.position.set(7.5, 4.4, -5.5);
    toExpPath.receiveShadow = true;
    pathGroup.add(toExpPath);

    // Wooden Landing Pad for incoming East Suspension Bridge from Experience Island (Perfect alignment with user sketch)
    const eastLandingPad = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.8), woodPlankMat);
    eastLandingPad.position.set(6.7, 4.38, -3.5);
    eastLandingPad.receiveShadow = true;
    pathGroup.add(eastLandingPad);

    // Wooden walkway leading left towards CONTACT cabin
    const toContactPath = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.25, 2.4), woodPlankMat);
    toContactPath.position.set(-6.5, 4.2, -5.5);
    toContactPath.receiveShadow = true;
    pathGroup.add(toContactPath);

    // Stone Lanterns along the pathway with warm glowing point lights
    const lanternPositions = [
      { x: -2.1, y: 0.3, z: 9.2 },
      { x: 2.1, y: 0.3, z: 9.2 },
      { x: 2.7, y: 2.2, z: 2.95 },
      { x: -1.9, y: 2.2, z: 2.95 },
      { x: 2.7, y: 4.2, z: 1.1 },
      { x: -1.9, y: 4.2, z: 1.1 },
      { x: 4.5, y: 4.4, z: -2.8 },
      { x: -2.2, y: 4.4, z: -3.8 }
    ];

    const lanternPostMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
    const lanternGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    lanternPositions.forEach((lp) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.18), lanternPostMat);
      post.position.set(lp.x, lp.y + 0.45, lp.z);
      post.castShadow = true;
      pathGroup.add(post);

      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.35, 0.32), lanternGlassMat);
      lamp.position.set(lp.x, lp.y + 1.0, lp.z);
      pathGroup.add(lamp);

      const pLight = new THREE.PointLight(0xffb703, 1.2, 5.5);
      pLight.position.set(lp.x, lp.y + 1.1, lp.z);
      pathGroup.add(pLight);
    });

    // White Flowers & Grass Foliage
    this.addFlowersAndVegetation(pathGroup);

    this.scene.add(pathGroup);
  }

  // --- FLOWERS & VEGETATION ---
  private addFlowersAndVegetation(parent: THREE.Group) {
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8 });
    const whitePetalMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const yellowPetalMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });

    const flowerCoords = [
      { x: -2.4, y: 0.3, z: 7.2 },
      { x: -2.8, y: 0.3, z: 6.5 },
      { x: 2.4, y: 0.3, z: 7.5 },
      { x: 2.7, y: 0.3, z: 6.2 },
      { x: 3.5, y: 2.4, z: 1.5 },
      { x: 3.8, y: 2.6, z: 0.5 },
      { x: 4.8, y: 4.5, z: -2.8 },
      { x: 5.5, y: 4.5, z: -3.5 },
      { x: -3.2, y: 4.4, z: -4.8 }
    ];

    flowerCoords.forEach((c) => {
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), stemMat);
      stem.position.set(c.x, c.y + 0.175, c.z);
      parent.add(stem);

      const petalMat = Math.random() > 0.3 ? whitePetalMat : yellowPetalMat;
      const blossom = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.18), petalMat);
      blossom.position.set(c.x, c.y + 0.38, c.z);
      parent.add(blossom);
    });
  }

  // --- 5. ZONE 1: ABOUT ME GAZEBO (Bottom-Left Foreground) ---
  private buildAboutMeGazebo() {
    const gazebo = new THREE.Group();
    gazebo.position.set(-10, 0, 7);
    gazebo.userData = { zoneId: 'about', isZoneStructure: true, isZoneInteractive: true };

    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0xb47941, roughness: 0.7 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x784a28, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xd98d47, roughness: 0.65 });

    // Raised wooden floor deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.4, 4.6), woodPlankMat);
    deck.position.set(0, 0.2, 0);
    deck.receiveShadow = true;
    gazebo.add(deck);

    // 4 Corner Pillars
    const pillarPositions = [
      { x: -2.2, z: -1.9 },
      { x: 2.2, z: -1.9 },
      { x: -2.2, z: 1.9 },
      { x: 2.2, z: 1.9 }
    ];

    pillarPositions.forEach((pos) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 0.45), darkWoodMat);
      pillar.position.set(pos.x, 1.8, pos.z);
      pillar.castShadow = true;
      gazebo.add(pillar);
    });

    // Stepped Voxel Roof (layered pyramids)
    for (let r = 0; r < 4; r++) {
      const w = 5.8 - r * 0.9;
      const d = 5.2 - r * 0.8;
      const roofLayer = new THREE.Mesh(new THREE.BoxGeometry(w, 0.4, d), roofMat);
      roofLayer.position.set(0, 3.4 + r * 0.38, 0);
      roofLayer.castShadow = true;
      gazebo.add(roofLayer);
    }

    // Pedestal with Open Book
    const podium = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.6), darkWoodMat);
    podium.position.set(-0.8, 0.9, -0.4);
    podium.castShadow = true;
    gazebo.add(podium);

    // Open Book Pages (white/cream box angled)
    const bookMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, roughness: 0.5 });
    const bookCoverMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 });

    const bookBase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.5), bookCoverMat);
    bookBase.position.set(-0.8, 1.45, -0.4);
    bookBase.rotation.x = 0.2;

    const bookPagesL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.46), bookMat);
    bookPagesL.position.set(-0.95, 1.48, -0.4);
    bookPagesL.rotation.z = -0.15;
    bookPagesL.rotation.x = 0.2;

    const bookPagesR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.46), bookMat);
    bookPagesR.position.set(-0.65, 1.48, -0.4);
    bookPagesR.rotation.z = 0.15;
    bookPagesR.rotation.x = 0.2;

    gazebo.add(bookBase, bookPagesL, bookPagesR);

    // Bookshelf against back wall
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.4), darkWoodMat);
    shelf.position.set(0.6, 1.5, -1.8);
    shelf.castShadow = true;
    gazebo.add(shelf);

    // Colorful book spines inside shelf
    const bookColors = [0x3b82f6, 0xef4444, 0x10b981, 0xf59e0b, 0x8b5cf6];
    for (let row = 0; row < 2; row++) {
      for (let b = 0; b < 6; b++) {
        const cMat = new THREE.MeshStandardMaterial({ color: bookColors[(row * 6 + b) % bookColors.length] });
        const book = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.32), cMat);
        book.position.set(-0.2 + b * 0.24, 0.8 + row * 0.8, -1.75);
        gazebo.add(book);
      }
    }

    // NPC Avatar standing inside (Product Designer representation)
    const npcGroup = this.buildSmallNPC(0x475569, 0xf8fafc, 0x0284c7);
    npcGroup.position.set(1.0, 0.4, -0.3);
    npcGroup.rotation.y = -0.6;
    gazebo.add(npcGroup);

    // Warm glowing lantern inside gazebo
    const lantern = new THREE.PointLight(0xffaa33, 1.0, 5.0);
    lantern.position.set(0, 2.2, -0.4);
    gazebo.add(lantern);

    // Large Front Wooden Sign "GIỚI THIỆU" (Mounted cleanly on front roof beam)
    this.createZoneSign('about', gazebo, 'GIỚI THIỆU', [0, 3.35, 2.76], 0xf59e0b);

    this.scene.add(gazebo);
  }

  // --- 6. ZONE 2: MY WORK STUDIO (Bottom-Right Foreground) ---
  private buildMyWorkStudio() {
    const studio = new THREE.Group();
    studio.position.set(9, 0, 7);
    studio.userData = { zoneId: 'work', isZoneStructure: true, isZoneInteractive: true };

    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0xb47941, roughness: 0.7 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.38,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.45
    });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x784a28, roughness: 0.7 });

    // Wooden base floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.35, 5.0), woodPlankMat);
    floor.position.set(0, 0.18, 0);
    floor.receiveShadow = true;
    studio.add(floor);

    // Transparent Glass Cube Walls
    const frontWallL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 0.12), glassMat);
    frontWallL.position.set(-1.6, 1.8, 2.3);
    const frontWallR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 0.12), glassMat);
    frontWallR.position.set(1.6, 1.8, 2.3);
    // Doorway opening in front center (width 1.8)

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.2, 0.12), glassMat);
    backWall.position.set(0, 1.8, -2.3);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 4.6), glassMat);
    leftWall.position.set(-2.5, 1.8, 0);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 4.6), glassMat);
    rightWall.position.set(2.5, 1.8, 0);

    studio.add(frontWallL, frontWallR, backWall, leftWall, rightWall);

    // Corner timber pillars & roof
    const cornerPos = [
      { x: -2.5, z: -2.3 },
      { x: 2.5, z: -2.3 },
      { x: -2.5, z: 2.3 },
      { x: 2.5, z: 2.3 }
    ];
    cornerPos.forEach((p) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.4, 0.35), frameMat);
      col.position.set(p.x, 1.8, p.z);
      col.castShadow = true;
      studio.add(col);
    });

    // Wooden roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.5, 5.4), frameMat);
    roof.position.set(0, 3.6, 0);
    roof.castShadow = true;
    studio.add(roof);

    // Work desk inside
    const deskMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.15, 1.4), deskMat);
    desk.position.set(0, 1.1, 0.2);
    desk.castShadow = true;
    studio.add(desk);

    // Desk legs
    const dLegL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.95, 1.2), frameMat);
    dLegL.position.set(-1.4, 0.6, 0.2);
    const dLegR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.95, 1.2), frameMat);
    dLegR.position.set(1.4, 0.6, 0.2);
    studio.add(dLegL, dLegR);

    // Mini Robot figurine on desk (as in reference image)
    const robotMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.4, roughness: 0.3 });
    const robotEyeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const robot = new THREE.Group();
    robot.position.set(-0.9, 1.2, 0.2);
    const rBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.2), robotMat);
    const rEye = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.04), robotEyeMat);
    rEye.position.set(0, 0.04, 0.11);
    robot.add(rBody, rEye);
    studio.add(robot);

    // Multiple Animated High-Tech Project Screens
    // Screen 1: Big monitor on desk (Left)
    this.createStudioScreen(studio, [-0.4, 1.8, 0.2], [1.4, 0.95, 0.08], 0);
    // Screen 2: Big monitor on desk (Right)
    this.createStudioScreen(studio, [1.1, 1.8, 0.2], [1.4, 0.95, 0.08], 1);
    // Screen 3: Wall display behind
    this.createStudioScreen(studio, [0, 2.3, -2.1], [2.2, 1.3, 0.08], 2);

    // Cyberpunk/Design studio interior cyan-purple glow
    const studioLight = new THREE.PointLight(0x38bdf8, 1.4, 5.5);
    studioLight.position.set(0, 2.4, -0.5);
    studio.add(studioLight);

    const accentPink = new THREE.PointLight(0xf43f5e, 1.0, 4.0);
    accentPink.position.set(1.2, 1.6, 0.2);
    studio.add(accentPink);

    // Large Front Wooden Sign "DỰ ÁN CỦA TÔI" (Mounted cleanly on front roof beam)
    this.createZoneSign('work', studio, 'DỰ ÁN CỦA TÔI', [0, 3.6, 2.85], 0x38bdf8);

    this.scene.add(studio);
  }

  // --- SCREENS WITH ANIMATED CANVASES FOR MY WORK ---
  private createStudioScreen(parent: THREE.Group, pos: [number, number, number], size: [number, number, number], index: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;

    const texture = new THREE.CanvasTexture(canvas);
    this.screenCanvases.push(canvas);
    this.screenTextures.push(texture);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const screenMat = new THREE.MeshBasicMaterial({ map: texture });

    const frame = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), frameMat);
    frame.position.set(pos[0], pos[1], pos[2]);
    frame.castShadow = true;

    const screenSurface = new THREE.Mesh(
      new THREE.BoxGeometry(size[0] * 0.94, size[1] * 0.92, size[2] + 0.02),
      screenMat
    );
    frame.add(screenSurface);
    parent.add(frame);

    // Initial render
    this.drawScreenCanvas(ctx, index, 0, this.currentProjectTitle);

    // Animation hook for live screen updates
    this.animatedMeshes.push({
      update: (_delta, elapsed) => {
        // Redraw every ~0.8s or smoothly
        if (Math.floor(elapsed * 4) % 2 === 0) {
          this.drawScreenCanvas(ctx, index, elapsed, this.currentProjectTitle);
          texture.needsUpdate = true;
        }
      }
    });
  }

  private drawScreenCanvas(ctx: CanvasRenderingContext2D, index: number, elapsed: number, projectTitle: string) {
    ctx.clearRect(0, 0, 512, 320);

    if (index === 0) {
      // Fintech & UI dashboard mockup
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(16, 16, 480, 54);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(projectTitle, 32, 50);

      // Bar chart
      for (let b = 0; b < 6; b++) {
        const h = 40 + Math.sin(elapsed * 3 + b) * 35 + 45;
        ctx.fillStyle = b % 2 === 0 ? '#0284c7' : '#38bdf8';
        ctx.fillRect(40 + b * 68, 250 - h, 48, h);
      }
    } else if (index === 1) {
      // 3D Voxel game & castle view
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Game Studio Engine', 24, 42);

      // Pixelated castle / voxel graphics
      const px = 200 + Math.sin(elapsed * 2) * 20;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(px, 110, 80, 90);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(px + 15, 80, 20, 30);
      ctx.fillRect(px + 45, 80, 20, 30);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(32, 230, 448, 50);
    } else {
      // Design System & CX Journey Map
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = '#818cf8';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Interactive Design System', 28, 45);

      // Grid of design tokens / UI cards
      const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];
      colors.forEach((c, idx) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.roundRect(32 + idx * 115, 90, 95, 75, 8);
        ctx.fill();
      });

      // Animated wave line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 32; x < 480; x += 10) {
        const y = 240 + Math.sin(elapsed * 4 + x * 0.05) * 24;
        if (x === 32) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  public updateProjectScreens(title: string) {
    this.currentProjectTitle = title;
  }

  // --- 7. ZONE 3: MY CX FLOATING ISLAND (Center Air) ---
  private buildMyCXFloatingIsland() {
    const island = new THREE.Group();
    island.position.set(-1, 3.8, -1.5);
    island.userData = { zoneId: 'experience', isZoneStructure: true, isZoneInteractive: true };

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x5bba38, roughness: 0.8 });
    const dirtMat = new THREE.MeshStandardMaterial({ color: 0x784a28, roughness: 0.9 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });

    // 1. Island Top Surface (y ~ 0 to 0.4)
    const topGrass = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.4, 5.2), grassMat);
    topGrass.position.y = 0.2;
    topGrass.receiveShadow = true;
    topGrass.userData = { isGround: true };
    island.add(topGrass);

    // 2. Hanging inverted voxel rocky cone underneath
    const coneLayers = [
      { sy: 0.6, w: 5.6, d: 4.6, mat: dirtMat },
      { sy: 0.8, w: 4.4, d: 3.6, mat: dirtMat },
      { sy: 1.0, w: 3.2, d: 2.6, mat: stoneMat },
      { sy: 1.2, w: 2.0, d: 1.6, mat: stoneMat },
      { sy: 1.0, w: 1.0, d: 0.9, mat: stoneMat }
    ];

    let curY = 0;
    coneLayers.forEach((l) => {
      curY -= l.sy / 2;
      const b = new THREE.Mesh(new THREE.BoxGeometry(l.w, l.sy, l.d), l.mat);
      b.position.y = curY;
      b.castShadow = true;
      island.add(b);
      curY -= l.sy / 2;
    });

    // 3. Wooden suspension bridge connecting Experience Island to EXPLORE Zone (East Bridge)
    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x8d5b32, roughness: 0.7 });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.7 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0x3e1f08, roughness: 0.85 });
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x271506, roughness: 0.9 });

    // East Bridge horizontal planks (Extends exactly to the red sketch position)
    const eastBridgeLength = 4.6;
    const eastPlankCount = 11;
    for (let p = 0; p < eastPlankCount; p++) {
      const px = 3.1 + (p / (eastPlankCount - 1)) * eastBridgeLength;
      const py = 0.2 - Math.sin((p / (eastPlankCount - 1)) * Math.PI) * 0.16;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 1.8), woodPlankMat);
      plank.position.set(px, py, 0.4);
      plank.castShadow = true;
      island.add(plank);
    }

    // East Corner Landing Deck (Chiếu nghỉ góc cua hình chữ L đúng vị trí ô vuông đỏ người dùng vẽ)
    const eastCornerX = 3.1 + eastBridgeLength; // 7.7 (world X = 6.7)
    const eastCornerZ = 0.4;
    const eastCornerDeck = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 1.9), woodPlankMat);
    eastCornerDeck.position.set(eastCornerX, 0.2, eastCornerZ);
    eastCornerDeck.castShadow = true;
    eastCornerDeck.receiveShadow = true;
    island.add(eastCornerDeck);

    // Strong vertical pillar supporting corner deck deep into the water
    const eastCornerPillar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 6.0, 0.26), postMat);
    eastCornerPillar.position.set(eastCornerX, -2.8, eastCornerZ);
    island.add(eastCornerPillar);

    // Northward Bridge Segment planks leading directly to Explore Zone platform (free of any stone platform above)
    const eastNorthBridgeLength = 2.4;
    const eastNorthPlankCount = 7;
    for (let p = 0; p < eastNorthPlankCount; p++) {
      const pz = eastCornerZ - (p / (eastNorthPlankCount - 1)) * eastNorthBridgeLength;
      const py = 0.2 - Math.sin((p / (eastNorthPlankCount - 1)) * Math.PI) * 0.12;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 0.35), woodPlankMat);
      plank.position.set(eastCornerX, py, pz);
      plank.castShadow = true;
      island.add(plank);
    }

    // --- EAST BRIDGE COMPLETE STRUCTURAL RAILINGS ---
    // A. Outer Railing (Mép ngoài L-shape: Chạy từ x=3.1 dọc z=1.3 đến góc x=8.6, rồi rẽ lên Bắc dọc x=8.6 đến z=-2.0)
    const eastOuterHorizX = [3.1, 4.5, 5.9, 7.3, 8.6];
    eastOuterHorizX.forEach((px) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(px, 0.55, 1.3);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(px, 0.93, 1.3);
      island.add(post, cap);
    });
    // Outer Horizontal Handrail (x: 3.1 to 8.6, length = 5.5, center = 5.85)
    const eastOuterHorizTop = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.08, 0.08), railMat);
    eastOuterHorizTop.position.set(5.85, 0.82, 1.3);
    const eastOuterHorizMid = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.04, 0.04), cableMat);
    eastOuterHorizMid.position.set(5.85, 0.5, 1.3);
    island.add(eastOuterHorizTop, eastOuterHorizMid);

    // Outer Northbound Posts (along x = 8.6, from z = 0.2 to z = -2.0)
    const eastOuterNorthZ = [0.2, -0.9, -2.0];
    eastOuterNorthZ.forEach((pz) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(8.6, 0.55, pz);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(8.6, 0.93, pz);
      island.add(post, cap);
    });
    // Outer Northbound Handrail (along x = 8.6, z: 1.3 to -2.0, length = 3.3, center = -0.35)
    const eastOuterNorthTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3.3), railMat);
    eastOuterNorthTop.position.set(8.6, 0.82, -0.35);
    const eastOuterNorthMid = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 3.3), cableMat);
    eastOuterNorthMid.position.set(8.6, 0.5, -0.35);
    island.add(eastOuterNorthTop, eastOuterNorthMid);

    // Corner Lantern on the main outer corner post (8.6, 1.3)
    const eastCornerLanternPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), postMat);
    eastCornerLanternPost.position.set(8.6, 1.1, 1.3);
    const eastCornerLantern = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.22), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    eastCornerLantern.position.set(8.6, 1.35, 1.3);
    const eastCornerCap = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    eastCornerCap.position.set(8.6, 1.5, 1.3);
    island.add(eastCornerLanternPost, eastCornerLantern, eastCornerCap);

    // B. Inner Railing (Mép trong L-shape: Chạy từ x=3.1 dọc z=-0.5 đến cột góc trong x=6.8, rồi rẽ lên Bắc dọc x=6.8 đến z=-2.0)
    const eastInnerHorizX = [3.1, 4.3, 5.5, 6.8];
    eastInnerHorizX.forEach((px) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(px, 0.55, -0.5);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(px, 0.93, -0.5);
      island.add(post, cap);
    });
    // Inner Horizontal Handrail (x: 3.1 to 6.8, length = 3.7, center = 4.95)
    const eastInnerHorizTop = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.08, 0.08), railMat);
    eastInnerHorizTop.position.set(4.95, 0.82, -0.5);
    const eastInnerHorizMid = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.04, 0.04), cableMat);
    eastInnerHorizMid.position.set(4.95, 0.5, -0.5);
    island.add(eastInnerHorizTop, eastInnerHorizMid);

    // Inner Northbound Posts (along x = 6.8, from z = -1.25 to z = -2.0)
    const eastInnerNorthZ = [-1.25, -2.0];
    eastInnerNorthZ.forEach((pz) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(6.8, 0.55, pz);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(6.8, 0.93, pz);
      island.add(post, cap);
    });
    // Inner Northbound Handrail (along x = 6.8, z: -0.5 to -2.0, length = 1.5, center = -1.25)
    const eastInnerNorthTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.5), railMat);
    eastInnerNorthTop.position.set(6.8, 0.82, -1.25);
    const eastInnerNorthMid = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 1.5), cableMat);
    eastInnerNorthMid.position.set(6.8, 0.5, -1.25);
    island.add(eastInnerNorthTop, eastInnerNorthMid);

    // 3b. Wooden suspension bridge connecting Experience Island to Contact Cabin (West Bridge)
    const westBridgeLength = 3.7;
    const westPlankCount = 9;
    for (let p = 0; p < westPlankCount; p++) {
      const px = -3.1 - (p / (westPlankCount - 1)) * westBridgeLength;
      const py = 0.2 - Math.sin((p / (westPlankCount - 1)) * Math.PI) * 0.16;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 1.8), woodPlankMat);
      plank.position.set(px, py, 0.4);
      plank.castShadow = true;
      island.add(plank);
    }

    // Corner Landing Deck (Chiếu nghỉ góc cua hình chữ L)
    const cornerX = -3.1 - westBridgeLength; // -6.8
    const cornerZ = 0.4;
    const cornerDeck = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 1.9), woodPlankMat);
    cornerDeck.position.set(cornerX, 0.2, cornerZ);
    cornerDeck.castShadow = true;
    cornerDeck.receiveShadow = true;
    island.add(cornerDeck);

    // Strong vertical pillar supporting corner deck deep into the water
    const cornerPillar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 6.0, 0.26), postMat);
    cornerPillar.position.set(cornerX, -2.8, cornerZ);
    island.add(cornerPillar);

    // Northward Bridge Segment planks leading directly to Contact Cabin
    const westNorthBridgeLength = 2.65;
    const westNorthPlankCount = 7;
    for (let p = 0; p < westNorthPlankCount; p++) {
      const pz = cornerZ - (p / (westNorthPlankCount - 1)) * westNorthBridgeLength;
      const py = 0.2 - Math.sin((p / (westNorthPlankCount - 1)) * Math.PI) * 0.12;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 0.35), woodPlankMat);
      plank.position.set(cornerX, py, pz);
      plank.castShadow = true;
      island.add(plank);
    }

    // --- WEST BRIDGE COMPLETE STRUCTURAL RAILINGS (No floating rails, perfectly aligned posts) ---
    // A. Outer Railing (Mép ngoài L-shape: Chạy từ x=-3.1 dọc z=1.3 đến góc x=-7.7, rồi rẽ lên Bắc dọc x=-7.7 đến z=-2.25)
    const outerHorizX = [-3.1, -4.6, -6.1, -7.7];
    outerHorizX.forEach((px) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(px, 0.55, 1.3);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(px, 0.93, 1.3);
      island.add(post, cap);
    });
    // Outer Horizontal Handrail (x: -3.1 to -7.7, length = 4.6, center = -5.4)
    const outerHorizTop = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.08, 0.08), railMat);
    outerHorizTop.position.set(-5.4, 0.82, 1.3);
    const outerHorizMid = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.04, 0.04), cableMat);
    outerHorizMid.position.set(-5.4, 0.5, 1.3);
    island.add(outerHorizTop, outerHorizMid);

    // Outer Northbound Posts (along x = -7.7, from z = 0.1 to z = -2.25)
    const outerNorthZ = [0.1, -1.1, -2.25];
    outerNorthZ.forEach((pz) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(-7.7, 0.55, pz);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(-7.7, 0.93, pz);
      island.add(post, cap);
    });
    // Outer Northbound Handrail (along x = -7.7, z: 1.3 to -2.25, length = 3.55, center = -0.475)
    const outerNorthTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3.55), railMat);
    outerNorthTop.position.set(-7.7, 0.82, -0.475);
    const outerNorthMid = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 3.55), cableMat);
    outerNorthMid.position.set(-7.7, 0.5, -0.475);
    island.add(outerNorthTop, outerNorthMid);

    // Corner Lantern on the main outer corner post (-7.7, 1.3)
    const cornerLanternPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), postMat);
    cornerLanternPost.position.set(-7.7, 1.1, 1.3);
    const cornerLantern = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.22), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    cornerLantern.position.set(-7.7, 1.35, 1.3);
    const cornerCap = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    cornerCap.position.set(-7.7, 1.5, 1.3);
    island.add(cornerLanternPost, cornerLantern, cornerCap);

    // B. Inner Railing (Mép trong L-shape: Chạy từ x=-3.1 dọc z=-0.5 đến cột góc trong x=-5.9, rồi rẽ lên Bắc dọc x=-5.9 đến z=-2.25)
    const innerHorizX = [-3.1, -4.5, -5.9];
    innerHorizX.forEach((px) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(px, 0.55, -0.5);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(px, 0.93, -0.5);
      island.add(post, cap);
    });
    // Inner Horizontal Handrail (x: -3.1 to -5.9, length = 2.8, center = -4.5)
    const innerHorizTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.08), railMat);
    innerHorizTop.position.set(-4.5, 0.82, -0.5);
    const innerHorizMid = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.04, 0.04), cableMat);
    innerHorizMid.position.set(-4.5, 0.5, -0.5);
    island.add(innerHorizTop, innerHorizMid);

    // Inner Northbound Posts (along x = -5.9, from z = -1.375 to z = -2.25)
    const innerNorthZ = [-1.375, -2.25];
    innerNorthZ.forEach((pz) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), postMat);
      post.position.set(-5.9, 0.55, pz);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), railMat);
      cap.position.set(-5.9, 0.93, pz);
      island.add(post, cap);
    });
    // Inner Northbound Handrail (along x = -5.9, z: -0.5 to -2.25, length = 1.75, center = -1.375)
    const innerNorthTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.75), railMat);
    innerNorthTop.position.set(-5.9, 0.82, -1.375);
    const innerNorthMid = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 1.75), cableMat);
    innerNorthMid.position.set(-5.9, 0.5, -1.375);
    island.add(innerNorthTop, innerNorthMid);

    // 4. Grand Career Architectural Gateway (Cổng vòm vinh danh hoành tráng)
    const archPillarMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7, metalness: 0.2 });
    const roofTileMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
    const archBaseMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 });

    // Stately Pillars on left and right
    const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.4, 0.3), archPillarMat);
    pillarL.position.set(-1.9, 1.9, -0.95);
    pillarL.castShadow = true;
    const baseL = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.5, 0.48), archBaseMat);
    baseL.position.set(-1.9, 0.65, -0.95);

    const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.4, 0.3), archPillarMat);
    pillarR.position.set(1.9, 1.9, -0.95);
    pillarR.castShadow = true;
    const baseR = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.5, 0.48), archBaseMat);
    baseR.position.set(1.9, 0.65, -0.95);
    island.add(pillarL, baseL, pillarR, baseR);

    // Arch Crossbeams & Pagoda Roof Tiers
    const mainBeam = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.28, 0.42), archPillarMat);
    mainBeam.position.set(0, 3.4, -0.95);
    const roofTier1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 0.75), roofTileMat);
    roofTier1.position.set(0, 3.62, -0.95);
    const roofTier2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 0.58), roofTileMat);
    roofTier2.position.set(0, 3.8, -0.95);
    const goldCrest = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 0.38), goldMat);
    goldCrest.position.set(0, 3.96, -0.95);
    island.add(mainBeam, roofTier1, roofTier2, goldCrest);

    // Hanging Traditional Red-Gold Lanterns at Arch Sides
    const createHangingLantern = (x: number, y: number, z: number) => {
      const lantGroup = new THREE.Group();
      lantGroup.position.set(x, y, z);
      const cord = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.04), goldMat);
      cord.position.y = 0.2;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.28), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      const glowCore = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.2), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      const capTop = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), goldMat);
      capTop.position.y = 0.2;
      const capBottom = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), goldMat);
      capBottom.position.y = -0.2;
      lantGroup.add(cord, body, glowCore, capTop, capBottom);
      return lantGroup;
    };
    const lantL = createHangingLantern(-1.9, 2.85, -0.8);
    const lantR = createHangingLantern(1.9, 2.85, -0.8);
    island.add(lantL, lantR);

    // 6. Modern Achievement & Creative Studio Wall (Thay thế bảng đen tối tăm)
    const wallWoodMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.7 });
    const wallPanel = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.8, 0.16), wallWoodMat);
    wallPanel.position.set(0, 1.8, -1.85);
    wallPanel.receiveShadow = true;
    island.add(wallPanel);

    // Slat wood modern accents on backdrop wall
    for (let i = 0; i < 7; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 2.6, 0.06),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
      );
      slat.position.set(-1.8 + i * 0.6, 1.8, -1.74);
      island.add(slat);
    }

    // Award & Milestone Display Shelf
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x22150c, roughness: 0.6 });
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.38), shelfMat);
    shelf.position.set(0, 2.05, -1.68);
    island.add(shelf);

    // Golden Voxel Trophy on shelf
    const trophyBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.24), archBaseMat);
    trophyBase.position.set(-1.1, 2.22, -1.68);
    const trophyCup = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.28), goldMat);
    trophyCup.position.set(-1.1, 2.45, -1.68);
    island.add(trophyBase, trophyCup);

    // UX Dashboard Screen emitting ambient cyan tech glow
    const monitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.55, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
    );
    monitorFrame.position.set(0, 2.45, -1.75);
    const monitorScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.76, 0.46),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
    );
    monitorScreen.position.set(0, 2.45, -1.71);
    island.add(monitorFrame, monitorScreen);

    // Bonsai / Potted Plant on shelf
    const pot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.24), archBaseMat);
    pot.position.set(1.1, 2.22, -1.68);
    const leaves = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.36, 0.36),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
    );
    leaves.position.set(1.1, 2.48, -1.68);
    island.add(pot, leaves);

    // 6. Golden Stardust Sparkles floating around the Career Archway
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const sparkles: THREE.Mesh[] = [];
    for (let s = 0; s < 10; s++) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), sparkleMat);
      const angle = (s / 10) * Math.PI * 2;
      const rad = 1.2 + (s % 3) * 0.4;
      sp.position.set(
        Math.cos(angle) * rad,
        2.2 + (s % 4) * 0.35,
        -0.95 + (Math.sin(angle) * 0.4)
      );
      island.add(sp);
      sparkles.push(sp);
    }
    this.animatedMeshes.push({
      update: (_delta, elapsed) => {
        sparkles.forEach((sp, idx) => {
          sp.position.y += Math.sin(elapsed * 2.2 + idx) * 0.003;
          sp.rotation.y = elapsed * 1.5 + idx;
          sp.rotation.x = elapsed * 1.2;
        });
      }
    });

    // Reposition Pine Trees to extreme rear edges so central view is 100% crystal clear
    this.buildVoxelPineTree(island, -2.9, 0.4, -2.1);
    this.buildVoxelPineTree(island, 2.9, 0.4, -2.1);

    // Elevated & Prominent Sign "KINH NGHIỆM LÀM VIỆC" under the Archway
    this.createZoneSign('experience', island, 'KINH NGHIỆM LÀM VIỆC', [0, 2.45, -0.95], 0x10b981);

    this.scene.add(island);
  }

  // --- 8. ZONE 4: EXPLORE STUDIO & KNOWLEDGE CLIFF (Upper-Right Mountain Cliff) ---
  private buildExperienceLibrary() {
    const library = new THREE.Group();
    library.position.set(9.5, 4.2, -7.5);
    library.userData = { zoneId: 'explore', isZoneStructure: true, isZoneInteractive: true };

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d5b32, roughness: 0.7 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 });

    // Cliff Mountain Backdrop
    const cliff = new THREE.Mesh(new THREE.BoxGeometry(10.5, 16.0, 8.0), stoneMat);
    cliff.position.set(1.0, 7.0, -4.0);
    cliff.receiveShadow = true;
    library.add(cliff);

    // Grand Library Facade (3 tiers high)
    const facadeWidth = 6.4;
    const facadeHeight = 8.5;
    const facade = new THREE.Mesh(new THREE.BoxGeometry(facadeWidth, facadeHeight, 1.8), woodMat);
    facade.position.set(0, facadeHeight / 2, 0);
    facade.castShadow = true;
    library.add(facade);

    // Stone Arch Entryway in Center
    const archFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.8), stoneMat);
    archFrameL.position.set(-1.1, 1.6, 0.9);
    const archFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.8), stoneMat);
    archFrameR.position.set(1.1, 1.6, 0.9);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.6, 0.8), stoneMat);
    archTop.position.set(0, 3.4, 0.9);
    library.add(archFrameL, archFrameR, archTop);

    // Stately Double Wooden Door
    const doorL = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.8, 0.15), doorMat);
    doorL.position.set(-0.4, 1.4, 0.8);
    const doorR = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.8, 0.15), doorMat);
    doorR.position.set(0.4, 1.4, 0.8);
    library.add(doorL, doorR);

    // Facade Bookshelves lined with hundreds of colorful voxel books
    const bookColors = [0x3b82f6, 0xef4444, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x06b6d4, 0xe11d48];
    const shelfSides = [-2.2, 2.2];

    shelfSides.forEach((sideX) => {
      for (let floor = 0; floor < 4; floor++) {
        const shelfY = 1.2 + floor * 1.8;
        // Wooden shelf ledge
        const ledge = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.6), woodMat);
        ledge.position.set(sideX, shelfY, 0.92);
        library.add(ledge);

        // Books on shelf
        for (let b = 0; b < 6; b++) {
          const color = bookColors[(floor * 6 + b) % bookColors.length];
          const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.75, 0.4),
            new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
          );
          book.position.set(sideX - 0.6 + b * 0.24, shelfY + 0.4, 0.9);
          library.add(book);
        }
      }
    });

    // Scenic Waterfall cascading down cliff beside the library
    this.buildWaterfall(library, -3.8, 12, 0.5, 12.5);

    // Pine trees on mountain ledge
    this.buildVoxelPineTree(library, -3.2, 8.5, -2.5);
    this.buildVoxelPineTree(library, 3.5, 9.2, -2.0);

    // Large Prominent Wooden Sign "KHÁM PHÁ" (What I bring to your business)
    this.createZoneSign('explore', library, 'KHÁM PHÁ', [0, 4.3, 1.35], 0x38bdf8);

    this.scene.add(library);
  }

  // --- 9. ZONE 5: CONTACT CABIN (Upper-Left Mountain Cliff) ---
  private buildContactCabin() {
    const contact = new THREE.Group();
    contact.position.set(-11, 4.2, -7.5);
    contact.userData = { zoneId: 'contact', isZoneStructure: true, isZoneInteractive: true };

    const logMat = new THREE.MeshStandardMaterial({ color: 0x784a28, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.7 });
    const stoneCliffMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });

    // Cliff base under cabin
    const cliffBase = new THREE.Mesh(new THREE.BoxGeometry(7.5, 8.0, 7.5), stoneCliffMat);
    cliffBase.position.set(0, -3.8, 0);
    cliffBase.receiveShadow = true;
    contact.add(cliffBase);

    // Cozy Log Cabin Structure
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 3.8), logMat);
    cabin.position.set(0, 1.4, 0);
    cabin.castShadow = true;
    contact.add(cabin);

    // Cabin Roof
    for (let r = 0; r < 3; r++) {
      const roofL = new THREE.Mesh(new THREE.BoxGeometry(4.8 - r * 0.6, 0.35, 4.4 - r * 0.6), roofMat);
      roofL.position.set(0, 2.9 + r * 0.3, 0);
      roofL.castShadow = true;
      contact.add(roofL);
    }

    // Bright Red Mailbox on wooden post (iconic element from reference image)
    const postMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
    const mailboxMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
    const flagMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });

    const mPost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), postMat);
    mPost.position.set(-1.8, 0.55, 2.4);
    const mBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.35, 0.55), mailboxMat);
    mBox.position.set(-1.8, 1.15, 2.4);
    const mFlag = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.12), flagMat);
    mFlag.position.set(-1.6, 1.25, 2.4);
    contact.add(mPost, mBox, mFlag);

    // Plaque with Email, LinkedIn, Social icons
    const plaqueMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.08), plaqueMat);
    plaque.position.set(0, 0.9, 2.0);
    contact.add(plaque);

    // Draw icons on plaque
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 256;
    pCanvas.height = 96;
    const pCtx = pCanvas.getContext('2d')!;
    pCtx.fillStyle = '#1e293b';
    pCtx.fillRect(0, 0, 256, 96);
    pCtx.fillStyle = '#ffffff';
    pCtx.font = 'bold 36px monospace';
    pCtx.fillText('✉   in   @', 28, 60);
    const pTex = new THREE.CanvasTexture(pCanvas);
    const pFace = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.55),
      new THREE.MeshBasicMaterial({ map: pTex, transparent: true })
    );
    pFace.position.set(0, 0.9, 2.06);
    contact.add(pFace);

    // Hanging Bell / Lantern
    const bellMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.3 });
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.32, 8), bellMat);
    bell.position.set(1.8, 2.2, 1.8);
    contact.add(bell);

    // Cascading Waterfall tumbling down cliff into the lake
    this.buildWaterfall(contact, 2.6, 2.5, 1.2, 8.5);

    // Pine trees near cabin
    this.buildVoxelPineTree(contact, -2.8, 0, 0.5);

    // Wooden Landing Pad for incoming West Suspension Bridge from Experience Island
    const bridgePadMat = new THREE.MeshStandardMaterial({ color: 0x8d5b32, roughness: 0.7 });
    const landingPad = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 1.2), bridgePadMat);
    landingPad.position.set(3.2, 0.06, 3.75);
    landingPad.receiveShadow = true;
    contact.add(landingPad);

    // Large Wooden Sign "LIÊN HỆ" (Mounted in front of roof)
    this.createZoneSign('contact', contact, 'LIÊN HỆ', [0, 3.3, 2.35], 0xec4899);

    this.scene.add(contact);
  }

  // --- WATERFALL CREATION ---
  private buildWaterfall(parent: THREE.Group, x: number, topY: number, z: number, height: number) {
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.3
    });
    const foamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });

    // Waterfall curtain mesh
    const curtain = new THREE.Mesh(new THREE.BoxGeometry(0.8, height, 0.25), waterMat);
    curtain.position.set(x, topY - height / 2, z);
    parent.add(curtain);

    // Falling voxel droplets (InstancedMesh)
    const dropCount = 18;
    const dropGeo = new THREE.BoxGeometry(0.18, 0.3, 0.18);
    const instDrops = new THREE.InstancedMesh(dropGeo, foamMat, dropCount);
    const dummy = new THREE.Object3D();

    const dropOffsets = new Float32Array(dropCount * 3);
    for (let i = 0; i < dropCount; i++) {
      dropOffsets[i * 3 + 0] = x + (Math.random() - 0.5) * 0.6;
      dropOffsets[i * 3 + 1] = topY - Math.random() * height;
      dropOffsets[i * 3 + 2] = z + (Math.random() - 0.5) * 0.15;
    }

    parent.add(instDrops);

    this.animatedMeshes.push({
      update: (delta) => {
        for (let i = 0; i < dropCount; i++) {
          dropOffsets[i * 3 + 1] -= delta * 7.5;
          if (dropOffsets[i * 3 + 1] < topY - height) {
            dropOffsets[i * 3 + 1] = topY;
          }
          dummy.position.set(dropOffsets[i * 3 + 0], dropOffsets[i * 3 + 1], dropOffsets[i * 3 + 2]);
          dummy.updateMatrix();
          instDrops.setMatrixAt(i, dummy.matrix);
        }
        instDrops.instanceMatrix.needsUpdate = true;
      }
    });
  }

  // --- 10. DISTANT MOUNTAINS & SKY ISLANDS ---
  private buildDistantMountainsAndIslands() {
    const mountainMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 });
    const distantGrassMat = new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.9 });

    // Distant mountain ranges in the sunset
    const mountainCoords = [
      { x: -30, y: 8, z: -35, sx: 24, sy: 22, sz: 18 },
      { x: 2, y: 6, z: -42, sx: 28, sy: 18, sz: 20 },
      { x: 28, y: 10, z: -30, sx: 26, sy: 24, sz: 18 }
    ];

    mountainCoords.forEach((m) => {
      const g = new THREE.Group();
      g.position.set(m.x, m.y, m.z);

      // Stepped pyramid mountain
      for (let s = 0; s < 5; s++) {
        const factor = 1 - s * 0.18;
        const layer = new THREE.Mesh(
          new THREE.BoxGeometry(m.sx * factor, m.sy * 0.22, m.sz * factor),
          s === 0 ? distantGrassMat : mountainMat
        );
        layer.position.y = s * (m.sy * 0.2);
        g.add(layer);
      }
      this.scene.add(g);
    });

    // Distant Floating Sky Islands
    const skyIslandCoords = [
      { x: -18, y: 15, z: -25, scale: 1.2 },
      { x: 16, y: 18, z: -18, scale: 1.0 },
      { x: 5, y: 22, z: -28, scale: 0.8 }
    ];

    skyIslandCoords.forEach((s) => {
      const is = new THREE.Group();
      is.position.set(s.x, s.y, s.z);
      is.scale.setScalar(s.scale);

      // Grass top
      const top = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.4, 4.0), distantGrassMat);
      is.add(top);

      // Downward rocky cone
      const cone = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.2, 2.8), mountainMat);
      cone.position.y = -1.6;
      is.add(cone);

      // Cute mini pine trees on distant island
      this.buildVoxelPineTree(is, -1.0, 0.4, 0.5);
      this.buildVoxelPineTree(is, 1.2, 0.4, -0.6);

      this.scene.add(is);

      // Subtle float oscillation
      const initialY = s.y;
      this.animatedMeshes.push({
        update: (_delta, elapsed) => {
          is.position.y = initialY + Math.sin(elapsed * 1.2 + s.x) * 0.4;
        }
      });
    });
  }

  // --- VOXEL PINE TREE HELPER ---
  private buildVoxelPineTree(parent: THREE.Group, x: number, y: number, z: number) {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x543310, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });

    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.8, 0.35), trunkMat);
    trunk.position.y = 0.9;
    trunk.castShadow = true;
    tree.add(trunk);

    // 3 tiered leaf blocks
    const tiers = [
      { w: 2.2, h: 0.8, d: 2.2, y: 1.8 },
      { w: 1.6, h: 0.8, d: 1.6, y: 2.5 },
      { w: 1.0, h: 0.8, d: 1.0, y: 3.2 }
    ];

    tiers.forEach((t) => {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.d), leafMat);
      leaf.position.y = t.y;
      leaf.castShadow = true;
      tree.add(leaf);
    });

    parent.add(tree);
  }

  // --- NPC GENERATOR HELPER ---
  private buildSmallNPC(shirtColor: number, pantsColor: number, hairColor: number): THREE.Group {
    const npc = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.6 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.6 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.7 });

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 0.25), shirtMat);
    torso.position.y = 0.72;
    torso.castShadow = true;
    npc.add(torso);

    // Head & Hair
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.36), skinMat);
    head.position.y = 1.15;
    head.castShadow = true;
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.4), hairMat);
    hair.position.set(0, 1.3, 0);
    npc.add(head, hair);

    // Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), pantsMat);
    legL.position.set(-0.11, 0.225, 0);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), pantsMat);
    legR.position.set(0.11, 0.225, 0);
    npc.add(legL, legR);

    return npc;
  }

  // --- 11. AMBIENT PARTICLES (Fireflies / Sunset Dust Motes) ---
  private buildAmbientParticles() {
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = Math.random() * 8 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.15,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    this.scene.add(particles);

    this.animatedMeshes.push({
      update: (delta, elapsed) => {
        const pArray = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          pArray[i * 3 + 1] += Math.sin(elapsed * 2 + i) * delta * 0.4;
          pArray[i * 3 + 0] += Math.cos(elapsed + i) * delta * 0.2;
        }
        pGeo.attributes.position.needsUpdate = true;
      }
    });
  }

  // --- 12. ZONE SIGN & GLOWING EXPLORATION STAR ---
  private createZoneSign(
    zoneId: ZoneId,
    parent: THREE.Group,
    text: string,
    pos: [number, number, number],
    accentColor: number
  ) {
    const zoneCfg = ZONES_CONFIG.find((z) => z.id === zoneId);
    const textToDraw = (zoneCfg?.signText || text).trim();

    const signGroup = new THREE.Group();
    signGroup.name = `zone_sign_${zoneId}`;
    signGroup.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    signGroup.position.set(pos[0], pos[1], pos[2]);

    // High-Resolution Crisp Canvas for Sign Text (1024x280 retina quality)
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 280;
    const ctx = canvas.getContext('2d')!;

    // Rich Dark Mahogany Wood Plank Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0, '#381e0f');
    grad.addColorStop(0.5, '#221109');
    grad.addColorStop(1, '#150a04');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 280);

    // Subtle realistic wood grain streaks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let y = 35; y < 280; y += 38) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Outer Heavy Golden Border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 1004, 260);

    // Inner Radiant Gold Border
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 4;
    ctx.strokeRect(22, 22, 980, 236);

    // Brass Corner Rivets
    const drawRivet = (rx: number, ry: number) => {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(rx, ry, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    drawRivet(38, 38);
    drawRivet(986, 38);
    drawRivet(38, 242);
    drawRivet(986, 242);

    // High-Contrast Razor-Sharp Typography (Tự động scale font cho vừa vặn biển hiệu)
    const fontSize = textToDraw.length > 15 ? 68 : textToDraw.length > 10 ? 78 : 90;
    ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Thick solid black contour to separate text completely from background
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = textToDraw.length > 15 ? 12 : 16;
    ctx.lineJoin = 'round';
    ctx.strokeText(textToDraw, 512, 142);

    // Pure crisp white letter fill with high visibility
    ctx.fillStyle = '#ffffff';
    ctx.fillText(textToDraw, 512, 142);

    const signTex = new THREE.CanvasTexture(canvas);
    signTex.minFilter = THREE.LinearFilter;
    signTex.magFilter = THREE.LinearFilter;
    signTex.generateMipmaps = true;

    const isExp = zoneId === 'experience';
    const signW = isExp ? 3.4 : 3.1;
    const signH = isExp ? 1.02 : 0.9;

    // Generous invisible hit box for effortless clicking on desktop & mobile
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(signW + 1.2, signH + 1.4, 1.4),
      new THREE.MeshBasicMaterial({ visible: false, depthWrite: false })
    );
    hitBox.name = `sign_hitbox_${zoneId}`;
    hitBox.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    hitBox.position.set(0, 0.4, 0);
    signGroup.add(hitBox);

    // Wooden Frame Backboard
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.8,
      metalness: 0.1
    });
    const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(signW, signH, 0.12), frameMat);
    frameMesh.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    signGroup.add(frameMesh);

    // Golden Accent Rim
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.6,
      emissive: new THREE.Color(isExp ? 0xf59e0b : 0x000000),
      emissiveIntensity: isExp ? 0.4 : 0
    });
    const rimMesh = new THREE.Mesh(new THREE.BoxGeometry(signW + 0.08, signH + 0.08, 0.08), rimMat);
    rimMesh.position.z = -0.02;
    rimMesh.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    signGroup.add(rimMesh);

    // Front Sign Face: Using MeshBasicMaterial so text is NEVER washed out by scene lights or specular glare
    const faceMat = new THREE.MeshBasicMaterial({
      map: signTex,
      transparent: false
    });
    const signBoard = new THREE.Mesh(new THREE.PlaneGeometry(signW - 0.16, signH - 0.12), faceMat);
    signBoard.position.z = 0.065;
    signBoard.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    signGroup.add(signBoard);

    // If freestanding (e.g. Experience island), add wooden support posts
    if (zoneId === 'experience') {
      const postMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8, metalness: 0.2 });
      const postL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.4, 0.14), postMat);
      postL.position.set(-1.35, -1.2, -0.02);
      postL.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
      const postR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.4, 0.14), postMat);
      postR.position.set(1.35, -1.2, -0.02);
      postR.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
      signGroup.add(postL, postR);
    }

    // Glowing Star / Diamond above the sign indicating exploration state
    const starMat = new THREE.MeshStandardMaterial({
      color: isExp ? 0xfef08a : 0x94a3b8,
      emissive: isExp ? 0xf59e0b : 0x000000,
      emissiveIntensity: isExp ? 0.8 : 0,
      roughness: 0.2
    });
    const starMesh = new THREE.Mesh(new THREE.OctahedronGeometry(isExp ? 0.42 : 0.3, 0), starMat);
    starMesh.position.set(0, isExp ? 0.8 : 0.68, 0.02);
    starMesh.userData = { zoneId, isZoneSign: true, isZoneInteractive: true };
    signGroup.add(starMesh);

    // Subtle atmospheric ambient highlight (positioned slightly in front and above)
    const pointLight = new THREE.PointLight(isExp ? 0xfffbeb : accentColor, isExp ? 1.8 : 0, isExp ? 6.0 : 4.0);
    pointLight.position.set(0, 0.9, 0.9);
    signGroup.add(pointLight);

    parent.add(signGroup);

    this.zoneSigns.set(zoneId, {
      signMesh: signBoard,
      starMesh: starMesh,
      rimMesh: rimMesh,
      pointLight: pointLight
    });

    // Gentle star rotation
    this.animatedMeshes.push({
      update: (_delta, elapsed) => {
        starMesh.rotation.y = elapsed * 1.6;
      }
    });
  }

  /**
   * Updates visual glow when player enters a zone or zone is marked explored.
   */
  public setZoneHighlight(zoneId: ZoneId, isHighlighted: boolean, isExplored: boolean) {
    const entry = this.zoneSigns.get(zoneId);
    if (!entry) return;

    const rimMat = entry.rimMesh.material as THREE.MeshStandardMaterial;
    const starMat = entry.starMesh.material as THREE.MeshStandardMaterial;

    if (isHighlighted) {
      entry.pointLight.intensity = 1.2;
      rimMat.emissive = new THREE.Color(0xf59e0b);
      rimMat.emissiveIntensity = 0.8;
      starMat.emissive = new THREE.Color(0xfacc15);
      starMat.emissiveIntensity = 1.0;
      entry.starMesh.scale.setScalar(1.25);
    } else {
      entry.pointLight.intensity = isExplored ? 0.5 : 0;
      rimMat.emissive = new THREE.Color(0x000000);
      rimMat.emissiveIntensity = 0;
      starMat.emissive = isExplored ? new THREE.Color(0xf59e0b) : new THREE.Color(0x000000);
      starMat.emissiveIntensity = isExplored ? 0.8 : 0;
      entry.starMesh.scale.setScalar(1.0);
    }

    if (isExplored) {
      starMat.color.setHex(0xfacc15);
    }
  }

  // --- 13. VOXEL FIREWORKS CELEBRATION EFFECT (5/5 explored) ---
  public triggerFireworks() {
    if (this.fireworksActive) return;
    this.fireworksActive = true;

    const particleCount = 280;
    const geo = new THREE.BufferGeometry();
    this.fireworksPositions = new Float32Array(particleCount * 3);
    this.fireworksVelocities = new Float32Array(particleCount * 3);
    this.fireworksColors = new Float32Array(particleCount * 3);

    const colors = [
      [1.0, 0.8, 0.2], // gold
      [1.0, 0.2, 0.4], // pink
      [0.2, 0.8, 1.0], // cyan
      [0.2, 1.0, 0.4], // lime
      [0.8, 0.4, 1.0]  // purple
    ];

    // Burst origin (high in central sky)
    const burstOrigin = new THREE.Vector3(0, 14, -2);

    for (let i = 0; i < particleCount; i++) {
      this.fireworksPositions[i * 3 + 0] = burstOrigin.x;
      this.fireworksPositions[i * 3 + 1] = burstOrigin.y;
      this.fireworksPositions[i * 3 + 2] = burstOrigin.z;

      // Spherical explosion velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 4.0 + Math.random() * 7.0;

      this.fireworksVelocities[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * speed;
      this.fireworksVelocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      this.fireworksVelocities[i * 3 + 2] = Math.cos(phi) * speed;

      const c = colors[i % colors.length];
      this.fireworksColors[i * 3 + 0] = c[0];
      this.fireworksColors[i * 3 + 1] = c[1];
      this.fireworksColors[i * 3 + 2] = c[2];
    }

    geo.setAttribute('position', new THREE.BufferAttribute(this.fireworksPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.fireworksColors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    this.fireworksParticles = new THREE.Points(geo, mat);
    this.scene.add(this.fireworksParticles);

    // Animate fireworks burst
    let age = 0;
    const updateFireworks = (delta: number) => {
      if (!this.fireworksParticles || !this.fireworksPositions || !this.fireworksVelocities) return;
      age += delta;

      for (let i = 0; i < particleCount; i++) {
        this.fireworksPositions[i * 3 + 0] += this.fireworksVelocities[i * 3 + 0] * delta;
        this.fireworksPositions[i * 3 + 1] += this.fireworksVelocities[i * 3 + 1] * delta - 4.2 * delta * delta; // gravity
        this.fireworksPositions[i * 3 + 2] += this.fireworksVelocities[i * 3 + 2] * delta;

        // drag
        this.fireworksVelocities[i * 3 + 0] *= 0.96;
        this.fireworksVelocities[i * 3 + 1] *= 0.96;
        this.fireworksVelocities[i * 3 + 2] *= 0.96;
      }
      this.fireworksParticles.geometry.attributes.position.needsUpdate = true;

      // Fade out
      (this.fireworksParticles.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - age / 3.5);

      if (age > 3.8) {
        this.scene.remove(this.fireworksParticles);
        this.fireworksParticles = null;
        this.fireworksActive = false;
      }
    };

    this.animatedMeshes.push({ update: updateFireworks });
  }

  // --- 13. WANDERING CO-PLAYERS (MULTI-PLAYER ILLUSION) ---
  private createPlayerNameTag(name: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = 'bold 22px system-ui, -apple-system, sans-serif';

    // Measure text width to fit the pill exactly
    let textWidth = 60;
    if (ctx) {
      ctx.font = font;
      textWidth = ctx.measureText(name).width;
    }

    const padLeft = 14; // padding before dot
    const dotRadius = 5;
    const dotToTextGap = 10;
    const padRight = 16; // padding after text
    const pillHeight = 44;
    const pillRadius = 12;

    const pillWidth = Math.ceil(padLeft + dotRadius * 2 + dotToTextGap + textWidth + padRight);
    const canvasWidth = pillWidth + 8; // small margin for crisp border stroke
    const canvasHeight = pillHeight + 8;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const pillX = 4;
      const pillY = 4;

      // Capsule pill background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillRadius);
      } else {
        ctx.fillRect(pillX, pillY, pillWidth, pillHeight);
      }
      ctx.fill();

      // Subtle bright border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Green Online Status Indicator Dot
      const dotCenterX = pillX + padLeft + dotRadius;
      const dotCenterY = pillY + pillHeight / 2;
      ctx.beginPath();
      ctx.arc(dotCenterX, dotCenterY, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      // Text rendered crisp
      ctx.fillStyle = '#ffffff';
      ctx.font = font;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const textX = dotCenterX + dotRadius + dotToTextGap;
      ctx.fillText(name, textX, dotCenterY);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    // Maintain proportional aspect ratio in 3D world
    const worldHeight = 0.28;
    const worldWidth = (canvasWidth / canvasHeight) * worldHeight;
    sprite.scale.set(worldWidth, worldHeight, 1.0);
    sprite.position.y = 1.72;
    return sprite;
  }

  private buildAnimatedPlayer(
    name: string,
    shirtColor: number,
    pantsColor: number,
    hairColor: number,
    isFemale: boolean = false
  ): {
    group: THREE.Group;
    legPivotL: THREE.Group;
    legPivotR: THREE.Group;
    armPivotL: THREE.Group;
    armPivotR: THREE.Group;
    head: THREE.Group;
    torso: THREE.Mesh;
  } {
    const group = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.6 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.6 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.7 });

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.55, 0.26), shirtMat);
    torso.position.y = 0.72;
    torso.castShadow = true;
    group.add(torso);

    // Head Group (for looking around when idle)
    const head = new THREE.Group();
    head.position.set(0, 1.15, 0);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.36), skinMat);
    headMesh.castShadow = true;
    head.add(headMesh);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    eyeL.position.set(-0.09, 0.02, 0.185);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    eyeR.position.set(0.09, 0.02, 0.185);
    head.add(eyeL, eyeR);

    // Hair Top
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.4), hairMat);
    hair.position.set(0, 0.15, 0);
    head.add(hair);

    // Female Hair Features (Long hair / twin hair strands / cute ribbon)
    if (isFemale) {
      // Long hair back
      const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.1), hairMat);
      hairBack.position.set(0, -0.08, -0.16);
      // Side locks framing face
      const hairLockL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.1), hairMat);
      hairLockL.position.set(-0.19, -0.05, 0.06);
      const hairLockR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.1), hairMat);
      hairLockR.position.set(0.19, -0.05, 0.06);
      // Cute Ribbon/Bow
      const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 });
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.08), ribbonMat);
      ribbon.position.set(0.14, 0.18, 0.14);
      head.add(hairBack, hairLockL, hairLockR, ribbon);
    }
    group.add(head);

    // Left Leg with Hip Pivot
    const legPivotL = new THREE.Group();
    legPivotL.position.set(-0.12, 0.45, 0);
    const legMeshL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), pantsMat);
    legMeshL.position.set(0, -0.225, 0);
    legMeshL.castShadow = true;
    legPivotL.add(legMeshL);
    group.add(legPivotL);

    // Right Leg with Hip Pivot
    const legPivotR = new THREE.Group();
    legPivotR.position.set(0.12, 0.45, 0);
    const legMeshR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), pantsMat);
    legMeshR.position.set(0, -0.225, 0);
    legMeshR.castShadow = true;
    legPivotR.add(legMeshR);
    group.add(legPivotR);

    // Left Arm with Shoulder Pivot
    const armPivotL = new THREE.Group();
    armPivotL.position.set(-0.3, 0.9, 0);
    const armMeshL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.14), shirtMat);
    armMeshL.position.set(0, -0.2, 0);
    armMeshL.castShadow = true;
    armPivotL.add(armMeshL);
    group.add(armPivotL);

    // Right Arm with Shoulder Pivot
    const armPivotR = new THREE.Group();
    armPivotR.position.set(0.3, 0.9, 0);
    const armMeshR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.14), shirtMat);
    armMeshR.position.set(0, -0.2, 0);
    armMeshR.castShadow = true;
    armPivotR.add(armMeshR);
    group.add(armPivotR);

    // Name Tag
    const nameTag = this.createPlayerNameTag(name);
    group.add(nameTag);

    return { group, legPivotL, legPivotR, armPivotL, armPivotR, head, torso };
  }

  private initRoamingPlayers() {
    // 1. Hiệp (Con trai - Áo thun xanh dương, quần xám đậm, tóc nâu nam tính - Di chuyển hướng Tây sang Nhà Liên Hệ)
    const hiepModel = this.buildAnimatedPlayer('Hiệp', 0x0284c7, 0x1e293b, 0x451a03, false);
    const hiepWaypoints: Waypoint[] = [
      { x: -2.0, y: 4.35, z: -1.0, waitTime: 2.0 },
      { x: -3.8, y: 4.35, z: -1.1 },
      { x: -5.8, y: 4.15, z: -1.1 },
      { x: -7.8, y: 4.15, z: -1.1 },
      { x: -7.8, y: 4.15, z: -2.8 },
      { x: -7.8, y: 4.15, z: -3.8 },
      { x: -9.5, y: 4.25, z: -5.2, waitTime: 1.5 },
      { x: -10.8, y: 4.25, z: -6.5, waitTime: 3.5 }
    ];
    // Start on West Bridge walking towards Contact Cabin
    hiepModel.group.position.set(-5.8, 4.15, -1.1);
    this.scene.add(hiepModel.group);
    this.roamingPlayers.push({
      name: 'Hiệp',
      ...hiepModel,
      waypoints: hiepWaypoints,
      currentWpIndex: 2,
      targetWpIndex: 3,
      isReversing: false,
      speed: 1.35,
      waitTimer: 0,
      walkCycle: 0,
      idleCycle: 0
    });

    // 2. Nhật (Con trai - Áo polo xanh mint, quần sẫm, tóc đen sành điệu - Di chuyển hướng Đông sang Thư Viện Khám Phá)
    const nhatModel = this.buildAnimatedPlayer('Nhật', 0x10b981, 0x334155, 0x171717, false);
    const nhatWaypoints: Waypoint[] = [
      { x: 0.5, y: 4.35, z: -1.0, waitTime: 2.0 },
      { x: 2.1, y: 4.35, z: -1.1 },
      { x: 4.5, y: 4.15, z: -1.1 },
      { x: 6.7, y: 4.15, z: -1.1 },
      { x: 6.7, y: 4.15, z: -2.5 },
      { x: 6.7, y: 4.35, z: -3.8 },
      { x: 7.8, y: 4.38, z: -4.8, waitTime: 1.5 },
      { x: 8.5, y: 4.45, z: -6.0, waitTime: 3.5 }
    ];
    // Start on East Bridge walking towards Explore Library
    nhatModel.group.position.set(4.5, 4.15, -1.1);
    this.scene.add(nhatModel.group);
    this.roamingPlayers.push({
      name: 'Nhật',
      ...nhatModel,
      waypoints: nhatWaypoints,
      currentWpIndex: 2,
      targetWpIndex: 3,
      isReversing: false,
      speed: 1.3,
      waitTimer: 0,
      walkCycle: 1.5,
      idleCycle: 0
    });

    // 3. Huwzy (Con gái - Tóc nâu dài bồng bềnh cài nơ hồng, áo hoodie hồng pastel, quần/váy trắng - Di chuyển xuống Cầu Thang Đá sang Đảo Dự Án)
    const huwzyModel = this.buildAnimatedPlayer('Huwzy', 0xf472b6, 0xffffff, 0x652b19, true);
    const huwzyWaypoints: Waypoint[] = [
      { x: -0.5, y: 4.35, z: -0.2, waitTime: 2.0 },
      { x: 0.0, y: 4.35, z: 1.1 },
      { x: 0.0, y: 3.1, z: 2.4 },
      { x: 0.0, y: 1.8, z: 3.8 },
      { x: 0.0, y: 0.35, z: 5.2, waitTime: 1.2 },
      { x: 2.5, y: 0.35, z: 6.8 },
      { x: 5.2, y: 0.35, z: 7.0, waitTime: 3.5 },
      { x: 0.0, y: 0.35, z: 6.8 },
      { x: -3.0, y: 0.35, z: 6.8 },
      { x: -5.2, y: 0.35, z: 7.0, waitTime: 3.5 },
      { x: 0.0, y: 0.35, z: 5.2, waitTime: 1.0 }
    ];
    // Start descending the Grand Stone Staircase
    huwzyModel.group.position.set(0.0, 2.5, 3.1);
    this.scene.add(huwzyModel.group);
    this.roamingPlayers.push({
      name: 'Huwzy',
      ...huwzyModel,
      waypoints: huwzyWaypoints,
      currentWpIndex: 2,
      targetWpIndex: 3,
      isReversing: false,
      speed: 1.25,
      waitTimer: 0,
      walkCycle: 2.8,
      idleCycle: 0
    });
  }

  private updateRoamingPlayers(delta: number) {
    for (const player of this.roamingPlayers) {
      if (player.waitTimer > 0) {
        player.waitTimer -= delta;
        player.idleCycle += delta * 2.2;
        // Idle animation: smoothly bring limbs back to neutral
        player.legPivotL.rotation.x *= 0.88;
        player.legPivotR.rotation.x *= 0.88;
        player.armPivotL.rotation.x *= 0.88;
        player.armPivotR.rotation.x *= 0.88;
        player.torso.position.y = 0.72 + Math.sin(player.idleCycle) * 0.015;
        player.head.rotation.y = Math.sin(player.idleCycle * 0.8) * 0.35;
        continue;
      }

      // Movement along waypoints
      const targetWp = player.waypoints[player.targetWpIndex];
      const pos = player.group.position;
      const dx = targetWp.x - pos.x;
      const dz = targetWp.z - pos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 0.18) {
        // Reached waypoint!
        pos.x = targetWp.x;
        pos.z = targetWp.z;
        pos.y = targetWp.y;

        if (targetWp.waitTime && targetWp.waitTime > 0) {
          player.waitTimer = targetWp.waitTime;
        }

        player.currentWpIndex = player.targetWpIndex;
        if (!player.isReversing) {
          if (player.targetWpIndex < player.waypoints.length - 1) {
            player.targetWpIndex++;
          } else {
            player.isReversing = true;
            player.targetWpIndex = player.waypoints.length - 2;
          }
        } else {
          if (player.targetWpIndex > 0) {
            player.targetWpIndex--;
          } else {
            player.isReversing = false;
            player.targetWpIndex = 1;
          }
        }
      } else {
        // Step forward
        const step = Math.min(player.speed * delta, dist);
        pos.x += (dx / dist) * step;
        pos.z += (dz / dist) * step;
        // Smoothly interpolate Y elevation
        pos.y += (targetWp.y - pos.y) * Math.min(1, delta * 6);

        // Smooth rotation towards travel direction
        const targetAngle = Math.atan2(dx, dz);
        let diff = (targetAngle - player.group.rotation.y) % (Math.PI * 2);
        if (diff < -Math.PI) diff += Math.PI * 2;
        if (diff > Math.PI) diff -= Math.PI * 2;
        player.group.rotation.y += diff * Math.min(1, delta * 8);

        // Walk cycle animation
        player.walkCycle += delta * (player.speed * 5.0);
        player.legPivotL.rotation.x = Math.sin(player.walkCycle) * 0.6;
        player.legPivotR.rotation.x = -Math.sin(player.walkCycle) * 0.6;
        player.armPivotL.rotation.x = -Math.sin(player.walkCycle) * 0.45;
        player.armPivotR.rotation.x = Math.sin(player.walkCycle) * 0.45;
        player.torso.position.y = 0.72 + Math.abs(Math.sin(player.walkCycle * 2)) * 0.04;
        player.head.rotation.y = 0;
      }
    }
  }

  public update(delta: number, elapsed: number) {
    for (const item of this.animatedMeshes) {
      item.update(delta, elapsed);
    }
    this.updateRoamingPlayers(delta);
  }
}
