/**
 * Color utilities for astronomical rendering
 * Converts B-V color index to RGB colors for realistic star rendering
 */

/**
 * Convert B-V color index to RGB hex color
 * B-V is the difference in magnitude between blue and visual (yellow-green) filters
 *
 * B-V range:
 * - Negative values (e.g., -0.33): Hot blue stars (O, B type) - >10,000K
 * - 0.0: White stars (A type, like Vega) - ~10,000K
 * - 0.6: Yellow stars (G type, like Sun) - ~5,800K
 * - 1.5+: Red stars (K, M type) - <4,000K
 *
 * Based on temperature conversion using Ballesteros formula:
 * T = 4600K × (1/(0.92(B-V)+1.7) + 1/(0.92(B-V)+0.62))
 */
export function bvToRGB(bv: number | undefined): string {
  // Default to white if B-V is not provided
  if (bv === undefined || isNaN(bv)) {
    return '#FFFFFF';
  }

  // Clamp B-V to reasonable range
  const clampedBV = Math.max(-0.4, Math.min(2.0, bv));

  // Use lookup table for accurate color mapping
  // Based on http://www.vendian.org/mncharity/dir3/starcolor/
  const colorTable: { [key: string]: { r: number; g: number; b: number } } = {
    '-0.40': { r: 155, g: 176, b: 255 }, // O5
    '-0.35': { r: 170, g: 191, b: 255 }, // O8
    '-0.30': { r: 185, g: 201, b: 255 }, // B0
    '-0.25': { r: 195, g: 209, b: 255 }, // B3
    '-0.20': { r: 202, g: 216, b: 255 }, // B5
    '-0.15': { r: 213, g: 222, b: 255 }, // B7
    '-0.10': { r: 222, g: 229, b: 255 }, // B9
    '-0.05': { r: 232, g: 236, b: 255 }, // A0
    '0.00': { r: 244, g: 247, b: 255 },  // A2
    '0.05': { r: 249, g: 252, b: 255 },  // A3
    '0.10': { r: 255, g: 255, b: 255 },  // A5
    '0.15': { r: 255, g: 255, b: 249 },  // A7
    '0.20': { r: 255, g: 255, b: 245 },  // F0
    '0.25': { r: 255, g: 255, b: 241 },  // F2
    '0.30': { r: 255, g: 254, b: 237 },  // F5
    '0.35': { r: 255, g: 252, b: 233 },  // F7
    '0.40': { r: 255, g: 250, b: 229 },  // F8
    '0.45': { r: 255, g: 248, b: 221 },  // G0
    '0.50': { r: 255, g: 246, b: 213 },  // G2
    '0.55': { r: 255, g: 244, b: 205 },  // G5
    '0.60': { r: 255, g: 241, b: 195 },  // G8 (Sun)
    '0.65': { r: 255, g: 238, b: 185 },  // K0
    '0.70': { r: 255, g: 235, b: 175 },  // K1
    '0.75': { r: 255, g: 231, b: 165 },  // K2
    '0.80': { r: 255, g: 227, b: 153 },  // K3
    '0.85': { r: 255, g: 223, b: 142 },  // K4
    '0.90': { r: 255, g: 218, b: 130 },  // K5
    '0.95': { r: 255, g: 213, b: 118 },  // K7
    '1.00': { r: 255, g: 207, b: 106 },  // M0
    '1.10': { r: 255, g: 195, b: 82 },   // M1
    '1.20': { r: 255, g: 183, b: 60 },   // M2
    '1.30': { r: 255, g: 171, b: 40 },   // M3
    '1.40': { r: 255, g: 158, b: 20 },   // M4
    '1.50': { r: 255, g: 145, b: 0 },    // M5
    '1.60': { r: 255, g: 130, b: 0 },    // M6
    '1.70': { r: 255, g: 115, b: 0 },    // M7
    '1.80': { r: 255, g: 100, b: 0 },    // M8
    '1.90': { r: 255, g: 85, b: 0 },     // M9
    '2.00': { r: 255, g: 70, b: 0 },     // M10
  };

  // Find the two closest B-V values in our table for interpolation
  const keys = Object.keys(colorTable)
    .map(parseFloat)
    .sort((a, b) => a - b);

  let lowerKey = keys[0];
  let upperKey = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (clampedBV >= keys[i] && clampedBV <= keys[i + 1]) {
      lowerKey = keys[i];
      upperKey = keys[i + 1];
      break;
    }
  }

  const lowerColor = colorTable[lowerKey.toFixed(2)];
  const upperColor = colorTable[upperKey.toFixed(2)];

  // If exact match or at extremes, return the color directly
  if (lowerKey === upperKey || lowerColor === undefined || upperColor === undefined) {
    const color = lowerColor || upperColor || { r: 255, g: 255, b: 255 };
    return rgbToHex(color.r, color.g, color.b);
  }

  // Interpolate between the two colors
  const t = (clampedBV - lowerKey) / (upperKey - lowerKey);
  const r = Math.round(lowerColor.r + t * (upperColor.r - lowerColor.r));
  const g = Math.round(lowerColor.g + t * (upperColor.g - lowerColor.g));
  const b = Math.round(lowerColor.b + t * (upperColor.b - lowerColor.b));

  return rgbToHex(r, g, b);
}

/**
 * Convert RGB values to hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculate star rendering radius based on apparent magnitude
 * Brighter stars (lower magnitude) = larger radius
 *
 * @param magnitude - Apparent visual magnitude
 * @param baseRadius - Base radius in pixels for mag 6 stars
 * @param maxMagnitude - Faintest magnitude to show (e.g., 6.5)
 * @returns Radius in pixels
 */
export function magnitudeToRadius(magnitude: number, baseRadius: number = 2, maxMagnitude: number = 6.5): number {
  // Stars are 2.512^x times brighter for each magnitude decrease
  // Scale radius based on magnitude difference
  // Use a power law to make bright stars significantly larger
  const magnitudeRange = maxMagnitude - magnitude;
  const scaleFactor = Math.pow(2.0, magnitudeRange / 2.0);

  return Math.max(1, baseRadius * scaleFactor);
}

/**
 * Calculate star opacity based on magnitude
 * Fainter stars = lower opacity
 */
export function magnitudeToOpacity(magnitude: number, minMagnitude: number = -2, maxMagnitude: number = 6.5): number {
  const range = maxMagnitude - minMagnitude;
  const position = (magnitude - minMagnitude) / range;

  // Ensure opacity stays between 0.3 and 1.0
  return Math.max(0.3, Math.min(1.0, 1.0 - position * 0.7));
}
