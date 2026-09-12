export type ProgramTerm = { id: number; name: string; slug: string };

export type ProgramRecord = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  program_type: number[];
  program_status: number[];
  skill_level: number[];
  region: number[];
  date: string;
  acf: {
    subtitle: string;
    program_type: string;
    program_type_copy: number[];
    short_description: string;
    full_introduction: string;
    status: number;
    background_image: number;
    supplementary_images: number[];
    country: string;
    main_location: string;
    duration_overide: string;
    enable_duration_override: boolean;
    difficulty_level: number;
    group_size: string;
    [key: string]: unknown;
  };
};

export const FALLBACK_PROGRAM_TERMS = {
  types: [
    { id: 190, name: "Corporate Training", slug: "corporate-training" },
    { id: 191, name: "Expedition", slug: "expedition" },
    { id: 192, name: "Training Program", slug: "training-program" },
    { id: 193, name: "Retreat", slug: "retreat" },
    { id: 194, name: "Cultural Immersion", slug: "cultural-immersion" },
    { id: 235, name: "Equestrian Archery", slug: "equestrian-archery" },
  ],
  statuses: [
    { id: 228, name: "Open", slug: "open" },
    { id: 229, name: "Upcoming", slug: "upcoming" },
    { id: 230, name: "Limited Availability", slug: "limited-availability" },
  ],
  skills: [
    { id: 195, name: "Level 1", slug: "level-1" },
    { id: 196, name: "Level 2", slug: "level-2" },
    { id: 197, name: "Level 3", slug: "level-3" },
    { id: 198, name: "Level 4", slug: "level-4" },
  ],
  regions: [
    { id: 1, name: "Europe", slug: "europe" },
    { id: 2, name: "Asia", slug: "asia" },
    { id: 3, name: "Eurasia / Euro-Asian", slug: "eurasia" },
    { id: 4, name: "Americas & Other Regions", slug: "americas" },
  ],
} satisfies Record<string, ProgramTerm[]>;

type FallbackInput = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  country: string;
  location: string;
  image: string;
  types: number[];
  status: number;
  level: number;
};

const FALLBACK_INPUT: FallbackInput[] = [
  { id: 4753, slug: "inner-mongolia-steppe-horse-archery-camp", title: "Inner Mongolia – Steppe Horse Archery Camp", subtitle: "Steppe Horse Archery Camp", description: "Technical mastery and equine partnership on the open Inner Mongolian grasslands.", country: "China (Inner Mongolia)", location: "Inner Mongolian Grasslands", image: "https://janfranko.com/wp-content/uploads/2026/04/BOW147.Horseback.3.jpg", types: [194, 235, 191], status: 228, level: 198 },
  { id: 4750, slug: "alpine-archery-ehrwald", title: "Alpine Archery – Ehrwald", subtitle: "Traditional Archery in the Mountains", description: "Traditional field archery practice in the Tyrolean mountain environment.", country: "Austria", location: "Ehrwald, Tyrol", image: "https://janfranko.com/wp-content/uploads/2026/04/caption.jpg", types: [191, 193, 192], status: 230, level: 197 },
  { id: 4747, slug: "bogensporthotel-bad", title: "Bogensporthotel Bad", subtitle: "Archery Retreats & Training", description: "Retreat-based traditional archery training in the Black Forest.", country: "Germany", location: "Eisenbach, Black Forest", image: "https://janfranko.com/wp-content/uploads/2026/04/IMG_7204.jpg", types: [193, 192], status: 229, level: 196 },
  { id: 4744, slug: "zemiansky-vrbovok", title: "Zemiansky Vrbovok", subtitle: "Night Awareness & Environmental Training", description: "Night-awareness and environmental training at Zruby Dúbrava near Bzovík Castle.", country: "Slovakia", location: "Zruby Dúbrava, Zemiansky Vrbovok 125, 962 41", image: "https://janfranko.com/wp-content/uploads/2026/04/a228-hrad-cabrad-20231213-012725-7686.jpg", types: [193, 192], status: 229, level: 197 },
  { id: 4740, slug: "podhajska-thermal-region", title: "Podhájska Thermal Region", subtitle: "Team-building & Immersive Retreats", description: "Small-group corporate and team-building archery in the Podhájska region.", country: "Slovakia", location: "Podhájska, Nitra Region", image: "https://janfranko.com/wp-content/uploads/2026/04/uploads-images-atrakcie-fun-arena-adrenalinove-centra-podhajska-2-jpg-crop-1216x684-1.jpg", types: [190, 193], status: 229, level: 195 },
  { id: 4728, slug: "muran-wilderness-sector", title: "Muráň Wilderness Sector", subtitle: "Team-building & Immersive Retreats", description: "Corporate and retreat programming in Muránska Planina National Park.", country: "Slovakia", location: "Muránska Planina National Park", image: "https://janfranko.com/wp-content/uploads/2026/04/Muransky_hrad04.jpg", types: [190, 193, 192], status: 229, level: 197 },
  { id: 4724, slug: "grand-moravia-podhajska", title: "Grand Moravia – Podhájska", subtitle: "Traditional Archery Gathering & Tournament", description: "A planned traditional archery gathering in Podhájska; the date remains to be confirmed.", country: "Slovakia", location: "Podhájska, Nitra Region", image: "https://janfranko.com/wp-content/uploads/2026/04/medium_194aabfa_c762_4d4a_983a_cdbfe5d72966_istock_512010869_8c10996d27.jpg", types: [193, 192], status: 229, level: 196 },
  { id: 4719, slug: "okinawa-coastal-climate-module", title: "Okinawa Coastal Climate Module", subtitle: "The Heavy Air", description: "A planned coastal-climate training module in Okinawa; schedule to be confirmed.", country: "Japan", location: "Northern Remote Coast, Okinawa", image: "https://janfranko.com/wp-content/uploads/2026/04/Okinawa4-scaled-1.jpg", types: [191, 192], status: 229, level: 197 },
  { id: 4717, slug: "mongolia-expedition", title: "Mongolia Expedition", subtitle: "Archery & Nomadic Culture", description: "Traditional archery and nomadic culture in central Mongolia.", country: "Mongolia", location: "Kharkhorin & Central Mongolia", image: "https://janfranko.com/wp-content/uploads/2026/04/boz-uchuk-yurt-camp-kyrgyzstan.jpg", types: [194, 235, 192], status: 228, level: 196 },
  { id: 4713, slug: "mongolia-steppe-summit", title: "Mongolia: Steppe Summit", subtitle: "2026 Nomadic Series", description: "A planned advanced steppe module in the Orkhon Valley; schedule to be confirmed.", country: "Mongolia", location: "Orkhon Valley", image: "https://janfranko.com/wp-content/uploads/2026/04/get-camp-in-gobi-desert-mongolia.jpg", types: [194, 235, 191], status: 229, level: 198 },
  { id: 4701, slug: "kg2026-witness-the-last-living-nomadic-traditions", title: "KG2026 — Witness the Last Living Nomadic Traditions", subtitle: "Witness the Last Living Nomadic Traditions", description: "A planned cultural and field expedition in Kyrgyzstan; final schedule to be confirmed.", country: "Kyrgyzstan", location: "Bishkek & Kyrgyz Highlands", image: "https://janfranko.com/wp-content/uploads/2026/04/boz-uchuk-yurt-camp-kyrgyzstan.jpg", types: [194, 191], status: 229, level: 196 },
  { id: 4695, slug: "europe-modules", title: "Europe Modules", subtitle: "Structured Environmental Discipline", description: "Regional training modules across European landscapes; dates vary by location.", country: "Various (Europe)", location: "Carpathians, Alps, Arctic, and Pannonian Basin", image: "https://janfranko.com/wp-content/uploads/2026/04/Presidentialscredit-Cody-Anderson-.jpg", types: [191, 192], status: 229, level: 197 },
  { id: 4692, slug: "advanced-environmental-tracks-north-america", title: "Advanced Environmental Tracks (North America)", subtitle: "North America", description: "A planned advanced environmental track; dates and host locations remain to be confirmed.", country: "USA / Canada", location: "Temperate Mountains & Open Plains", image: "https://janfranko.com/wp-content/uploads/2026/04/Aspevig_Common-Ground_6x10-ft-_WEB.jpg", types: [191], status: 229, level: 198 },
  { id: 4678, slug: "forest-archer-training", title: "Forest Archer Training", subtitle: "Forest discipline", description: "Open forest-discipline training in Muránska Planina National Park.", country: "Slovakia", location: "Muránska Planina National Park", image: "https://janfranko.com/wp-content/uploads/2026/04/archery-man-shooting-900x600-1.jpg", types: [194, 235, 192], status: 228, level: 196 },
  { id: 4616, slug: "the-archers-stillness-retreat", title: "The Archer’s Stillness Retreat", subtitle: "Focus, presence, and inner practice", description: "A planned small-group retreat dedicated to focus and the inner practice of traditional archery.", country: "Austria", location: "Tyrol Mountain Valley", image: "https://janfranko.com/wp-content/uploads/2026/03/1536x864_cmsv2_87d2efb6-6534-5a22-b43e-5d566624bfbf-9676456.jpg", types: [193], status: 229, level: 195 },
  { id: 4563, slug: "the-three-elements-expedition", title: "The Three Elements Expedition", subtitle: "Brazil forest, jungle, and ocean landscapes", description: "A planned 21-day Brazil expedition; dates and local partners remain to be confirmed.", country: "Brazil", location: "Curitiba – Paraná Region", image: "https://janfranko.com/wp-content/uploads/2026/03/istockphoto-667482388-612x612-1.jpg", types: [191], status: 229, level: 197 },
];

export const FALLBACK_PROGRAMS: ProgramRecord[] = FALLBACK_INPUT.map((item) => ({
  id: item.id,
  slug: item.slug,
  link: `/programs?open=${item.slug}`,
  title: { rendered: item.title },
  content: { rendered: "" },
  program_type: item.types,
  program_status: [item.status],
  skill_level: [item.level],
  region: [],
  date: "2026-01-01T00:00:00",
  acf: {
    subtitle: item.subtitle,
    program_type: FALLBACK_PROGRAM_TERMS.types.find((term) => item.types.includes(term.id))?.name || "Program",
    program_type_copy: item.types,
    short_description: item.description,
    full_introduction: item.description,
    status: item.status,
    background_image: item.id,
    supplementary_images: [],
    country: item.country,
    main_location: item.location,
    duration_overide: "Details confirmed during consultation",
    enable_duration_override: true,
    difficulty_level: item.level,
    group_size: "Small cohort",
  },
}));

export const FALLBACK_PROGRAM_MEDIA: Record<number, string> = Object.fromEntries(
  FALLBACK_INPUT.map((item) => [item.id, item.image]),
);
