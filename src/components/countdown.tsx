import { useEffect, useState } from "react";

const CELL_MS = {
  day: 86_400_000,
  hour: 3_600_000,
  minute: 60_000,
  second: 1_000,
} as const;

function timeLeft(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / CELL_MS.day),
    hours: Math.floor(ms / CELL_MS.hour) % 24,
    minutes: Math.floor(ms / CELL_MS.minute) % 60,
    seconds: Math.floor(ms / CELL_MS.second) % 60,
  };
}

export function Countdown({
  targetISO,
  className = "",
}: {
  targetISO: string;
  className?: string;
}) {
  const target = new Date(targetISO).getTime();
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(() => timeLeft(target));

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setLeft(timeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const shown = mounted ? left : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const cells = [
    { label: "Days", value: shown.days },
    { label: "Hours", value: shown.hours },
    { label: "Minutes", value: shown.minutes },
    { label: "Seconds", value: shown.seconds },
  ] as const;

  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {cells.map(({ label, value }) => (
          <div
            key={label}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] p-5 sm:p-6 text-center shadow-[0_8px_24px_-8px_rgba(64,55,47,0.06)] transition-all duration-400 hover:-translate-y-1 hover:border-[#B49A76] hover:bg-white hover:shadow-[0_14px_32px_-6px_rgba(180,154,118,0.22)]"
          >
            {/* Subtle Inner Framing Hairline */}
            <div className="absolute inset-1.5 rounded-[7px] border border-[#DED5C8]/50 pointer-events-none transition-colors group-hover:border-[#B49A76]/40" />

            {/* Numerical Digit (Cormorant Garamond, elegant medium weight) */}
            <div className="relative font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#40372F] transition-transform duration-300 group-hover:scale-105">
              <span className={label === "Seconds" ? "text-[#B49A76]" : ""}>
                {String(value).padStart(2, "0")}
              </span>
            </div>

            {/* Label in Montserrat Typography (Medium weight, uppercase, refined letter spacing) */}
            <div className="relative mt-1.5 font-montserrat text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8B7B6B]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
