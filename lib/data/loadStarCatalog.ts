import { StarCatalogEntry, CalculatedStar, ObservationInfo } from '@/types';
import { dateToJulian, daysSinceJ2000 } from '../astronomy/julianDate';
import { equatorialToHorizontal, convertRADegToRAHours, applyProperMotion } from '../astronomy/coordinates';
import { bvToRGB, magnitudeToRadius } from '../rendering/colorUtils';
import { project, createProjectionConfig, ProjectionConfig } from '../rendering/projections';
import brightStarsData from '@/data/stars/bright-stars.json';

/**
 * Load and process star catalog data
 */

/**
 * Load bright stars from JSON file
 */
export function loadBrightStars(): StarCatalogEntry[] {
  return brightStarsData as StarCatalogEntry[];
}

/**
 * Calculate star positions for rendering based on observation info
 */
export function calculateStarPositions(
  observationInfo: ObservationInfo,
  config: ProjectionConfig,
  minMagnitude: number = 6.5,
  viewMode: 'minimal' | 'standard' | 'full' = 'standard'
): CalculatedStar[] {
  const allStars = loadBrightStars();

  // Filter stars based on view mode
  const importanceThreshold = viewMode === 'minimal' ? 1 : viewMode === 'standard' ? 2 : 3;
  const stars = allStars.filter((star: any) =>
    !star.importance || star.importance <= importanceThreshold
  );

  const julianDate = dateToJulian(observationInfo.date);
  const yearsSinceJ2000 = daysSinceJ2000(julianDate) / 365.25;

  console.log('=== STAR CALCULATION DEBUG ===');
  console.log('Date:', observationInfo.date);
  console.log('Julian Date:', julianDate);
  console.log('Location:', observationInfo.location);
  console.log('Projection config:', config);
  console.log('View mode:', viewMode, '- Stars loaded:', stars.length);

  const calculatedStars: CalculatedStar[] = [];

  for (const star of stars) {
    // Skip stars fainter than threshold
    if (star.mag > minMagnitude) continue;

    // Apply proper motion if available
    let ra = star.ra;
    let dec = star.dec;

    if (star.pmra && star.pmdec) {
      const corrected = applyProperMotion(ra, dec, star.pmra, star.pmdec, yearsSinceJ2000);
      ra = corrected.ra;
      dec = corrected.dec;
    }

    // Convert RA/Dec to equatorial coordinates (RA in hours)
    const equatorial = convertRADegToRAHours(ra, dec);

    // Convert to horizontal coordinates (Alt/Az) for observer
    const horizontal = equatorialToHorizontal(
      equatorial,
      observationInfo.location,
      julianDate
    );

    // Debug first star
    if (star.proper === 'Sirius') {
      console.log('\n--- Sirius Debug ---');
      console.log('RA (deg):', ra, 'Dec (deg):', dec);
      console.log('Equatorial (RA hours):', equatorial);
      console.log('Horizontal (Alt/Az):', horizontal);
    }

    // Project to screen coordinates
    const screen = project(horizontal, config, 'stereographic');

    if (star.proper === 'Sirius') {
      console.log('Screen:', screen);
    }

    // Skip stars that don't project to screen
    if (!screen) continue;

    // Check if star is visible (above horizon)
    const visible = horizontal.altitude > -5; // Small margin below horizon

    // Get star color from B-V index
    const color = bvToRGB(star.ci);

    // Calculate rendering radius based on magnitude
    const radius = magnitudeToRadius(star.mag, 2, minMagnitude);

    calculatedStars.push({
      id: star.id,
      name: star.proper,
      equatorial,
      horizontal,
      screen,
      magnitude: star.mag,
      color,
      visible,
      radius,
      constellation: star.con,
    });
  }

  return calculatedStars;
}

/**
 * Filter stars by visibility and magnitude
 */
export function filterStars(
  stars: CalculatedStar[],
  showOnlyVisible: boolean = true,
  maxMagnitude: number = 6.5
): CalculatedStar[] {
  return stars.filter((star) => {
    if (showOnlyVisible && !star.visible) return false;
    if (star.magnitude > maxMagnitude) return false;
    return true;
  });
}

/**
 * Get star by name
 */
export function getStarByName(name: string): StarCatalogEntry | undefined {
  const stars = loadBrightStars();
  return stars.find(
    (s) => s.proper?.toLowerCase() === name.toLowerCase()
  );
}
