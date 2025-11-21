import { eclipticAngularDistance } from './ecliptic';

/**
 * Planetary Aspect Detection
 * Identifies astrological aspects between celestial bodies
 */

export type AspectType =
  | 'conjunction'    // 0°
  | 'sextile'        // 60°
  | 'square'         // 90°
  | 'trine'          // 120°
  | 'opposition'     // 180°
  | 'semi-sextile'   // 30°
  | 'quincunx';      // 150°

export type AspectQuality = 'harmonious' | 'challenging' | 'neutral';

export interface AspectDefinition {
  type: AspectType;
  angle: number;
  orb: number;        // Allowable deviation in degrees
  quality: AspectQuality;
  symbol: string;
  description: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: AspectType;
  angle: number;        // Exact angle between planets
  orb: number;          // Deviation from exact aspect
  exactAngle: number;   // The exact angle of this aspect type
  applying: boolean;    // True if aspect is getting tighter
  quality: AspectQuality;
  symbol: string;
}

/**
 * Aspect definitions with orbs
 * Tighter orbs for major aspects, wider for important planets
 */
const ASPECT_DEFINITIONS: AspectDefinition[] = [
  {
    type: 'conjunction',
    angle: 0,
    orb: 8,
    quality: 'neutral',
    symbol: '☌',
    description: 'Fusion of energies, intensification',
  },
  {
    type: 'opposition',
    angle: 180,
    orb: 8,
    quality: 'challenging',
    symbol: '☍',
    description: 'Polarity, tension, awareness',
  },
  {
    type: 'trine',
    angle: 120,
    orb: 8,
    quality: 'harmonious',
    symbol: '△',
    description: 'Harmony, ease, natural flow',
  },
  {
    type: 'square',
    angle: 90,
    orb: 7,
    quality: 'challenging',
    symbol: '□',
    description: 'Tension, friction, action',
  },
  {
    type: 'sextile',
    angle: 60,
    orb: 6,
    quality: 'harmonious',
    symbol: '⚹',
    description: 'Opportunity, cooperation',
  },
  {
    type: 'quincunx',
    angle: 150,
    orb: 3,
    quality: 'challenging',
    symbol: '⚻',
    description: 'Adjustment, awkwardness',
  },
  {
    type: 'semi-sextile',
    angle: 30,
    orb: 2,
    quality: 'neutral',
    symbol: '⚺',
    description: 'Minor connection, slight friction',
  },
];

/**
 * Calculate all aspects between a list of planets
 *
 * @param planetPositions - Object mapping planet names to ecliptic longitudes
 * @param includeLuminary - Include Sun/Moon aspects (usually want tighter orbs)
 * @returns Array of all detected aspects
 */
export function calculateAspects(
  planetPositions: Record<string, number>,
  includeLuminary: boolean = true
): Aspect[] {
  const aspects: Aspect[] = [];
  const planetNames = Object.keys(planetPositions);

  // Check all pairs of planets
  for (let i = 0; i < planetNames.length; i++) {
    for (let j = i + 1; j < planetNames.length; j++) {
      const planet1 = planetNames[i];
      const planet2 = planetNames[j];

      const lon1 = planetPositions[planet1];
      const lon2 = planetPositions[planet2];

      // Calculate angular distance
      const angle = eclipticAngularDistance(lon1, lon2);

      // Check against each aspect type
      for (const aspectDef of ASPECT_DEFINITIONS) {
        const deviation = Math.abs(angle - aspectDef.angle);

        // Adjust orb for Sun and Moon (tighter orbs)
        let effectiveOrb = aspectDef.orb;
        if (includeLuminary && (planet1 === 'Sun' || planet1 === 'Moon' || planet2 === 'Sun' || planet2 === 'Moon')) {
          effectiveOrb += 2; // Luminaries get 2° wider orb
        }

        if (deviation <= effectiveOrb) {
          aspects.push({
            planet1,
            planet2,
            type: aspectDef.type,
            angle,
            orb: deviation,
            exactAngle: aspectDef.angle,
            applying: false, // TODO: Calculate if aspect is applying or separating
            quality: aspectDef.quality,
            symbol: aspectDef.symbol,
          });
          break; // Only assign one aspect per planet pair
        }
      }
    }
  }

  // Sort by orb (tightest aspects first)
  aspects.sort((a, b) => a.orb - b.orb);

  return aspects;
}

/**
 * Find all aspects for a specific planet
 */
export function getAspectsForPlanet(planet: string, allAspects: Aspect[]): Aspect[] {
  return allAspects.filter(aspect =>
    aspect.planet1 === planet || aspect.planet2 === planet
  );
}

/**
 * Find a specific aspect between two planets
 */
export function getAspectBetween(planet1: string, planet2: string, allAspects: Aspect[]): Aspect | null {
  return allAspects.find(aspect =>
    (aspect.planet1 === planet1 && aspect.planet2 === planet2) ||
    (aspect.planet1 === planet2 && aspect.planet2 === planet1)
  ) || null;
}

/**
 * Count aspects by quality
 */
export function countAspectsByQuality(aspects: Aspect[]): {
  harmonious: number;
  challenging: number;
  neutral: number;
} {
  return {
    harmonious: aspects.filter(a => a.quality === 'harmonious').length,
    challenging: aspects.filter(a => a.quality === 'challenging').length,
    neutral: aspects.filter(a => a.quality === 'neutral').length,
  };
}

/**
 * Check if a planet is unaspected (has no major aspects)
 */
export function isUnaspected(planet: string, aspects: Aspect[]): boolean {
  const majorAspects = ['conjunction', 'opposition', 'trine', 'square', 'sextile'];
  const planetAspects = getAspectsForPlanet(planet, aspects);
  return planetAspects.filter(a => majorAspects.includes(a.type)).length === 0;
}

/**
 * Detect grand trines (3 planets all in trine aspect)
 */
export function detectGrandTrines(aspects: Aspect[], planetPositions: Record<string, number>): string[][] {
  const grandTrines: string[][] = [];
  const trines = aspects.filter(a => a.type === 'trine');

  // Check all combinations of 3 planets
  const planets = Object.keys(planetPositions);
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      for (let k = j + 1; k < planets.length; k++) {
        const p1 = planets[i];
        const p2 = planets[j];
        const p3 = planets[k];

        // Check if all three pairs form trines
        const has12 = trines.some(t =>
          (t.planet1 === p1 && t.planet2 === p2) || (t.planet1 === p2 && t.planet2 === p1)
        );
        const has23 = trines.some(t =>
          (t.planet1 === p2 && t.planet2 === p3) || (t.planet1 === p3 && t.planet2 === p2)
        );
        const has31 = trines.some(t =>
          (t.planet1 === p3 && t.planet2 === p1) || (t.planet1 === p1 && t.planet2 === p3)
        );

        if (has12 && has23 && has31) {
          grandTrines.push([p1, p2, p3]);
        }
      }
    }
  }

  return grandTrines;
}

/**
 * Detect T-Squares (2 squares and 1 opposition forming a T shape)
 */
export function detectTSquares(aspects: Aspect[], planetPositions: Record<string, number>): string[][] {
  const tSquares: string[][] = [];
  const squares = aspects.filter(a => a.type === 'square');
  const oppositions = aspects.filter(a => a.type === 'opposition');

  // For each opposition, find a planet that squares both ends
  for (const opp of oppositions) {
    const planets = Object.keys(planetPositions);

    for (const planet of planets) {
      if (planet === opp.planet1 || planet === opp.planet2) continue;

      // Check if this planet squares both ends of the opposition
      const squaresP1 = squares.some(s =>
        (s.planet1 === planet && s.planet2 === opp.planet1) ||
        (s.planet2 === planet && s.planet1 === opp.planet1)
      );
      const squaresP2 = squares.some(s =>
        (s.planet1 === planet && s.planet2 === opp.planet2) ||
        (s.planet2 === planet && s.planet1 === opp.planet2)
      );

      if (squaresP1 && squaresP2) {
        tSquares.push([opp.planet1, planet, opp.planet2]);
      }
    }
  }

  return tSquares;
}

/**
 * Detect Grand Cross (4 planets forming 2 oppositions and 4 squares)
 */
export function detectGrandCross(aspects: Aspect[], planetPositions: Record<string, number>): string[][] {
  const grandCrosses: string[][] = [];
  const oppositions = aspects.filter(a => a.type === 'opposition');

  // Find pairs of oppositions
  for (let i = 0; i < oppositions.length; i++) {
    for (let j = i + 1; j < oppositions.length; j++) {
      const opp1 = oppositions[i];
      const opp2 = oppositions[j];

      // Check if all 4 planets are different
      const planets = [opp1.planet1, opp1.planet2, opp2.planet1, opp2.planet2];
      const uniquePlanets = [...new Set(planets)];

      if (uniquePlanets.length === 4) {
        // Check if they all square each other
        const squares = aspects.filter(a => a.type === 'square');
        const allSquare = uniquePlanets.every(p1 =>
          uniquePlanets.filter(p2 => p2 !== p1).some(p2 => {
            // Check for opposition (already known) or square
            const isOpp = oppositions.some(o =>
              (o.planet1 === p1 && o.planet2 === p2) || (o.planet1 === p2 && o.planet2 === p1)
            );
            const isSquare = squares.some(s =>
              (s.planet1 === p1 && s.planet2 === p2) || (s.planet1 === p2 && s.planet2 === p1)
            );
            return isOpp || isSquare;
          })
        );

        if (allSquare) {
          grandCrosses.push(uniquePlanets);
        }
      }
    }
  }

  return grandCrosses;
}

/**
 * Format an aspect as a readable string
 */
export function formatAspect(aspect: Aspect): string {
  return `${aspect.planet1} ${aspect.symbol} ${aspect.planet2} (${aspect.orb.toFixed(2)}° orb)`;
}
