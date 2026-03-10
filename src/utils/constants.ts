export type WorkItem = {
  company: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  image?: string;
};

export type Project = {
  name: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  image?: string;
};

export const DISCORD_SNOWFLAKE = 474725360467181569;
export const GITHUB_USERNAME = "xsebby";

export type Social = {
  label: string;
  href: string;
};

// Edit your bio here
export const ABOUT =
  "student at rutgers university studying comp sci, finance, and math. interested in software engineering, ai/ml, and fintech.";

export const SOCIALS: readonly Social[] = [
  { label: "GitHub", href: "https://github.com/xsebby" },
  { label: "X", href: "https://x.com/xsebby" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sebastian-raducha/" },
];

export const WORK_ITEMS: readonly WorkItem[] = [
  {
    company: "RUMAD Web Team",
    slug: "rumad",
    role: "web developer",
    date: "2025 - present",
    about: "focused on revamping website for Rutgers University Mobile App Development Club.",
    url: "https://rumad.club",
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: "portfolio",
    slug: "portfolio",
    role: "creator",
    date: "January 2026 - present",
    about: "stock portfolio tracker (WIP)",
    url: "https://github.com/xsebby/portfolio",
  },
  {
    name: "RUBus-Notify",
    slug: "rubus-notify",
    role: "creator",
    date: "March 2025 - present",
    about: "iOS transit app for Rutgers buses that shows arrival times and notifies when your bus is coming.",
    url: "https://github.com/xsebby/RUBus-Notify",
  },
];
