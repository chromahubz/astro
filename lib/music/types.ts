/**
 * Type definitions for planetary music system
 */

/**
 * Musical note names
 */
export type NoteName = 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

/**
 * Planet names for music mapping
 */
export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';

/**
 * Oscillator waveform types
 */
export type WaveformType = 'sine' | 'triangle' | 'sawtooth' | 'square';

/**
 * Tuning system names
 */
export type TuningSystemName =
  | 'vedic'
  | 'cosmic-octave'
  | 'pythagorean'
  | 'hermetic'
  | 'rosicrucian'
  | 'modern-astrological';

/**
 * Pitch standard reference
 */
export interface PitchStandard {
  a4Frequency: number;
  name: string;
  description: string;
}

/**
 * Planetary note mapping for a tuning system
 */
export interface PlanetaryNoteMapping {
  [key: string]: NoteName;
}

/**
 * Complete tuning system definition
 */
export interface TuningSystem {
  id: TuningSystemName;
  name: string;
  description: string;
  tradition: string;
  planetNotes: PlanetaryNoteMapping;
}

/**
 * Musical note with frequency
 */
export interface MusicalNote {
  note: NoteName;
  frequency: number;
  octave: number;
  midi: number;
}

/**
 * Planet musical data
 */
export interface PlanetMusicalData {
  planet: PlanetName;
  note: NoteName;
  frequency: number;
  octave: number;
  volume: number;
  pan: number; // -1 (left) to 1 (right)
}

/**
 * Chord definition
 */
export interface Chord {
  notes: PlanetMusicalData[];
  duration: number; // seconds
  name?: string;
}

/**
 * Music player state
 */
export interface MusicPlayerState {
  isPlaying: boolean;
  currentSystem: TuningSystemName;
  pitchStandard: number; // A4 frequency in Hz
  waveform: WaveformType;
  masterVolume: number; // 0-1
  reverbAmount: number; // 0-1
  filterCutoff: number; // Hz
}

/**
 * Audio engine configuration
 */
export interface AudioEngineConfig {
  pitchStandard: number;
  waveform: WaveformType;
  attackTime: number;
  releaseTime: number;
  reverbAmount: number;
  filterCutoff: number;
}
