/**
 * Audio manager handling both local audio files (/audio/music.mp3)
 * and an ambient romantic generative synthesizer fallback so romantic audio
 * works flawlessly even before the user puts a custom mp3 in /public/audio/!
 */

class RomanticAudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isPlayingSynth: boolean = false;
  private synthInterval: number | null = null;
  private isMuted: boolean = true;
  private usingFileAudio: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.audioElement) {
      this.audioElement = new Audio('/audio/music.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.45;

      this.audioElement.addEventListener('error', () => {
        // Local audio file not present or failed, we will use Web Audio API synth
        this.usingFileAudio = false;
      });

      this.audioElement.addEventListener('canplaythrough', () => {
        this.usingFileAudio = true;
      });
    }
  }

  public async toggleMusic(enable?: boolean): Promise<boolean> {
    this.init();
    const shouldPlay = enable !== undefined ? enable : this.isMuted;

    if (shouldPlay) {
      return this.play();
    } else {
      this.pause();
      return false;
    }
  }

  public async play(): Promise<boolean> {
    this.init();
    this.isMuted = false;

    // Try playing the file first
    if (this.audioElement) {
      try {
        await this.audioElement.play();
        this.usingFileAudio = true;
        return true;
      } catch (err) {
        // File play failed (missing file or autoplay policy restriction)
        this.usingFileAudio = false;
        this.startAmbientSynth();
        return true;
      }
    } else {
      this.startAmbientSynth();
      return true;
    }
  }

  public pause() {
    this.isMuted = true;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopAmbientSynth();
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  // Play gentle sound effects (e.g. on YES, heart burst, selection)
  public playChime(freq: number = 587.33, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  public playCelebrationChord() {
    if (this.isMuted) return;
    // Harmonious romantic arpeggio (Cmaj7 / G / E / B)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 'sine');
      }, idx * 120);
    });
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Gentle acoustic ambient music box fallback
  private startAmbientSynth() {
    if (this.isPlayingSynth) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isPlayingSynth = true;

    // Romantic pentatonic chord progression frequencies
    // Eb Major / Ab / Bb / Cm vibe (soft, dreamlike)
    const chords = [
      [311.13, 392.00, 466.16, 587.33], // Eb maj7
      [261.63, 311.13, 392.00, 523.25], // C min7
      [207.65, 261.63, 311.13, 415.30], // Ab maj7
      [233.08, 293.66, 349.23, 466.16], // Bb sus
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlayingSynth || this.isMuted) return;
      try {
        const currentChord = chords[chordIdx];
        const freq = currentChord[noteIdx % currentChord.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle'; // warmer than sine, softer than square
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.3);

        noteIdx++;
        if (noteIdx >= currentChord.length) {
          noteIdx = 0;
          chordIdx = (chordIdx + 1) % chords.length;
        }
      } catch {
        // graceful silence
      }
    };

    // Play tender note every 750ms
    playNextNote();
    this.synthInterval = window.setInterval(playNextNote, 750);
  }

  private stopAmbientSynth() {
    this.isPlayingSynth = false;
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioManager = new RomanticAudioManager();
