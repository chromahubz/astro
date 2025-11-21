/**
 * Spatial Audio - House-based panning
 * Maps 12 astrological houses to stereo field
 */

/**
 * Calculate stereo panning based on house position
 * Houses are arranged like a clock:
 * - House 1 (ASC): Far right (east)
 * - House 4 (IC): Center bottom
 * - House 7 (DSC): Far left (west)
 * - House 10 (MC): Center top
 *
 * @param houseNumber - House number (1-12)
 * @returns Pan value from -1 (left) to 1 (right)
 */
export function calculateHousePanning(houseNumber: number): number {
  // Validate input
  if (houseNumber < 1 || houseNumber > 12) {
    return 0; // Center for invalid input
  }

  // Map houses to clock positions (0° = 3 o'clock = House 1)
  // Houses go counter-clockwise in astrology
  const houseToDegrees: Record<number, number> = {
    1: 0,      // East (3 o'clock) - Right
    2: 30,     // ENE
    3: 60,     // NE
    4: 90,     // North (12 o'clock) - Center
    5: 120,    // NW
    6: 150,    // WNW
    7: 180,    // West (9 o'clock) - Left
    8: 210,    // WSW
    9: 240,    // SW
    10: 270,   // South (6 o'clock) - Center
    11: 300,   // SE
    12: 330    // ESE
  };

  const degrees = houseToDegrees[houseNumber];

  // Convert to pan value using cosine (right = +1, left = -1)
  // 0° (House 1) = cos(0) = 1 (far right)
  // 90° (House 4) = cos(90) = 0 (center)
  // 180° (House 7) = cos(180) = -1 (far left)
  // 270° (House 10) = cos(270) = 0 (center)
  const radians = (degrees * Math.PI) / 180;
  const pan = Math.cos(radians);

  // Round to 2 decimal places
  return Math.round(pan * 100) / 100;
}

/**
 * Get house panning description
 *
 * @param houseNumber - House number (1-12)
 * @returns Human-readable description of panning
 */
export function getHousePanningDescription(houseNumber: number): string {
  const pan = calculateHousePanning(houseNumber);

  if (pan > 0.7) return 'Far Right';
  if (pan > 0.3) return 'Right';
  if (pan > -0.3) return 'Center';
  if (pan > -0.7) return 'Left';
  return 'Far Left';
}

/**
 * Get angular house modifier (louder volume for angular houses)
 * Angular houses (1, 4, 7, 10) are most prominent
 *
 * @param houseNumber - House number (1-12)
 * @returns Volume multiplier (1.0-1.3)
 */
export function getAngularHouseModifier(houseNumber: number): number {
  const angularHouses = [1, 4, 7, 10];

  if (angularHouses.includes(houseNumber)) {
    return 1.3; // 30% louder
  }

  const succedentHouses = [2, 5, 8, 11];
  if (succedentHouses.includes(houseNumber)) {
    return 1.15; // 15% louder
  }

  // Cadent houses (3, 6, 9, 12)
  return 1.0; // Normal volume
}

/**
 * Calculate 3D-style positioning (experimental)
 * Maps houses to x, y coordinates for visualization
 *
 * @param houseNumber - House number (1-12)
 * @returns {x, y} coordinates (-1 to 1)
 */
export function getHousePosition(houseNumber: number): { x: number; y: number } {
  if (houseNumber < 1 || houseNumber > 12) {
    return { x: 0, y: 0 };
  }

  const houseToDegrees: Record<number, number> = {
    1: 0, 2: 30, 3: 60, 4: 90, 5: 120, 6: 150,
    7: 180, 8: 210, 9: 240, 10: 270, 11: 300, 12: 330
  };

  const degrees = houseToDegrees[houseNumber];
  const radians = (degrees * Math.PI) / 180;

  return {
    x: Math.cos(radians),  // Left (-1) to Right (+1)
    y: Math.sin(radians)   // Bottom (-1) to Top (+1)
  };
}

/**
 * Map all houses to panning values
 *
 * @returns Array of pan values for houses 1-12
 */
export function getAllHousePannings(): number[] {
  return Array.from({ length: 12 }, (_, i) => calculateHousePanning(i + 1));
}
