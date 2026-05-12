import AnimatedText from "@/components/animated-text";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { GitHubProfile } from "@/components/github-profile";
import { Spotify } from "@/components/spotify";
import { ABOUT, PROJECTS, SOCIALS, WORK_ITEMS } from "@/utils/constants";
import "@/globals.css";
import "@/font-override.css";
import { Analytics } from "@vercel/analytics/next";
import { LayoutGroup, motion } from "motion/react";

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
};

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

      <motion.div
        className="flex flex-1 min-h-screen overflow-y-auto"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(52, 211, 153, 0.08), transparent)",
        }}
      >
        <div className="flex-1 flex justify-center px-6 py-[12vh] overflow-y-auto">
          <LayoutGroup>
            <motion.div
              layout
              className="relative flex flex-col items-start w-full md:w-auto max-w-2xl md:max-w-none pl-0 border-l-0 md:pl-8 md:border-l md:border-zinc-800"
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

              <AnimatedText
                text="developer"
                element="p"
                className="text-zinc-500 mt-1"
                artificialDelay={0.2}
              />

              <div className="flex items-center gap-3 mt-2">
                {SOCIALS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-zinc-500 hover:text-emerald-400 transition-colors"
                    initial={SOCIAL_ANIMATION.initial}
                    animate={SOCIAL_ANIMATION.animate(i)}
                  >
                    {SOCIAL_ICONS[social.label]}
                  </motion.a>
                ))}
              </div>

              <motion.section
                className="mt-8"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.5,
                }}
              >
                <AnimatedText
                  text="about"
                  element="h2"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
                  artificialDelay={0.5}
                />
                <AnimatedText
                  text={ABOUT}
                  element="p"
                  className="text-zinc-400 text-sm max-w-xl leading-relaxed"
                  artificialDelay={0.55}
                  fast
                />
              </motion.section>

              <Component {...pageProps} />

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
                    {item.clickable === false ? (
                      <p>
                        <strong>{item.company}</strong> — {item.role}
                      </p>
                    ) : (
                      <a href={item.url}>
                        <strong>{item.company}</strong> — {item.role}
                      </a>
                    )}
                    <p>{item.about}</p>
                    <span>{item.date}</span>
                  </div>
                ))}

                <h2>projects</h2>
                {PROJECTS.map((project) => (
                  <div key={project.slug}>
                    {project.clickable === false ? (
                      <p>
                        <strong>{project.name}</strong> — {project.role}
                      </p>
                    ) : (
                      <a href={project.url}>
                        <strong>{project.name}</strong> — {project.role}
                      </a>
                    )}
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
      <Analytics />
    </main>
  );
}
