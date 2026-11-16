import { useRef, useState, useEffect } from "react";
import paperCutGroom from "@/assets/paper-cut-groom.jpg";
import paperCutBride from "@/assets/paper-cut-bride.jpg";
import mandala from "@/assets/mandala.png";
import { WEDDING_CONFIG } from "@/config/wedding";

export function SacredUnionStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalDist = rect.height - windowHeight;

          if (totalDist > 0) {
            // progress: 0 when container starts entering sticky window, 1 when track finishes
            const currentScroll = -rect.top;
            const rawProgress = currentScroll / totalDist;
            const clamped = Math.max(0, Math.min(1, rawProgress));
            setProgress(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive travel distances
  // When progress = 0: far apart on sides
  // When progress = 1: close together in center
  const groomOffsetPercent = (1 - progress) * -65; // from -65% to 0%
  const brideOffsetPercent = (1 - progress) * 65;  // from 65% to 0%

  // Rotation tilt as they walk towards each other
  const groomTilt = (1 - progress) * -3;
  const brideTilt = (1 - progress) * 3;

  // Union intensity (rises as they meet)
  const isUnited = progress > 0.82;
  const unionGlowOpacity = Math.max(0, (progress - 0.4) / 0.6);

  return (
    <section
      ref={containerRef}
      id="sacred-union-section"
      className="relative min-h-[175vh] sm:min-h-[200vh] bg-gradient-to-b from-background via-card/50 to-background"
    >
      {/* ── STICKY STORYTELLING SCENE CONTAINER ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-6 sm:py-10 px-3 sm:px-6 overflow-hidden select-none">
        {/* Ambient Warm Golden Aura */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: 0.35 + unionGlowOpacity * 0.4,
            background:
              "radial-gradient(circle at 50% 50%, rgba(245,210,130,0.45) 0%, rgba(220,90,110,0.18) 45%, transparent 75%)",
          }}
        />

        {/* Slowly Spinning Sacred Mandala Watermark */}
        <img
          src={mandala}
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vmin] max-w-[620px] opacity-[0.07] spin-slower"
        />

        {/* ── 1. TOP HEADER & CHAPTER TITLE ── */}
        <div className="relative z-20 text-center max-w-xl mx-auto pt-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight leading-tight">
            The Sacred Union
          </h2>

          <p className="mt-2 font-body text-xs sm:text-sm text-muted-foreground font-normal">
            {progress < 0.3
              ? "Scroll to bring the two families and souls together..."
              : progress < 0.8
              ? "Drawing near with sacred rose garlands of eternal devotion..."
              : "Two dynasties united forever in sacred love and blessings ♥"}
          </p>
        </div>

        {/* ── 2. MAIN STORY STAGE: GROOM & BRIDE PAPER CUT ART ── */}
        <div className="relative z-10 w-full max-w-5xl flex-1 flex items-center justify-center">
          {/* Central Union Glow & Golden Sparkle Core */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
            style={{
              width: isUnited ? "320px" : "180px",
              height: isUnited ? "320px" : "180px",
              opacity: unionGlowOpacity,
              background:
                "radial-gradient(circle, rgba(255,235,160,0.85) 0%, rgba(245,185,55,0.4) 45%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />



          {/* ── THE TWO FIGURES FLEX CONTAINER ── */}
          <div className="relative w-full flex items-center justify-center gap-2 sm:gap-6 md:gap-12 px-2 sm:px-6">
            {/* ── LEFT: GROOM (SHARMA'S) ── */}
            <div
              className="flex flex-col items-center transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(${groomOffsetPercent}%) rotate(${groomTilt}deg)`,
              }}
            >
              {/* Paper Cut Groom Card */}
              <div className="group relative w-[135px] sm:w-[210px] md:w-[270px] aspect-[3/4] rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-[#fef5e7] via-[#faebd7] to-[#e8d5b7] border-2 border-gold/70 shadow-[0_16px_36px_rgba(70,35,15,0.28)] overflow-hidden transition-all duration-300">
                {/* 3D Paper Layer Relief Shading */}
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={paperCutGroom}
                    alt="Paper Cut Groom Aarav Sharma with Varmala"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Paper Parchment Texture Filter */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-amber-100/10 mix-blend-multiply" />
                </div>

                {/* Subtle Gold Embossed Corner Filigree Accent */}
                <div className="pointer-events-none absolute top-2 left-2 text-gold/80 text-[10px] sm:text-xs">
                  ♥
                </div>
              </div>

              {/* ── NAME BELOW GROOM: SHARMA'S ── */}
              <div className="mt-2.5 sm:mt-4 text-center max-w-[140px] sm:max-w-none">
                <span className="block font-label text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/85 font-normal">
                  Groom&apos;s Family
                </span>
                <h3 className="font-heading text-xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight gold-text">
                  Sharma&apos;s
                </h3>
                <p className="font-label text-[10px] sm:text-xs text-muted-foreground font-normal uppercase tracking-[0.18em]">
                  {WEDDING_CONFIG.couple.groom.firstName} Sharma
                </p>
              </div>
            </div>

            {/* ── RIGHT: BRIDE (KAPOOR'S) ── */}
            <div
              className="flex flex-col items-center transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(${brideOffsetPercent}%) rotate(${brideTilt}deg)`,
              }}
            >
              {/* Paper Cut Bride Card */}
              <div className="group relative w-[135px] sm:w-[210px] md:w-[270px] aspect-[3/4] rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-[#fef5e7] via-[#faebd7] to-[#e8d5b7] border-2 border-gold/70 shadow-[0_16px_36px_rgba(70,35,15,0.28)] overflow-hidden transition-all duration-300">
                {/* 3D Paper Layer Relief Shading */}
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={paperCutBride}
                    alt="Paper Cut Bride Meera Kapoor with Varmala"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Paper Parchment Texture Filter */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-amber-100/10 mix-blend-multiply" />
                </div>

                {/* Subtle Gold Embossed Corner Filigree Accent */}
                <div className="pointer-events-none absolute top-2 right-2 text-gold/80 text-[10px] sm:text-xs">
                  ♥
                </div>
              </div>

              {/* ── NAME BELOW BRIDE: KAPOOR'S ── */}
              <div className="mt-2.5 sm:mt-4 text-center max-w-[140px] sm:max-w-none">
                <span className="block font-label text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/85 font-normal">
                  Bride&apos;s Family
                </span>
                <h3 className="font-heading text-xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight gold-text">
                  Kapoor&apos;s
                </h3>
                <p className="font-label text-[10px] sm:text-xs text-muted-foreground font-normal uppercase tracking-[0.18em]">
                  {WEDDING_CONFIG.couple.bride.firstName} Kapoor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM STORYTELLING VERSE & CELEBRATION ── */}
        <div className="relative z-20 text-center max-w-2xl mx-auto pb-1 sm:pb-3 px-4">
          <p className="font-body italic text-sm sm:text-base leading-relaxed text-foreground/90 font-normal transition-all duration-300">
            {progress < 0.4
              ? "“Two hearts that beat as one, two families joined by eternal destiny and cherished traditions.”"
              : progress < 0.8
              ? "“As the sacred varmala garlands meet, the vows of seven lifetimes are whispered under the stars.”"
              : `“${WEDDING_CONFIG.invitationMessage.headline} — With boundless blessings from the Sharma & Kapoor families.”`}
          </p>

          <p className="mt-1 sm:mt-2 font-label text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-deep font-normal">
            Sharma&apos;s ♥ Kapoor&apos;s · Jaipur 2027
          </p>
        </div>
      </div>
    </section>
  );
}
