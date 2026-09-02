import { ShowcaseImage } from "@/components/showcase-image";
import { useDetailPanel } from "@/context/detail-panel-context";
import { getLinkLabel } from "@/utils/link-label";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

const BACKDROP = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
} as const;

const PANEL = {
  initial: { opacity: 0, y: 16, scale: 0.97, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: EASE },
  },
} as const;

export function WorkDetailPanel() {
  const { item, closeDetail } = useDetailPanel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          key="detail-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={BACKDROP.initial}
          animate={BACKDROP.animate}
          exit={BACKDROP.exit}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeDetail}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-detail-title"
            className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-lg border border-violet-900/70 bg-zinc-950 shadow-2xl shadow-black/50"
            initial={PANEL.initial}
            animate={PANEL.animate}
            exit={PANEL.exit}
            onClick={(event) => event.stopPropagation()}
          >
            {(item.image || item.link) ? (
              <ShowcaseImage
                image={item.image}
                link={item.link}
                className="aspect-video w-full"
              />
            ) : null}

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    id="work-detail-title"
                    className="text-xl font-semibold text-zinc-50 leading-tight"
                  >
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 font-mono">
                    {item.role}
                    {item.date ? ` · ${item.date}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDetail}
                  className="shrink-0 rounded-md px-2 py-1 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
                  aria-label="Close panel"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                {item.about}
              </p>

              {item.details ? (
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {item.details}
                </p>
              ) : null}

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {getLinkLabel(item.link, item.linkLabel)} →
                </a>
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
