/**
 * Audio Engine using Web Audio API
 * Clean single-oscillator synthesis with smooth pad envelopes
 */

import { WaveformType, AudioEngineConfig, PlanetMusicalData } from './types';

/**
 * Voice (active note) in the audio engine
 */
interface Voice {
  oscillator: OscillatorNode;
  gainNode: GainNode;
  panNode: StereoPannerNode;
  startTime: number;
  frequency: number;
  id: number; // Unique ID to prevent cleanup race conditions
}

/**
 * Audio Engine class for planetary music synthesis
 */
export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;

  private activeVoices: Map<string, Voice> = new Map();
  private config: AudioEngineConfig;
  private nextVoiceId: number = 0; // Counter for unique voice IDs

  constructor(config: AudioEngineConfig) {
    this.config = config;
  }

  /**
   * Initialize audio context and nodes
   */
  async initialize(): Promise<void> {
    if (this.audioContext) {
      return; // Already initialized
    }

    // Create audio context
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create master gain
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.5;

    // Create filter (low-pass)
    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = this.config.filterCutoff;
    this.filterNode.Q.value = 1;

    // Create reverb
    this.reverbNode = await this.createReverb();

    // Create wet/dry gains for reverb mix
    this.dryGain = this.audioContext.createGain();
    this.wetGain = this.audioContext.createGain();

    // Set initial wet/dry balance based on config
    const reverbAmount = this.config.reverbAmount;
    this.dryGain.gain.value = 1 - reverbAmount; // Dry signal
    this.wetGain.gain.value = reverbAmount;     // Wet signal (reverb)

    // Connect: filter → [dry path + wet path] → master → destination
    // Dry path: filter → dryGain → master
    this.filterNode.connect(this.dryGain);
    this.dryGain.connect(this.masterGain);

    // Wet path: filter → reverb → wetGain → master
    this.filterNode.connect(this.reverbNode);
    this.reverbNode.connect(this.wetGain);
    this.wetGain.connect(this.masterGain);

    // Master to destination
    this.masterGain.connect(this.audioContext.destination);
  }

  /**
   * Create reverb effect using convolution
   */
  private async createReverb(): Promise<ConvolverNode> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    const convolver = this.audioContext.createConvolver();

    // Create impulse response for reverb (simple room simulation)
    const sampleRate = this.audioContext.sampleRate;
    const reverbTime = 2; // 2 seconds
    const length = sampleRate * reverbTime;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Exponential decay
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }

    convolver.buffer = impulse;
    return convolver;
  }

  /**
   * Start playing a note
   */
  playNote(
    planet: string,
    musicalData: PlanetMusicalData
  ): void {
    if (!this.audioContext || !this.filterNode) {
      throw new Error('Audio engine not initialized');
    }

    // Stop existing note for this planet
    this.stopNote(planet);

    const now = this.audioContext.currentTime;

    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = this.config.waveform;
    oscillator.frequency.value = musicalData.frequency;

    // Create gain node for this voice
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0; // Start at 0

    // Create pan node
    const panNode = this.audioContext.createStereoPanner();
    panNode.pan.value = musicalData.pan;

    // Connect: oscillator → gain → pan → filter
    oscillator.connect(gainNode);
    gainNode.connect(panNode);
    panNode.connect(this.filterNode);

    // Apply smooth envelope (Attack)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(
      musicalData.volume,
      now + this.config.attackTime
    );

    // Start oscillator
    oscillator.start(now);

    // Generate unique ID for this voice
    const voiceId = this.nextVoiceId++;

    // Store voice
    this.activeVoices.set(planet, {
      oscillator,
      gainNode,
      panNode,
      startTime: now,
      frequency: musicalData.frequency,
      id: voiceId
    });
  }

  /**
   * Stop playing a note
   */
  stopNote(planet: string): void {
    const voice = this.activeVoices.get(planet);
    if (!voice || !this.audioContext) {
      return;
    }

    const now = this.audioContext.currentTime;
    const voiceId = voice.id; // Capture the voice ID

    // Apply release envelope
    voice.gainNode.gain.cancelScheduledValues(now);
    voice.gainNode.gain.setValueAtTime(voice.gainNode.gain.value, now);
    voice.gainNode.gain.linearRampToValueAtTime(0, now + this.config.releaseTime);

    // Schedule oscillator stop
    try {
      voice.oscillator.stop(now + this.config.releaseTime);
    } catch (e) {
      // Oscillator might already be stopped
    }

    // Remove from active voices after release
    // Only delete if the voice ID matches (prevents deleting a new voice that replaced this one)
    setTimeout(() => {
      const currentVoice = this.activeVoices.get(planet);
      if (currentVoice && currentVoice.id === voiceId) {
        this.activeVoices.delete(planet);
      }
    }, this.config.releaseTime * 1000 + 100);
  }

  /**
   * Stop all notes
   */
  stopAll(): void {
    for (const planet of this.activeVoices.keys()) {
      this.stopNote(planet);
    }
  }

  /**
   * Stop all notes immediately (for pause/stop)
   */
  stopAllImmediate(): void {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const quickRelease = 0.05; // 50ms quick fade to prevent clicks

    for (const [planet, voice] of this.activeVoices.entries()) {
      // Quick fade out
      voice.gainNode.gain.cancelScheduledValues(now);
      voice.gainNode.gain.setValueAtTime(voice.gainNode.gain.value, now);
      voice.gainNode.gain.linearRampToValueAtTime(0, now + quickRelease);

      // Stop oscillator immediately after fade
      try {
        voice.oscillator.stop(now + quickRelease);
      } catch (e) {
        // Oscillator might already be stopped
      }

      // Disconnect nodes
      setTimeout(() => {
        try {
          voice.oscillator.disconnect();
          voice.gainNode.disconnect();
          voice.panNode.disconnect();
        } catch (e) {
          // Already disconnected
        }
      }, quickRelease * 1000 + 10);
    }

    // Clear all voices immediately
    this.activeVoices.clear();
  }

  /**
   * Update waveform for all active voices
   */
  setWaveform(waveform: WaveformType): void {
    this.config.waveform = waveform;
    // Note: existing voices keep their waveform, only new voices will use the new waveform
  }

  /**
   * Update master volume
   */
  setMasterVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }

  /**
   * Update reverb amount (wet/dry mix)
   */
  setReverbAmount(amount: number): void {
    this.config.reverbAmount = amount;

    if (this.dryGain && this.wetGain && this.audioContext) {
      const now = this.audioContext.currentTime;

      // Smooth transition to new wet/dry balance
      // Dry gain: 100% when amount=0, 0% when amount=1
      this.dryGain.gain.setValueAtTime(this.dryGain.gain.value, now);
      this.dryGain.gain.linearRampToValueAtTime(1 - amount, now + 0.1);

      // Wet gain: 0% when amount=0, 100% when amount=1
      this.wetGain.gain.setValueAtTime(this.wetGain.gain.value, now);
      this.wetGain.gain.linearRampToValueAtTime(amount, now + 0.1);
    }
  }

  /**
   * Update filter cutoff
   */
  setFilterCutoff(frequency: number): void {
    if (this.filterNode && this.audioContext) {
      this.config.filterCutoff = frequency;
      const now = this.audioContext.currentTime;
      this.filterNode.frequency.setValueAtTime(frequency, now);
    }
  }

  /**
   * Resume audio context (required for browser autoplay policies)
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Suspend audio context
   */
  async suspend(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'running') {
      await this.audioContext.suspend();
    }
  }

  /**
   * Clean up and close audio context
   */
  async dispose(): Promise<void> {
    this.stopAll();

    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }

    this.masterGain = null;
    this.reverbNode = null;
    this.filterNode = null;
    this.dryGain = null;
    this.wetGain = null;
    this.activeVoices.clear();
  }

  /**
   * Check if a note is currently playing
   */
  isPlaying(planet: string): boolean {
    return this.activeVoices.has(planet);
  }

  /**
   * Get number of active voices
   */
  getActiveVoiceCount(): number {
    return this.activeVoices.size;
  }
}

/**
 * Create a default audio engine instance
 */
export function createAudioEngine(
  pitchStandard: number = 440,
  waveform: WaveformType = 'sine'
): AudioEngine {
  const config: AudioEngineConfig = {
    pitchStandard,
    waveform,
    attackTime: 2.0,      // 2 second attack
    releaseTime: 3.0,     // 3 second release
    reverbAmount: 0.3,    // 30% reverb
    filterCutoff: 2000    // 2kHz low-pass
  };

  return new AudioEngine(config);
}
