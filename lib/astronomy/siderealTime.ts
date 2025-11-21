import { julianCenturiesSinceJ2000, daysSinceJ2000 } from './julianDate';

/**
 * Sidereal Time calculations
 * Sidereal time is used to determine which stars are currently above the horizon
 * for a given location on Earth
 */

/**
 * Calculate Greenwich Mean Sidereal Time (GMST) in degrees
 * Based on formula from Jean Meeus's "Astronomical Algorithms"
 *
 * θ₀ = 280.46061837 + 360.98564736629(JD - 2451545.0) + 0.000387933T² - T³/38710000
 * where T is the number of Julian centuries since J2000.0
 */
export function calculateGMST(julianDate: number): number {
  const T = julianCenturiesSinceJ2000(julianDate);
  const D = daysSinceJ2000(julianDate);

  // Calculate GMST in degrees
  let gmst = 280.46061837 + 360.98564736629 * D + 0.000387933 * T * T - (T * T * T) / 38710000.0;

  // Normalize to 0-360 degrees
  gmst = normalizeAngle(gmst);

  return gmst;
}

/**
 * Calculate Local Mean Sidereal Time (LMST) in degrees
 * LMST = GMST + observer's longitude
 */
export function calculateLMST(julianDate: number, longitudeDegrees: number): number {
  const gmst = calculateGMST(julianDate);
  const lmst = gmst + longitudeDegrees;

  return normalizeAngle(lmst);
}

/**
 * Calculate Greenwich Mean Sidereal Time in hours (0-24)
 */
export function calculateGMSTHours(julianDate: number): number {
  return calculateGMST(julianDate) / 15.0; // 15 degrees per hour
}

/**
 * Calculate Local Mean Sidereal Time in hours (0-24)
 */
export function calculateLMSTHours(julianDate: number, longitudeDegrees: number): number {
  return calculateLMST(julianDate, longitudeDegrees) / 15.0;
}

/**
 * Calculate Local Hour Angle (LHA) for a celestial object
 * LHA = LST - RA
 * where RA is Right Ascension in degrees
 */
export function calculateLocalHourAngle(
  julianDate: number,
  longitudeDegrees: number,
  rightAscensionDegrees: number
): number {
  const lmst = calculateLMST(julianDate, longitudeDegrees);
  const lha = lmst - rightAscensionDegrees;

  return normalizeAngle(lha);
}

/**
 * Normalize angle to 0-360 degrees
 */
export function normalizeAngle(degrees: number): number {
  let normalized = degrees % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Convert degrees to hours (for RA/time conversions)
 */
export function degreesToHours(degrees: number): number {
  return degrees / 15.0;
}

/**
 * Convert hours to degrees (for RA/time conversions)
 */
export function hoursToDegrees(hours: number): number {
  return hours * 15.0;
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180.0);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180.0 / Math.PI);
}
