'use client';

import { useState, useEffect, useRef } from 'react';
import { BirthChartData } from '@/types/astrology';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TuningSystemName, WaveformType, MusicPlayerState } from '@/lib/music/types';
import { AudioEngine, createAudioEngine } from '@/lib/music/audioEngine';
import { generatePlanetaryMusic, generateProgression } from '@/lib/music/harmonyAnalyzer';
import { getAllTuningSystems } from '@/lib/music/planetaryTunings';
import { PITCH_STANDARDS } from '@/lib/music/pitchStandards';

interface PlanetaryMusicPlayerProps {
  birthChart: BirthChartData;
}

export function PlanetaryMusicPlayer({ birthChart }: PlanetaryMusicPlayerProps) {
  const [playerState, setPlayerState] = useState<MusicPlayerState>({
    isPlaying: false,
    currentSystem: 'vedic',
    pitchStandard: 440,
    waveform: 'sine',
    masterVolume: 0.5,
    reverbAmount: 0.3,
    filterCutoff: 2000
  });

  const [customHz, setCustomHz] = useState<string>('440');
  const [currentChord, setCurrentChord] = useState<any>(null);
  const [currentChordName, setCurrentChordName] = useState<string>('');
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const progressionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentChordIndexRef = useRef<number>(0);

  // Initialize audio engine
  useEffect(() => {
    const engine = createAudioEngine(playerState.pitchStandard, playerState.waveform);
    audioEngineRef.current = engine;

    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.dispose();
      }
    };
  }, []);

  // Handle play/pause
  const handlePlayPause = async () => {
    if (!audioEngineRef.current) return;

    if (playerState.isPlaying) {
      // Stop immediately
      audioEngineRef.current.stopAllImmediate();
      if (progressionIntervalRef.current) {
        clearInterval(progressionIntervalRef.current);
        progressionIntervalRef.current = null;
      }
      currentChordIndexRef.current = 0;
      setCurrentChord(null);
      setCurrentChordName('');
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } else {
      // Play
      await audioEngineRef.current.initialize();
      await audioEngineRef.current.resume();

      // Generate music from chart
      const planetaryMusic = generatePlanetaryMusic(
        birthChart,
        playerState.currentSystem,
        playerState.pitchStandard
      );

      const progression = generateProgression(planetaryMusic, birthChart.aspects);

      // Play first chord
      playChord(0, progression);

      // Set up progression loop
      progressionIntervalRef.current = setInterval(() => {
        currentChordIndexRef.current = (currentChordIndexRef.current + 1) % progression.length;
        playChord(currentChordIndexRef.current, progression);
      }, 6000); // 6 seconds per chord

      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const playChord = (index: number, progression: any[]) => {
    if (!audioEngineRef.current) return;

    // Stop all current notes
    audioEngineRef.current.stopAll();

    // Play new chord
    const chord = progression[index];
    setCurrentChord(chord);
    setCurrentChordName(chord.name || `Chord ${index + 1}`);

    for (const note of chord.notes) {
      audioEngineRef.current.playNote(note.planet, note);
    }
  };

  // Update tuning system
  const handleSystemChange = (system: TuningSystemName) => {
    setPlayerState(prev => ({ ...prev, currentSystem: system }));
    if (playerState.isPlaying) {
      handlePlayPause(); // Stop if playing
    }
  };

  // Update pitch standard
  const handlePitchStandardChange = (hz: number) => {
    setPlayerState(prev => ({ ...prev, pitchStandard: hz }));
    if (audioEngineRef.current) {
      // Recreate engine with new pitch standard
      audioEngineRef.current.dispose();
      const newEngine = createAudioEngine(hz, playerState.waveform);
      audioEngineRef.current = newEngine;
    }
    if (playerState.isPlaying) {
      handlePlayPause(); // Stop if playing
    }
  };

  // Update waveform
  const handleWaveformChange = (waveform: WaveformType) => {
    setPlayerState(prev => ({ ...prev, waveform }));
    if (audioEngineRef.current) {
      audioEngineRef.current.setWaveform(waveform);
    }
  };

  // Update master volume
  const handleVolumeChange = (value: number[]) => {
    const volume = value[0];
    setPlayerState(prev => ({ ...prev, masterVolume: volume }));
    if (audioEngineRef.current) {
      audioEngineRef.current.setMasterVolume(volume);
    }
  };

  // Update reverb
  const handleReverbChange = (value: number[]) => {
    const reverb = value[0];
    setPlayerState(prev => ({ ...prev, reverbAmount: reverb }));
    if (audioEngineRef.current) {
      audioEngineRef.current.setReverbAmount(reverb);
    }
  };

  // Update filter
  const handleFilterChange = (value: number[]) => {
    const cutoff = value[0];
    setPlayerState(prev => ({ ...prev, filterCutoff: cutoff }));
    if (audioEngineRef.current) {
      audioEngineRef.current.setFilterCutoff(cutoff);
    }
  };

  const tuningSystems = getAllTuningSystems();
  const selectedSystem = tuningSystems.find(s => s.id === playerState.currentSystem);

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Planetary Music Generator</h2>
        <div className="text-sm text-gray-400">
          {playerState.isPlaying ? '▶ Playing' : '⏸ Stopped'}
        </div>
      </div>

      {/* System Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-300">Tuning System</label>
        <select
          value={playerState.currentSystem}
          onChange={(e) => handleSystemChange(e.target.value as TuningSystemName)}
          className="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm"
        >
          {tuningSystems.map(system => (
            <option key={system.id} value={system.id}>
              {system.name} - {system.tradition}
            </option>
          ))}
        </select>
        {selectedSystem && (
          <p className="text-xs text-gray-400">{selectedSystem.description}</p>
        )}
      </div>

      {/* Pitch Standard Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-300">Pitch Standard (A4)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(PITCH_STANDARDS).map(([key, standard]) => (
            <button
              key={key}
              onClick={() => handlePitchStandardChange(standard.a4Frequency)}
              className={`px-3 py-2 rounded text-sm transition ${
                playerState.pitchStandard === standard.a4Frequency
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {key} Hz
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">Custom:</span>
          <input
            type="number"
            value={customHz}
            onChange={(e) => setCustomHz(e.target.value)}
            className="bg-slate-700 text-white rounded px-2 py-1 text-sm w-20"
            min="400"
            max="600"
          />
          <Button
            onClick={() => handlePitchStandardChange(parseInt(customHz))}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Apply
          </Button>
        </div>
        <p className="text-xs text-gray-400">
          Current: {playerState.pitchStandard} Hz
          {playerState.pitchStandard === 432 && ' (Healing frequency)'}
          {playerState.pitchStandard === 440 && ' (Concert standard)'}
        </p>
      </div>

      {/* Waveform Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-300">Waveform</label>
        <div className="grid grid-cols-4 gap-2">
          {(['sine', 'triangle', 'sawtooth', 'square'] as WaveformType[]).map(waveform => (
            <button
              key={waveform}
              onClick={() => handleWaveformChange(waveform)}
              className={`px-3 py-2 rounded text-sm capitalize transition ${
                playerState.waveform === waveform
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {waveform}
            </button>
          ))}
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handlePlayPause}
          size="lg"
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {playerState.isPlaying ? '⏸ Pause' : '▶ Play'}
        </Button>
      </div>

      {/* Volume & Effects */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Master Volume: {Math.round(playerState.masterVolume * 100)}%
          </label>
          <Slider
            value={[playerState.masterVolume]}
            onValueChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Reverb: {Math.round(playerState.reverbAmount * 100)}%
          </label>
          <Slider
            value={[playerState.reverbAmount]}
            onValueChange={handleReverbChange}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Filter Cutoff: {Math.round(playerState.filterCutoff)} Hz
          </label>
          <Slider
            value={[playerState.filterCutoff]}
            onValueChange={handleFilterChange}
            min={200}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>
      </div>

      {/* Currently Playing Display */}
      {playerState.isPlaying && currentChord && (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            Now Playing: {currentChordName}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {currentChord.notes.map((note: any, index: number) => (
              <div
                key={index}
                className="bg-slate-800/60 border border-purple-400/20 rounded-lg p-3 transform transition hover:scale-105"
              >
                <div className="text-white font-semibold text-sm mb-1">
                  {note.planet}
                </div>
                <div className="text-purple-300 text-xs font-mono">
                  {note.note}{note.octave}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {note.frequency.toFixed(2)} Hz
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-slate-700 rounded p-3 text-xs text-gray-300 space-y-1">
        <div>🎵 System: {selectedSystem?.name}</div>
        <div>🎹 Pitch: A4 = {playerState.pitchStandard} Hz</div>
        <div>🌊 Waveform: {playerState.waveform}</div>
        <div>🌌 Planets: {birthChart.planets.length} voices</div>
      </div>
    </div>
  );
}
