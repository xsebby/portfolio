import AnimatedText from "@/components/animated-text";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { GitHubProfile } from "@/components/github-profile";
import { Spotify } from "@/components/spotify";
import { WorkDetailPanel } from "@/components/work-detail-panel";
import { ViewToggle } from "@/components/view-toggle";
import { DetailPanelProvider } from "@/context/detail-panel-context";
import { ViewProvider, useView } from "@/context/view-context";
import {
  ABOUT,
  PROJECTS,
  SOCIALS,
  VFX_ABOUT,
  VFX_SOCIALS,
  WORK_ITEMS,
} from "@/utils/constants";
import "@/globals.css";
import "@/font-override.css";
import { Analytics } from "@vercel/analytics/next";
import { LayoutGroup, motion } from "motion/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const SITE_URL = "https://xsebby.github.io";
const SITE_TITLE = "sebby";
const SITE_DESCRIPTION = "portfolio";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "sebby",
  url: SITE_URL,
  jobTitle: "Developer",
  sameAs: [
    "https://github.com/xsebby",
    "https://x.com/xsebby",
    "https://linkedin.com/in/xsebby",
  ],
});

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon />,
  X: <XIcon />,
  LinkedIn: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
};

const SOCIAL_ANIMATION = {
  initial: { opacity: 0, y: 5 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
      delay: 0.35 + i * 0.05,
    },
  }),
} as const;

const VIEW_BACKGROUNDS = {
  dev: {
    base: "#09090b",
    glow: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(52, 211, 153, 0.08), transparent)",
    border: "rgb(39 39 42)",
  },
  vfx: {
    base: "#0a0812",
    glow: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.14), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(167, 139, 250, 0.06), transparent)",
    border: "rgb(63 47 98)",
  },
} as const;

function PortfolioShell({ Component, pageProps }: AppProps) {
  const { view } = useView();
  const socials = view === "dev" ? SOCIALS : VFX_SOCIALS;
  const subtitle = view === "dev" ? "developer" : "vfx artist";
  const about = view === "dev" ? ABOUT : VFX_ABOUT;
  const bg = VIEW_BACKGROUNDS[view];

  return (
    <motion.div
      className="relative flex flex-1 min-h-screen overflow-y-auto"
      animate={{ backgroundColor: bg.base }}
      transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: VIEW_BACKGROUNDS.dev.glow }}
        animate={{ opacity: view === "dev" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: VIEW_BACKGROUNDS.vfx.glow }}
        animate={{ opacity: view === "vfx" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      />
      <div className="relative z-10 flex-1 flex justify-center px-6 py-[12vh] overflow-y-auto">
        <LayoutGroup>
          <motion.div
            layout
            className="relative flex flex-col items-start w-full md:w-auto max-w-2xl md:max-w-none pl-0 border-l-0 md:pl-8 md:border-l md:border-zinc-800"
            animate={{ borderColor: bg.border }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <Spotify />
            <div className="flex items-center gap-4 md:gap-5 pt-6">
              <GitHubProfile />
              <AnimatedText
                text="sebby"
                element="h1"
                className="text-5xl md:text-6xl font-bold whitespace-nowrap text-zinc-50"
              />
            </div>

            <div
              key={`header-${view}`}
              className="mt-3 flex flex-col gap-2"
            >
              <div className="flex h-5 items-center">
                <AnimatedText
                  key={`subtitle-${view}`}
                  text={subtitle}
                  element="p"
                  className="text-zinc-500 leading-none"
                  artificialDelay={0.05}
                />
              </div>

              <div className="flex h-5 items-center gap-3">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex items-center text-zinc-500 transition-colors ${
                      view === "vfx"
                        ? "hover:text-violet-400"
                        : "hover:text-emerald-400"
                    }`}
                    initial={SOCIAL_ANIMATION.initial}
                    animate={SOCIAL_ANIMATION.animate(i)}
                  >
                    {SOCIAL_ICONS[social.label]}
                  </motion.a>
                ))}
              </div>

              <div className="flex h-5 items-center">
                <ViewToggle />
              </div>
            </div>

            <div key={`body-${view}`}>
              <section className="mt-8">
                <AnimatedText
                  key={`about-heading-${view}`}
                  text="about"
                  element="h2"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
                  artificialDelay={0.15}
                />
                <AnimatedText
                  key={`about-body-${view}`}
                  text={about}
                  element="p"
                  className="text-zinc-400 text-sm max-w-xl leading-relaxed"
                  artificialDelay={0.2}
                  fast
                />
              </section>

              <Component {...pageProps} />
            </div>

            <noscript>
              <p>developer</p>
              <section>
                <h2>about</h2>
                <p>{ABOUT}</p>
              </section>
              <nav>
                {SOCIALS.map((social) => (
                  <a key={social.label} href={social.href}>
                    {social.label}
                  </a>
                ))}
              </nav>

              <h2>work</h2>
              {WORK_ITEMS.map((item) => (
                <div key={item.slug}>
                  <p>
                    <strong>{item.company}</strong> — {item.role}
                  </p>
                  <p>{item.about}</p>
                  <span>{item.date}</span>
                </div>
              ))}

              <h2>projects</h2>
              {PROJECTS.map((project) => (
                <div key={project.slug}>
                  <p>
                    <strong>{project.name}</strong> — {project.role}
                  </p>
                  <p>{project.about}</p>
                </div>
              ))}
            </noscript>

            <p className="mt-12 text-xs text-zinc-600 font-mono">
              site based on{" "}
              <a
                href="https://github.com/looskie/website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-emerald-500/80 transition-colors"
              >
                looskie/website
              </a>
            </p>
          </motion.div>
        </LayoutGroup>
      </div>
    </motion.div>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname === "/404") {
    return (
      <>
        <Analytics />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <main className="flex h-full w-full overflow-hidden">
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1248" />
        <meta property="og:image:height" content="702" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
      </Head>

      <ViewProvider>
        <DetailPanelProvider>
          <PortfolioShell Component={Component} pageProps={pageProps} />
          <WorkDetailPanel />
        </DetailPanelProvider>
      </ViewProvider>
      <Analytics />
    </main>
  );
}
