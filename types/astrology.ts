/**
 * Type definitions for astrology calculations and birth charts
 */

import { ZodiacPosition, ZodiacSign } from '@/lib/astrology/zodiac';
import { Houses, HouseSystem } from '@/lib/astrology/houses';
import { Aspect } from '@/lib/astrology/aspects';
import { ChartAngles } from '@/lib/astrology/ascendant';

/**
 * Planet placement in the birth chart
 */
export interface PlanetPlacement {
  name: string;
  symbol: string;
  zodiacPosition: ZodiacPosition;
  houseNumber: number;
  isRetrograde: boolean;
}

/**
 * Complete birth chart data
 */
export interface BirthChartData {
  // Chart metadata
  date: Date;
  location: {
    latitude: number;
    longitude: number;
    elevation?: number;
    locationName?: string;
  };

  // Core chart elements
  angles: ChartAngles;
  houses: Houses;
  planets: PlanetPlacement[];
  aspects: Aspect[];

  // Patterns and configurations
  patterns: ChartPatterns;

  // Cached interpretations
  interpretations?: BirthChartInterpretations;
}

/**
 * Chart patterns and configurations
 */
export interface ChartPatterns {
  grandTrines: string[][];   // Arrays of 3 planet names forming grand trines
  tSquares: string[][];       // Arrays of 3 planet names forming T-squares
  grandCrosses: string[][];   // Arrays of 4 planet names forming grand crosses
  stelliums: Stellium[];      // Groups of 3+ planets in same sign or house
  unaspectedPlanets: string[]; // Planets with no major aspects
}

/**
 * Stellium (3+ planets in same sign or house)
 */
export interface Stellium {
  type: 'sign' | 'house';
  location: string | number;  // Sign name or house number
  planets: string[];
  strength: number;  // Number of planets
}

/**
 * All interpretations for a birth chart
 */
export interface BirthChartInterpretations {
  // Overview and general themes
  overview: string;
  sunMoonRising: string;

  // Individual planet interpretations
  planetInterpretations: PlanetInterpretation[];

  // Aspect interpretations
  aspectInterpretations: AspectInterpretation[];

  // House emphasis
  houseEmphasis: string;

  // Element and modality balance
  elementBalance: ElementBalance;
  modalityBalance: ModalityBalance;

  // Special patterns
  patterns: string[];  // Descriptions of grand trines, T-squares, etc.
}

/**
 * Interpretation for a single planet placement
 */
export interface PlanetInterpretation {
  planet: string;
  sign: ZodiacSign;
  house: number;
  signInterpretation: string;
  houseInterpretation: string;
  combinedInterpretation: string;
}

/**
 * Interpretation for an aspect
 */
export interface AspectInterpretation {
  planet1: string;
  planet2: string;
  aspectType: string;
  aspectSymbol: string;
  interpretation: string;
  orb: number;
}

/**
 * Element distribution in the chart
 */
export interface ElementBalance {
  fire: number;
  earth: number;
  air: number;
  water: number;
  dominantElement: 'Fire' | 'Earth' | 'Air' | 'Water';
  summary: string;
}

/**
 * Modality distribution in the chart
 */
export interface ModalityBalance {
  cardinal: number;
  fixed: number;
  mutable: number;
  dominantModality: 'Cardinal' | 'Fixed' | 'Mutable';
  summary: string;
}

/**
 * Birth chart calculation options
 */
export interface BirthChartOptions {
  houseSystem: HouseSystem;
  includeMinorAspects: boolean;
  calculatePatterns: boolean;
  generateInterpretations: boolean;
}

/**
 * Default options for birth chart calculation
 */
export const DEFAULT_BIRTH_CHART_OPTIONS: BirthChartOptions = {
  houseSystem: 'placidus',
  includeMinorAspects: true,
  calculatePatterns: true,
  generateInterpretations: true,
};
