/**
 * Master Birth Chart Calculator
 * Integrates astronomy calculations with astrology interpretations
 */

import { ObservationInfo } from '@/types/star';
import { BirthChartData, BirthChartOptions, DEFAULT_BIRTH_CHART_OPTIONS, PlanetPlacement, BirthChartInterpretations, PlanetInterpretation, AspectInterpretation, Stellium, ChartPatterns } from '@/types/astrology';
import { calculateAllCelestialBodies, calculatePlanetPosition } from '../astronomy/planets';
import { equatorialToEcliptic } from './ecliptic';
import { getZodiacPosition, ZodiacSign } from './zodiac';
import { calculateHouses, getPlanetHouse } from './houses';
import { calculateChartAngles } from './ascendant';
import { calculateAspects, detectGrandTrines, detectTSquares, detectGrandCross, isUnaspected } from './aspects';
import { getPlanetInSignInterpretation } from './interpretations/planetsInSigns';
import { getPlanetInHouseInterpretation } from './interpretations/planetsInHouses';
import { getAspectInterpretation } from './interpretations/aspects';
import { generateChartOverview, RISING_SIGN_INTERPRETATIONS, analyzeElementBalance, analyzeModalityBalance } from './interpretations/overview';
import { dateToJulian } from '../astronomy/julianDate';

/**
 * Calculate complete birth chart with all interpretations
 */
export function calculateBirthChart(
  observationInfo: ObservationInfo,
  options: Partial<BirthChartOptions> = {}
): BirthChartData {
  const opts = { ...DEFAULT_BIRTH_CHART_OPTIONS, ...options };

  // Calculate planetary positions using astronomy engine
  const { planets: astronomyPlanets, moon: astronomyMoon } = calculateAllCelestialBodies(observationInfo);

  // Calculate Julian date
  const julianDate = dateToJulian(observationInfo.date);

  // Combine all celestial bodies (planets + moon + sun)
  const allBodies = [...astronomyPlanets];

  // Add Moon if available
  if (astronomyMoon) {
    allBodies.push({
      name: 'Moon',
      symbol: '☽',
      equatorial: astronomyMoon.equatorial,
      horizontal: astronomyMoon.horizontal,
      distance: astronomyMoon.distance
    });
  }

  // Calculate and add Sun
  const sunData = calculatePlanetPosition('Sun', observationInfo);
  if (sunData) {
    allBodies.push(sunData);
  }

  // Convert all bodies to ecliptic coordinates and determine zodiac positions
  const planetPlacements: PlanetPlacement[] = allBodies.map(planet => {
    // Convert equatorial to ecliptic
    const ecliptic = equatorialToEcliptic(planet.equatorial, julianDate);

    // Get zodiac position
    const zodiacPosition = getZodiacPosition(ecliptic.longitude);

    return {
      name: planet.name,
      symbol: planet.symbol,
      zodiacPosition,
      houseNumber: 0, // Will be filled after house calculation
      isRetrograde: false, // TODO: Implement retrograde detection
    };
  });

  // Calculate houses
  const houses = calculateHouses(
    observationInfo.date,
    observationInfo.location,
    opts.houseSystem
  );

  // Determine which house each planet is in
  planetPlacements.forEach(planet => {
    planet.houseNumber = getPlanetHouse(planet.zodiacPosition.longitude, houses);
  });

  // Calculate chart angles
  const angles = calculateChartAngles(observationInfo.date, observationInfo.location);

  // Calculate aspects
  const planetLongitudes: Record<string, number> = {};
  planetPlacements.forEach(planet => {
    planetLongitudes[planet.name] = planet.zodiacPosition.longitude;
  });

  const aspects = calculateAspects(planetLongitudes, true);

  // Detect chart patterns
  let patterns: ChartPatterns = {
    grandTrines: [],
    tSquares: [],
    grandCrosses: [],
    stelliums: [],
    unaspectedPlanets: []
  };

  if (opts.calculatePatterns) {
    patterns = {
      grandTrines: detectGrandTrines(aspects, planetLongitudes),
      tSquares: detectTSquares(aspects, planetLongitudes),
      grandCrosses: detectGrandCross(aspects, planetLongitudes),
      stelliums: detectStelliums(planetPlacements),
      unaspectedPlanets: planetPlacements
        .filter(p => isUnaspected(p.name, aspects))
        .map(p => p.name)
    };
  }

  // Generate interpretations
  let interpretations: BirthChartInterpretations | undefined;

  if (opts.generateInterpretations) {
    interpretations = generateInterpretations(
      planetPlacements,
      aspects,
      angles,
      patterns,
      {
        date: observationInfo.date,
        location: observationInfo.location,
        angles,
        houses,
        planets: planetPlacements,
        aspects,
        patterns
      }
    );
  }

  return {
    date: observationInfo.date,
    location: {
      ...observationInfo.location,
      locationName: undefined // Can be populated from city search
    },
    angles,
    houses,
    planets: planetPlacements,
    aspects,
    patterns,
    interpretations
  };
}

/**
 * Detect stelliums (3+ planets in same sign or house)
 */
function detectStelliums(planets: PlanetPlacement[]): Stellium[] {
  const stelliums: Stellium[] = [];

  // Check for sign stelliums
  const signGroups: Record<string, string[]> = {};
  planets.forEach(planet => {
    const sign = planet.zodiacPosition.sign;
    if (!signGroups[sign]) signGroups[sign] = [];
    signGroups[sign].push(planet.name);
  });

  Object.entries(signGroups).forEach(([sign, planetNames]) => {
    if (planetNames.length >= 3) {
      stelliums.push({
        type: 'sign',
        location: sign,
        planets: planetNames,
        strength: planetNames.length
      });
    }
  });

  // Check for house stelliums
  const houseGroups: Record<number, string[]> = {};
  planets.forEach(planet => {
    const house = planet.houseNumber;
    if (!houseGroups[house]) houseGroups[house] = [];
    houseGroups[house].push(planet.name);
  });

  Object.entries(houseGroups).forEach(([house, planetNames]) => {
    if (planetNames.length >= 3) {
      stelliums.push({
        type: 'house',
        location: parseInt(house),
        planets: planetNames,
        strength: planetNames.length
      });
    }
  });

  return stelliums;
}

/**
 * Generate all interpretations for the birth chart
 */
function generateInterpretations(
  planets: PlanetPlacement[],
  aspects: any[],
  angles: any,
  patterns: ChartPatterns,
  chart: BirthChartData
): BirthChartInterpretations {
  // Generate overview
  const overview = generateChartOverview(chart);

  // Generate Sun-Moon-Rising combination
  const sun = planets.find(p => p.name === 'Sun');
  const moon = planets.find(p => p.name === 'Moon');
  const sunMoonRising = sun && moon
    ? `Your ${sun.zodiacPosition.sign} Sun, ${moon.zodiacPosition.sign} Moon, and ${angles.ascendant.sign} Rising create a unique blend of energies that define your personality and life approach.`
    : "Sun-Moon-Rising combination analysis requires complete data.";

  // Generate planet interpretations
  const planetInterpretations: PlanetInterpretation[] = planets.map(planet => {
    const signInterp = getPlanetInSignInterpretation(planet.name, planet.zodiacPosition.sign);
    const houseInterp = getPlanetInHouseInterpretation(planet.name, planet.houseNumber);

    return {
      planet: planet.name,
      sign: planet.zodiacPosition.sign,
      house: planet.houseNumber,
      signInterpretation: signInterp,
      houseInterpretation: houseInterp,
      combinedInterpretation: `${planet.name} in ${planet.zodiacPosition.sign} in the ${planet.houseNumber}${getOrdinalSuffix(planet.houseNumber)} House combines these energies: ${signInterp.substring(0, 200)}... ${houseInterp.substring(0, 200)}...`
    };
  });

  // Generate aspect interpretations
  const aspectInterpretations: AspectInterpretation[] = aspects.map(aspect => {
    const interpretation = getAspectInterpretation(aspect.planet1, aspect.planet2, aspect.type);

    return {
      planet1: aspect.planet1,
      planet2: aspect.planet2,
      aspectType: aspect.type,
      aspectSymbol: aspect.symbol,
      interpretation,
      orb: aspect.orb
    };
  });

  // Analyze element and modality balance
  const elementBalance = analyzeElementBalance(planets);
  const modalityBalance = analyzeModalityBalance(planets);

  // Generate house emphasis
  const houseEmphasis = generateHouseEmphasis(planets);

  // Generate pattern descriptions
  const patternDescriptions = generatePatternDescriptions(patterns);

  return {
    overview,
    sunMoonRising,
    planetInterpretations,
    aspectInterpretations,
    houseEmphasis,
    elementBalance,
    modalityBalance,
    patterns: patternDescriptions
  };
}

/**
 * Generate house emphasis analysis
 */
function generateHouseEmphasis(planets: PlanetPlacement[]): string {
  const houseCounts: Record<number, number> = {};

  planets.forEach(planet => {
    houseCounts[planet.houseNumber] = (houseCounts[planet.houseNumber] || 0) + 1;
  });

  const emphasizedHouses = Object.entries(houseCounts)
    .filter(([_, count]) => count >= 2)
    .sort(([_, a], [__, b]) => b - a)
    .map(([house, count]) => `House ${house} (${count} planets)`);

  if (emphasizedHouses.length === 0) {
    return "Your planets are evenly distributed across houses, suggesting balanced life focus.";
  }

  return `Emphasized houses: ${emphasizedHouses.join(', ')}. This suggests strong focus on the life areas these houses represent.`;
}

/**
 * Generate pattern descriptions
 */
function generatePatternDescriptions(patterns: ChartPatterns): string[] {
  const descriptions: string[] = [];

  patterns.grandTrines.forEach(trine => {
    descriptions.push(`Grand Trine: ${trine.join(', ')} form a harmonious triangle of flowing energy and natural talent.`);
  });

  patterns.tSquares.forEach(tsquare => {
    descriptions.push(`T-Square: ${tsquare.join(', ')} create dynamic tension requiring action and resolution.`);
  });

  patterns.grandCrosses.forEach(cross => {
    descriptions.push(`Grand Cross: ${cross.join(', ')} form a powerful cross of challenges demanding integration.`);
  });

  patterns.stelliums.forEach(stellium => {
    descriptions.push(`Stellium in ${stellium.type === 'sign' ? `${stellium.location}` : `House ${stellium.location}`}: ${stellium.planets.join(', ')} concentrate energy powerfully.`);
  });

  if (patterns.unaspectedPlanets.length > 0) {
    descriptions.push(`Unaspected planets: ${patterns.unaspectedPlanets.join(', ')} operate independently without major connections.`);
  }

  if (descriptions.length === 0) {
    return ["No major chart patterns detected. Your chart shows a more individualized configuration."];
  }

  return descriptions;
}

/**
 * Get ordinal suffix for house numbers
 */
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}
