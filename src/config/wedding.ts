import brideImg from "@/assets/bride.png";
import groomImg from "@/assets/groom.png";
import palaceVenueImg from "@/assets/palace-venue.jpg";
import mandapCeremonyImg from "@/assets/mandap-ceremony.jpg";
import eventMehendiImg from "@/assets/event-mehendi.jpg";
import eventHaldiImg from "@/assets/event-haldi.jpg";
import eventSangeetImg from "@/assets/event-sangeet.jpg";
import eventBaraatImg from "@/assets/event-baraat.jpg";
import eventReceptionImg from "@/assets/event-reception.jpg";

export const WEDDING_CONFIG = {
  couple: {
    groom: {
      firstName: "Aarav",
      fullName: "Aarav Sharma",
      role: "The Groom",
      parents: {
        mother: "Smt. Anita Sharma",
        father: "Shri Vikram Sharma",
      },
      quote: "A visionary with a gentle soul, brimming with poetry, laughter, and timeless devotion.",
      image: groomImg,
    },
    bride: {
      firstName: "Meera",
      fullName: "Meera Kapoor",
      role: "The Bride",
      parents: {
        mother: "Smt. Sunita Kapoor",
        father: "Shri Rajesh Kapoor",
      },
      quote: "An artist of warmth and grace, who illuminates every life she touches with kindness and joy.",
      image: brideImg,
    },
  },

  weddingDate: {
    iso: "2027-02-13T19:00:00+05:30",
    day: "Saturday",
    date: "13 February 2027",
    dayNumber: "13",
    monthYear: "February 2027",
    time: "6:30 PM Onwards",
    muhurat: "Godhuli Bela · 7:30 PM",
  },

  venue: {
    name: "The Royal Orchid Palace",
    subName: "Heritage Royal Palace & Courtyard",
    address: "Jal Mahal Road, Amer Heritage Valley",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302002",
    fullAddress:
      "The Royal Orchid Palace, Jal Mahal Road, Amer Heritage Valley, Jaipur, Rajasthan 302002",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Royal+Orchid+Palace+Jal+Mahal+Road+Amer+Heritage+Valley+Jaipur+Rajasthan+302002",
    image: palaceVenueImg,
    mandapImage: mandapCeremonyImg,
    description: "A 200-year-old architectural marvel surrounded by the Aravali hills. Handcrafted sandstone jharokhas, glistening marble reflection pools, and starlit banquet lawns.",
    travel: {
      airport: "Jaipur International Airport (JAI) — 25 minutes drive",
      train: "Jaipur Junction Railway Station — 20 minutes drive",
      hospitality: "Complimentary palace valet parking & dedicated guest concierge",
    },
  },

  invitationMessage: {
    shloka: "|| श्री गणेशाय नमः ||",
    togetherText: "Together with their families",
    headline: "Two souls, two families — united in love, blessed by tradition",
    body: "In the sacred presence of the Almighty and surrounded by those we hold dearest in our lives, we joyfully request the honour of your presence and blessings as we take our seven sacred vows and begin our new journey together.",
    familySignOff: "The Sharma & Kapoor Families",
    rsvpDeadline: "20 January 2027",
    helplinePhone: "+91 98765 43210",
    rsvpWhatsAppNumber: "+91 98765 43210",
    email: "aarav.meera@wedding.example",
    instagramHandle: "@aarav_weds_meera",
    instagramUrl: "https://instagram.com",
  },

  surpriseMessage: {
    quote: "“You hold a truly cherished place in our hearts. Having you by our side as we take our sacred vows will be our greatest blessing.”",
    signature: "With boundless love, Aarav & Meera",
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      themeName: "Henna & Folk Harmonies",
      day: "Thursday",
      date: "11 February 2027",
      time: "4:00 PM onwards",
      venue: "Garden Courtyard · Royal Orchid Palace",
      description: "Traditional Marwari henna artists, sufi folk melodies, live dholak & evening high tea.",
      dressCode: "Floral Pastels, Mint & Sage",
      image: eventMehendiImg,
      icon: "🌿",
      letter: "M",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehendi+Ceremony+-+Aarav+%26+Meera&dates=20270211T103000Z/20270211T163000Z&details=Mehendi+Ceremony+at+The+Royal+Orchid+Palace+Jaipur&location=The+Royal+Orchid+Palace,+Jaipur",
    },
    {
      id: "haldi",
      name: "Haldi Rasam",
      themeName: "Sunlit Turmeric & Floral Shower",
      day: "Friday",
      date: "12 February 2027",
      time: "10:00 AM onwards",
      venue: "Sharma Heritage Courtyard · Civil Lines",
      description: "Auspicious turmeric blessings accompanied by joyful dholak beats and marigold petal showers.",
      dressCode: "Sunlit Yellow & Warm White",
      image: eventHaldiImg,
      icon: "🌼",
      letter: "H",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haldi+Rasam+-+Aarav+%26+Meera&dates=20270212T043000Z/20270212T083000Z&details=Haldi+Ceremony&location=Sharma+Heritage+Courtyard,+Jaipur",
    },
    {
      id: "sangeet",
      name: "Sangeet & Cocktails",
      themeName: "Starry Musical Extravaganza",
      day: "Friday",
      date: "12 February 2027",
      time: "7:30 PM onwards",
      venue: "Grand Ballroom · Royal Orchid Palace",
      description: "Choreographed family dance performances, live orchestra, DJ & celebratory cocktails.",
      dressCode: "Indo-Western Glitz, Velvet & Royal Navy",
      image: eventSangeetImg,
      icon: "✨",
      letter: "S",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sangeet+Night+-+Aarav+%26+Meera&dates=20270212T140000Z/20270212T200000Z&details=Sangeet+Celebrations&location=Grand+Ballroom,+The+Royal+Orchid+Palace,+Jaipur",
    },
    {
      id: "baraat",
      name: "Royal Baraat & Varmala",
      themeName: "The Grand Regal Procession",
      day: "Saturday",
      date: "13 February 2027",
      time: "6:00 PM",
      venue: "Palace Forecourt · Royal Orchid Palace",
      description: "The groom arrives with royal elephant & brass procession, followed by the starlit garland exchange.",
      dressCode: "Regal Indian Heritage & Bandhgalas",
      image: eventBaraatImg,
      icon: "🎺",
      letter: "B",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baraat+%26+Varmala+-+Aarav+%26+Meera&dates=20270213T123000Z/20270213T143000Z&details=Royal+Baraat+Procession&location=Palace+Forecourt,+The+Royal+Orchid+Palace,+Jaipur",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony (Pheras)",
      themeName: "Sacred Vows Under The Starlit Mandap",
      day: "Saturday",
      date: "13 February 2027",
      time: "7:30 PM (Auspicious Muhurat)",
      venue: "Durbar Hall Starlit Mandap · Royal Orchid Palace",
      description: "Seven sacred circumambulations around the holy agni amidst Vedic mantras and ancient blessings.",
      dressCode: "Traditional Regal Silks & Lehengas",
      image: mandapCeremonyImg,
      icon: "🔥",
      letter: "W",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ceremony+-+Aarav+%26+Meera&dates=20270213T140000Z/20270213T183000Z&details=Wedding+Ceremony+Pheras&location=Durbar+Hall,+The+Royal+Orchid+Palace,+Jaipur",
    },
    {
      id: "reception",
      name: "Grand Wedding Reception",
      themeName: "Royal Banquet & Starlit Toast",
      day: "Sunday",
      date: "14 February 2027",
      time: "7:00 PM onwards",
      venue: "Palace Lawns & Fountains · Royal Orchid Palace",
      description: "An evening of fine royal dining, heartfelt speeches, live string symphony & felicitation.",
      dressCode: "Black Tie or Opulent Indian Couture",
      image: eventReceptionImg,
      icon: "🥂",
      letter: "R",
      calUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Grand+Reception+-+Aarav+%26+Meera&dates=20270214T133000Z/20270214T193000Z&details=Grand+Wedding+Reception&location=Palace+Lawns,+The+Royal+Orchid+Palace,+Jaipur",
    },
  ],
};
