import { normalizeLongitude } from './ecliptic';

/**
 * Zodiac sign calculator - determines astrological sign from ecliptic longitude
 */

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
export type Modality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface ZodiacPosition {
  sign: ZodiacSign;
  degree: number;        // 0-29 degrees within the sign
  minute: number;        // 0-59 minutes within the degree
  longitude: number;     // Absolute ecliptic longitude (0-360)
  element: Element;
  modality: Modality;
  glyph: string;        // Unicode symbol for the sign
  ruler: string;        // Traditional ruler planet
}

/**
 * Zodiac sign data lookup table
 */
const ZODIAC_DATA: Array<{
  sign: ZodiacSign;
  element: Element;
  modality: Modality;
  glyph: string;
  ruler: string;
  startDegree: number;
}> = [
  { sign: 'Aries', element: 'Fire', modality: 'Cardinal', glyph: '♈', ruler: 'Mars', startDegree: 0 },
  { sign: 'Taurus', element: 'Earth', modality: 'Fixed', glyph: '♉', ruler: 'Venus', startDegree: 30 },
  { sign: 'Gemini', element: 'Air', modality: 'Mutable', glyph: '♊', ruler: 'Mercury', startDegree: 60 },
  { sign: 'Cancer', element: 'Water', modality: 'Cardinal', glyph: '♋', ruler: 'Moon', startDegree: 90 },
  { sign: 'Leo', element: 'Fire', modality: 'Fixed', glyph: '♌', ruler: 'Sun', startDegree: 120 },
  { sign: 'Virgo', element: 'Earth', modality: 'Mutable', glyph: '♍', ruler: 'Mercury', startDegree: 150 },
  { sign: 'Libra', element: 'Air', modality: 'Cardinal', glyph: '♎', ruler: 'Venus', startDegree: 180 },
  { sign: 'Scorpio', element: 'Water', modality: 'Fixed', glyph: '♏', ruler: 'Pluto', startDegree: 210 },
  { sign: 'Sagittarius', element: 'Fire', modality: 'Mutable', glyph: '♐', ruler: 'Jupiter', startDegree: 240 },
  { sign: 'Capricorn', element: 'Earth', modality: 'Cardinal', glyph: '♑', ruler: 'Saturn', startDegree: 270 },
  { sign: 'Aquarius', element: 'Air', modality: 'Fixed', glyph: '♒', ruler: 'Uranus', startDegree: 300 },
  { sign: 'Pisces', element: 'Water', modality: 'Mutable', glyph: '♓', ruler: 'Neptune', startDegree: 330 },
];

/**
 * Convert ecliptic longitude to zodiac position
 *
 * @param longitude - Ecliptic longitude in degrees (0-360)
 * @returns Complete zodiac position with sign, degree, metadata
 */
export function getZodiacPosition(longitude: number): ZodiacPosition {
  // Normalize to 0-360
  const normalizedLon = normalizeLongitude(longitude);

  // Find which sign (each sign is 30 degrees)
  const signIndex = Math.floor(normalizedLon / 30);
  const signData = ZODIAC_DATA[signIndex];

  // Calculate degree within sign (0-29.999...)
  const degreeInSign = normalizedLon % 30;

  // Split into degrees and minutes
  const degree = Math.floor(degreeInSign);
  const minute = Math.floor((degreeInSign - degree) * 60);

  return {
    sign: signData.sign,
    degree,
    minute,
    longitude: normalizedLon,
    element: signData.element,
    modality: signData.modality,
    glyph: signData.glyph,
    ruler: signData.ruler,
  };
}

/**
 * Format zodiac position as a string
 * Example: "15° Aries 23'" or "Sun ♈ 15°23'"
 */
export function formatZodiacPosition(
  position: ZodiacPosition,
  options: {
    showSymbol?: boolean;
    showMinutes?: boolean;
    planetName?: string;
  } = {}
): string {
  const {
    showSymbol = true,
    showMinutes = true,
    planetName
  } = options;

  let formatted = '';

  if (planetName) {
    formatted += `${planetName} `;
  }

  if (showSymbol) {
    formatted += `${position.glyph} `;
  } else {
    formatted += `${position.sign} `;
  }

  formatted += `${position.degree}°`;

  if (showMinutes) {
    formatted += `${String(position.minute).padStart(2, '0')}'`;
  }

  return formatted;
}

/**
 * Get all zodiac signs in order
 */
export function getAllZodiacSigns(): ZodiacSign[] {
  return ZODIAC_DATA.map(data => data.sign);
}

/**
 * Get zodiac sign data by name
 */
export function getSignData(sign: ZodiacSign) {
  return ZODIAC_DATA.find(data => data.sign === sign);
}

/**
 * Check if a position is in the early degrees of a sign (0-10°)
 */
export function isEarlyDegrees(position: ZodiacPosition): boolean {
  return position.degree < 10;
}

/**
 * Check if a position is in the middle degrees of a sign (10-20°)
 */
export function isMiddleDegrees(position: ZodiacPosition): boolean {
  return position.degree >= 10 && position.degree < 20;
}

/**
 * Check if a position is in the late degrees of a sign (20-29°)
 */
export function isLateDegrees(position: ZodiacPosition): boolean {
  return position.degree >= 20;
}

/**
 * Check if a position is at a critical degree (0° or 29°)
 */
export function isCriticalDegree(position: ZodiacPosition): boolean {
  return position.degree === 0 || position.degree === 29;
}

/**
 * Get the opposite sign (180 degrees away)
 */
export function getOppositeSign(sign: ZodiacSign): ZodiacSign {
  const index = ZODIAC_DATA.findIndex(data => data.sign === sign);
  const oppositeIndex = (index + 6) % 12;
  return ZODIAC_DATA[oppositeIndex].sign;
}

/**
 * Calculate the distance in degrees between two zodiac positions
 */
export function zodiacDistance(pos1: ZodiacPosition, pos2: ZodiacPosition): number {
  let diff = Math.abs(pos1.longitude - pos2.longitude);
  // Return the shorter arc
  return diff > 180 ? 360 - diff : diff;
}
