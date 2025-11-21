import { calculateLMST } from '../astronomy/siderealTime';
import { calculateObliquity, normalizeLongitude } from './ecliptic';
import { getZodiacPosition, ZodiacPosition } from './zodiac';
import { ObserverLocation } from '@/types';

/**
 * Calculate the Ascendant (Rising Sign)
 * The point on the ecliptic rising on the eastern horizon at birth
 *
 * @param date - Date and time of birth
 * @param location - Observer location (latitude, longitude)
 * @returns Zodiac position of the Ascendant
 */
export function calculateAscendant(
  date: Date,
  location: ObserverLocation
): ZodiacPosition {
  // Calculate Julian date first
  const julianDate = dateToJulian(date);

  // Calculate Local Mean Sidereal Time (returns degrees)
  const lmstDegrees = calculateLMST(julianDate, location.longitude);

  // Convert LMST from degrees to radians
  const lstRad = lmstDegrees * (Math.PI / 180);

  // Observer's latitude in radians
  const latRad = location.latitude * (Math.PI / 180);

  // Obliquity of the ecliptic
  const epsilon = calculateObliquity(julianDate) * (Math.PI / 180);

  // Calculate Ascendant ecliptic longitude using spherical trigonometry
  // Formula from RadixPro: tan(ASC) = cos(RAMC) / -(sin(ε) * tan(φ) + cos(ε) * sin(RAMC))
  // Using atan2: ASC = atan2(y, x) where:
  // y = cos(RAMC)
  // x = -(sin(ε) * tan(φ) + cos(ε) * sin(RAMC))
  const y = Math.cos(lstRad);
  const x = -(Math.sin(epsilon) * Math.tan(latRad) + Math.cos(epsilon) * Math.sin(lstRad));

  let ascendantLon = Math.atan2(y, x) * (180 / Math.PI);

  // Normalize to 0-360
  ascendantLon = normalizeLongitude(ascendantLon);

  return getZodiacPosition(ascendantLon);
}

/**
 * Calculate the Midheaven (Medium Coeli / MC)
 * The point on the ecliptic that crosses the meridian (due south in Northern Hemisphere)
 *
 * @param date - Date and time of birth
 * @param location - Observer location (latitude, longitude)
 * @returns Zodiac position of the Midheaven
 */
export function calculateMidheaven(
  date: Date,
  location: ObserverLocation
): ZodiacPosition {
  // Calculate Julian date first
  const julianDate = dateToJulian(date);

  // Calculate Local Mean Sidereal Time (returns degrees)
  const lstDegrees = calculateLMST(julianDate, location.longitude);

  // Obliquity of the ecliptic
  const epsilon = calculateObliquity(julianDate) * (Math.PI / 180);

  // Convert LST to radians
  const lstRad = lstDegrees * (Math.PI / 180);

  // Calculate MC ecliptic longitude
  // MC is where the meridian crosses the ecliptic
  // Formula: tan(MC) = tan(LST) / cos(ε)
  let mcLon = Math.atan2(Math.sin(lstRad), Math.cos(epsilon) * Math.cos(lstRad)) * (180 / Math.PI);

  // Normalize to 0-360
  mcLon = normalizeLongitude(mcLon);

  return getZodiacPosition(mcLon);
}

/**
 * Calculate the Descendant (opposite of Ascendant)
 * The point on the ecliptic setting on the western horizon
 *
 * @param ascendant - Ascendant position
 * @returns Zodiac position of the Descendant
 */
export function calculateDescendant(ascendant: ZodiacPosition): ZodiacPosition {
  const descendantLon = normalizeLongitude(ascendant.longitude + 180);
  return getZodiacPosition(descendantLon);
}

/**
 * Calculate the Imum Coeli (IC / Bottom of the Sky)
 * Opposite of the Midheaven
 *
 * @param midheaven - Midheaven position
 * @returns Zodiac position of the IC
 */
export function calculateIC(midheaven: ZodiacPosition): ZodiacPosition {
  const icLon = normalizeLongitude(midheaven.longitude + 180);
  return getZodiacPosition(icLon);
}

/**
 * Calculate all four angles of the birth chart
 */
export interface ChartAngles {
  ascendant: ZodiacPosition;
  descendant: ZodiacPosition;
  midheaven: ZodiacPosition;
  ic: ZodiacPosition;
}

export function calculateChartAngles(
  date: Date,
  location: ObserverLocation
): ChartAngles {
  const ascendant = calculateAscendant(date, location);
  const midheaven = calculateMidheaven(date, location);
  const descendant = calculateDescendant(ascendant);
  const ic = calculateIC(midheaven);

  return {
    ascendant,
    descendant,
    midheaven,
    ic,
  };
}

/**
 * Helper function to convert Date to Julian Date
 * (Simplified version for astrology calculations)
 */
function dateToJulian(date: Date): number {
  const time = date.getTime();
  const millisPerDay = 86400000;
  const julianDay = (time / millisPerDay) + 2440587.5;
  return julianDay;
}
