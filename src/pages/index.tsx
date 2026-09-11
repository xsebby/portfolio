import AnimatedText from "@/components/animated-text";
import { VfxGrid } from "@/components/vfx-grid";
import { useView } from "@/context/view-context";
import { PROJECTS, WORK_ITEMS } from "@/utils/constants";
import Link from "next/link";
import { motion } from "motion/react";import { memo } from "react";

const ITEM_ANIMATION = {
  initial: { opacity: 0, y: 5, filter: "blur(4px)" },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const, delay },
  }),
} as const;

type ItemRowProps = {
  label: string;
  role: string;
  about: string;
  date?: string;
  url: string;
  clickable?: boolean;
  delay: number;
};

const ItemRow = memo(function ItemRow({
  label,
  role,
  about,
  date,
  url,
  clickable = true,
  delay,
}: ItemRowProps) {
  const rowClassName =
    "group relative flex flex-col items-start pl-4 py-3 text-left rounded-r-md border-l-2 border-transparent hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-all " +
    (clickable ? "cursor-pointer" : "cursor-default");

  const inner = (
    <>
      <div className="flex items-baseline flex-wrap gap-x-4 gap-y-0.5">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-semibold text-zinc-100 truncate group-hover:text-emerald-50/90 transition-colors">
            {label}
          </span>
          <span className="text-sm text-zinc-500 font-mono hidden sm:inline">
            {role}
          </span>
        </div>
        {date ? (
          <span className="text-xs text-zinc-600 font-mono whitespace-nowrap hidden sm:inline">
            {date}
          </span>
        ) : null}
      </div>

      <span className="relative text-xs text-zinc-500 font-mono sm:hidden">
        {role}
      </span>

      <span className="relative text-sm text-zinc-400 leading-snug mt-0.5">
        {about}
      </span>
    </>
  );

  if (clickable) {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClassName}
        initial={ITEM_ANIMATION.initial}
        animate={ITEM_ANIMATION.animate(delay)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={rowClassName}
      initial={ITEM_ANIMATION.initial}
      animate={ITEM_ANIMATION.animate(delay)}
    >
      {inner}
    </motion.div>
  );
});

function DevContent() {
  return (
    <>
      <section className="mt-8">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">teaching</h2>
        <Link href="/presentations" className="block pl-4 py-3 border-l-2 border-transparent hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-colors">
          <span className="font-semibold text-zinc-100">CS 211 · Computer Architecture</span>
          <span className="block text-sm text-zinc-400 mt-1">Recitation slides and interactive examples at Rutgers.</span>
          <span className="block text-xs font-mono text-emerald-400 mt-2">view presentations ↗</span>
        </Link>
      </section>
      <AnimatedText
        text="work"
        element="h2"
        className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-8 mb-3"
        artificialDelay={0.4}
      />

      <div className="flex flex-col gap-1">
        {WORK_ITEMS.map((item, i) => (
          <ItemRow
            key={item.slug}
            label={item.company}
            role={item.role}
            about={item.about}
            date={item.date}
            url={item.url}
            clickable={item.clickable}
            delay={0.5 + i * 0.1}
          />
        ))}
      </div>

      <AnimatedText
        text="projects"
        element="h2"
        className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-8 mb-3"
        artificialDelay={0.5}
      />

      <div className="flex flex-col gap-1">
        {PROJECTS.map((project, i) => (
          <ItemRow
            key={project.slug}
            label={project.name}
            role={project.role}
            about={project.about}
            date={project.date}
            url={project.url}
            clickable={project.clickable}
            delay={0.6 + i * 0.1}
          />
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const { view } = useView();

  return view === "dev" ? <DevContent /> : <VfxGrid />;
}
