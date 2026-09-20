/**
 * Procedural Web Audio API sound generator.
 * Zero external audio assets required - instant, reliable, cross-browser.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isStarted: boolean = false;
  private musicGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.isStarted = true;
      this.startAmbientMusic();
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  resumeIfSuspended() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startAmbientMusic() {
    if (!this.ctx || !this.musicGain || this.ambientInterval) return;

    // Peaceful pentatonic exploration chords (C major / A minor pentatonic: C, D, E, G, A)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66]  // G
    ];

    let chordIdx = 0;

    const playChime = () => {
      if (!this.ctx || this.isMuted || !this.isStarted) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Play soft warm pad
      currentChord.forEach((freq, i) => {
        if (!this.ctx || !this.musicGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 0.5, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 1.2 + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now + i * 0.15);
        osc.stop(now + 5.2);
      });

      // Play delicate kalimba-like notes
      const noteCount = 2 + Math.floor(Math.random() * 3);
      for (let n = 0; n < noteCount; n++) {
        const noteFreq = scale[Math.floor(Math.random() * scale.length)];
        const delay = 0.5 + n * 0.6 + Math.random() * 0.3;
        const kalimbaOsc = this.ctx.createOscillator();
        const kalimbaGain = this.ctx.createGain();

        kalimbaOsc.type = 'triangle';
        kalimbaOsc.frequency.setValueAtTime(noteFreq, now + delay);

        kalimbaGain.gain.setValueAtTime(0, now + delay);
        kalimbaGain.gain.linearRampToValueAtTime(0.06, now + delay + 0.04);
        kalimbaGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.8);

        kalimbaOsc.connect(kalimbaGain);
        kalimbaGain.connect(this.musicGain);

        kalimbaOsc.start(now + delay);
        kalimbaOsc.stop(now + delay + 1.9);
      }
    };

    playChime();
    this.ambientInterval = window.setInterval(playChime, 6200);
  }

  playFootstep(surface: 'grass' | 'stone' | 'wood' = 'stone') {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;

    if (surface === 'wood') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (surface === 'grass') {
      // Noise burst with bandpass
      const bufferSize = this.ctx.sampleRate * 0.06;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900 + Math.random() * 200, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);
      noise.start(now);
    } else {
      // Stone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280 + Math.random() * 60, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  }

  playJump() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.19);
  }

  playLand() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playClickTarget() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playInteractChime() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.65);
    });
  }

  playClose() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playButtonBeep() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playFireworks() {
    if (!this.ctx || this.isMuted || !this.isStarted) return;
    const now = this.ctx.currentTime;

    // Pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.2);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.23);

    // Sparkles / crackle
    for (let i = 0; i < 6; i++) {
      const crackleDelay = 0.25 + i * 0.08 + Math.random() * 0.05;
      const cOsc = this.ctx.createOscillator();
      const cGain = this.ctx.createGain();

      cOsc.type = 'triangle';
      cOsc.frequency.setValueAtTime(1200 + Math.random() * 800, now + crackleDelay);

      cGain.gain.setValueAtTime(0.07, now + crackleDelay);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + crackleDelay + 0.08);

      cOsc.connect(cGain);
      cGain.connect(this.masterGain!);
      cOsc.start(now + crackleDelay);
      cOsc.stop(now + crackleDelay + 0.09);
    }
  }

  destroy() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const soundManager = new SoundManager();
