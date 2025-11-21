import { EquatorialCoordinate, HorizontalCoordinate, ObserverLocation } from '@/types';
import { calculateLocalHourAngle, degreesToRadians, radiansToDegrees } from './siderealTime';

/**
 * Coordinate transformation functions
 * Convert between different astronomical coordinate systems
 */

/**
 * Convert Equatorial coordinates (RA/Dec) to Horizontal coordinates (Alt/Az)
 * for a specific observer location and time
 *
 * Uses spherical trigonometry formulas:
 * sin(alt) = sin(dec)sin(lat) + cos(dec)cos(lat)cos(LHA)
 * cos(az) = (sin(dec) - sin(alt)sin(lat)) / (cos(alt)cos(lat))
 *
 * @param equatorial - RA/Dec coordinates of the star
 * @param observer - Observer's location (lat/lon)
 * @param julianDate - Julian Date of observation
 * @returns Horizontal coordinates (altitude/azimuth)
 */
export function equatorialToHorizontal(
  equatorial: EquatorialCoordinate,
  observer: ObserverLocation,
  julianDate: number
): HorizontalCoordinate {
  // Convert RA from hours to degrees
  const raDegrees = equatorial.rightAscension * 15.0;
  const dec = equatorial.declination;
  const lat = observer.latitude;

  // Calculate Local Hour Angle
  const lha = calculateLocalHourAngle(julianDate, observer.longitude, raDegrees);

  // Convert to radians for trigonometry
  const lhaRad = degreesToRadians(lha);
  const decRad = degreesToRadians(dec);
  const latRad = degreesToRadians(lat);

  // Calculate altitude using spherical trigonometry
  const sinAlt =
    Math.sin(decRad) * Math.sin(latRad) + Math.cos(decRad) * Math.cos(latRad) * Math.cos(lhaRad);

  const altitude = radiansToDegrees(Math.asin(sinAlt));

  // Calculate azimuth
  const cosAz = (Math.sin(decRad) - Math.sin(latRad) * sinAlt) / (Math.cos(latRad) * Math.cos(degreesToRadians(altitude)));

  let azimuth = radiansToDegrees(Math.acos(Math.max(-1, Math.min(1, cosAz))));

  // Determine azimuth quadrant based on hour angle
  if (Math.sin(lhaRad) > 0) {
    azimuth = 360.0 - azimuth;
  }

  return {
    altitude,
    azimuth,
  };
}

/**
 * Convert Horizontal coordinates (Alt/Az) to Equatorial (RA/Dec)
 * Inverse of the above transformation
 */
export function horizontalToEquatorial(
  horizontal: HorizontalCoordinate,
  observer: ObserverLocation,
  julianDate: number
): EquatorialCoordinate {
  const alt = horizontal.altitude;
  const az = horizontal.azimuth;
  const lat = observer.latitude;

  // Convert to radians
  const altRad = degreesToRadians(alt);
  const azRad = degreesToRadians(az);
  const latRad = degreesToRadians(lat);

  // Calculate declination
  const sinDec = Math.sin(altRad) * Math.sin(latRad) + Math.cos(altRad) * Math.cos(latRad) * Math.cos(azRad);
  const declination = radiansToDegrees(Math.asin(sinDec));

  // Calculate hour angle
  const cosLHA =
    (Math.sin(altRad) - Math.sin(latRad) * sinDec) / (Math.cos(latRad) * Math.cos(degreesToRadians(declination)));

  let lha = radiansToDegrees(Math.acos(Math.max(-1, Math.min(1, cosLHA))));

  if (Math.sin(azRad) > 0) {
    lha = 360.0 - lha;
  }

  // Convert LHA to RA
  const lmst = calculateLocalHourAngle(julianDate, observer.longitude, 0);
  let raDegrees = lmst - lha;
  if (raDegrees < 0) raDegrees += 360;
  if (raDegrees >= 360) raDegrees -= 360;

  const rightAscension = raDegrees / 15.0; // Convert to hours

  return {
    rightAscension,
    declination,
  };
}

/**
 * Check if a star is visible (above the horizon) for a given observer
 */
export function isStarVisible(horizontal: HorizontalCoordinate, minAltitude: number = 0): boolean {
  return horizontal.altitude > minAltitude;
}

/**
 * Calculate angular separation between two celestial objects
 * Uses the haversine formula for accuracy
 */
export function angularSeparation(coord1: EquatorialCoordinate, coord2: EquatorialCoordinate): number {
  const ra1 = degreesToRadians(coord1.rightAscension * 15);
  const dec1 = degreesToRadians(coord1.declination);
  const ra2 = degreesToRadians(coord2.rightAscension * 15);
  const dec2 = degreesToRadians(coord2.declination);

  const deltaRA = ra2 - ra1;
  const deltaDec = dec2 - dec1;

  const a =
    Math.sin(deltaDec / 2) ** 2 + Math.cos(dec1) * Math.cos(dec2) * Math.sin(deltaRA / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  return radiansToDegrees(c);
}

/**
 * Convert RA/Dec from degrees to RA in hours and Dec in degrees
 */
export function convertRADegToRAHours(raDeg: number, decDeg: number): EquatorialCoordinate {
  return {
    rightAscension: raDeg / 15.0,
    declination: decDeg,
  };
}

/**
 * Apply proper motion to star coordinates
 * Proper motion is the apparent angular motion of a star across the sky
 *
 * @param ra - Right Ascension (degrees)
 * @param dec - Declination (degrees)
 * @param pmra - Proper motion in RA (milliarcseconds/year)
 * @param pmdec - Proper motion in Dec (milliarcseconds/year)
 * @param epochDifference - Years since J2000
 * @returns Updated RA/Dec
 */
export function applyProperMotion(
  ra: number,
  dec: number,
  pmra: number,
  pmdec: number,
  epochDifference: number
): { ra: number; dec: number } {
  // Convert proper motion from mas/year to degrees/year
  const pmraDeg = (pmra / 3600000.0) * epochDifference; // mas to degrees
  const pmdecDeg = (pmdec / 3600000.0) * epochDifference;

  // Apply proper motion correction
  const newRA = ra + pmraDeg / Math.cos(degreesToRadians(dec));
  const newDec = dec + pmdecDeg;

  return {
    ra: newRA,
    dec: newDec,
  };
}
