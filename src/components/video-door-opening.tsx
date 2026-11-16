import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import closedDoorsLandscape from "@/assets/closed-doors-landscape.jpg";
import closedDoorsPortrait from "@/assets/closed-doors-portrait.jpg";
import { FloatingPetals } from "./floating-petals";
import { WEDDING_CONFIG } from "@/config/wedding";

interface VideoDoorOpeningProps {
  onOpenComplete?: () => void;
}

type Stage = "teaser" | "playing" | "fadeout" | "done";

function playDivineChime(audioCtx: AudioContext | null) {
  if (!audioCtx) return;
  try {
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5]; // C major divine shimmer
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.16, audioCtx.currentTime + idx * 0.07 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.07 + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.07);
      osc.stop(audioCtx.currentTime + idx * 0.07 + 1.9);
    });

    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3
    subGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.0);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subOsc.start(audioCtx.currentTime);
    subOsc.stop(audioCtx.currentTime + 2.1);
  } catch (e) {
    console.error("Audio error:", e);
  }
}

export function VideoDoorOpening({ onOpenComplete }: VideoDoorOpeningProps) {
  const [stage, setStage] = useState<Stage>("teaser");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Responsive device check: Desktop (>= 1024px or landscape tablet) vs Mobile & Tablet portrait (< 1024px)
  useEffect(() => {
    const checkLaptop = () => {
      const isWide =
        typeof window !== "undefined" &&
        (window.innerWidth >= 1024 ||
          (window.innerWidth >= 768 && window.innerWidth > window.innerHeight));
      setIsLaptop(isWide);
    };

    checkLaptop();
    window.addEventListener("resize", checkLaptop);
    return () => window.removeEventListener("resize", checkLaptop);
  }, []);

  // Lock scroll while intro video is active
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

  // Video 1 (palace-doors-reveal-portrait.mp4) is for mobile and tablet
  // Video 2 (palace-doors-reveal-landscape.mp4) is for desktop view
  const activeVideoSrc = isLaptop
    ? "/videos/palace-doors-reveal-landscape.mp4"
    : "/videos/palace-doors-reveal-portrait.mp4";

  const activePoster = isLaptop ? closedDoorsLandscape : closedDoorsPortrait;

  // Handle start: triggers on tapping anywhere on screen
  const handleStart = () => {
    if (stage !== "teaser") return;

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

    setStage("playing");

    if (videoRef.current) {
      if (!videoRef.current.currentSrc.includes(activeVideoSrc.replace("/videos/", ""))) {
        videoRef.current.src = activeVideoSrc;
        videoRef.current.load();
      }

      videoRef.current.muted = !soundEnabled;
      videoRef.current.currentTime = 0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video play failed with audio, retrying muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch((e) => {
              console.error("Video play completely blocked:", e);
              handleSkip();
            });
          }
        });
      }
    }
  };

  const handleVideoEnded = () => {
    setStage("fadeout");
    setTimeout(() => {
      setStage("done");
      onOpenComplete?.();
    }, 800);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setStage("done");
    onOpenComplete?.();
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSound = !soundEnabled;
    setSoundEnabled(nextSound);
    if (videoRef.current) {
      videoRef.current.muted = !nextSound;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  if (stage === "done") {
    return null;
  }

  const isFadeout = stage === "fadeout";
  const isPlaying = stage === "playing";

  return (
    <div
      onClick={stage === "teaser" ? handleStart : undefined}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity duration-800 ${
        isFadeout ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        cursor: stage === "teaser" ? "pointer" : "default",
      }}
      role={stage === "teaser" ? "button" : undefined}
      tabIndex={stage === "teaser" ? 0 : undefined}
      onKeyDown={(e) => {
        if (stage === "teaser" && (e.key === "Enter" || e.key === " ")) {
          handleStart();
        }
      }}
      aria-label="Tap anywhere on screen to open the royal palace doors"
    >
      {/* ── 1. Fullscreen Responsive Door Opening Video (Video 1 Mobile/Tablet, Video 2 Desktop) ── */}
      <video
        ref={videoRef}
        src={activeVideoSrc}
        poster={activePoster}
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
          console.warn("Video playback error, skipping to invitation");
          handleSkip();
        }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source
          src="/videos/palace-doors-reveal-landscape.mp4"
          media="(min-width: 1024px), (min-width: 768px) and (orientation: landscape)"
          type="video/mp4"
        />
        <source
          src="/videos/palace-doors-reveal-portrait.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── 2. Cinematic Atmospheric Vignette Overlay ── */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 transition-opacity duration-700 ${
          isPlaying ? "opacity-15" : "opacity-100"
        }`}
      />

      {/* Ambient Radial Warmth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.55)_100%)]" />

      {/* ── 3. Atmospheric Rose Petals (while in teaser) ── */}
      <FloatingPetals enabled={stage === "teaser"} density={16} />

      {/* ── 4. Top Floating Controls: Sound & Skip ── */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={toggleSound}
          aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#DED5C8]/60 bg-black/60 text-[#F7F4ED] shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:scale-105 hover:bg-[#B49A76] hover:text-white hover:border-[#B49A76] active:scale-95 cursor-pointer"
          title={soundEnabled ? "Audio Enabled" : "Audio Muted"}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="rounded-[10px] border border-[#DED5C8]/60 bg-black/60 px-4 py-2 font-montserrat text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F7F4ED] shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:bg-[#B49A76] hover:text-white hover:border-[#B49A76] hover:scale-105 active:scale-95 cursor-pointer"
        >
          Skip ➔
        </button>
      </div>

      {/* ── 5. Teaser Screen Overlay: Tap Anywhere on Screen to Enter ── */}
      <div
        className={`relative z-20 flex flex-col items-center justify-between h-full w-full max-w-4xl mx-auto px-6 py-10 sm:py-14 text-center select-none transition-all duration-500 ease-out ${
          isPlaying ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        {/* Sacred Invocation: Shree Ganeshaya Namah */}
        <div className="anim-slow-rise pt-2 sm:pt-4">
          <p className="font-cormorant text-base sm:text-lg md:text-xl tracking-[0.2em] text-[#F7F4ED] font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            || श्री गणेशाय नमः ||
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-[#B49A76]/80 shadow-sm" />
        </div>

        {/* Center Invitation Typography: Bride & Groom */}
        <div className="flex flex-col items-center my-auto py-6">
          <p className="font-montserrat text-xs sm:text-sm md:text-base uppercase tracking-[0.24em] text-[#DED5C8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium">
            You are cordially invited to celebrate
          </p>

          <h1 className="mt-3 sm:mt-5 font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-wide gold-title-dark drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.1] py-1">
            <span>{WEDDING_CONFIG.couple.groom.firstName}</span>
            <span className="text-amber-200 mx-2 sm:mx-3 font-light">&amp;</span>
            <span>{WEDDING_CONFIG.couple.bride.firstName}</span>
          </h1>

          <div className="mt-3.5 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-14 bg-[#B49A76]/70 shadow-sm" />
            <span className="text-[#B49A76] text-xs sm:text-sm leading-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">♥</span>
            <span className="h-px w-14 bg-[#B49A76]/70 shadow-sm" />
          </div>

          <p className="mt-3.5 font-montserrat text-xs sm:text-sm md:text-base tracking-[0.16em] text-[#DED5C8] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] font-normal">
            {WEDDING_CONFIG.venue.name} · {WEDDING_CONFIG.venue.city}
          </p>
        </div>

        {/* Bottom Action: Editorial Button & Tap Anywhere Indicator */}
        <div className="pb-4 sm:pb-6 select-none flex flex-col items-center">
          <div
            className="group inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#B49A76] hover:bg-[#A38865] px-8 sm:px-10 py-3.5 sm:py-4 font-montserrat text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-white shadow-[0_12px_32px_rgba(0,0,0,0.55)] border border-[#DED5C8]/40 transition-all duration-300 group-hover:scale-[1.03] active:scale-95"
          >
            <span>Tap to Open Invitation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </div>
          <p className="mt-3 font-montserrat text-[11px] sm:text-xs text-[#EFE9DE]/90 tracking-[0.16em] uppercase font-normal animate-pulse">
            ✦ Tap anywhere on screen to enter ✦
          </p>
        </div>
      </div>

      {/* ── 6. During Playback: Golden Door Opening Progress Indicator ── */}
      {isPlaying && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pb-6 sm:pb-8 px-6 text-center animate-fade-in">
          <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] text-[#EFE9DE] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            Opening The Royal Palace Doors...
          </p>
          <div className="mt-3 h-1 w-48 sm:w-64 max-w-xs overflow-hidden rounded-full bg-black/50 border border-[#B49A76]/60 backdrop-blur-sm">
            <div
              className="h-full bg-[#B49A76] transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── 7. Golden Radiant Transition Flash ── */}
      {isFadeout && (
        <div className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(255,245,210,0.85)_0%,rgba(180,154,118,0.4)_50%,transparent_80%)] animate-pulse" />
      )}
    </div>
  );
}
