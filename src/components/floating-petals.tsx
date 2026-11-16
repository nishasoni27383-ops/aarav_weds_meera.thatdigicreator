import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  colorType: number; // 0: blush rose, 1: dusty rose, 2: champagne gold sparkle
}

export function FloatingPetals({
  enabled = true,
  density = 22,
  className = "",
}: {
  enabled?: boolean;
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color definitions
    const colors = [
      { fill: "rgba(224, 154, 158, ", stroke: "rgba(196, 122, 127, " }, // Soft blush
      { fill: "rgba(200, 115, 122, ", stroke: "rgba(168, 88, 95, " },   // Dusty rose
      { fill: "rgba(235, 198, 120, ", stroke: "rgba(212, 175, 55, " },  // Champagne gold
    ];

    // Initialize petals
    const petals: Petal[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 9 + Math.random() * 12,
      speedY: 0.6 + Math.random() * 0.9,
      speedX: (Math.random() - 0.4) * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.015 + Math.random() * 0.02,
      opacity: 0.35 + Math.random() * 0.45,
      colorType: Math.random() < 0.2 ? 2 : Math.random() < 0.6 ? 0 : 1,
    }));

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.01;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(t + i) * 0.4;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const flipScale = Math.cos(p.flip);
        ctx.scale(1, flipScale);

        const col = colors[p.colorType];

        if (p.colorType === 2) {
          // Gold Shimmer Particle
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 0.5);
          grad.addColorStop(0, `${col.fill}${p.opacity})`);
          grad.addColorStop(1, "rgba(212, 175, 55, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Romantic Rose Petal Shape
          ctx.fillStyle = `${col.fill}${p.opacity})`;
          ctx.strokeStyle = `${col.stroke}${p.opacity * 0.6})`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.7);
          ctx.bezierCurveTo(
            p.size * 0.6,
            -p.size * 0.6,
            p.size * 0.7,
            p.size * 0.3,
            0,
            p.size * 0.8
          );
          ctx.bezierCurveTo(
            -p.size * 0.7,
            p.size * 0.3,
            -p.size * 0.6,
            -p.size * 0.6,
            0,
            -p.size * 0.7
          );
          ctx.fill();
          ctx.stroke();

          // Subtle center vein
          ctx.strokeStyle = `${col.stroke}${p.opacity * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.5);
          ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.5);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, density]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-20 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
