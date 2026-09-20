/**
 * Collision & Walkable Terrain System for the Voxel Portfolio World.
 * Ensures the player and dog smoothly walk along stairs, bridges, and platforms,
 * and cannot fall off cliff edges or walk through solid structures.
 */

export interface ColliderBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  height: number;
  baseY: number;
  type: 'solid' | 'stairs' | 'bridge' | 'ground';
}

export class CollisionSystem {
  // Ground polygons / regions with height mapping
  private walkableZones: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    getY: (x: number, z: number) => number;
    surface: 'grass' | 'stone' | 'wood';
  }[] = [];

  // Solid obstacle colliders (walls, building interiors not meant to be walked through, rocks)
  private solidObstacles: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  }[] = [];

  constructor() {
    this.initWalkableZones();
    this.initSolidObstacles();
  }

  private initWalkableZones() {
    // 1. Central Entrance & Main Plaza (y ~ 0.25)
    this.walkableZones.push({
      minX: -4.5,
      maxX: 4.5,
      minZ: 4.5,
      maxZ: 10.5,
      getY: () => 0.25,
      surface: 'stone'
    });

    // 2. Left path to ABOUT ME Gazebo
    this.walkableZones.push({
      minX: -12.5,
      maxX: -4.0,
      minZ: 4.5,
      maxZ: 8.5,
      getY: () => 0.25,
      surface: 'wood'
    });

    // 2b. ABOUT ME Gazebo interior floor
    this.walkableZones.push({
      minX: -12.0,
      maxX: -7.5,
      minZ: 5.0,
      maxZ: 8.5,
      getY: () => 0.35,
      surface: 'wood'
    });

    // 3. Right path to MY WORK Studio
    this.walkableZones.push({
      minX: 4.0,
      maxX: 11.5,
      minZ: 4.5,
      maxZ: 8.5,
      getY: () => 0.25,
      surface: 'stone'
    });

    // 3b. MY WORK Studio interior floor
    this.walkableZones.push({
      minX: 7.0,
      maxX: 11.0,
      minZ: 5.0,
      maxZ: 8.5,
      getY: () => 0.35,
      surface: 'wood'
    });

    // 4. Central Grand Stairs leading up from z: 4.8 (y=0.25) to z: 1.1 (y=4.20)
    // Connects seamlessly from lower main plaza up to Experience Island
    this.walkableZones.push({
      minX: -2.2,
      maxX: 2.8,
      minZ: 1.05,
      maxZ: 4.85,
      getY: (_x, z) => {
        // Continuous linear slope up the staircase
        const t = Math.max(0, Math.min(1, (4.8 - z) / 3.7));
        return 0.25 + t * 3.95; // 0.25 at z=4.8, exactly 4.20 at z=1.1
      },
      surface: 'stone'
    });

    // 5. EXPERIENCE Floating Island Top Surface (y = 4.2)
    // Exact dimensions matching topGrass (6.2 width, 5.2 depth, center at x: -1, z: -1.5)
    this.walkableZones.push({
      minX: -4.3,
      maxX: 2.3,
      minZ: -4.3,
      maxZ: 1.15,
      getY: () => 4.2,
      surface: 'grass'
    });

    // 6. Wooden Suspension Bridge from Experience Island to EXPLORE Zone (East Bridge - Exact Red Sketch Position)
    // Horizontal segment: x from 2.0 to 7.8, z ~ -1.1
    this.walkableZones.push({
      minX: 2.0,
      maxX: 7.8,
      minZ: -1.9,
      maxZ: -0.3,
      getY: () => 4.15,
      surface: 'wood'
    });

    // Vertical segment: x ~ 6.7 (range 5.7 to 7.8), z from -3.8 to -0.9 leading seamlessly into Explore platform
    this.walkableZones.push({
      minX: 5.7,
      maxX: 7.8,
      minZ: -3.8,
      maxZ: -0.9,
      getY: () => 4.15,
      surface: 'wood'
    });

    // 6b. Wooden Suspension Rope Bridge from Experience Island to Contact Cabin (West Bridge)
    // Horizontal segment: x from -8.0 to -4.0, z ~ -1.1 (cục bộ z = 0.4)
    this.walkableZones.push({
      minX: -8.0,
      maxX: -4.0,
      minZ: -1.9,
      maxZ: -0.3,
      getY: () => 4.15,
      surface: 'wood'
    });

    // Vertical segment: x ~ -7.8, z from -4.0 to -0.9 leading seamlessly into Contact front yard
    this.walkableZones.push({
      minX: -8.7,
      maxX: -6.9,
      minZ: -4.0,
      maxZ: -0.9,
      getY: () => 4.15,
      surface: 'wood'
    });

    // 7. Upper Landing Plaza (y ~ 4.25 to 4.4)
    this.walkableZones.push({
      minX: -2.8,
      maxX: 5.2,
      minZ: -5.0,
      maxZ: -1.6,
      getY: () => 4.25,
      surface: 'stone'
    });

    // 8. Path & stairs to EXPLORE Library (y ~ 4.25 to 4.45)
    this.walkableZones.push({
      minX: 5.0,
      maxX: 12.0,
      minZ: -7.5,
      maxZ: -2.5,
      getY: (_x, z) => {
        if (z < -4.5) return 4.45;
        return 4.25;
      },
      surface: 'stone'
    });

    // 9. Upper cliff trail leading to CONTACT cabin
    this.walkableZones.push({
      minX: -13.0,
      maxX: -3.2,
      minZ: -8.0,
      maxZ: -3.5,
      getY: (_x, _z) => 4.2,
      surface: 'wood'
    });

    // 10. Front grass verge (safe buffer around entrance)
    this.walkableZones.push({
      minX: -6.0,
      maxX: 6.0,
      minZ: 7.5,
      maxZ: 10.8,
      getY: () => 0.25,
      surface: 'grass'
    });
  }

  private initSolidObstacles() {
    // Bookshelves / Back wall of EXPERIENCE library
    this.solidObstacles.push({ minX: 7.0, maxX: 12.5, minZ: -10.0, maxZ: -7.6 });
    // Back cliff of CONTACT cabin
    this.solidObstacles.push({ minX: -13.5, maxX: -8.0, minZ: -10.5, maxZ: -8.0 });
    // Work studio desk & robot collision
    this.solidObstacles.push({ minX: 8.5, maxX: 10.5, minZ: 6.2, maxZ: 7.8 });
    // Gazebo book pedestal collision
    this.solidObstacles.push({ minX: -10.5, maxX: -9.0, minZ: 6.0, maxZ: 7.2 });
    // MY CX bulletin board
    this.solidObstacles.push({ minX: -1.8, maxX: 0.8, minZ: -2.5, maxZ: -1.8 });
  }

  /**
   * Check if position is walkable and calculate height + surface type.
   */
  getWalkableHeight(x: number, z: number, currentY: number = 0): { y: number; walkable: boolean; surface: 'grass' | 'stone' | 'wood' } {
    // 1. Check solid obstacles first
    for (const obs of this.solidObstacles) {
      if (x >= obs.minX && x <= obs.maxX && z >= obs.minZ && z <= obs.maxZ) {
        return { y: currentY, walkable: false, surface: 'stone' };
      }
    }

    // 2. Find matching walkable zone closest to currentY
    let bestZone: (typeof this.walkableZones)[0] | null = null;
    let closestDist = Infinity;

    for (const zone of this.walkableZones) {
      if (x >= zone.minX && x <= zone.maxX && z >= zone.minZ && z <= zone.maxZ) {
        const targetY = zone.getY(x, z);
        const dist = Math.abs(targetY - currentY);
        if (dist < closestDist) {
          closestDist = dist;
          bestZone = zone;
        }
      }
    }

    if (bestZone) {
      return {
        y: bestZone.getY(x, z),
        walkable: true,
        surface: bestZone.surface
      };
    }

    // Out of bounds / void edge
    return {
      y: currentY,
      walkable: false,
      surface: 'stone'
    };
  }

  /**
   * Clamps desired movement so character doesn't penetrate walls or step off cliff edges.
   */
  clampMovement(
    currentPos: { x: number; y: number; z: number },
    targetPos: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number; surface: 'grass' | 'stone' | 'wood'; onGround: boolean } {
    // Test direct position
    const directCheck = this.getWalkableHeight(targetPos.x, targetPos.z, currentPos.y);
    if (directCheck.walkable) {
      return {
        x: targetPos.x,
        y: directCheck.y,
        z: targetPos.z,
        surface: directCheck.surface,
        onGround: true
      };
    }

    // Try sliding along X
    const checkX = this.getWalkableHeight(targetPos.x, currentPos.z, currentPos.y);
    if (checkX.walkable) {
      return {
        x: targetPos.x,
        y: checkX.y,
        z: currentPos.z,
        surface: checkX.surface,
        onGround: true
      };
    }

    // Try sliding along Z
    const checkZ = this.getWalkableHeight(currentPos.x, targetPos.z, currentPos.y);
    if (checkZ.walkable) {
      return {
        x: currentPos.x,
        y: checkZ.y,
        z: targetPos.z,
        surface: checkZ.surface,
        onGround: true
      };
    }

    // Blocked
    return {
      x: currentPos.x,
      y: currentPos.y,
      z: currentPos.z,
      surface: 'stone',
      onGround: true
    };
  }
}
