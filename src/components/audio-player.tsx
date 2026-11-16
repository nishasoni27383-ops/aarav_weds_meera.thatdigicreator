import { useState, useEffect, useRef } from "react";

/**
 * Royal Festive Ambient Wedding Instrumentals
 * Plays a soft, harmonious classical Indian Raga (Bhairavi / Yaman)
 * synthesized gracefully with Web Audio API (gentle sitar drones, flute overtones,
 * and soft tanpura chime) without requiring external MP3 bandwidth or broken URLs.
 */
export function RoyalAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Raga Yaman melodic scale (frequencies in Hz)
  // Sa, Re, Ga, Ma(tivra), Pa, Dha, Ni, Sa'
  const ragaScale = [
    220.0, // A3 (Sa)
    247.2, // B3 (Re)
    277.2, // C#4 (Ga)
    311.1, // D#4 (Tivra Ma)
    329.6, // E4 (Pa)
    370.0, // F#4 (Dha)
    415.3, // G#4 (Ni)
    440.0, // A4 (High Sa)
    554.4, // C#5 (High Ga)
    659.3, // E5 (High Pa)
  ];

  const playNote = (freq: number, duration: number, delay: number = 0) => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "suspended") return;

    try {
      const startTime = ctx.currentTime + delay;
      // Main tone (Flute / Shehnai sine + harmonic)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, startTime);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st harmonic overtone

      // Gentle envelope: soft attack, singing sustain, gentle decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.1);
      osc2.stop(startTime + duration + 0.1);
    } catch (e) {
      console.warn("Audio playback note err:", e);
    }
  };

  const startMusic = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    // Play periodic melodic phrases every 2.4s
    let step = 0;
    const melodyPattern = [
      [0, 2, 4],       // Sa Ga Pa
      [4, 6, 7],       // Pa Ni Sa'
      [7, 8, 9],       // Sa' Ga' Pa'
      [8, 7, 5, 4],    // Ga' Sa' Dha Pa
      [4, 3, 2, 0],    // Pa Ma Ga Sa
      [0, 2, 0],       // Sa Ga Sa
    ];

    const playMelodyLoop = () => {
      if (!isPlayingRef.current) return;
      const phrase = melodyPattern[step % melodyPattern.length];
      phrase.forEach((noteIdx, i) => {
        const freq = ragaScale[noteIdx] || 440;
        playNote(freq, 1.8, i * 0.45);
      });
      step++;
    };

    playMelodyLoop();
    intervalRef.current = window.setInterval(playMelodyLoop, 2800);
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
        className="group relative flex items-center gap-3 rounded-full border border-gold/70 bg-card/95 px-4 py-2.5 shadow-[0_10px_25px_-5px_rgba(70,30,20,0.3)] backdrop-blur-md transition-all hover:scale-105 hover:border-gold active:scale-95 cursor-pointer"
        title={isPlaying ? "Mute Royal Shehnai & Sitar" : "Play Royal Shehnai & Sitar"}
      >
        {/* Animated Gold Vinyl / Disc icon */}
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-gold/80 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-amber-950 shadow-sm ${
            isPlaying ? "animate-spin [animation-duration:4s]" : ""
          }`}
        >
          <span className="text-xs">🎶</span>
        </div>

        {/* Label & Soundwave bars */}
        <div className="flex flex-col text-left">
          <span className="font-label text-[10px] sm:text-xs font-normal uppercase tracking-[0.18em] text-foreground">
            {isPlaying ? "Festive Music Playing" : "Play Shehnai Music"}
          </span>
          <span className="font-body text-[10px] sm:text-[11px] text-muted-foreground font-normal">
            {isPlaying ? "Raga Yaman Ambient" : "Tap to listen"}
          </span>
        </div>

        {/* Animated audio equalizer wave */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1 h-3.5">
            <span className="w-0.5 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
            <span className="w-0.5 h-4 bg-gold-deep rounded-full animate-bounce [animation-delay:0.3s]" />
            <span className="w-0.5 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-0.5 h-3.5 bg-gold-deep rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </button>
    </div>
  );
}
