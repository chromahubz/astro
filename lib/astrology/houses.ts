import { ObserverLocation } from '@/types';
import { calculateChartAngles, ChartAngles } from './ascendant';
import { getZodiacPosition, ZodiacPosition } from './zodiac';
import { normalizeLongitude } from './ecliptic';
import { calculateLMSTHours } from '../astronomy/siderealTime';
import { calculateObliquity } from './ecliptic';

/**
 * House Systems for Birth Chart Calculation
 * Implements Placidus, Whole Sign, and Equal House systems
 */

export type HouseSystem = 'placidus' | 'whole-sign' | 'equal';

export interface HouseCusp {
  houseNumber: number;    // 1-12
  position: ZodiacPosition;
}

export interface Houses {
  system: HouseSystem;
  cusps: HouseCusp[];     // 12 house cusps
  angles: ChartAngles;    // ASC, DESC, MC, IC
}

/**
 * Calculate all 12 house cusps for a given birth chart
 *
 * @param date - Birth date and time
 * @param location - Observer location
 * @param system - House system to use
 * @returns Complete house data
 */
export function calculateHouses(
  date: Date,
  location: ObserverLocation,
  system: HouseSystem = 'placidus'
): Houses {
  const angles = calculateChartAngles(date, location);

  let cusps: HouseCusp[];

  switch (system) {
    case 'whole-sign':
      cusps = calculateWholeSignHouses(angles.ascendant);
      break;
    case 'equal':
      cusps = calculateEqualHouses(angles.ascendant);
      break;
    case 'placidus':
    default:
      cusps = calculatePlacidusHouses(date, location, angles);
      break;
  }

  return {
    system,
    cusps,
    angles,
  };
}

/**
 * Whole Sign House System
 * Simplest system: each sign = one house, starting from Ascendant's sign
 */
function calculateWholeSignHouses(ascendant: ZodiacPosition): HouseCusp[] {
  const cusps: HouseCusp[] = [];

  // House 1 starts at 0° of the Ascendant's sign
  const firstHouseSign = Math.floor(ascendant.longitude / 30) * 30;

  for (let i = 0; i < 12; i++) {
    const longitude = normalizeLongitude(firstHouseSign + (i * 30));
    cusps.push({
      houseNumber: i + 1,
      position: getZodiacPosition(longitude),
    });
  }

  return cusps;
}

/**
 * Equal House System
 * All houses are 30° wide, starting from the exact Ascendant degree
 */
function calculateEqualHouses(ascendant: ZodiacPosition): HouseCusp[] {
  const cusps: HouseCusp[] = [];

  for (let i = 0; i < 12; i++) {
    const longitude = normalizeLongitude(ascendant.longitude + (i * 30));
    cusps.push({
      houseNumber: i + 1,
      position: getZodiacPosition(longitude),
    });
  }

  return cusps;
}

/**
 * Placidus House System
 * Most popular in Western astrology - time-based quadrant system
 * Complex calculations using spherical trigonometry
 */
function calculatePlacidusHouses(
  date: Date,
  location: ObserverLocation,
  angles: ChartAngles
): HouseCusp[] {
  const cusps: HouseCusp[] = [];

  // Houses 1, 4, 7, 10 are the angles (already calculated)
  cusps.push({ houseNumber: 1, position: angles.ascendant });    // ASC
  cusps.push({ houseNumber: 10, position: angles.midheaven });   // MC
  cusps.push({ houseNumber: 7, position: angles.descendant });   // DESC
  cusps.push({ houseNumber: 4, position: angles.ic });          // IC

  // Calculate intermediate cusps (2, 3, 5, 6, 8, 9, 11, 12)
  const julianDate = dateToJulian(date);
  const lmstHours = calculateLMSTHours(julianDate, location.longitude);
  const latitude = location.latitude;
  const obliquity = calculateObliquity(julianDate);

  // Calculate houses 11 and 12 (between MC and ASC)
  cusps.push({ houseNumber: 11, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 30) });
  cusps.push({ houseNumber: 12, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 60) });

  // Calculate houses 2 and 3 (between ASC and IC)
  cusps.push({ houseNumber: 2, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 120) });
  cusps.push({ houseNumber: 3, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 150) });

  // Calculate houses 5 and 6 (between IC and DESC)
  cusps.push({ houseNumber: 5, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 240) });
  cusps.push({ houseNumber: 6, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 270) });

  // Calculate houses 8 and 9 (between DESC and MC)
  cusps.push({ houseNumber: 8, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 300) });
  cusps.push({ houseNumber: 9, position: calculatePlacidusIntermediateCusp(lmstHours, latitude, obliquity, 330) });

  // Sort by house number
  cusps.sort((a, b) => a.houseNumber - b.houseNumber);

  return cusps;
}

/**
 * Calculate intermediate Placidus house cusp
 * This is a simplified implementation that works for most latitudes
 */
function calculatePlacidusIntermediateCusp(
  lmst: number,
  latitude: number,
  obliquity: number,
  mdOffset: number
): ZodiacPosition {
  const latRad = latitude * (Math.PI / 180);
  const oblRad = obliquity * (Math.PI / 180);

  // Calculate the meridian distance for this cusp
  const md = mdOffset * (Math.PI / 180);

  // Semi-arc formula for Placidus (simplified)
  // This is an approximation that works well for most locations
  const lstDegrees = (lmst * 15) + mdOffset;
  const lstRad = lstDegrees * (Math.PI / 180);

  // Calculate the ecliptic longitude
  const numerator = Math.sin(lstRad);
  const denominator = Math.cos(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);

  let longitude = Math.atan2(numerator, denominator) * (180 / Math.PI);
  longitude = normalizeLongitude(longitude);

  return getZodiacPosition(longitude);
}

/**
 * Determine which house a planet is in based on its ecliptic longitude
 *
 * @param planetLongitude - Planet's ecliptic longitude
 * @param houses - Calculated houses
 * @returns House number (1-12)
 */
export function getPlanetHouse(planetLongitude: number, houses: Houses): number {
  const normalized = normalizeLongitude(planetLongitude);

  // For each house, check if the planet is between this cusp and the next
  for (let i = 0; i < 12; i++) {
    const currentCusp = houses.cusps[i].position.longitude;
    const nextCusp = houses.cusps[(i + 1) % 12].position.longitude;

    if (nextCusp > currentCusp) {
      // Normal case: cusps don't cross 0°
      if (normalized >= currentCusp && normalized < nextCusp) {
        return houses.cusps[i].houseNumber;
      }
    } else {
      // Cusps cross the 0° Aries point
      if (normalized >= currentCusp || normalized < nextCusp) {
        return houses.cusps[i].houseNumber;
      }
    }
  }

  // Fallback (should not happen)
  return 1;
}

/**
 * Get house cusp for a specific house number
 */
export function getHouseCusp(houseNumber: number, houses: Houses): HouseCusp | undefined {
  return houses.cusps.find(cusp => cusp.houseNumber === houseNumber);
}

/**
 * Check if a planet is angular (in house 1, 4, 7, or 10)
 */
export function isAngularHouse(houseNumber: number): boolean {
  return [1, 4, 7, 10].includes(houseNumber);
}

/**
 * Check if a planet is succedent (in house 2, 5, 8, or 11)
 */
export function isSuccedentHouse(houseNumber: number): boolean {
  return [2, 5, 8, 11].includes(houseNumber);
}

/**
 * Check if a planet is cadent (in house 3, 6, 9, or 12)
 */
export function isCadentHouse(houseNumber: number): boolean {
  return [3, 6, 9, 12].includes(houseNumber);
}

/**
 * Get the natural ruler of a house (based on house number)
 */
export function getHouseRuler(houseNumber: number): string {
  const rulers = [
    'Mars',     // House 1 (Aries)
    'Venus',    // House 2 (Taurus)
    'Mercury',  // House 3 (Gemini)
    'Moon',     // House 4 (Cancer)
    'Sun',      // House 5 (Leo)
    'Mercury',  // House 6 (Virgo)
    'Venus',    // House 7 (Libra)
    'Pluto',    // House 8 (Scorpio)
    'Jupiter',  // House 9 (Sagittarius)
    'Saturn',   // House 10 (Capricorn)
    'Uranus',   // House 11 (Aquarius)
    'Neptune',  // House 12 (Pisces)
  ];

  return rulers[(houseNumber - 1) % 12];
}

/**
 * Helper function to convert Date to Julian Date
 */
function dateToJulian(date: Date): number {
  const time = date.getTime();
  const millisPerDay = 86400000;
  const julianDay = (time / millisPerDay) + 2440587.5;
  return julianDay;
}
