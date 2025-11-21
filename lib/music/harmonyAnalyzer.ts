/**
 * Harmony Analyzer
 * Converts birth chart aspects into musical chords and progressions
 */

import { BirthChartData, Aspect } from '@/types/astrology';
import { PlanetMusicalData, TuningSystemName, Chord } from './types';
import { getPlanetNote, getPlanetOctave } from './planetaryTunings';
import { calculateNoteFrequency } from './pitchStandards';
import { calculateHousePanning } from './spatialAudio';

/**
 * Generate musical data for all planets in birth chart
 */
export function generatePlanetaryMusic(
  birthChart: BirthChartData,
  tuningSystem: TuningSystemName,
  pitchStandard: number
): PlanetMusicalData[] {
  return birthChart.planets.map(planet => {
    const note = getPlanetNote(planet.name, tuningSystem);
    const octave = getPlanetOctave(planet.name);
    const frequency = calculateNoteFrequency(note, octave, pitchStandard);

    // Calculate volume based on aspects
    const volume = calculatePlanetVolume(planet.name, birthChart.aspects);

    // Calculate panning based on house position
    const pan = calculateHousePanning(planet.houseNumber);

    return {
      planet: planet.name,
      note,
      frequency,
      octave,
      volume,
      pan
    };
  });
}

/**
 * Calculate planet volume based on aspect strength
 * Planets with more harmonious aspects play louder
 */
function calculatePlanetVolume(planetName: string, aspects: Aspect[]): number {
  let score = 0.3; // Base volume

  for (const aspect of aspects) {
    if (aspect.planet1 === planetName || aspect.planet2 === planetName) {
      // Harmonious aspects increase volume
      if (aspect.quality === 'harmonious') {
        score += 0.15 * (1 - aspect.orb / 10); // Tighter orb = more volume
      }
      // Challenging aspects add moderate volume
      else if (aspect.quality === 'challenging') {
        score += 0.08 * (1 - aspect.orb / 10);
      }
    }
  }

  // Clamp between 0.1 and 0.7
  return Math.max(0.1, Math.min(0.7, score));
}

/**
 * Group planets into chords based on harmonious aspects
 */
export function generateChords(
  planetaryMusic: PlanetMusicalData[],
  aspects: Aspect[]
): Chord[] {
  const chords: Chord[] = [];

  // Find harmonious aspect groups
  const harmonicGroups = findHarmonicGroups(aspects);

  for (const group of harmonicGroups) {
    // Get planets in this harmonic group
    const chordNotes = planetaryMusic.filter(pm =>
      group.includes(pm.planet)
    );

    if (chordNotes.length >= 2) {
      chords.push({
        notes: chordNotes,
        duration: 6, // 6 seconds per chord
        name: `${chordNotes.map(n => n.planet).join('-')} Harmony`
      });
    }
  }

  // If no harmonic groups found, create a simple chord with all planets
  if (chords.length === 0) {
    chords.push({
      notes: planetaryMusic,
      duration: 8,
      name: 'Full Chart'
    });
  }

  return chords;
}

/**
 * Find groups of planets connected by harmonious aspects
 */
function findHarmonicGroups(aspects: Aspect[]): string[][] {
  const groups: string[][] = [];

  // Get harmonious aspects
  const harmonious = aspects.filter(a => a.quality === 'harmonious');

  // Build groups
  for (const aspect of harmonious) {
    let foundGroup = false;

    for (const group of groups) {
      if (group.includes(aspect.planet1) || group.includes(aspect.planet2)) {
        if (!group.includes(aspect.planet1)) group.push(aspect.planet1);
        if (!group.includes(aspect.planet2)) group.push(aspect.planet2);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      groups.push([aspect.planet1, aspect.planet2]);
    }
  }

  return groups;
}

/**
 * Create a simple chord progression from the chart
 */
export function generateProgression(
  planetaryMusic: PlanetMusicalData[],
  aspects: Aspect[]
): Chord[] {
  const chords = generateChords(planetaryMusic, aspects);

  // If we have multiple chords, create a progression
  if (chords.length > 1) {
    return chords.slice(0, 4); // Max 4 chords
  }

  // If only one chord, create variations
  if (chords.length === 1) {
    const baseChord = chords[0];
    const progression: Chord[] = [];

    // Chord 1: Full chord
    progression.push(baseChord);

    // Chord 2: Remove highest notes
    progression.push({
      ...baseChord,
      notes: baseChord.notes.filter(n => n.octave <= 4)
    });

    // Chord 3: Remove lowest notes
    progression.push({
      ...baseChord,
      notes: baseChord.notes.filter(n => n.octave >= 4)
    });

    // Chord 4: Back to full
    progression.push(baseChord);

    return progression;
  }

  return chords;
}

/**
 * Analyze chart for dominant element/modality to inform harmony
 */
export function analyzeChartTonality(birthChart: BirthChartData): {
  dominantElement: string;
  dominantModality: string;
  suggestion: string;
} {
  // This is simplified - you could expand based on element/modality balance
  const elementBalance = birthChart.interpretations?.elementBalance;
  const modalityBalance = birthChart.interpretations?.modalityBalance;

  if (!elementBalance || !modalityBalance) {
    return {
      dominantElement: 'balanced',
      dominantModality: 'balanced',
      suggestion: 'Harmonious blend of all elements'
    };
  }

  // Find dominant element
  const elements = { ...elementBalance };
  delete (elements as any).summary;
  const dominantElement = Object.entries(elements).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  // Find dominant modality
  const modalities = { ...modalityBalance };
  delete (modalities as any).summary;
  const dominantModality = Object.entries(modalities).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  const suggestions: Record<string, string> = {
    fire: 'Bright, energetic tones with active movement',
    earth: 'Grounded, sustained bass tones',
    air: 'Light, flowing melodies in higher registers',
    water: 'Fluid, reverberant ambient textures'
  };

  return {
    dominantElement,
    dominantModality,
    suggestion: suggestions[dominantElement.toLowerCase()] || 'Balanced harmonic blend'
  };
}
