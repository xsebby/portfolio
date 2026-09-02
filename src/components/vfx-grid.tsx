import AnimatedText from "@/components/animated-text";
import { ShowcaseImage } from "@/components/showcase-image";
import { useDetailPanel } from "@/context/detail-panel-context";import { VFX_PROJECTS } from "@/utils/constants";
import { motion } from "motion/react";
import { memo } from "react";

const IMAGE_ANIMATION = {
  initial: { opacity: 0, scale: 0.98 },
  animate: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
      delay,
    },
  }),
} as const;

type VfxCardProps = {
  title: string;
  role: string;
  about: string;
  details?: string;
  date?: string;
  image?: string;
  link?: string;
  linkLabel?: string;
  baseDelay: number;
};

const VfxCard = memo(function VfxCard({
  title,
  role,
  about,
  details,
  date,
  image,
  link,
  linkLabel,
  baseDelay,
}: VfxCardProps) {
  const { openDetail } = useDetailPanel();

  return (
    <button
      type="button"
      onClick={() =>
        openDetail({
          title,
          role,
          about,
          details,
          date,
          image,
          link,
          linkLabel,
        })
      }
      className="group flex flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/40 hover:border-violet-500/30 hover:bg-zinc-900/70 transition-all cursor-pointer text-left w-full"
    >
      <motion.div
        className="relative aspect-video w-full overflow-hidden"
        initial={IMAGE_ANIMATION.initial}
        animate={IMAGE_ANIMATION.animate(baseDelay)}
      >
        <ShowcaseImage
          image={image}
          link={link}
          className="size-full"
          imgClassName="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </motion.div>      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <AnimatedText
            text={title}
            element="span"
            className="font-semibold text-zinc-100 text-sm group-hover:text-violet-50/90 transition-colors"
            artificialDelay={baseDelay + 0.05}
            fast
          />
          {date ? (
            <AnimatedText
              text={date}
              element="span"
              className="text-[10px] text-zinc-600 whitespace-nowrap shrink-0"
              artificialDelay={baseDelay + 0.08}
              fast
            />
          ) : null}
        </div>
        <AnimatedText
          text={role}
          element="span"
          className="text-xs text-zinc-500"
          artificialDelay={baseDelay + 0.1}
          fast
        />
        <AnimatedText
          text={about}
          element="p"
          className="text-xs text-zinc-400 leading-relaxed"
          artificialDelay={baseDelay + 0.12}
          fast
        />
      </div>
    </button>
  );
});

export function VfxGrid() {
  return (
    <>
      <AnimatedText
        text="work"
        element="h2"
        className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-8 mb-3"
        artificialDelay={0.4}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {VFX_PROJECTS.map((project, i) => (
          <VfxCard
            key={project.slug}
            title={project.title}
            role={project.role}
            about={project.about}
            details={project.details}
            date={project.date}
            image={project.image}
            link={project.link}
            linkLabel={project.linkLabel}
            baseDelay={0.5 + i * 0.12}
          />
        ))}
      </div>
    </>
  );
}
