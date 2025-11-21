/**
 * Planet position calculations using astronomy-engine
 * Calculates positions for all major planets
 */

import * as Astronomy from 'astronomy-engine';
import { ObservationInfo, HorizontalCoordinate, EquatorialCoordinate } from '@/types';
import { equatorialToHorizontal } from './coordinates';
import { dateToJulian } from './julianDate';

export interface PlanetData {
  name: string;
  symbol: string;
  equatorial: EquatorialCoordinate;
  horizontal: HorizontalCoordinate;
  distance: number; // AU from Earth
  magnitude: number; // Apparent brightness
  constellation?: string;
  phase?: number; // Illumination percentage (0-100)
  visible: boolean; // Above horizon
  color: string; // Display color
}

export interface MoonData extends PlanetData {
  phaseName: string; // "New Moon", "First Quarter", etc.
  age: number; // Days since new moon
}

/**
 * Planet colors for rendering
 */
const PLANET_COLORS: Record<string, string> = {
  Mercury: '#B8B8B8', // Gray
  Venus: '#FFF8DC',   // Cream/yellow
  Mars: '#CD5C5C',    // Red
  Jupiter: '#DAA520', // Golden
  Saturn: '#F4E4C1',  // Pale gold
  Uranus: '#4FD0E0',  // Cyan
  Neptune: '#4166F5', // Blue
  Moon: '#F0F0F0',    // White
};

/**
 * Calculate planet position at given time and location
 */
export function calculatePlanetPosition(
  planetName: string,
  observationInfo: ObservationInfo
): PlanetData | null {
  try {
    // Create Astronomy.Observer from location
    const observer = new Astronomy.Observer(
      observationInfo.location.latitude,
      observationInfo.location.longitude,
      observationInfo.location.elevation || 0
    );

    // Get planet body
    const body = planetName as Astronomy.Body;

    // Calculate equatorial coordinates
    const equ = Astronomy.Equator(body, observationInfo.date, observer, true, true);

    // Calculate horizontal coordinates (altitude/azimuth)
    const hor = Astronomy.Horizon(observationInfo.date, observer, equ.ra, equ.dec, 'normal');

    // Calculate distance and magnitude
    const illumination = Astronomy.Illumination(body, observationInfo.date);

    // Convert RA from hours to standard format
    const equatorial: EquatorialCoordinate = {
      rightAscension: equ.ra,
      declination: equ.dec,
    };

    const horizontal: HorizontalCoordinate = {
      altitude: hor.altitude,
      azimuth: hor.azimuth,
    };

    return {
      name: planetName,
      symbol: getPlanetSymbol(planetName),
      equatorial,
      horizontal,
      distance: illumination.range_au,
      magnitude: illumination.mag,
      phase: illumination.phase_fraction * 100,
      visible: hor.altitude > -6, // Visible if above horizon (including twilight)
      color: PLANET_COLORS[planetName] || '#FFFFFF',
    };
  } catch (error) {
    console.error(`Error calculating position for ${planetName}:`, error);
    return null;
  }
}

/**
 * Calculate Moon position and phase
 */
export function calculateMoonPosition(observationInfo: ObservationInfo): MoonData | null {
  try {
    const observer = new Astronomy.Observer(
      observationInfo.location.latitude,
      observationInfo.location.longitude,
      observationInfo.location.elevation || 0
    );

    // Calculate Moon position
    const equ = Astronomy.Equator('Moon', observationInfo.date, observer, true, true);
    const hor = Astronomy.Horizon(observationInfo.date, observer, equ.ra, equ.dec, 'normal');
    const illumination = Astronomy.Illumination('Moon', observationInfo.date);

    // Calculate Moon phase
    const phaseAngle = Astronomy.MoonPhase(observationInfo.date);
    const phaseName = getMoonPhaseName(phaseAngle);

    const equatorial: EquatorialCoordinate = {
      rightAscension: equ.ra,
      declination: equ.dec,
    };

    const horizontal: HorizontalCoordinate = {
      altitude: hor.altitude,
      azimuth: hor.azimuth,
    };

    return {
      name: 'Moon',
      symbol: getMoonPhaseSymbol(phaseAngle),
      equatorial,
      horizontal,
      distance: illumination.range_au * 149597870.7 / 384400, // Convert AU to Moon distances
      magnitude: illumination.mag,
      phase: illumination.phase_fraction * 100,
      phaseName,
      age: phaseAngle / 360 * 29.53, // Days in lunar cycle
      visible: hor.altitude > -6,
      color: '#F0F0F0',
    };
  } catch (error) {
    console.error('Error calculating Moon position:', error);
    return null;
  }
}

/**
 * Calculate all visible planets
 */
export function calculateAllPlanets(observationInfo: ObservationInfo): PlanetData[] {
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const planetData: PlanetData[] = [];

  for (const planet of planets) {
    const data = calculatePlanetPosition(planet, observationInfo);
    if (data) {
      planetData.push(data);
    }
  }

  return planetData;
}

/**
 * Calculate all celestial bodies (planets + moon)
 */
export function calculateAllCelestialBodies(observationInfo: ObservationInfo): {
  planets: PlanetData[];
  moon: MoonData | null;
} {
  return {
    planets: calculateAllPlanets(observationInfo),
    moon: calculateMoonPosition(observationInfo),
  };
}

/**
 * Get planet symbol (Unicode)
 */
function getPlanetSymbol(planet: string): string {
  const symbols: Record<string, string> = {
    Mercury: '☿',
    Venus: '♀',
    Mars: '♂',
    Jupiter: '♃',
    Saturn: '♄',
    Uranus: '♅',
    Neptune: '♆',
    Moon: '☽',
  };
  return symbols[planet] || '●';
}

/**
 * Get Moon phase name from phase angle
 */
function getMoonPhaseName(phaseAngle: number): string {
  if (phaseAngle < 22.5 || phaseAngle >= 337.5) return 'New Moon';
  if (phaseAngle < 67.5) return 'Waxing Crescent';
  if (phaseAngle < 112.5) return 'First Quarter';
  if (phaseAngle < 157.5) return 'Waxing Gibbous';
  if (phaseAngle < 202.5) return 'Full Moon';
  if (phaseAngle < 247.5) return 'Waning Gibbous';
  if (phaseAngle < 292.5) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Get Moon phase symbol
 */
function getMoonPhaseSymbol(phaseAngle: number): string {
  if (phaseAngle < 22.5 || phaseAngle >= 337.5) return '🌑'; // New Moon
  if (phaseAngle < 67.5) return '🌒'; // Waxing Crescent
  if (phaseAngle < 112.5) return '🌓'; // First Quarter
  if (phaseAngle < 157.5) return '🌔'; // Waxing Gibbous
  if (phaseAngle < 202.5) return '🌕'; // Full Moon
  if (phaseAngle < 247.5) return '🌖'; // Waning Gibbous
  if (phaseAngle < 292.5) return '🌗'; // Last Quarter
  return '🌘'; // Waning Crescent
}

/**
 * Analyze astronomical significance of planet positions
 */
export function analyzePlanetaryPositions(
  planets: PlanetData[],
  moon: MoonData | null,
  observationInfo: ObservationInfo
): string {
  const analysis: string[] = [];

  analysis.push('=== ASTRONOMICAL ANALYSIS ===\n');
  analysis.push(`Date: ${observationInfo.date.toLocaleString()}`);
  analysis.push(`Location: ${observationInfo.location.latitude.toFixed(2)}°, ${observationInfo.location.longitude.toFixed(2)}°\n`);

  // Moon analysis
  if (moon && moon.visible) {
    analysis.push(`🌙 MOON:`);
    analysis.push(`  Phase: ${moon.phaseName} (${moon.phase.toFixed(1)}% illuminated)`);
    analysis.push(`  Age: ${moon.age.toFixed(1)} days into lunar cycle`);
    analysis.push(`  Position: Altitude ${moon.horizontal.altitude.toFixed(1)}°, Azimuth ${moon.horizontal.azimuth.toFixed(1)}°`);
    analysis.push(`  Magnitude: ${moon.magnitude.toFixed(1)}`);

    if (moon.phase > 95) {
      analysis.push(`  ⭐ Near Full Moon - excellent for naked-eye observation!`);
    } else if (moon.phase < 5) {
      analysis.push(`  ⭐ New Moon - perfect for deep-sky observation!`);
    }
    analysis.push('');
  }

  // Visible planets
  const visiblePlanets = planets.filter(p => p.visible);
  analysis.push(`VISIBLE PLANETS: ${visiblePlanets.length} of ${planets.length}\n`);

  visiblePlanets.forEach(planet => {
    analysis.push(`${planet.symbol} ${planet.name.toUpperCase()}:`);
    analysis.push(`  Position: Alt ${planet.horizontal.altitude.toFixed(1)}°, Az ${planet.horizontal.azimuth.toFixed(1)}°`);
    analysis.push(`  Magnitude: ${planet.magnitude.toFixed(1)} ${planet.magnitude < 2 ? '(Very bright!)' : ''}`);
    analysis.push(`  Distance: ${planet.distance.toFixed(2)} AU from Earth`);
    if (planet.phase !== undefined) {
      analysis.push(`  Illumination: ${planet.phase.toFixed(1)}%`);
    }

    // Special conditions
    if (planet.horizontal.altitude > 60) {
      analysis.push(`  ⭐ High in the sky - excellent viewing!`);
    }
    if (planet.magnitude < 0) {
      analysis.push(`  ⭐ Extremely bright - easily visible!`);
    }
    analysis.push('');
  });

  // Conjunctions (planets close together)
  for (let i = 0; i < visiblePlanets.length; i++) {
    for (let j = i + 1; j < visiblePlanets.length; j++) {
      const p1 = visiblePlanets[i];
      const p2 = visiblePlanets[j];
      const separation = calculateAngularSeparation(p1, p2);

      if (separation < 10) {
        analysis.push(`🌟 CONJUNCTION: ${p1.name} and ${p2.name} are ${separation.toFixed(1)}° apart!`);
      }
    }
  }

  return analysis.join('\n');
}

/**
 * Calculate angular separation between two celestial objects
 */
function calculateAngularSeparation(obj1: PlanetData, obj2: PlanetData): number {
  const ra1 = obj1.equatorial.rightAscension * 15 * Math.PI / 180;
  const dec1 = obj1.equatorial.declination * Math.PI / 180;
  const ra2 = obj2.equatorial.rightAscension * 15 * Math.PI / 180;
  const dec2 = obj2.equatorial.declination * Math.PI / 180;

  const cos_sep = Math.sin(dec1) * Math.sin(dec2) +
                  Math.cos(dec1) * Math.cos(dec2) * Math.cos(ra1 - ra2);

  return Math.acos(Math.max(-1, Math.min(1, cos_sep))) * 180 / Math.PI;
}
