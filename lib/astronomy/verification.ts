/**
 * Verification utilities to test astronomical accuracy
 * Compare our calculations against known star positions
 */

import { dateToJulian } from './julianDate';
import { calculateLMST, calculateGMST, degreesToRadians, radiansToDegrees } from './siderealTime';
import { equatorialToHorizontal } from './coordinates';
import { ObserverLocation, EquatorialCoordinate } from '@/types';

/**
 * Known test cases for verification
 * Sources: Stellarium, SkySafari, US Naval Observatory
 */

export interface VerificationTestCase {
  name: string;
  date: Date;
  location: ObserverLocation;
  star: {
    name: string;
    ra: number; // degrees
    dec: number; // degrees
  };
  expectedHorizontal: {
    altitude: number; // degrees
    azimuth: number; // degrees
  };
  tolerance: number; // degrees (acceptable error)
}

/**
 * Test cases for well-known scenarios
 */
export const verificationTests: VerificationTestCase[] = [
  {
    name: 'Polaris at North Pole',
    date: new Date('2025-01-01T00:00:00Z'),
    location: { latitude: 90, longitude: 0 },
    star: {
      name: 'Polaris',
      ra: 37.95, // ~2h 31m
      dec: 89.26,
    },
    expectedHorizontal: {
      altitude: 89.26, // Should be at altitude = declination at North Pole
      azimuth: 0, // Any azimuth (circumpolar at zenith)
    },
    tolerance: 1.0,
  },
  {
    name: 'Star on celestial equator at equator',
    date: new Date('2025-03-20T12:00:00Z'), // Vernal equinox
    location: { latitude: 0, longitude: 0 },
    star: {
      name: 'Equatorial star at meridian',
      ra: 180, // 12h (on meridian at noon)
      dec: 0,
    },
    expectedHorizontal: {
      altitude: 90, // Directly overhead
      azimuth: 180,
    },
    tolerance: 2.0,
  },
  {
    name: 'Sirius from New York - Winter Evening',
    date: new Date('2025-01-15T02:00:00Z'), // 9 PM EST
    location: { latitude: 40.7128, longitude: -74.006 }, // New York
    star: {
      name: 'Sirius',
      ra: 101.287,
      dec: -16.716,
    },
    expectedHorizontal: {
      altitude: 30, // Approximate - high in southern sky
      azimuth: 180, // South
    },
    tolerance: 5.0,
  },
  {
    name: 'Vega from London - Summer Night',
    date: new Date('2025-07-01T22:00:00Z'), // 11 PM BST
    location: { latitude: 51.5074, longitude: -0.1278 }, // London
    star: {
      name: 'Vega',
      ra: 279.235,
      dec: 38.784,
    },
    expectedHorizontal: {
      altitude: 60, // High overhead in summer
      azimuth: 270, // Roughly west
    },
    tolerance: 10.0,
  },
];

/**
 * Run a verification test
 */
export function runVerificationTest(test: VerificationTestCase): {
  passed: boolean;
  calculated: { altitude: number; azimuth: number };
  expected: { altitude: number; azimuth: number };
  errors: { altitude: number; azimuth: number };
  details: string;
} {
  const julianDate = dateToJulian(test.date);

  // Convert RA from degrees to hours
  const equatorial: EquatorialCoordinate = {
    rightAscension: test.star.ra / 15.0,
    declination: test.star.dec,
  };

  // Calculate horizontal coordinates
  const calculated = equatorialToHorizontal(equatorial, test.location, julianDate);

  // Calculate errors
  const altError = Math.abs(calculated.altitude - test.expectedHorizontal.altitude);
  const azError = Math.abs(calculated.azimuth - test.expectedHorizontal.azimuth);

  // Azimuth error handling (circular)
  const azErrorWrapped = Math.min(azError, 360 - azError);

  const passed = altError <= test.tolerance && azErrorWrapped <= test.tolerance;

  const details = `
Test: ${test.name}
Star: ${test.star.name} (RA: ${test.star.ra.toFixed(2)}°, Dec: ${test.star.dec.toFixed(2)}°)
Date: ${test.date.toISOString()}
Location: ${test.location.latitude.toFixed(4)}°, ${test.location.longitude.toFixed(4)}°
Expected: Alt ${test.expectedHorizontal.altitude.toFixed(2)}°, Az ${test.expectedHorizontal.azimuth.toFixed(2)}°
Calculated: Alt ${calculated.altitude.toFixed(2)}°, Az ${calculated.azimuth.toFixed(2)}°
Error: Alt ${altError.toFixed(2)}°, Az ${azErrorWrapped.toFixed(2)}°
Status: ${passed ? '✓ PASS' : '✗ FAIL'}
  `.trim();

  return {
    passed,
    calculated: {
      altitude: calculated.altitude,
      azimuth: calculated.azimuth,
    },
    expected: test.expectedHorizontal,
    errors: {
      altitude: altError,
      azimuth: azErrorWrapped,
    },
    details,
  };
}

/**
 * Run all verification tests
 */
export function runAllVerificationTests(): {
  totalTests: number;
  passed: number;
  failed: number;
  results: Array<ReturnType<typeof runVerificationTest>>;
} {
  const results = verificationTests.map(runVerificationTest);

  return {
    totalTests: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => r.passed).length,
    results,
  };
}

/**
 * Verify sidereal time calculation against known values
 */
export function verifySiderealTime(): {
  testName: string;
  calculated: number;
  expected: number;
  error: number;
  passed: boolean;
  details: string;
}[] {
  const tests = [
    {
      name: 'GMST at J2000 epoch',
      date: new Date('2000-01-01T12:00:00Z'),
      expectedGMST: 280.46, // degrees (approximately)
      tolerance: 1.0,
    },
    {
      name: 'GMST at specific time',
      date: new Date('2025-01-01T00:00:00Z'),
      expectedGMST: 100.5, // Approximate
      tolerance: 5.0,
    },
  ];

  return tests.map((test) => {
    const julianDate = dateToJulian(test.date);
    const calculated = calculateGMST(julianDate);
    const error = Math.abs(calculated - test.expectedGMST);
    const passed = error <= test.tolerance;

    return {
      testName: test.name,
      calculated,
      expected: test.expectedGMST,
      error,
      passed,
      details: `${test.name}: Expected ${test.expectedGMST.toFixed(2)}°, Got ${calculated.toFixed(2)}° (Error: ${error.toFixed(2)}°) - ${passed ? 'PASS' : 'FAIL'}`,
    };
  });
}

/**
 * Compare with Stellarium at specific time
 * Stellarium is a gold standard for amateur astronomy software
 */
export function createStellariumComparisonTest(
  starName: string,
  ra: number,
  dec: number,
  date: Date,
  location: ObserverLocation,
  stellariumAlt: number,
  stellariumAz: number
): string {
  const julianDate = dateToJulian(date);
  const equatorial: EquatorialCoordinate = {
    rightAscension: ra / 15.0,
    declination: dec,
  };

  const calculated = equatorialToHorizontal(equatorial, location, julianDate);
  const altError = Math.abs(calculated.altitude - stellariumAlt);
  const azError = Math.abs(calculated.azimuth - stellariumAz);
  const azErrorWrapped = Math.min(azError, 360 - azError);

  return `
=== Stellarium Comparison: ${starName} ===
Date: ${date.toISOString()}
Location: ${location.latitude}°, ${location.longitude}°

Stellarium Data:
  Altitude: ${stellariumAlt.toFixed(4)}°
  Azimuth: ${stellariumAz.toFixed(4)}°

Our Calculation:
  Altitude: ${calculated.altitude.toFixed(4)}°
  Azimuth: ${calculated.azimuth.toFixed(4)}°

Error:
  Altitude: ${altError.toFixed(4)}° (${altError < 1 ? 'Excellent' : altError < 5 ? 'Good' : 'Check calculations'})
  Azimuth: ${azErrorWrapped.toFixed(4)}° (${azErrorWrapped < 1 ? 'Excellent' : azErrorWrapped < 5 ? 'Good' : 'Check calculations'})

Accuracy: ${altError < 1 && azErrorWrapped < 1 ? '✓ Within 1 arcminute' : altError < 5 && azErrorWrapped < 5 ? '✓ Within 5°' : '✗ Significant error'}
  `.trim();
}
