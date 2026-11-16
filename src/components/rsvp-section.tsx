import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { WEDDING_CONFIG } from "@/config/wedding";

interface RsvpFormState {
  name: string;
  guests: string;
  blessing: string;
}

/**
 * Editorial Botanical Line-Art Motif
 * Delicate, whisper-thin branch illustration inspired by luxury European wedding stationery.
 */
function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 90 C 25 65, 45 35, 90 10"
        stroke="#B49A76"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M32 68 C 26 60, 33 52, 42 60 C 39 67, 34 68, 32 68 Z"
        stroke="#B49A76"
        strokeWidth="0.75"
        fill="#B49A76"
        fillOpacity="0.08"
      />
      <path
        d="M48 54 C 55 48, 62 54, 58 63 C 51 61, 48 56, 48 54 Z"
        stroke="#B49A76"
        strokeWidth="0.75"
        fill="#B49A76"
        fillOpacity="0.08"
      />
      <path
        d="M62 40 C 58 31, 68 25, 75 32 C 72 38, 66 41, 62 40 Z"
        stroke="#B49A76"
        strokeWidth="0.75"
        fill="#B49A76"
        fillOpacity="0.08"
      />
      <path
        d="M78 26 C 85 20, 92 26, 88 34 C 82 33, 79 28, 78 26 Z"
        stroke="#B49A76"
        strokeWidth="0.75"
        fill="#B49A76"
        fillOpacity="0.08"
      />
      <circle cx="92" cy="10" r="1.5" fill="#B49A76" fillOpacity="0.5" />
    </svg>
  );
}

export function RsvpSection() {
  const [formData, setFormData] = useState<RsvpFormState>({
    name: "",
    guests: "2",
    blessing: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_rsvp_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({
          name: parsed.name || "",
          guests: parsed.guests || "2",
          blessing: parsed.blessing || parsed.message || "",
        });
        if (parsed.name) {
          setSubmitted(true);
        }
      }
    } catch (e) {
      console.warn("Storage err:", e);
    }
  }, []);

  const generateWhatsAppUrl = (name: string, guests: string | number, blessing: string) => {
    const num = parseInt(guests.toString().trim(), 10) || 1;
    const personWord = num === 1 ? "person" : "persons";
    const guestName = name.trim();
    const blessingText = blessing.trim();

    // Exact dynamic WhatsApp message requested by user
    const draftMessage = `Hello dear! ❤️
We are ${guestName}.
${blessingText}
We will be joining you with ${num} ${personWord} to celebrate your special day.
We are truly happy to be a part of your beautiful celebration.
Sending lots of love, happiness and blessings! ✨`;

    const phone = (
      WEDDING_CONFIG.invitationMessage.rsvpWhatsAppNumber ||
      WEDDING_CONFIG.invitationMessage.helplinePhone ||
      ""
    ).replace(/[^0-9]/g, "");

    const isDummyPhone = !phone || phone === "919876543210" || phone.endsWith("9876543210");
    const url = isDummyPhone
      ? `https://api.whatsapp.com/send?text=${encodeURIComponent(draftMessage)}`
      : `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(draftMessage)}`;

    return { draftMessage, url };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your name!");
      return;
    }
    if (!formData.blessing.trim()) {
      toast.error("Please write your blessings for the couple!");
      return;
    }

    const { url } = generateWhatsAppUrl(formData.name, formData.guests, formData.blessing);

    try {
      localStorage.setItem("wedding_rsvp_data", JSON.stringify(formData));
    } catch (err) {
      console.warn("Storage err:", err);
    }

    setSubmitted(true);
    toast.success("Opening WhatsApp with your blessings! ✨");
    window.open(url, "_blank");
  };

  const handleOpenWhatsAppAgain = () => {
    const { url } = generateWhatsAppUrl(formData.name, formData.guests, formData.blessing);
    window.open(url, "_blank");
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <section
      id="rsvp-section"
      className="relative px-4 sm:px-6 py-20 md:py-28 overflow-hidden"
    >
      <div className="relative mx-auto max-w-xl">
        {/* ── Section Header (Editorial Luxury Typography) ── */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-montserrat text-xs tracking-[0.2em] uppercase text-[#8B7B6B] font-medium">
            Wishes &amp; Attendance
          </p>

          <h2 className="font-cormorant text-4xl sm:text-5xl text-[#40372F] font-normal tracking-[-0.01em] mt-3">
            Celebrate <span className="italic font-light text-[#8B7B6B]">With Us</span>
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[#DED5C8]" />

          <p className="font-montserrat text-xs sm:text-sm text-[#8B7B6B] max-w-md mx-auto mt-4 leading-relaxed font-normal">
            Your presence will illuminate our celebration. Share your warm blessings and confirm your presence below.
          </p>
        </div>

        {/* ── Editorial Stationery Card ── */}
        <div className="relative rounded-[12px] border border-[#DED5C8] bg-[#FBF9F5]/95 backdrop-blur-md p-7 sm:p-12 shadow-[0_12px_40px_-12px_rgba(64,55,47,0.12)]">
          {/* Subtle Botanical Line-Art Illustration (Corner Placement) */}
          <BotanicalBranch className="pointer-events-none absolute -top-1 -right-1 w-24 sm:w-28 opacity-45 rotate-90" />
          <BotanicalBranch className="pointer-events-none absolute -bottom-1 -left-1 w-20 sm:w-24 opacity-35 -rotate-90" />

          {submitted ? (
            /* ── Submitted Confirmation View ── */
            <div className="relative z-10 py-4 text-center">
              <span className="font-cormorant text-2xl text-[#B49A76] italic">Sincerely,</span>

              <h3 className="font-cormorant text-3xl sm:text-4xl text-[#40372F] font-normal mt-1">
                Thank You, {formData.name}
              </h3>

              <p className="font-montserrat text-xs sm:text-sm text-[#8B7B6B] max-w-sm mx-auto mt-3 leading-relaxed font-normal">
                Your message has been drafted for WhatsApp. We are truly delighted to share our celebration with you.
              </p>

              {formData.blessing && (
                <div className="mt-6 mx-auto max-w-md rounded-[10px] bg-[#EFE9DE] border border-[#DED5C8] p-5 text-left font-cormorant text-base text-[#40372F] italic leading-relaxed whitespace-pre-line shadow-xs">
                  “{formData.blessing}”
                </div>
              )}

              <p className="mt-4 font-montserrat text-xs tracking-[0.14em] uppercase text-[#B49A76] font-medium">
                Party of {formData.guests} {parseInt(formData.guests, 10) === 1 ? "Person" : "Persons"}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppAgain}
                  className="group inline-flex items-center justify-center rounded-[10px] bg-[#B49A76] hover:bg-[#A38865] px-7 py-3 font-montserrat text-xs tracking-[0.14em] uppercase text-white font-medium transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>Open WhatsApp Again</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="rounded-[10px] border border-[#DED5C8] bg-transparent hover:bg-[#EFE9DE] px-6 py-3 font-montserrat text-xs tracking-[0.14em] uppercase text-[#40372F] font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ) : (
            /* ── Editorial Form Fields ── */
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Field 1: Guest Name(s) */}
              <div className="text-left">
                <label
                  htmlFor="guest-name"
                  className="block font-montserrat text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#40372F] font-medium mb-2"
                >
                  Guest Name(s) <span className="text-[#B49A76]">*</span>
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="e.g. Smt. & Shri Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] px-4 py-3 font-montserrat text-sm text-[#40372F] placeholder:text-[#8B7B6B]/50 focus:border-[#B49A76] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B49A76]/40 transition-all duration-200"
                />
              </div>

              {/* Field 2: Number of People Attending Wedding */}
              <div className="text-left">
                <label
                  htmlFor="guest-count"
                  className="block font-montserrat text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#40372F] font-medium mb-2"
                >
                  Number of People Attending Wedding <span className="text-[#B49A76]">*</span>
                </label>
                <input
                  id="guest-count"
                  type="number"
                  min="1"
                  max="50"
                  required
                  placeholder="2"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] px-4 py-3 font-montserrat text-sm text-[#40372F] placeholder:text-[#8B7B6B]/50 focus:border-[#B49A76] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B49A76]/40 transition-all duration-200"
                />
              </div>

              {/* Field 3: Blessings to Bride & Groom */}
              <div className="text-left">
                <label
                  htmlFor="guest-blessing"
                  className="block font-montserrat text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#40372F] font-medium mb-2"
                >
                  Blessings to Bride &amp; Groom <span className="text-[#B49A76]">*</span>
                </label>
                <textarea
                  id="guest-blessing"
                  rows={4}
                  required
                  placeholder="Share your warm blessings, prayers and love for the couple..."
                  value={formData.blessing}
                  onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  className="w-full rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] px-4 py-3 font-montserrat text-sm text-[#40372F] placeholder:text-[#8B7B6B]/50 focus:border-[#B49A76] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B49A76]/40 transition-all duration-200 resize-none leading-relaxed"
                />
              </div>

              {/* ── Button Design: Champagne-Gold (#B49A76), moderate height, rounded corners, small arrow ── */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center rounded-[10px] bg-[#B49A76] hover:bg-[#A38865] px-9 py-3.5 font-montserrat text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>Send Your Wishes</span>
                  <ArrowRight
                    className="w-4 h-4 ml-2.5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.8}
                  />
                </button>

                <p className="mt-3 font-montserrat text-[11px] sm:text-xs text-[#8B7B6B] font-light">
                  Opens WhatsApp with your personalized blessing and attendance details ready to send.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
