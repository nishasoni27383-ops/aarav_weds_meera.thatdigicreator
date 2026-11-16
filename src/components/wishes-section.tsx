import { useState, useEffect } from "react";
import floralCorner from "@/assets/floral-corner.png";
import mandala from "@/assets/mandala.png";

interface Wish {
  id: string;
  name: string;
  email?: string;
  message: string;
  date: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: "1",
    name: "Dr. Alok & Radhika Verma",
    message: "Wishing dearest Aarav and Meera a lifetime of unconditional love, harmony, and endless laughter. Blessed to be part of your special day!",
    date: "1 Nov 2026",
  },
  {
    id: "2",
    name: "Rohan & Sneha Kapoor",
    message: "From childhood partners in crime to life partners! May your journey together be as colorful and magical as this royal celebration.",
    date: "31 Oct 2026",
  },
  {
    id: "3",
    name: "Pooja & Siddharth Sharma",
    message: "Heartiest congratulations to both the families. Looking forward to dancing our hearts out at the Sangeet!",
    date: "30 Oct 2026",
  },
];

export function WishesSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(DEFAULT_WISHES);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_guest_wishes");
      if (stored) {
        setWishes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load wishes:", e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim() || undefined,
        message: message.trim(),
        date: "Just now",
      };

      const updated = [newWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem("wedding_guest_wishes", JSON.stringify(updated));
      } catch (err) {
        console.warn(err);
      }

      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  return (
    <section id="wishes-section" className="relative px-4 sm:px-6 py-20 md:py-28 overflow-hidden">
      {/* Background Decorative Mandala */}
      <img
        src={mandala}
        alt=""
        className="spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[85vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-primary font-normal">
            Words of Love & Blessings
          </p>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl text-foreground font-medium">
            Send Your Wedding Wishes
          </h2>
          <p className="mt-3 font-body text-base text-muted-foreground max-w-md mx-auto font-normal">
            Leave a personal note or heartfelt prayer for Aarav & Meera. Your warm words will be cherished forever.
          </p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="text-gold-deep text-sm leading-none">♥</span>
            <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </div>

        {/* Wishes Form & Confirmation Card */}
        <div className="mt-12 rounded-3xl border border-gold/60 bg-card/95 p-6 sm:p-10 shadow-[0_24px_55px_-18px_rgba(70,30,20,0.15)] relative overflow-hidden">
          <img
            src={floralCorner}
            alt=""
            className="pointer-events-none absolute top-2 right-2 w-16 opacity-35"
          />
          <img
            src={floralCorner}
            alt=""
            className="pointer-events-none absolute bottom-2 left-2 w-16 rotate-180 opacity-35"
          />

          {submitted ? (
            <div className="py-6 text-center animate-fade-in">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/80 text-2xl text-primary border border-gold/50 shadow-sm">
                💌
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-foreground font-medium">
                Wishes Sent with Love!
              </h3>
              <p className="mt-3 font-body text-base sm:text-lg italic text-muted-foreground max-w-md mx-auto leading-relaxed font-normal">
                “Your wishes mean the world to us. Thank you for being part of our celebration!”
              </p>
              <p className="mt-2 font-couple text-3xl sm:text-4xl text-gold-deep font-normal">
                — Aarav & Meera
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-label font-normal uppercase tracking-[0.18em] text-primary hover:text-gold-deep underline underline-offset-4 cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-xs uppercase tracking-[0.18em] text-foreground mb-1.5 font-normal">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya & Karan Malhotra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gold/50 bg-background/80 px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-gold font-normal"
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-[0.18em] text-foreground mb-1.5 font-normal">
                    Email Address <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gold/50 bg-background/80 px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-gold font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label text-xs uppercase tracking-[0.18em] text-foreground mb-1.5 font-normal">
                  Your Message or Wedding Wishes *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your heartfelt blessing, memories, or wishes for the couple..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-gold/50 bg-background/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold resize-none font-normal"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="luxury-foil-btn w-full sm:w-auto px-10 py-3 rounded-full font-label text-xs sm:text-sm font-normal uppercase tracking-[0.2em] cursor-pointer disabled:opacity-60"
                >
                  {loading ? "Sending Wishes..." : "Send Wishes ♥"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Wishes Wall / Guestbook Display */}
        {wishes.length > 0 && (
          <div className="mt-14">
            <h3 className="text-center font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 font-normal">
              Recent Blessings From Loved Ones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wishes.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="rounded-2xl border border-gold/40 bg-card/90 p-5 shadow-sm flex flex-col justify-between"
                >
                  <p className="font-body italic text-sm text-foreground/90 leading-relaxed font-normal">
                    “{w.message}”
                  </p>
                  <div className="mt-4 pt-3 border-t border-gold/25 flex items-center justify-between text-[11px]">
                    <span className="font-label font-normal text-xs uppercase tracking-[0.16em] text-foreground">
                      {w.name}
                    </span>
                    <span className="font-body text-xs text-muted-foreground font-normal">{w.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
