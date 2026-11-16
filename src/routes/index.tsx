import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast, Toaster } from "sonner";
import { Clock, MapPin, ExternalLink } from "lucide-react";

import floralCorner from "@/assets/floral-corner.png";
import mandala from "@/assets/mandala.png";
import coupleSticker from "@/assets/couple-sticker.png";
import coupleHero from "@/assets/couple-hero.png";
import palaceDoorsHero from "@/assets/palace-doors-hero.jpg";
import palaceDoorsHeroLandscape from "@/assets/palace-doors-hero-landscape.jpg";

import { WEDDING_CONFIG } from "@/config/wedding";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { ScratchCard } from "@/components/scratch-card";
import { VideoDoorOpening } from "@/components/video-door-opening";
import { FloatingPetals } from "@/components/floating-petals";
import { RsvpSection } from "@/components/rsvp-section";
import { RoyalTimelineScroll } from "@/components/royal-timeline-scroll";
import websiteBgPortrait from "@/assets/website-bg-portrait.jpg";
import websiteBgLandscape from "@/assets/website-bg-landscape.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName} — Royal Wedding Invitation` },
      {
        name: "description",
        content: `You are cordially invited to celebrate the royal wedding of ${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName} at ${WEDDING_CONFIG.venue.name}, ${WEDDING_CONFIG.venue.city}, ${WEDDING_CONFIG.venue.state}.`,
      },
      { property: "og:title", content: `${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName} — Royal Wedding Invitation` },
      {
        property: "og:description",
        content: `A luxury digital wedding invitation celebrating ${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName} — ${WEDDING_CONFIG.weddingDate.date} in ${WEDDING_CONFIG.venue.city}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span className="text-gold-deep text-sm leading-none">♥</span>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}

function RoyalFortIcon({ className = "w-20 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Royal Fort & Palace Icon"
    >
      <defs>
        <linearGradient id="fortGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A5A18" />
        </linearGradient>
        <linearGradient id="fortWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9EB" />
          <stop offset="35%" stopColor="#F6E6C7" />
          <stop offset="100%" stopColor="#E2C99D" />
        </linearGradient>
        <linearGradient id="fortGateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A1E18" />
          <stop offset="100%" stopColor="#240D0B" />
        </linearGradient>
      </defs>

      {/* Central Majestic Chhatri (Domed Pavilion) */}
      <path
        d="M60 4 L60 9"
        stroke="url(#fortGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="4" r="2" fill="#D4AF37" />
      <path
        d="M60 9 C57 15 51 18 51 24 L69 24 C69 18 63 15 60 9 Z"
        fill="url(#fortGoldGrad)"
        stroke="#8A5A18"
        strokeWidth="1.2"
      />
      <line x1="54" y1="24" x2="54" y2="28" stroke="#8A5A18" strokeWidth="1.2" />
      <line x1="60" y1="24" x2="60" y2="28" stroke="#8A5A18" strokeWidth="1.2" />
      <line x1="66" y1="24" x2="66" y2="28" stroke="#8A5A18" strokeWidth="1.2" />
      <rect x="50" y="28" width="20" height="2.5" fill="url(#fortGoldGrad)" />

      {/* Left Tower & Chhatri */}
      <path d="M22 12 L22 16" stroke="url(#fortGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="12" r="1.5" fill="#D4AF37" />
      <path
        d="M22 16 C20 20 16 23 16 27 L28 27 C28 23 24 20 22 16 Z"
        fill="url(#fortGoldGrad)"
        stroke="#8A5A18"
        strokeWidth="1"
      />
      <line x1="18" y1="27" x2="18" y2="30" stroke="#8A5A18" strokeWidth="1" />
      <line x1="26" y1="27" x2="26" y2="30" stroke="#8A5A18" strokeWidth="1" />
      <rect x="14" y="30" width="16" height="2" fill="url(#fortGoldGrad)" />

      {/* Right Tower & Chhatri */}
      <path d="M98 12 L98 16" stroke="url(#fortGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="98" cy="12" r="1.5" fill="#D4AF37" />
      <path
        d="M98 16 C96 20 92 23 92 27 L104 27 C104 23 100 20 98 16 Z"
        fill="url(#fortGoldGrad)"
        stroke="#8A5A18"
        strokeWidth="1"
      />
      <line x1="94" y1="27" x2="94" y2="30" stroke="#8A5A18" strokeWidth="1" />
      <line x1="102" y1="27" x2="102" y2="30" stroke="#8A5A18" strokeWidth="1" />
      <rect x="90" y="30" width="16" height="2" fill="url(#fortGoldGrad)" />

      {/* Fortress Rampart Battlements (Kanguras) & Main Wall Body */}
      <path
        d="
          M10 40 
          L10 32 L14 32 L14 35 L18 35 L18 32 L22 32 L22 35 L26 35 L26 32 L30 32 L30 35 L34 35 L34 32 L38 32 L38 35 
          L46 35 L46 30 L50 30 L50 33 L54 33 L54 30 L58 30 L58 33 L62 33 L62 30 L66 30 L66 33 L70 33 L70 30 L74 30 L74 35
          L82 35 L82 32 L86 32 L86 35 L90 35 L90 32 L94 32 L94 35 L98 35 L98 32 L102 32 L102 35 L106 35 L106 32 L110 32 
          L110 40 L108 77 L12 77 Z
        "
        fill="url(#fortWallGrad)"
        stroke="#8A5A18"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Bastion Columns */}
      <rect x="12" y="38" width="18" height="39" fill="url(#fortGoldGrad)" opacity="0.22" />
      <rect x="90" y="38" width="18" height="39" fill="url(#fortGoldGrad)" opacity="0.22" />

      {/* Left Jharokha (Ornate Palace Balcony) */}
      <path
        d="M21 46 C21 43 23 42 25 42 C27 42 29 43 29 46 L29 55 C29 57 27 58 25 58 C23 58 21 57 21 55 Z"
        fill="url(#fortGoldGrad)"
        stroke="#6E4410"
        strokeWidth="1"
      />
      <circle cx="25" cy="49" r="1.5" fill="#6E4410" />

      {/* Right Jharokha (Ornate Palace Balcony) */}
      <path
        d="M91 46 C91 43 93 42 95 42 C97 42 99 43 99 46 L99 55 C99 57 97 58 95 58 C93 58 91 57 91 55 Z"
        fill="url(#fortGoldGrad)"
        stroke="#6E4410"
        strokeWidth="1"
      />
      <circle cx="95" cy="49" r="1.5" fill="#6E4410" />

      {/* Central Royal Grand Arched Gateway (Darwaza) */}
      <path
        d="M48 77 L48 52 C48 44 54 40 60 40 C66 40 72 44 72 52 L72 77 Z"
        fill="url(#fortGateGrad)"
        stroke="#D4AF37"
        strokeWidth="1.8"
      />
      {/* Inner Multi-foil Arch Detail */}
      <path
        d="M52 77 L52 54 C52 48 56 45 60 45 C64 45 68 48 68 54 L68 77"
        stroke="#F4D068"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Rosette medallion above gate */}
      <circle cx="60" cy="36" r="2.5" fill="#D4AF37" stroke="#6E4410" strokeWidth="0.8" />

      {/* Fort Plinth Foundation Base */}
      <path d="M6 77 L114 77 L117 81 L3 81 Z" fill="url(#fortGoldGrad)" stroke="#6E4410" strokeWidth="1" />
      <path d="M2 81 L118 81 L120 84 L0 84 Z" fill="#8A5A18" />
    </svg>
  );
}

function GoogleMapsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 4C15.16 4 8 11.16 8 20c0 11.2 14.22 22.84 15.02 23.49a1.5 1.5 0 0 0 1.96 0C25.78 42.84 40 31.2 40 20c0-8.84-7.16-16-16-16z" fill="#EA4335" />
      <path d="M24 4C15.16 4 8 11.16 8 20c0 4.8 2.05 9.4 5.37 13.56L24 20V4z" fill="#4285F4" />
      <path d="M24 4c3.2 0 6.22.95 8.78 2.58L24 20V4z" fill="#FBBC04" />
      <path d="M24 20l8.78-13.42C36.85 9.49 40 14.45 40 20c0 6.13-4.32 12.93-10.45 18.23L24 20z" fill="#34A853" />
      <circle cx="24" cy="20" r="6" fill="#FFFFFF" />
    </svg>
  );
}

function PersonCard({
  img,
  name,
  role,
  parents,
  quote,
}: {
  img: string;
  name: string;
  role: string;
  parents: { mother: string; father: string };
  quote: string;
}) {
  return (
    <div className="group text-center">
      <div className="relative mx-auto w-68 md:w-80">
        {/* Editorial Luxury Stationery Frame with Champagne Gold Accent */}
        <div className="rounded-[12px] border border-[#DED5C8] bg-[#FBF9F5] p-3.5 shadow-[0_12px_36px_-12px_rgba(64,55,47,0.08)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[#B49A76] group-hover:shadow-[0_20px_48px_-10px_rgba(180,154,118,0.22)]">
          <div className="rounded-[8px] overflow-hidden border border-[#DED5C8]/70">
            <img
              src={img}
              alt={`Portrait of ${name}`}
              width={768}
              height={1024}
              loading="lazy"
              className="kenburns aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        {/* Botanical Line-Art Corner Motif */}
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="drift pointer-events-none absolute -bottom-6 -right-8 w-28 opacity-45"
        />
      </div>

      <h3 className="mt-7 font-cormorant text-4xl sm:text-5xl font-medium tracking-wide gold-timeline-title leading-[1.2] py-1">
        {name}
      </h3>
      <p className="mt-1.5 font-montserrat text-xs uppercase tracking-[0.2em] text-[#8B7B6B] font-medium">
        {role}
      </p>
      <p className="mt-2 font-montserrat text-xs sm:text-sm text-[#8B7B6B] font-normal">
        Child of <span className="font-medium text-[#40372F]">{parents.mother}</span> &amp;{" "}
        <span className="font-medium text-[#40372F]">{parents.father}</span>
      </p>
      <p className="mx-auto mt-3 max-w-xs font-cormorant text-base sm:text-lg italic leading-relaxed text-[#8B7B6B]">
        “{quote}”
      </p>
    </div>
  );
}



function Index() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [envelopeKey, setEnvelopeKey] = useState(0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Invitation link copied to clipboard! 💌");
  };

  const handleShareWhatsApp = () => {
    const text = `You are cordially invited to celebrate the royal wedding of ${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName} on ${WEDDING_CONFIG.weddingDate.date} in ${WEDDING_CONFIG.venue.city}! View invitation: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      {/* ── 1. The Royal Palace Doors Video Entrance (Mobile/Tablet Portrait & Desktop Landscape) ── */}
      <VideoDoorOpening
        key={envelopeKey}
        onOpenComplete={() => setEnvelopeOpened(true)}
      />

      {/* ── Falling Rose Petals & Gold Sparkles ── */}
      {envelopeOpened && <FloatingPetals enabled={true} density={18} />}

      {/* ── Global Website Background Layer (Fixed & Responsive by Device View) ── */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
          envelopeOpened ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Responsive Picture: Landscape on Laptop/Desktop, Portrait on Mobile/Tablet */}
        <picture className="absolute inset-0 h-full w-full">
          <source
            media="(min-width: 1024px) or (orientation: landscape) and (min-width: 768px)"
            srcSet={websiteBgLandscape}
          />
          <img
            src={websiteBgPortrait}
            alt="Royal Lakeside Floral Pavilion Background"
            className="h-full w-full object-cover object-center scale-100"
          />
        </picture>

        {/* Soft luminous warm veil ensuring optimal typography contrast while keeping the floral pavilion vibrant */}
        <div className="absolute inset-0 bg-[#faf6ee]/25 dark:bg-[#16120e]/40" />
      </div>

      {/* ── Main Wedding Invitation Content ── */}
      <main
        className={`relative z-10 overflow-x-clip transition-opacity duration-1000 ${
          envelopeOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* ── 2. Cinematic Hero Invitation Section ────────────────────── */}
        <section id="hero" className="relative flex min-h-svh flex-col justify-between overflow-hidden px-4 sm:px-6 pt-16 pb-12 text-center">
          {/* Palace Doors Photograph Background Layer with Responsive Sizing */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Ambient wide-screen warm blur layer for edge-to-edge richness on large monitors */}
            <picture className="absolute inset-0 h-full w-full">
              <source media="(min-width: 1024px)" srcSet={palaceDoorsHeroLandscape} />
              <img
                src={palaceDoorsHero}
                alt=""
                className="h-full w-full object-cover blur-2xl scale-110 opacity-70 brightness-95 saturate-110 transition-transform duration-1000"
              />
            </picture>

            {/* Focal Palace Gateway Photograph covering the whole screen fully */}
            <div className="absolute inset-0">
              <picture className="h-full w-full">
                <source media="(min-width: 1024px)" srcSet={palaceDoorsHeroLandscape} />
                <img
                  src={palaceDoorsHero}
                  alt="Royal Palace Gateway & Courtyard"
                  className="h-full w-full object-cover object-center scale-100 transition-transform duration-1000"
                  style={{
                    filter: "contrast(1.06) brightness(0.92) saturate(1.15)",
                  }}
                />
              </picture>
            </div>

            {/* Warm Golden Hour & Amber Color Temperature Overlays */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, rgba(224,167,177,0.16) 45%, rgba(184,134,11,0.24) 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 16%, rgba(255,225,160,0.22) 0%, transparent 55%)",
              }}
            />

            {/* Top Vignette: Enhances legibility of the Shloka and subtitle over chandelier */}
            <div className="absolute inset-x-0 top-0 h-48 sm:h-56 bg-gradient-to-b from-black/80 via-black/45 to-transparent pointer-events-none" />

            {/* Subtle Vignette along the sides for cinematic depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.40)_95%)] pointer-events-none" />

            {/* Bottom Vignette: Deep velvet gradient transitioning into warm page background */}
            <div className="absolute inset-x-0 bottom-0 h-96 sm:h-[480px] bg-gradient-to-t from-background via-black/85 to-transparent pointer-events-none" />
          </div>

          {/* Sacred Mandala & Corner Flourishes with gentle radiance */}
          <img
            src={mandala}
            alt=""
            width={1024}
            height={1024}
            className="spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[88vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] invert"
          />
          <img
            src={floralCorner}
            alt=""
            width={1024}
            height={1024}
            className="float-slow pointer-events-none absolute -left-8 -top-8 w-36 sm:w-48 md:w-64 opacity-80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          />
          <img
            src={floralCorner}
            alt=""
            width={1024}
            height={1024}
            className="float-slow pointer-events-none absolute -bottom-8 -right-8 w-36 sm:w-48 md:w-64 rotate-180 opacity-80 [animation-delay:-3.5s] drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          />

          {/* ── Top Header Group: Sacred Invocation ── */}
          <div className="relative z-10 max-w-3xl mx-auto w-full pt-1 sm:pt-4">
            {/* Sacred Shloka Invocation */}
            <div className="anim-slow-rise mb-2" style={{ animationDelay: "300ms" }}>
              <p className="font-heading text-sm sm:text-base md:text-lg tracking-[0.2em] text-amber-200 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                {WEDDING_CONFIG.invitationMessage.shloka}
              </p>
              <div className="mx-auto mt-1 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent shadow-sm" />
            </div>

            {/* Subtitle */}
            <p
              className="anim-slow-rise font-label text-[11px] sm:text-xs md:text-sm font-normal uppercase tracking-[0.24em] text-amber-100/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ animationDelay: "700ms" }}
            >
              {WEDDING_CONFIG.invitationMessage.togetherText}
            </p>
          </div>

          {/* ── Middle Spacer: Keeps the couple's faces crystal-clear & prominent ── */}
          <div className="min-h-[20vh] sm:min-h-[26vh] md:min-h-[30vh] pointer-events-none" aria-hidden="true" />

          {/* ── Bottom Content Group: Couple Names, Parents, Venue & Scroll Action ── */}
          <div className="relative z-10 max-w-3xl mx-auto w-full pb-1 sm:pb-3">
            {/* Couple Calligraphy Display */}
            <div className="flex flex-col items-center">
              <div className="anim-slow-rise" style={{ animationDelay: "1100ms" }}>
                <h1 className="gold-title-dark font-couple text-5xl leading-[1.1] sm:text-7xl md:text-8xl font-normal tracking-wide py-1 drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)]">
                  {WEDDING_CONFIG.couple.groom.firstName}
                </h1>
                <p className="mt-1 font-body text-xs sm:text-sm md:text-base font-normal tracking-wide text-stone-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Son of <span className="font-normal text-amber-100">{WEDDING_CONFIG.couple.groom.parents.mother}</span> &{" "}
                  <span className="font-normal text-amber-100">{WEDDING_CONFIG.couple.groom.parents.father}</span>
                </p>
              </div>

              <div
                className="anim-slow-rise my-2 sm:my-3 flex items-center justify-center gap-3 sm:gap-4"
                style={{ animationDelay: "1500ms" }}
              >
                <span className="h-px w-8 sm:w-20 bg-gradient-to-r from-transparent via-amber-300 to-amber-200 shadow-sm" />
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl italic lowercase px-2 text-amber-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] font-normal">
                  weds
                </span>
                <span className="h-px w-8 sm:w-20 bg-gradient-to-l from-transparent via-amber-300 to-amber-200 shadow-sm" />
              </div>

              <div className="anim-slow-rise" style={{ animationDelay: "1900ms" }}>
                <h2 className="gold-title-dark font-couple text-5xl leading-[1.1] sm:text-7xl md:text-8xl font-normal tracking-wide py-1 drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)]">
                  {WEDDING_CONFIG.couple.bride.firstName}
                </h2>
                <p className="mt-1 font-body text-xs sm:text-sm md:text-base font-normal tracking-wide text-stone-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Daughter of <span className="font-normal text-amber-100">{WEDDING_CONFIG.couple.bride.parents.mother}</span> &{" "}
                  <span className="font-normal text-amber-100">{WEDDING_CONFIG.couple.bride.parents.father}</span>
                </p>
              </div>
            </div>

            <div className="anim-slow-rise mt-3 sm:mt-5 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-14 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              <span className="text-amber-300 text-sm leading-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">♥</span>
              <span className="h-px w-14 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            </div>

            <p
              className="anim-slow-rise mt-2.5 sm:mt-3.5 font-label text-[11px] sm:text-xs md:text-sm font-normal tracking-[0.2em] text-amber-200 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ animationDelay: "2400ms" }}
            >
              {WEDDING_CONFIG.venue.name} · {WEDDING_CONFIG.venue.city}, {WEDDING_CONFIG.venue.state}
            </p>

            <div className="anim-slow-rise mt-4 sm:mt-6" style={{ animationDelay: "2800ms" }}>
              <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 animate-bounce items-center justify-center rounded-full border border-amber-300/80 bg-black/35 backdrop-blur-sm text-amber-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 6l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* ── 3. The Royal Couple Showcase ────────────────────────────── */}
        <section id="couple" className="relative px-6 py-20 md:py-28 overflow-hidden">
          <img
            src={mandala}
            alt=""
            width={1024}
            height={1024}
            className="spin-slower pointer-events-none absolute -left-[30vmin] top-1/3 w-[60vmin] opacity-[0.04]"
          />
          <div className="relative mx-auto max-w-5xl">
            <Reveal>
              <div className="text-center">
                <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#8B7B6B] font-medium">
                  The Bride &amp; The Groom
                </p>
                <h2 className="mt-3 font-cormorant text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
                  <span className="gold-timeline-title">
                    Meet {WEDDING_CONFIG.couple.groom.firstName} &amp; {WEDDING_CONFIG.couple.bride.firstName}
                  </span>
                </h2>
                <div className="mx-auto mt-4 h-px w-16 bg-[#DED5C8]" />
              </div>
            </Reveal>

            <div className="mt-16 grid items-start gap-16 md:grid-cols-2 md:gap-12">
              <Reveal>
                <PersonCard
                  img={WEDDING_CONFIG.couple.bride.image}
                  name={WEDDING_CONFIG.couple.bride.fullName}
                  role={WEDDING_CONFIG.couple.bride.role}
                  parents={WEDDING_CONFIG.couple.bride.parents}
                  quote={WEDDING_CONFIG.couple.bride.quote}
                />
              </Reveal>
              <Reveal delay={180}>
                <PersonCard
                  img={WEDDING_CONFIG.couple.groom.image}
                  name={WEDDING_CONFIG.couple.groom.fullName}
                  role={WEDDING_CONFIG.couple.groom.role}
                  parents={WEDDING_CONFIG.couple.groom.parents}
                  quote={WEDDING_CONFIG.couple.groom.quote}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 5. Interactive Heart Scratch Card ────────────────────────── */}
        <section id="scratch-card-section" className="relative px-6 py-20 md:py-28 overflow-hidden">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary font-normal">
                A Little Surprise Awaits You
              </p>
              <h2 className="mt-3 font-heading text-4xl sm:text-5xl text-foreground font-medium">
                Scratch to reveal
              </h2>
              <p className="mt-4 font-body text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
                Beneath the glittering champagne-gold heart lies our wedding date —
                gently scratch with your finger or mouse to unveil it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="mx-auto mt-10 flex justify-center">
              <ScratchCard />
            </div>
          </Reveal>
        </section>

        {/* ── 6. Horology Wedding Countdown ────────────────────────────── */}
        <section id="countdown-section" className="px-6 py-20 md:py-28 relative">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#8B7B6B] font-medium">
                  The Countdown
                </p>
                <h2 className="mt-3 font-cormorant text-4xl sm:text-5xl text-[#40372F] font-normal tracking-[-0.01em]">
                  Until We Say <span className="italic font-light text-[#8B7B6B]">“I Do”</span>
                </h2>
                <div className="mx-auto mt-4 h-px w-16 bg-[#DED5C8]" />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <Countdown targetISO={WEDDING_CONFIG.weddingDate.iso} className="mt-12" />
            </Reveal>
          </div>
        </section>

        {/* ── 7. Wedding Celebrations (Timeline With Real Visuals) ─────────────────── */}
        <section id="events-section" className="relative px-4 sm:px-6 py-20 md:py-28">
          <img
            src={mandala}
            alt=""
            width={1024}
            height={1024}
            className="spin-slower pointer-events-none absolute -right-[30vmin] top-1/4 w-[60vmin] opacity-[0.05]"
          />
          <div className="relative mx-auto max-w-5xl">
            <Reveal>
              <div className="text-center">
                {/* Clock Icon on Upper Side Center */}
                <div className="mx-auto mb-3.5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold/70 bg-gradient-to-b from-[#fdfbf7] via-[#f7f0e1] to-[#eeddc0] dark:from-[#2a241e] dark:via-[#221c17] dark:to-[#1a1410] shadow-[0_8px_20px_rgba(180,130,50,0.18)]">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gold-deep" strokeWidth={1.6} />
                </div>

                <h2 className="mt-2 font-heading text-4xl sm:text-5xl text-foreground font-medium">
                  Program Timeline
                </h2>
                <p className="mt-3 font-body text-base text-muted-foreground max-w-md mx-auto font-normal">
                  Every celebration has been thoughtfully planned to immerse you in joyous Indian wedding traditions.
                </p>
                <OrnamentDivider className="mt-6" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 sm:mt-12">
                <RoyalTimelineScroll />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 8. Majestic Venue & Location Showcase ─────────────────────── */}
        <section id="venue-section" className="relative px-4 sm:px-6 py-20 md:py-28 overflow-hidden">
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              {/* Map mark icon on upside */}
              <div className="inline-flex items-center justify-center mb-3">
                <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FFF8ED] via-[#F6E6C7] to-[#E9CE99] border-2 border-[#D4AF37] shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)]">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#A62B32] drop-shadow-sm" strokeWidth={2.2} />
                  <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping opacity-30 pointer-events-none" />
                </div>
              </div>

              {/* Venue in bold heading Great Vibes font */}
              <h2 className="font-script-bold text-6xl sm:text-7xl md:text-8xl text-foreground tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)] select-none">
                Venue
              </h2>

              {/* Venue name under venue */}
              <div className="mt-2 sm:mt-3">
                <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-semibold tracking-wide">
                  {WEDDING_CONFIG.venue.name}
                </h3>
                <p className="mt-2 font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  {WEDDING_CONFIG.venue.fullAddress}
                </p>
              </div>

              {/* Royal Fort icon under it */}
              <div className="mt-6 flex flex-col items-center justify-center">
                <RoyalFortIcon className="w-20 h-16 sm:w-24 sm:h-20 drop-shadow-[0_6px_16px_rgba(180,130,40,0.3)] transition-transform duration-500 hover:scale-105" />
                <OrnamentDivider className="mt-4" />
              </div>

              {/* Button: See on Google Maps with Google Maps Icon (Editorial Luxury Styling) */}
              <div className="mt-8 flex justify-center">
                <a
                  href={WEDDING_CONFIG.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#B49A76] hover:bg-[#A38865] px-8 py-3.5 font-montserrat text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-6px_rgba(180,154,118,0.5)] border border-[#DED5C8]/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 no-underline group cursor-pointer"
                  title="Open Venue Location on Google Maps"
                >
                  <GoogleMapsIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform group-hover:scale-110 drop-shadow-xs" />
                  <span>See on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.2] text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 9. Interactive RSVP Form (Yes / No / Maybe) ──────────────────── */}
        <RsvpSection />

        {/* ── 10. Final Thank You Section & Social Sharing ────────────── */}
        <footer className="relative overflow-hidden px-6 pb-28 pt-20 text-center border-t border-gold/40 bg-gradient-to-b from-transparent via-secondary/25 to-secondary/40">
          <img
            src={mandala}
            alt=""
            width={1024}
            height={1024}
            className="spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
          />
          <img
            src={floralCorner}
            alt=""
            width={1024}
            height={1024}
            className="float-slow pointer-events-none absolute -left-6 -top-6 w-40 opacity-80 md:w-56"
          />
          <img
            src={floralCorner}
            alt=""
            width={1024}
            height={1024}
            className="float-slow pointer-events-none absolute -bottom-6 -right-6 w-40 rotate-180 opacity-80 [animation-delay:-3.5s] md:w-56"
          />

          <div className="relative mx-auto max-w-xl">
            <Reveal>
              {/* Royal Bride & Groom Sticker Cutout */}
              <div className="mx-auto mb-6 flex justify-center">
                <div className="relative group transition-transform duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,154,118,0.25)_0%,transparent_70%)] blur-xl pointer-events-none" />
                  <img
                    src={coupleSticker}
                    alt="Bride and Groom Royal Illustration"
                    className="relative z-10 mx-auto h-48 sm:h-56 md:h-64 w-auto object-contain drop-shadow-[0_12px_28px_rgba(64,55,47,0.22)]"
                  />
                </div>
              </div>

              {/* Requirement 9: Final Thank-You Title */}
              <h2 className="font-cormorant text-4xl sm:text-5xl text-[#40372F] font-normal leading-tight">
                We can&apos;t wait to celebrate with you!
              </h2>

              <p className="mt-3 font-cormorant text-4xl sm:text-5xl font-medium tracking-wide">
                <span className="gold-timeline-title">
                  {WEDDING_CONFIG.couple.groom.firstName} &amp; {WEDDING_CONFIG.couple.bride.firstName}
                </span>
              </p>

              <p className="mt-2 font-montserrat text-xs sm:text-sm tracking-[0.18em] uppercase text-[#8B7B6B] font-medium">
                {WEDDING_CONFIG.weddingDate.day}, {WEDDING_CONFIG.weddingDate.date} · {WEDDING_CONFIG.venue.city}
              </p>

              <div className="mx-auto mt-6 h-px w-16 bg-[#DED5C8]" />

              {/* Social Sharing Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-2 rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] hover:bg-[#EFE9DE] px-5 py-2.5 font-montserrat text-xs font-medium uppercase tracking-[0.14em] text-[#40372F] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span>💬</span>
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-[10px] border border-[#DED5C8] bg-[#FBF9F5] hover:bg-[#EFE9DE] px-5 py-2.5 font-montserrat text-xs font-medium uppercase tracking-[0.14em] text-[#40372F] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span>🔗</span>
                  <span>Copy Link</span>
                </button>
              </div>

              {/* Footer Bottom Row: Helpline & Made with Love in right corner */}
              <div className="mt-12 pt-6 border-t border-[#DED5C8]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8B7B6B] font-montserrat">
                <p className="text-center sm:text-left font-normal">
                  Helpline &amp; Concierge: {WEDDING_CONFIG.invitationMessage.helplinePhone} · {WEDDING_CONFIG.invitationMessage.email}
                </p>
                <p className="text-center sm:text-right font-medium tracking-wide text-[#40372F] sm:ml-auto flex items-center justify-center sm:justify-end gap-1.5">
                  <span>made with love by</span>
                  <a
                    href="https://www.instagram.com/that_digi_creators/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#40372F] hover:text-[#B49A76] transition-colors group cursor-pointer"
                    title="Instagram: @that_digi_creators"
                    aria-label="Instagram: @that_digi_creators"
                  >
                    <span className="underline decoration-[#DED5C8] group-hover:decoration-[#B49A76] underline-offset-4">nisha soni</span>
                    <svg
                      className="w-3.5 h-3.5 text-[#B49A76] transition-transform duration-200 group-hover:scale-115"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <span className="text-[#A62B32]">♥</span>
                </p>
              </div>
            </Reveal>
          </div>
        </footer>
      </main>

      {/* Floating Replay Entrance Video Button */}
      {envelopeOpened && (
        <button
          onClick={() => {
            setEnvelopeOpened(false);
            setEnvelopeKey((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-[10px] bg-[#B49A76] hover:bg-[#A38865] px-5 py-3 font-montserrat text-xs font-medium tracking-[0.16em] uppercase text-white shadow-[0_8px_24px_-4px_rgba(180,154,118,0.5)] border border-[#DED5C8]/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
          title="Replay Royal Entrance Video"
          aria-label="Replay Royal Entrance Video"
        >
          <span className="text-sm">🚪</span>
          <span>Replay Entrance</span>
        </button>
      )}
    </>
  );
}
