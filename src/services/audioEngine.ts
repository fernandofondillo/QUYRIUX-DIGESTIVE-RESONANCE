/**
 * Web Audio API Engine for Quyriux Digestive Resonance
 * Generates pure tones, ambient soundscapes, humming tones, and breathing cues completely offline.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private pureToneOsc: OscillatorNode | null = null;
  private pureToneGain: GainNode | null = null;

  private hummingOsc: OscillatorNode | null = null;
  private hummingGain: GainNode | null = null;

  private breathingOsc: OscillatorNode | null = null;
  private breathingGain: GainNode | null = null;

  private ambientNodes: Map<string, { gain: GainNode; stop: () => void }> = new Map();

  private isMuted: boolean = false;
  private masterVolume: number = 0.8;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.pureToneGain) {
      this.pureToneGain.gain.setValueAtTime(muted ? 0 : 0.2 * this.masterVolume, this.ctx.currentTime);
    }
  }

  // --- 1. PURE TONE GENERATOR ---
  public startPureTone(frequencyHz: number, volume: number = 0.2) {
    const ctx = this.ensureContext();
    this.stopPureTone();

    if (this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);

    // Fade in to prevent click
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * this.masterVolume, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();

    this.pureToneOsc = osc;
    this.pureToneGain = gain;
  }

  public stopPureTone() {
    if (this.pureToneOsc && this.pureToneGain && this.ctx) {
      try {
        this.pureToneGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          this.pureToneOsc?.stop();
          this.pureToneOsc?.disconnect();
          this.pureToneOsc = null;
          this.pureToneGain = null;
        }, 120);
      } catch {
        this.pureToneOsc = null;
        this.pureToneGain = null;
      }
    }
  }

  // --- 2. HUMMING RESONANCE TONE ---
  public startHummingTone(frequencyHz: number) {
    const ctx = this.ensureContext();
    this.stopHummingTone();

    if (this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Soft warm triangle/sine blend
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequencyHz * 2.5, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35 * this.masterVolume, ctx.currentTime + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();

    this.hummingOsc = osc;
    this.hummingGain = gain;
  }

  public stopHummingTone() {
    if (this.hummingOsc && this.hummingGain && this.ctx) {
      try {
        this.hummingGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          this.hummingOsc?.stop();
          this.hummingOsc?.disconnect();
          this.hummingOsc = null;
          this.hummingGain = null;
        }, 220);
      } catch {
        this.hummingOsc = null;
        this.hummingGain = null;
      }
    }
  }

  // --- 3. BREATHING SOUND CUES ---
  public playBreathingCue(phase: 'inhale' | 'holdIn' | 'exhale' | 'holdOut') {
    if (this.isMuted) return;
    const ctx = this.ensureContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (phase === 'inhale') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
    } else if (phase === 'exhale') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.2);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
    }

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12 * this.masterVolume, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  }

  // --- 4. AMBIENT SOUND GENERATOR (SYNTHETIC SOUNDSCAPES) ---
  public startAmbientTrack(trackId: string, synthType: string, volume: number = 0.5, baseFreq: number = 150) {
    const ctx = this.ensureContext();
    this.stopAmbientTrack(trackId);

    if (this.isMuted) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * this.masterVolume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let stopFn = () => {};

    if (synthType === 'pink' || synthType === 'brown') {
      // Noise generator
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      let lastOut = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (synthType === 'pink') {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          data[i] *= 0.11;
          b6 = white * 0.115926;
        } else {
          // Brown noise
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }
      }

      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = buffer;
      noiseSrc.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      noiseSrc.connect(filter);
      filter.connect(masterGain);
      noiseSrc.start();

      stopFn = () => {
        try { noiseSrc.stop(); noiseSrc.disconnect(); } catch {}
      };

    } else if (synthType === 'ocean' || synthType === 'rain') {
      // LFO modulated pink noise for wave effect
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = synthType === 'ocean' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(synthType === 'ocean' ? 400 : 1200, ctx.currentTime);

      // LFO for wave modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 12 seconds per wave cycle
      lfoGain.gain.setValueAtTime(300, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      src.connect(filter);
      filter.connect(masterGain);

      lfo.start();
      src.start();

      stopFn = () => {
        try { lfo.stop(); src.stop(); src.disconnect(); } catch {}
      };

    } else {
      // Ambient harmonic synth / drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime); // fifth harmonic

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      stopFn = () => {
        try { osc1.stop(); osc2.stop(); osc1.disconnect(); osc2.disconnect(); } catch {}
      };
    }

    this.ambientNodes.set(trackId, { gain: masterGain, stop: stopFn });
  }

  public setAmbientVolume(trackId: string, volume: number) {
    const node = this.ambientNodes.get(trackId);
    if (node && this.ctx) {
      node.gain.gain.setValueAtTime(volume * this.masterVolume, this.ctx.currentTime);
    }
  }

  public stopAmbientTrack(trackId: string) {
    const node = this.ambientNodes.get(trackId);
    if (node) {
      node.stop();
      this.ambientNodes.delete(trackId);
    }
  }

  public stopAllAmbient() {
    this.ambientNodes.forEach((node) => node.stop());
    this.ambientNodes.clear();
  }

  public stopAll() {
    this.stopPureTone();
    this.stopHummingTone();
    this.stopAllAmbient();
  }
}

export const audioEngine = new AudioEngine();
