import { EquatorialCoordinate } from '@/types/astronomy';

/**
 * Ecliptic coordinate system for astrology calculations
 * The ecliptic is the plane of Earth's orbit around the Sun,
 * and the zodiac is measured along this plane.
 */

export interface EclipticCoordinate {
  longitude: number; // 0-360 degrees (0° = 0° Aries, vernal equinox)
  latitude: number;  // -90 to +90 degrees (distance from ecliptic plane)
}

/**
 * Calculate the obliquity of the ecliptic (tilt of Earth's axis)
 * for a given Julian date
 *
 * @param julianDate - Julian date
 * @returns Obliquity in degrees
 */
export function calculateObliquity(julianDate: number): number {
  // Julian centuries from J2000.0
  const T = (julianDate - 2451545.0) / 36525.0;

  // IAU formula for mean obliquity (accurate to 0.01" over 10,000 years)
  const epsilon0 = 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;

  return epsilon0;
}

/**
 * Convert equatorial coordinates (RA/Dec) to ecliptic coordinates (longitude/latitude)
 *
 * @param equatorial - Right Ascension (hours) and Declination (degrees)
 * @param julianDate - Julian date for obliquity calculation
 * @returns Ecliptic longitude and latitude in degrees
 */
export function equatorialToEcliptic(
  equatorial: EquatorialCoordinate,
  julianDate: number
): EclipticCoordinate {
  // Convert RA from hours to degrees
  const ra = equatorial.rightAscension * 15; // 1 hour = 15 degrees
  const dec = equatorial.declination;

  // Get obliquity for this date
  const epsilon = calculateObliquity(julianDate) * (Math.PI / 180);

  // Convert to radians for calculation
  const raRad = ra * (Math.PI / 180);
  const decRad = dec * (Math.PI / 180);

  // Spherical coordinate transformation
  const sinLon = Math.sin(raRad) * Math.cos(epsilon) + Math.tan(decRad) * Math.sin(epsilon);
  const cosLon = Math.cos(raRad);

  let longitude = Math.atan2(sinLon, cosLon) * (180 / Math.PI);

  // Normalize to 0-360 degrees
  if (longitude < 0) {
    longitude += 360;
  }

  // Calculate ecliptic latitude
  const sinLat = Math.sin(decRad) * Math.cos(epsilon) - Math.cos(decRad) * Math.sin(epsilon) * Math.sin(raRad);
  const latitude = Math.asin(sinLat) * (180 / Math.PI);

  return {
    longitude,
    latitude
  };
}

/**
 * Convert ecliptic coordinates back to equatorial coordinates
 * (Inverse of equatorialToEcliptic)
 *
 * @param ecliptic - Ecliptic longitude and latitude in degrees
 * @param julianDate - Julian date for obliquity calculation
 * @returns Right Ascension (hours) and Declination (degrees)
 */
export function eclipticToEquatorial(
  ecliptic: EclipticCoordinate,
  julianDate: number
): EquatorialCoordinate {
  const lon = ecliptic.longitude * (Math.PI / 180);
  const lat = ecliptic.latitude * (Math.PI / 180);

  const epsilon = calculateObliquity(julianDate) * (Math.PI / 180);

  // Inverse transformation
  const sinRA = Math.sin(lon) * Math.cos(epsilon) - Math.tan(lat) * Math.sin(epsilon);
  const cosRA = Math.cos(lon);

  let ra = Math.atan2(sinRA, cosRA) * (180 / Math.PI);

  // Normalize to 0-360 degrees, then convert to hours
  if (ra < 0) {
    ra += 360;
  }
  const rightAscension = ra / 15; // Convert degrees to hours

  // Calculate declination
  const sinDec = Math.sin(lat) * Math.cos(epsilon) + Math.cos(lat) * Math.sin(epsilon) * Math.sin(lon);
  const declination = Math.asin(sinDec) * (180 / Math.PI);

  return {
    rightAscension,
    declination
  };
}

/**
 * Normalize an ecliptic longitude to 0-360 degrees
 */
export function normalizeLongitude(longitude: number): number {
  let normalized = longitude % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Calculate the angular distance between two ecliptic longitudes
 * (shortest distance along the zodiac circle)
 *
 * @param lon1 - First longitude in degrees
 * @param lon2 - Second longitude in degrees
 * @returns Angular distance in degrees (0-180)
 */
export function eclipticAngularDistance(lon1: number, lon2: number): number {
  const diff = Math.abs(lon1 - lon2);
  // Return the shorter arc
  return diff > 180 ? 360 - diff : diff;
}
