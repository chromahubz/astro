/**
 * Planetary Tuning Systems
 * Six verified esoteric systems for assigning musical notes to planets
 */

import { TuningSystem, TuningSystemName, PlanetaryNoteMapping, NoteName } from './types';

/**
 * 1. VEDIC/NAVAGRAHA SYSTEM
 * Traditional Hindu planetary-swara correspondences
 * Creates a complete C major scale
 */
const VEDIC_SYSTEM: TuningSystem = {
  id: 'vedic',
  name: 'Vedic/Navagraha',
  description: 'Traditional Hindu system based on swara (musical notes) and planetary deities',
  tradition: 'Ancient Indian (2000+ years)',
  planetNotes: {
    Sun: 'C',       // Sa - Foundation, root
    Moon: 'D',      // Re - Flowing, emotional
    Mercury: 'E',   // Ga - Active, communicative
    Venus: 'A',     // Dha - Beauty, harmony
    Mars: 'G',      // Pa - Energy, perfect 5th
    Jupiter: 'F',   // Ma - Expansion, wisdom
    Saturn: 'B',    // Ni - Discipline, highest
    Uranus: 'C',    // Octave
    Neptune: 'D',   // 9th
    Pluto: 'E'      // 11th
  }
};

/**
 * 2. HANS COUSTO'S COSMIC OCTAVE SYSTEM
 * Scientific calculation based on actual orbital frequencies
 * Mathematically derived from planetary orbits
 */
const COSMIC_OCTAVE_SYSTEM: TuningSystem = {
  id: 'cosmic-octave',
  name: 'Cosmic Octave (Hans Cousto)',
  description: 'Scientific system based on actual orbital frequencies octaved to audible range',
  tradition: 'Modern Scientific (1978)',
  planetNotes: {
    Sun: 'C',       // 126.22 Hz (Earth year/OM tone)
    Moon: 'G#',     // 210.42 Hz (Synodic month)
    Mercury: 'C#',  // 141.27 Hz (Orbital period)
    Venus: 'A',     // 221.23 Hz (Orbital period)
    Mars: 'D',      // 144.72 Hz (Orbital period)
    Jupiter: 'F#',  // 183.58 Hz (Orbital period)
    Saturn: 'D',    // 147.85 Hz (Orbital period)
    Uranus: 'G#',   // 207.36 Hz (Orbital period)
    Neptune: 'G#',  // 211.44 Hz (Orbital period)
    Pluto: 'C#'     // 140.25 Hz (Orbital period)
  }
};

/**
 * 3. PYTHAGOREAN/CHALDEAN SYSTEM
 * Classical "Seven Heavens" - ordered by apparent speed from Earth
 * Ancient Greek and Babylonian astronomy
 */
const PYTHAGOREAN_SYSTEM: TuningSystem = {
  id: 'pythagorean',
  name: 'Pythagorean/Chaldean',
  description: 'Classical seven heavens system based on perceived planetary speed and Music of the Spheres',
  tradition: 'Ancient Greek/Babylonian (600 BCE)',
  planetNotes: {
    Saturn: 'A',    // Slowest, lowest tone
    Jupiter: 'B',   // Next ascending
    Mars: 'C',      // Middle register
    Sun: 'D',       // Center of system
    Venus: 'E',     // Ascending
    Mercury: 'F',   // Faster, higher
    Moon: 'G',      // Fastest, highest
    Uranus: 'A',    // Extension (octave)
    Neptune: 'B',   // Extension
    Pluto: 'C'      // Extension
  }
};

/**
 * 4. HERMETIC/QABALISTIC SYSTEM
 * Based on Tree of Life (Sephiroth) correspondences
 * Golden Dawn and Rosicrucian traditions
 */
const HERMETIC_SYSTEM: TuningSystem = {
  id: 'hermetic',
  name: 'Hermetic/Qabalistic',
  description: 'Western esoteric system based on the Qabalistic Tree of Life and Sephiroth',
  tradition: 'Hermetic/Golden Dawn (Medieval-Modern)',
  planetNotes: {
    Saturn: 'B',    // Binah (3rd Sephirah)
    Jupiter: 'D',   // Chesed (4th Sephirah)
    Mars: 'C',      // Geburah (5th Sephirah)
    Sun: 'F',       // Tiphareth (6th Sephirah) - Center
    Venus: 'E',     // Netzach (7th Sephirah)
    Mercury: 'E',   // Hod (8th Sephirah)
    Moon: 'G#',     // Yesod (9th Sephirah)
    Uranus: 'A',    // Da'ath (Hidden Sephirah)
    Neptune: 'A#',  // Higher emanation
    Pluto: 'B'      // Transformative octave
  }
};

/**
 * 5. ROSICRUCIAN/ALCHEMICAL SYSTEM
 * Based on alchemical metals, planetary days, and esoteric correspondences
 * Medieval and Renaissance traditions
 */
const ROSICRUCIAN_SYSTEM: TuningSystem = {
  id: 'rosicrucian',
  name: 'Rosicrucian/Alchemical',
  description: 'Alchemical system based on planetary metals and days of the week',
  tradition: 'Rosicrucian/Alchemical (15th-17th century)',
  planetNotes: {
    Sun: 'D',       // Sunday, Gold - Center/Heart
    Moon: 'B',      // Monday, Silver - Reflective
    Mars: 'C',      // Tuesday, Iron - Active
    Mercury: 'E',   // Wednesday, Mercury - Fluid
    Jupiter: 'A',   // Thursday, Tin - Expansive
    Venus: 'F',     // Friday, Copper - Harmonious
    Saturn: 'G',    // Saturday, Lead - Dense
    Uranus: 'A#',   // Extended (Lightning)
    Neptune: 'D#',  // Extended (Sea)
    Pluto: 'F#'     // Extended (Underworld)
  }
};

/**
 * 6. MODERN ASTROLOGICAL SYSTEM (Dane Rudhyar)
 * 20th century synthesis based on harmonic ratios and astrological meaning
 * Integrates music theory with psychological astrology
 */
const MODERN_ASTROLOGICAL_SYSTEM: TuningSystem = {
  id: 'modern-astrological',
  name: 'Modern Astrological (Rudhyar)',
  description: 'Contemporary system based on harmonic ratios and psychological astrology',
  tradition: 'Modern Astrological (20th century)',
  planetNotes: {
    Sun: 'C',       // 1:1 ratio - Identity, root
    Moon: 'G',      // 3:2 ratio (Perfect 5th) - Emotional response
    Mercury: 'E',   // 5:4 ratio (Major 3rd) - Communication
    Venus: 'A',     // 5:3 ratio (Major 6th) - Harmony
    Mars: 'D',      // 9:8 ratio (Major 2nd) - Action
    Jupiter: 'F',   // 4:3 ratio (Perfect 4th) - Expansion
    Saturn: 'Bb',   // 16:9 ratio (Minor 7th) - Limitation
    Uranus: 'F#',   // Tritone - Revolutionary change
    Neptune: 'Ab',  // Minor 6th - Mystical
    Pluto: 'Db'     // Minor 2nd - Transformation
  }
};

/**
 * All available tuning systems
 */
export const TUNING_SYSTEMS: Record<TuningSystemName, TuningSystem> = {
  'vedic': VEDIC_SYSTEM,
  'cosmic-octave': COSMIC_OCTAVE_SYSTEM,
  'pythagorean': PYTHAGOREAN_SYSTEM,
  'hermetic': HERMETIC_SYSTEM,
  'rosicrucian': ROSICRUCIAN_SYSTEM,
  'modern-astrological': MODERN_ASTROLOGICAL_SYSTEM
};

/**
 * Get tuning system by ID
 */
export function getTuningSystem(id: TuningSystemName): TuningSystem {
  return TUNING_SYSTEMS[id];
}

/**
 * Get all tuning systems as array
 */
export function getAllTuningSystems(): TuningSystem[] {
  return Object.values(TUNING_SYSTEMS);
}

/**
 * Get note for a planet in a specific tuning system
 */
export function getPlanetNote(planet: string, systemId: TuningSystemName): NoteName {
  const system = TUNING_SYSTEMS[systemId];
  const note = system.planetNotes[planet];

  if (!note) {
    throw new Error(`Planet "${planet}" not found in system "${systemId}"`);
  }

  return note as NoteName;
}

/**
 * Default octave assignments for planets (for musical voicing)
 */
export const PLANET_OCTAVES: Record<string, number> = {
  Sun: 4,       // Middle octave
  Moon: 5,      // Higher octave
  Mercury: 5,   // Higher octave
  Venus: 4,     // Middle octave
  Mars: 4,      // Middle octave
  Jupiter: 3,   // Lower octave
  Saturn: 3,    // Lower octave
  Uranus: 5,    // Higher octave
  Neptune: 5,   // Higher octave
  Pluto: 3      // Lower octave
};

/**
 * Get recommended octave for a planet
 */
export function getPlanetOctave(planet: string): number {
  return PLANET_OCTAVES[planet] || 4;
}
