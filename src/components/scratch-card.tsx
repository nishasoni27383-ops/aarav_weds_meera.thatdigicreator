import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import floralCorner from "@/assets/floral-corner.png";
import mandala from "@/assets/mandala.png";

type Point = { x: number; y: number };

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

// Celebration harp chime
function playRevealChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major royal arpeggio
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.5);
    });
  } catch (e) {
    console.error("Audio error:", e);
  }
}

/**
 * Traces a romantic curved heart path inside a box of (w, h).
 * Path matches the SVG clipPath identically:
 * Top cusp at (0.5w, 0.22h), lobes curving up to (0.14w, 0.16h) and (0.86w, 0.16h),
 * outer edges at (0.02w, 0.54h) and (0.98w, 0.54h), bottom tip at (0.5w, 0.98h).
 */
function traceHeart(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.beginPath();
  ctx.moveTo(0.5 * w, 0.22 * h);
  ctx.bezierCurveTo(0.5 * w, 0.1 * h, 0.28 * w, 0.02 * h, 0.14 * w, 0.16 * h);
  ctx.bezierCurveTo(0.0 * w, 0.3 * h, 0.02 * w, 0.54 * h, 0.22 * w, 0.74 * h);
  ctx.bezierCurveTo(0.34 * w, 0.86 * h, 0.46 * w, 0.94 * h, 0.5 * w, 0.98 * h);
  ctx.bezierCurveTo(0.54 * w, 0.94 * h, 0.66 * w, 0.86 * h, 0.78 * w, 0.74 * h);
  ctx.bezierCurveTo(0.98 * w, 0.54 * h, 1.0 * w, 0.3 * h, 0.86 * w, 0.16 * h);
  ctx.bezierCurveTo(0.72 * w, 0.02 * h, 0.5 * w, 0.1 * h, 0.5 * w, 0.22 * h);
  ctx.closePath();
}

/**
 * Draws a 4-point diamond sparkle star on canvas
 */
function drawSparkleStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color = "#ffffff"
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.closePath();
  ctx.fill();

  // Glow dot in center
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function ScratchCard({
  children,
  className = "",
  brushRadius = 26,
  onReveal,
}: {
  children?: ReactNode;
  className?: string;
  brushRadius?: number;
  onReveal?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const moveCountRef = useRef(0);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [key, setKey] = useState(0);

  // Paint the glitter foil on canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const W = canvas.width;
    const H = canvas.height;

    // Reset composite operation & clear
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);

    // Clip to heart shape so glitter stays strictly within heart
    ctx.save();
    traceHeart(ctx, W, H);
    ctx.clip();

    // 1. Multi-tone metallic champagne gold & rose base gradient
    const base = ctx.createRadialGradient(
      W * 0.45,
      H * 0.35,
      W * 0.05,
      W * 0.5,
      H * 0.52,
      W * 0.62
    );
    base.addColorStop(0, "#fff5d0"); // bright gold highlight
    base.addColorStop(0.2, "#f7d27e"); // glowing satin gold
    base.addColorStop(0.45, "#d99f48"); // rich royal gold
    base.addColorStop(0.7, "#c47a52"); // warm romantic rose-gold
    base.addColorStop(0.88, "#9e5c1e"); // deep bronze amber
    base.addColorStop(1, "#69360c"); // deep edge shadow
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);

    // 2. Diagonal specular light reflection sweeps across heart
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const sweep = ctx.createLinearGradient(0, 0, W, H);
    sweep.addColorStop(0, "rgba(255, 255, 255, 0)");
    sweep.addColorStop(0.3, "rgba(255, 245, 215, 0.15)");
    sweep.addColorStop(0.42, "rgba(255, 255, 255, 0.48)");
    sweep.addColorStop(0.52, "rgba(255, 245, 215, 0.2)");
    sweep.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // 3. Dense procedural golden glitter field (2,400+ micro glitter particles)
    const glitterColors = [
      "rgba(255, 255, 255, 0.98)",
      "rgba(255, 245, 185, 0.95)",
      "rgba(255, 230, 130, 0.9)",
      "rgba(255, 215, 0, 0.85)",
      "rgba(245, 180, 50, 0.8)",
      "rgba(218, 165, 32, 0.75)",
      "rgba(255, 250, 220, 1.0)",
    ];

    for (let i = 0; i < 2400; i++) {
      const gx = Math.random() * W;
      const gy = Math.random() * H;
      const gr = Math.random() * 2.0 + 0.3;
      const color = glitterColors[Math.floor(Math.random() * glitterColors.length)];
      ctx.globalAlpha = Math.random() * 0.75 + 0.25;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Sparkling diamond stars scattered across the golden glitter
    const starCount = 48;
    for (let i = 0; i < starCount; i++) {
      const sx = W * 0.12 + Math.random() * (W * 0.76);
      const sy = H * 0.12 + Math.random() * (H * 0.76);
      const sSize = Math.random() * 7 + 3;
      const sColor =
        Math.random() > 0.3 ? "rgba(255,255,255,0.98)" : "rgba(255,235,160,0.95)";
      drawSparkleStar(ctx, sx, sy, sSize, sColor);
    }
    ctx.globalAlpha = 1;

    // Plain golden glitter heart without text or inner liner lines
    ctx.restore(); // remove clip
  }, []);

  useEffect(() => {
    revealedRef.current = false;
    setRevealed(false);
    initCanvas();
  }, [initCanvas, key]);

  const toCanvasPoint = (e: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const scratchLine = useCallback(
    (from: Point, to: Point) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [brushRadius]
  );

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || revealedRef.current) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let totalHeartPixels = 0;

    // Sample pixels across the canvas, counting those inside the heart
    const step = 4 * 16;
    for (let i = 3; i < data.length; i += step) {
      const pixelIdx = Math.floor(i / 4);
      const x = (pixelIdx % canvas.width) / canvas.width;
      const y = Math.floor(pixelIdx / canvas.width) / canvas.height;

      // Approximate heart test for sampling to ensure ratio reflects heart area
      const dx = (x - 0.5) * 1.3;
      const dy = (y - 0.45) * 1.3;
      if (Math.hypot(dx, dy) < 0.6) {
        totalHeartPixels++;
        if (data[i] === 0) {
          clear++;
        }
      }
    }

    if (totalHeartPixels > 0 && clear / totalHeartPixels > 0.4) {
      revealedRef.current = true;
      setRevealed(true);
      playRevealChime();
      onReveal?.();
    }
  }, [onReveal]);

  const endScratch = useCallback(() => {
    drawingRef.current = false;
    lastPointRef.current = null;
    checkProgress();
  }, [checkProgress]);

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = toCanvasPoint(e);
    lastPointRef.current = p;
    scratchLine(p, p);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealedRef.current) return;
    const p = toCanvasPoint(e);
    const last = lastPointRef.current ?? p;
    scratchLine(last, p);
    lastPointRef.current = p;

    // Add tiny gold sparkle flecks while user scratches
    if (Math.random() > 0.5) {
      const newParticle: Particle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 3,
        color: Math.random() > 0.4 ? "#fce59f" : "#ffffff",
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 1,
        opacity: 1,
      };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    }

    moveCountRef.current += 1;
    if (moveCountRef.current % 8 === 0) checkProgress();
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  const handleRevealAll = () => {
    if (revealed) return;
    revealedRef.current = true;
    setRevealed(true);
    playRevealChime();
    onReveal?.();
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* SVG Definitions for Heart Clipping & Gilded Borders */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          {/* Normalized Heart ClipPath (0 to 1 bounding box) */}
          <clipPath id="heart-scratch-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0.22 C 0.5,0.10, 0.28,0.02, 0.14,0.16 C 0.00,0.30, 0.02,0.54, 0.22,0.74 C 0.34,0.86, 0.46,0.94, 0.50,0.98 C 0.54,0.94, 0.66,0.86, 0.78,0.74 C 0.98,0.54, 1.00,0.30, 0.86,0.16 C 0.72,0.02, 0.50,0.10, 0.50,0.22 Z" />
          </clipPath>

          {/* Gilded Heart Border Gradient */}
          <linearGradient id="gold-heart-border-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff3cf" />
            <stop offset="25%" stopColor="#e5b85a" />
            <stop offset="50%" stopColor="#c58930" />
            <stop offset="75%" stopColor="#f7d88b" />
            <stop offset="100%" stopColor="#8f5713" />
          </linearGradient>

          <linearGradient id="rose-gold-shadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3c68f" />
            <stop offset="100%" stopColor="#c56d68" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── THE HEART CARD CONTAINER ─────────────────────────────────── */}
      <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[480px] md:h-[480px] flex items-center justify-center">
        {/* Ambient Heart Golden & Rose Glow */}
        <div
          className="absolute inset-2 rounded-full pointer-events-none opacity-45 blur-2xl transition-all duration-1000"
          style={{
            background: revealed
              ? "radial-gradient(circle, rgba(245,195,85,0.6) 0%, rgba(220,90,110,0.35) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(230,175,60,0.45) 0%, rgba(200,80,95,0.2) 55%, transparent 75%)",
          }}
        />

        {/* ── LAYER 1: UNDERNEATH REVEALED HEART CARD ── */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
          style={{
            clipPath: "url(#heart-scratch-clip)",
            background:
              "radial-gradient(circle at 50% 40%, #ffffff 0%, #fef9ef 50%, #f6ebd8 100%)",
            boxShadow: "inset 0 0 40px rgba(180, 120, 40, 0.25)",
          }}
        >
          {/* Subtle Mandala Watermark */}
          <img
            src={mandala}
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 w-72 sm:w-88 -translate-x-1/2 -translate-y-1/2 opacity-15 spin-slower"
          />


          {/* Floral Corner Accents inside Heart */}
          <img
            src={floralCorner}
            alt=""
            className="absolute top-8 left-8 w-14 sm:w-20 opacity-55 pointer-events-none"
          />
          <img
            src={floralCorner}
            alt=""
            className="absolute top-8 right-8 w-14 sm:w-20 rotate-90 opacity-55 pointer-events-none"
          />

          {/* ── WEDDING DATE IN THE CENTER OF THE HEART ── */}
          {children ? (
            children
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center -translate-y-2 sm:-translate-y-3 px-3 w-full max-w-[220px] sm:max-w-[290px]">
              <span className="gold-text font-heading text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight drop-shadow-[0_4px_20px_rgba(180,120,40,0.45)] leading-none">
                13
              </span>
              <span className="mt-2.5 font-label text-xs sm:text-sm md:text-base text-foreground font-medium tracking-[0.14em] uppercase drop-shadow-xs whitespace-nowrap">
                February 2027
              </span>
            </div>
          )}
        </div>

        {/* ── LAYER 2: GLITTERY FOIL CANVAS (Scratched away by user) ── */}
        <canvas
          ref={canvasRef}
          width={520}
          height={520}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            revealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            clipPath: "url(#heart-scratch-clip)",
            touchAction: "none",
            cursor: revealed ? "default" : "grab",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
          aria-label="Glittery heart scratch card — scratch to reveal the wedding date"
        />

        {/* ── LAYER 3: GILDED ORNATE HEART OUTER BORDER SVG ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_12px_28px_rgba(100,50,20,0.35)]"
          viewBox="0 0 100 100"
        >
          {/* Main Gold Border */}
          <path
            d="M 50,22 C 50,10, 28,2, 14,16 C 0,30, 2,54, 22,74 C 34,86, 46,94, 50,98 C 54,94, 66,86, 78,74 C 98,54, 100,30, 86,16 C 72,2, 50,10, 50,22 Z"
            fill="none"
            stroke="url(#gold-heart-border-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Floating Sparkle Particles spawned while scratching */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="fixed pointer-events-none z-50 rounded-full animate-ping"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ── INTERACTION CONTROLS / STATUS BELOW THE HEART ── */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {revealed ? (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs font-label font-normal tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all hover:scale-105 cursor-pointer bg-card/60 px-4 py-1.5 rounded-full border border-gold/40 shadow-sm animate-fade-in"
          >
            <span>↺</span> Scratch Again
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <p className="font-body text-xs sm:text-sm tracking-wide text-muted-foreground font-normal animate-pulse">
              ✨ Scratch with your finger or mouse to unveil the date ✨
            </p>
            <button
              onClick={handleRevealAll}
              className="text-[11px] font-label font-normal uppercase tracking-[0.18em] text-primary underline underline-offset-4 hover:text-gold-deep cursor-pointer"
            >
              Reveal Date
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
