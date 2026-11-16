import mandala from "@/assets/mandala.png";
import floralCorner from "@/assets/floral-corner.png";

interface TimelineEvent {
  id: string;
  name: string;
  day: string;
  date: string;
  time: string;
  inviteLine: string;
}

const PROGRAM_EVENTS: TimelineEvent[] = [
  {
    id: "mehendi",
    name: "Mehendi Ceremony",
    day: "Thursday",
    date: "11 February 2027",
    time: "4:00 PM Onwards",
    inviteLine: "Celebrate colorful henna and love",
  },
  {
    id: "haldi",
    name: "Haldi Rasam",
    day: "Friday",
    date: "12 February 2027",
    time: "10:00 AM Onwards",
    inviteLine: "Bless us with golden turmeric",
  },
  {
    id: "sangeet",
    name: "Royal Sangeet & Cocktails",
    day: "Friday",
    date: "12 February 2027",
    time: "7:30 PM Onwards",
    inviteLine: "Dance the royal night away",
  },
  {
    id: "baraat",
    name: "Royal Baraat & Varmala",
    day: "Saturday",
    date: "13 February 2027",
    time: "6:00 PM Onwards",
    inviteLine: "Celebrate the grand royal arrival",
  },
  {
    id: "wedding",
    name: "Sacred Wedding Ceremony",
    day: "Saturday",
    date: "13 February 2027",
    time: "7:30 PM (Muhurat)",
    inviteLine: "Witness our sacred seven vows",
  },
  {
    id: "reception",
    name: "Grand Royal Reception",
    day: "Sunday",
    date: "14 February 2027",
    time: "7:00 PM Onwards",
    inviteLine: "Toast our new royal journey",
  },
];

export function RoyalTimelineScroll() {
  return (
    <div className="relative mx-auto max-w-3xl px-3 sm:px-6">
      {/* ── TOP ORNATE GOLDEN SCROLL ROLLER ROD ── */}
      <div className="relative flex items-center justify-center z-20 -mb-2 sm:-mb-3">
        {/* Left Golden Finial / Finial Knob */}
        <div className="relative -mr-1 z-30 flex items-center justify-center">
          <div className="w-5 h-7 sm:w-7 sm:h-9 rounded-full bg-gradient-to-r from-[#996515] via-[#d4af37] to-[#ffd875] border-2 border-[#fff3cc] shadow-[0_4px_12px_rgba(70,35,10,0.45)]" />
          <div className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-sm bg-gradient-to-r from-[#7a4c0a] to-[#d4af37] border-y border-gold/80" />
        </div>

        {/* Central Cylindrical Roller Rod */}
        <div className="relative flex-1 h-5 sm:h-7 rounded-full bg-gradient-to-b from-[#fff6d6] via-[#d4af37] to-[#7a480d] border border-amber-200/90 shadow-[0_6px_18px_rgba(60,30,10,0.4)] overflow-hidden">
          {/* Metallic Specular Shimmer Layer */}
          <div className="absolute inset-x-0 top-0.5 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
        </div>

        {/* Right Golden Finial / Finial Knob */}
        <div className="relative -ml-1 z-30 flex items-center justify-center">
          <div className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-sm bg-gradient-to-l from-[#7a4c0a] to-[#d4af37] border-y border-gold/80" />
          <div className="w-5 h-7 sm:w-7 sm:h-9 rounded-full bg-gradient-to-l from-[#996515] via-[#d4af37] to-[#ffd875] border-2 border-[#fff3cc] shadow-[0_4px_12px_rgba(70,35,10,0.45)]" />
        </div>
      </div>

      {/* ── TOP VELVET SCROLL ROLL CURL ── */}
      <div className="relative z-10 mx-3 sm:mx-6 h-5 sm:h-6 rounded-t-xl bg-gradient-to-b from-[#e1cca4] via-[#eed9bb] to-[#fbf8f0] border-t-2 border-x-2 border-gold/80 shadow-[inset_0_3px_8px_rgba(100,50,15,0.25)]" />

      {/* ── ROYAL VELVET SCROLL BODY (BEIGE & GOLDEN PARCHMENT) ── */}
      <div className="relative mx-3 sm:mx-6 overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f7f0e3] to-[#eedec4] dark:from-[#2a2219] dark:via-[#221a13] dark:to-[#1a130c] border-x-4 border-gold/85 shadow-[inset_28px_0_40px_-18px_rgba(180,120,40,0.28),inset_-28px_0_40px_-18px_rgba(180,120,40,0.28),0_25px_60px_-12px_rgba(60,30,10,0.35)] py-8 sm:py-12 px-4 sm:px-10">
        {/* Soft Velvet Ambient Shading */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10 mix-blend-multiply" />

        {/* Subtle Watermark Mandala */}
        <img
          src={mandala}
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 opacity-[0.05] spin-slower"
        />

        {/* Inner Dual Gold Hairline Frame */}
        <div className="absolute inset-2 sm:inset-4 rounded-xl border border-gold/50 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-5 rounded-lg border border-gold/25 pointer-events-none" />

        {/* Botanical Gold Corner Ornaments */}
        <img
          src={floralCorner}
          alt=""
          className="pointer-events-none absolute top-3 left-3 w-12 sm:w-16 opacity-60"
        />
        <img
          src={floralCorner}
          alt=""
          className="pointer-events-none absolute top-3 right-3 w-12 sm:w-16 rotate-90 opacity-60"
        />
        <img
          src={floralCorner}
          alt=""
          className="pointer-events-none absolute bottom-3 left-3 w-12 sm:w-16 -rotate-90 opacity-60"
        />
        <img
          src={floralCorner}
          alt=""
          className="pointer-events-none absolute bottom-3 right-3 w-12 sm:w-16 rotate-180 opacity-60"
        />

        {/* ── PROGRAM EVENTS LIST ON THE SCROLL ── */}
        <div className="relative z-10 space-y-6 sm:space-y-8 py-2">
          {PROGRAM_EVENTS.map((event, index) => (
            <div key={event.id} className="text-center group">
              {/* Function Name in Golden Great Vibes Calligraphy */}
              <h3 className="gold-timeline-title font-couple text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide py-0.5 leading-[1.3]">
                {event.name}
              </h3>

              {/* Date + Time */}
              <p className="mt-1.5 font-label text-xs sm:text-sm font-normal uppercase tracking-[0.22em] text-[#8e601f] dark:text-[#f0cb7e]">
                {event.day}, {event.date} · {event.time}
              </p>

              {/* Warm Invite Line in 4–5 Words */}
              <p className="mt-2 font-body text-base sm:text-lg italic text-muted-foreground font-normal leading-relaxed">
                “{event.inviteLine}”
              </p>

              {/* Delicate Gold Heart Divider between events */}
              {index < PROGRAM_EVENTS.length - 1 && (
                <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3" aria-hidden>
                  <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="text-gold-deep text-xs leading-none">♥</span>
                  <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM VELVET SCROLL ROLL CURL ── */}
      <div className="relative z-10 mx-3 sm:mx-6 h-5 sm:h-6 rounded-b-xl bg-gradient-to-t from-[#e1cca4] via-[#eed9bb] to-[#fbf8f0] border-b-2 border-x-2 border-gold/80 shadow-[inset_0_-3px_8px_rgba(100,50,15,0.25)]" />

      {/* ── BOTTOM ORNATE GOLDEN SCROLL ROLLER ROD ── */}
      <div className="relative flex items-center justify-center z-20 -mt-2 sm:-mt-3">
        {/* Left Golden Finial */}
        <div className="relative -mr-1 z-30 flex items-center justify-center">
          <div className="w-5 h-7 sm:w-7 sm:h-9 rounded-full bg-gradient-to-r from-[#996515] via-[#d4af37] to-[#ffd875] border-2 border-[#fff3cc] shadow-[0_4px_12px_rgba(70,35,10,0.45)]" />
          <div className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-sm bg-gradient-to-r from-[#7a4c0a] to-[#d4af37] border-y border-gold/80" />
        </div>

        {/* Central Cylindrical Roller Rod */}
        <div className="relative flex-1 h-5 sm:h-7 rounded-full bg-gradient-to-b from-[#fff6d6] via-[#d4af37] to-[#7a480d] border border-amber-200/90 shadow-[0_6px_18px_rgba(60,30,10,0.4)] overflow-hidden">
          <div className="absolute inset-x-0 top-0.5 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
        </div>

        {/* Right Golden Finial */}
        <div className="relative -ml-1 z-30 flex items-center justify-center">
          <div className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-sm bg-gradient-to-l from-[#7a4c0a] to-[#d4af37] border-y border-gold/80" />
          <div className="w-5 h-7 sm:w-7 sm:h-9 rounded-full bg-gradient-to-l from-[#996515] via-[#d4af37] to-[#ffd875] border-2 border-[#fff3cc] shadow-[0_4px_12px_rgba(70,35,10,0.45)]" />
        </div>
      </div>
    </div>
  );
}
