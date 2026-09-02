export type WorkItem = {
  company: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  /** When false, the row is shown but does not link out (defaults to true). */
  clickable?: boolean;
  details?: string;
  image?: string;
};

export type Project = {
  name: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  /** When false, the row is shown but does not link out (defaults to true). */
  clickable?: boolean;
  details?: string;
  image?: string;
};

export const DISCORD_SNOWFLAKE = 474725360467181569;
export const GITHUB_USERNAME = "xsebby";

export type Social = {
  label: string;
  href: string;
};

export type VfxProject = {
  title: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  details?: string;
  /** Direct image URL for the card/panel thumbnail (imgur, CDN, etc.) */
  image?: string;
  /** Where the "view post" button goes — youtube, instagram, vimeo, etc. */
  link?: string;
  /** Button label in the detail panel (auto-detected from link if omitted) */
  linkLabel?: string;
};

// Edit your bio here
export const ABOUT =
  "student at rutgers university studying comp sci and math. currently shipping a personal finance and budgeting app and taking the time to learn machine learning.";

export const VFX_ABOUT =
  "vfx/cg artist focused in compositing. i'm used to after effects and blender, and currently learning houdini and nuke.";

/** Paste any image URL for your VFX profile pic (right-click IG pfp > copy image address, imgur, etc.) */
export const VFX_AVATAR_URL = "";

export const SOCIALS: readonly Social[] = [
  { label: "GitHub", href: "https://github.com/xsebby" },
  { label: "X", href: "https://x.com/xsebby" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sebastian-raducha/" },
];

/** Update the Instagram href with your VFX account */
export const VFX_SOCIALS: readonly Social[] = [
  { label: "Instagram", href: "https://instagram.com/sebstrrr" },
];

export const VFX_PROJECTS: readonly VfxProject[] = [
  {
    title: "tezzus stage visualizer",
    slug: "tezzus-stage-visualizer",
    role: "animator",
    date: "2026",
    about: "animated a tezzus 3d model in blender for 'The New Generation Tour'.",
    details: "model made by @ge6.ae , took about 2-3 hours to animate.",
    image: "https://cdn.discordapp.com/attachments/478626050457206784/1544572877733502996/image.png?ex=6a98ff16&is=6a97ad96&hm=e2522a4731766475da1d256fe9954f58e55469f5ebeb337a1a981a4e8394944f&",  // optional direct image URL
    link: "https://www.instagram.com/p/DcuQiYMjOx3/", // auto-pulls thumbnail if image is omitted
    linkLabel: "view post",
  },
];

export const WORK_ITEMS: readonly WorkItem[] = [
  {
    company: "RUMAD Web Team",
    slug: "rumad",
    role: "web developer",
    date: "october 2025 - may 2026",
    about: "focused on revamping website for Rutgers University Mobile App Development Club.",
    url: "https://rumad.club",
    clickable: false,
    details:
      "led frontend redesign, improved club branding, and shipped a faster landing page for recruiting and events.",
  },
  {
    company: "R.C. Auto Group",
    slug: "ray-catena",
    role: "web development intern",
    date: "june 2026 - present",
    about: "working on SEO and web development for luxury car dealerships.",
    url: "https://raycatena.com",
    clickable: false,
    details:
      "building and optimizing dealer pages, improving search visibility, and iterating on conversion-focused layouts.",
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: "CSP revamped - HACKRU 2025",
    slug: "csp-revamped-hackru-2025",
    role: "developer",
    date: "october 2025",
    about: "a revamped version of the course schedule planner at rutgers, built frontend with javascript and figma, co-developed a machine learning model with python.",
    url: "https://github.com/SevenNebula9910/RateMyProfessor_chrome-extension",
    clickable: true,
    details:
      "built the scheduling UI, designed flows in figma, and helped train a model to recommend courses based on past student data.",
  },
  {
    name: "pulse",
    slug: "pulse",
    role: "creator",
    date: "april 2026 - present",
    about: "a personal finance and budgeting app (WIP)",
    url: "https://github.com/xsebby/stock-portfolio-tracker",
    clickable: false,
    details:
      "tracking spending categories, setting monthly budgets, and surfacing trends over time. still actively building core features.",
  },
  {
    name: "RUBus-Notify",
    slug: "rubus-notify",
    role: "creator",
    date: "march 2026 - present",
    about: "iOS transit app for Rutgers buses that shows arrival times and notifies when your bus is coming. (WIP)",
    url: "https://streamable.com/0xfg66",
    details:
      "native ios app pulling live bus data, with push notifications when your selected route is arriving.",
  },
];
