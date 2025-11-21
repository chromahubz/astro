/**
 * Pitch Standards and Frequency Calculations
 * Supports multiple tuning references (432Hz, 440Hz, 444Hz, 528Hz, custom)
 */

import { PitchStandard, NoteName, MusicalNote } from './types';

/**
 * Available pitch standards
 */
export const PITCH_STANDARDS: Record<string, PitchStandard> = {
  '432': {
    a4Frequency: 432,
    name: 'Verdi Tuning (432 Hz)',
    description: 'Natural healing frequency, mathematically consistent with universe'
  },
  '440': {
    a4Frequency: 440,
    name: 'Concert Pitch (440 Hz)',
    description: 'Modern standard tuning used worldwide'
  },
  '444': {
    a4Frequency: 444,
    name: 'Crystal Tuning (444 Hz)',
    description: 'Higher clarity, C=528Hz, associated with crystal healing'
  },
  '528': {
    a4Frequency: 528,
    name: 'Solfeggio MI (528 Hz)',
    description: 'DNA repair frequency from ancient Solfeggio scale'
  }
};

/**
 * Note to semitone offset from A4
 * A4 = 0, A#4 = 1, B4 = 2, C4 = -9, etc.
 */
const NOTE_TO_SEMITONE: Record<string, number> = {
  'C': -9,
  'C#': -8,
  'Db': -8,
  'D': -7,
  'D#': -6,
  'Eb': -6,
  'E': -5,
  'F': -4,
  'F#': -3,
  'Gb': -3,
  'G': -2,
  'G#': -1,
  'Ab': -1,
  'A': 0,
  'A#': 1,
  'Bb': 1,
  'B': 2
};

/**
 * Calculate frequency for a given note and octave
 *
 * @param note - Note name (C, D, E, etc.)
 * @param octave - Octave number (4 = middle octave, A4 = 440Hz in standard tuning)
 * @param a4Reference - A4 frequency reference (default 440Hz)
 * @returns Frequency in Hz
 *
 * Formula: frequency = a4_reference * 2^((semitone - 69) / 12)
 * where semitone = (octave * 12) + note_offset + 69
 */
export function calculateNoteFrequency(
  note: NoteName,
  octave: number,
  a4Reference: number = 440
): number {
  const semitoneOffset = NOTE_TO_SEMITONE[note];
  if (semitoneOffset === undefined) {
    throw new Error(`Invalid note name: ${note}`);
  }

  // A4 is MIDI note 69
  // Calculate MIDI note number: (octave + 1) * 12 + semitone_offset_from_C
  const midiNote = (octave + 1) * 12 + (semitoneOffset + 9);

  // Calculate frequency using equal temperament formula
  const frequency = a4Reference * Math.pow(2, (midiNote - 69) / 12);

  return frequency;
}

/**
 * Calculate MIDI note number
 *
 * @param note - Note name
 * @param octave - Octave number
 * @returns MIDI note number (0-127)
 */
export function calculateMidiNote(note: NoteName, octave: number): number {
  const semitoneOffset = NOTE_TO_SEMITONE[note];
  if (semitoneOffset === undefined) {
    throw new Error(`Invalid note name: ${note}`);
  }

  return (octave + 1) * 12 + (semitoneOffset + 9);
}

/**
 * Create a complete musical note object
 *
 * @param note - Note name
 * @param octave - Octave number
 * @param a4Reference - A4 frequency reference
 * @returns Complete musical note with frequency and MIDI info
 */
export function createMusicalNote(
  note: NoteName,
  octave: number,
  a4Reference: number = 440
): MusicalNote {
  return {
    note,
    frequency: calculateNoteFrequency(note, octave, a4Reference),
    octave,
    midi: calculateMidiNote(note, octave)
  };
}

/**
 * Get all notes in an octave with frequencies
 *
 * @param octave - Octave number
 * @param a4Reference - A4 frequency reference
 * @returns Array of all 12 chromatic notes in the octave
 */
export function getOctaveNotes(
  octave: number,
  a4Reference: number = 440
): MusicalNote[] {
  const notes: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return notes.map(note => createMusicalNote(note, octave, a4Reference));
}

/**
 * Convert frequency to nearest note
 *
 * @param frequency - Frequency in Hz
 * @param a4Reference - A4 frequency reference
 * @returns Nearest note name and octave
 */
export function frequencyToNote(
  frequency: number,
  a4Reference: number = 440
): { note: NoteName; octave: number; cents: number } {
  // Calculate MIDI note from frequency
  const midiNote = 69 + 12 * Math.log2(frequency / a4Reference);
  const roundedMidi = Math.round(midiNote);
  const cents = Math.round((midiNote - roundedMidi) * 100);

  // Convert MIDI to note and octave
  const octave = Math.floor(roundedMidi / 12) - 1;
  const noteIndex = roundedMidi % 12;

  const notes: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = notes[noteIndex];

  return { note, octave, cents };
}

/**
 * Validate if a number is a valid pitch standard
 *
 * @param hz - Frequency in Hz
 * @returns True if valid (between 400-600 Hz)
 */
export function isValidPitchStandard(hz: number): boolean {
  return hz >= 400 && hz <= 600;
}
