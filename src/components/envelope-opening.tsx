import { useState, useEffect, useRef } from "react";
import damaskRoseBg from "@/assets/damask-rose-envelope.jpg";
import waxSealTap from "@/assets/wax-seal-tap.jpg";
import { FloatingPetals } from "./floating-petals";

interface EnvelopeOpeningProps {
  onOpenComplete?: () => void;
}

type Stage = "closed" | "opening" | "flash" | "done";

function playDivineChime(audioCtx: AudioContext | null) {
  if (!audioCtx) return;
  try {
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5]; // C major divine shimmer
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 1.9);
    });

    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3
    subGain.gain.setValueAtTime(0.14, audioCtx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.2);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subOsc.start(audioCtx.currentTime);
    subOsc.stop(audioCtx.currentTime + 2.3);
  } catch (e) {
    console.error("Audio error:", e);
  }
}

export function EnvelopeOpening({ onOpenComplete }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (stage !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const handleOpen = () => {
    if (stage !== "closed") return;

    if (soundEnabled) {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      playDivineChime(audioCtxRef.current);
    }

    setStage("opening");

    setTimeout(() => {
      setStage("flash");
    }, 700);

    setTimeout(() => {
      setStage("done");
      onOpenComplete?.();
    }, 1800);
  };

  const handleSkip = () => {
    setStage("done");
    onOpenComplete?.();
  };

  if (stage === "done") {
    return null;
  }

  const isOpening = stage === "opening" || stage === "flash";
  const isFlash = stage === "flash";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        isFlash ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #4a5c43 0%, #2e3b29 55%, #182214 100%)",
      }}
    >
      {/* Background soft romantic garden atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(247,235,232,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating Rose Petals & Gold Sparkles */}
      <FloatingPetals enabled={true} density={18} />

      {/* Top Controls: Sound & Skip */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gold/70 bg-card/90 text-gold-deep shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={soundEnabled ? "Sound Enabled" : "Sound Muted"}
        >
          {soundEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="rounded-full border border-gold/60 bg-card/90 px-3.5 py-1.5 font-label text-[10px] sm:text-xs font-normal tracking-[0.2em] uppercase text-muted-foreground shadow-md backdrop-blur-md transition-all hover:text-foreground hover:border-gold hover:scale-105 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* ── VERTICAL LUXURY PORTRAIT ENVELOPE (MATCHING REFERENCE IMAGE) ──────────────── */}
      <div
        className="relative w-[88vw] max-w-[340px] h-[540px] sm:max-w-[390px] sm:h-[600px] md:max-w-[430px] md:h-[650px] flex items-center justify-center cursor-pointer select-none transition-transform duration-500 rounded-3xl"
        style={{
          perspective: "1600px",
          transform: isOpening ? "scale(1.03)" : "scale(1)",
        }}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpen();
        }}
        aria-label="Click to open the royal wedding invitation"
      >
        {/* 1. Realistic Multi-Layer 3D Drop Shadow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700"
          style={{
            boxShadow: isOpening
              ? "0 45px 100px -10px rgba(212, 175, 55, 0.4), 0 20px 50px -10px rgba(0, 0, 0, 0.55)"
              : "0 35px 80px -15px rgba(0, 0, 0, 0.55), 0 15px 35px -10px rgba(70, 20, 30, 0.35)",
          }}
        />

        {/* 2. Envelope Main Body with Embossed Dusty Rose Damask Texture */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border border-gold/60"
          style={{
            backgroundImage: `url(${damaskRoseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle warm pinkish lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#d99c9f]/30 via-transparent to-[#b8767a]/40 pointer-events-none" />

          {/* Gold perimeter hairline border */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-2xl border border-gold/45 pointer-events-none" />

          {/* Interior Pocket Depth Shadow */}
          <div
            className="absolute top-0 left-0 right-0 h-44 pointer-events-none opacity-40"
            style={{
              background:
                "linear-gradient(to bottom, rgba(50, 15, 20, 0.7) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* 3. The 3D Top Triangular V-Flap */}
        <div
          className="absolute top-0 left-0 right-0 h-[48%] transition-transform duration-1000 ease-in-out pointer-events-none"
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            zIndex: isOpening ? 5 : 25,
          }}
        >
          {/* Flap Front (Dusty Rose Damask with Dual Gold Foil V-Trim) */}
          <div
            className="absolute inset-0 rounded-t-3xl overflow-hidden"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 98%)",
              backgroundImage: `url(${damaskRoseBg})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              borderTop: "1.5px solid rgba(212, 175, 55, 0.8)",
              filter: "drop-shadow(0 10px 18px rgba(50, 15, 20, 0.35))",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Flap lighting gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20" />

            {/* Dual Gold Foil V-Border SVG (Exact match to reference photo!) */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {/* Outer gold line */}
              <path
                d="M 0,0 L 50,96 L 100,0"
                fill="none"
                stroke="rgba(212, 175, 55, 0.85)"
                strokeWidth="1.5"
              />
              {/* Inner gold line */}
              <path
                d="M 4,0 L 50,88 L 96,0"
                fill="none"
                stroke="rgba(255, 235, 170, 0.6)"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* Flap Back (Rich Gold Foil lining visible when flap flips up) */}
          <div
            className="absolute inset-0 rounded-t-3xl"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 98%)",
              background:
                "linear-gradient(180deg, #f7e6b8 0%, #e2be72 55%, #c89a3c 100%)",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              borderTop: "1.5px solid rgba(255, 235, 170, 0.9)",
            }}
          >
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#875b11_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
          </div>
        </div>

        {/* 4. Lower Envelope Pocket with "YOU ARE INVITED" */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden z-20 pointer-events-none"
          style={{
            clipPath:
              "polygon(0% 0%, 14% 18%, 50% 34%, 86% 18%, 100% 0%, 100% 100%, 0% 100%)",
            backgroundImage: `url(${damaskRoseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            boxShadow: "0 -4px 18px rgba(50, 15, 20, 0.25)",
          }}
        >
          {/* Subtle pocket lip depth shadow */}
          <div
            className="absolute top-0 left-0 right-0 h-24"
            style={{
              background:
                "linear-gradient(to bottom, rgba(50, 15, 20, 0.3) 0%, transparent 100%)",
            }}
          />

          {/* V-Notch Gold Contour Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M 0,0 L 14,18 L 50,34 L 86,18 L 100,0"
              fill="none"
              stroke="rgba(212, 175, 55, 0.85)"
              strokeWidth="1.2"
            />
            <path
              d="M 0,1.5 L 14,19.5 L 50,35.5 L 86,19.5 L 100,1.5"
              fill="none"
              stroke="rgba(255, 235, 170, 0.5)"
              strokeWidth="0.6"
            />
          </svg>

          {/* ── "YOU ARE INVITED" WITH ORNATE GOLD CREST (MATCHING REFERENCE IMAGE) ── */}
          <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 text-center px-6">
            {/* Classical Spaced Roman Serif Typography */}
            <h2 className="font-label text-sm sm:text-base md:text-lg text-[#612128] dark:text-[#f8d7dc] font-normal tracking-[0.24em] uppercase drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
              YOU ARE INVITED
            </h2>

            {/* Golden Glitter Plain Heart */}
            <div className="flex items-center justify-center my-2.5">
              <div className="relative flex items-center justify-center">
                {/* Ambient Glitter Aura */}
                <div className="absolute inset-0 w-7 h-7 rounded-full bg-amber-400/40 blur-md pointer-events-none" />
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  className="relative z-10 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.85)] animate-pulse"
                >
                  <defs>
                    {/* Golden Glitter Radial Gradient */}
                    <radialGradient id="env-gold-glitter-grad" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="15%" stopColor="#fff5cc" />
                      <stop offset="35%" stopColor="#facc15" />
                      <stop offset="65%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#854d0e" />
                    </radialGradient>
                    {/* Procedural Gold Glitter Pattern */}
                    <pattern id="env-glitter-pattern" width="5" height="5" patternUnits="userSpaceOnUse">
                      <rect width="5" height="5" fill="url(#env-gold-glitter-grad)" />
                      <circle cx="1.2" cy="1.2" r="0.7" fill="#ffffff" opacity="0.95" />
                      <circle cx="3.8" cy="2.2" r="0.6" fill="#fef08a" opacity="0.85" />
                      <circle cx="2.5" cy="4.0" r="0.5" fill="#ffffff" opacity="0.8" />
                      <circle cx="4.2" cy="4.2" r="0.4" fill="#fbbf24" opacity="0.9" />
                    </pattern>
                  </defs>
                  {/* Plain Pure Golden Glitter Heart */}
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#env-glitter-pattern)"
                    stroke="rgba(255, 245, 180, 0.95)"
                    strokeWidth="0.8"
                  />
                  {/* Glossy Light Lobe Highlight */}
                  <ellipse
                    cx="7.2"
                    cy="6.8"
                    rx="2.6"
                    ry="1.6"
                    fill="#ffffff"
                    opacity="0.55"
                    transform="rotate(-28 7.2 6.8)"
                  />
                </svg>
              </div>
            </div>

            <p className="font-label text-[10px] sm:text-xs tracking-[0.2em] text-[#723238] dark:text-[#e4bcc2] uppercase font-normal mt-1">
              Aarav & Meera · Jaipur
            </p>
          </div>
        </div>

        {/* 5. The Royal Wax Seal Stamped with "Tap to open" (Exact Match to Image 1) */}
        <div
          className={`absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 pointer-events-auto flex flex-col items-center ${
            isOpening ? "scale-110 opacity-0" : "scale-100 opacity-100 hover:scale-106 active:scale-95"
          }`}
        >
          {/* Subtle Pulsing Gold Halo Ring */}
          <div className="absolute -inset-3.5 rounded-full border-2 border-gold/80 animate-ping opacity-60 pointer-events-none" />

          {/* 3D Wax Seal Image with Deep Relief "Tap to open" */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_16px_36px_rgba(60,20,10,0.65)] ring-2 ring-gold/70 overflow-hidden">
            <img
              src={waxSealTap}
              alt="Antique Gold Wax Seal - Tap to Open"
              className="w-full h-full object-cover rounded-full scale-[1.05] transition-transform duration-500 hover:scale-[1.12]"
            />
          </div>
        </div>

        {/* ── 6. DIVINE LIGHTNING & CELESTIAL SACRED AURA (When tapped) ── */}
        {isOpening && (
          <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
            {/* Celestial Golden Light Rays Burst */}
            <div className="absolute w-[180vmin] h-[180vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,245,190,0.95)_0%,rgba(245,210,110,0.7)_25%,rgba(212,175,55,0.3)_50%,transparent_70%)] animate-ping [animation-duration:1.2s]" />

            {/* Pulsing Divine Lightning Bolts SVG */}
            <svg
              className="absolute w-[120vmin] h-[120vmin] animate-pulse text-amber-200"
              viewBox="0 0 200 200"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 95 * Math.cos((i * Math.PI) / 8)}
                  y2={100 + 95 * Math.sin((i * Math.PI) / 8)}
                  stroke="rgba(255, 235, 140, 0.85)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}
              <path d="M100,100 L90,60 L110,50 L95,15" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M100,100 L120,130 L105,145 L130,185" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M100,100 L65,105 L55,90 L20,95" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M100,100 L135,95 L145,110 L185,105" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>

            {/* Center Sacred Divine Core Flash */}
            <div className="absolute w-44 h-44 rounded-full bg-white shadow-[0_0_90px_rgba(255,255,255,1),0_0_160px_rgba(255,225,120,0.9)] animate-pulse" />
          </div>
        )}
      </div>

      {/* Subtle Hint Below Envelope */}
      {!isOpening && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
          <p className="font-royal text-[10px] sm:text-xs text-white/80 uppercase tracking-widest animate-pulse">
            Tap the golden seal to unfold your invitation
          </p>
        </div>
      )}
    </div>
  );
}
