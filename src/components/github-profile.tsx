import { GITHUB_USERNAME, VFX_AVATAR_URL } from "@/utils/constants";
import { useView } from "@/context/view-context";
import * as emoji from "node-emoji";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const DEV_AVATAR_URL = `https://avatars.githubusercontent.com/${GITHUB_USERNAME}?size=160`;

type ApiResponse = { status?: { emoji: string; message: string } };

const AVATAR_TRANSITION = {
  initial: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  transition: { duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] as const },
} as const;

function toEmoji(nameOrChar: string): string {
  if (!nameOrChar) return "";
  const withColons = nameOrChar.includes(":") ? nameOrChar : `:${nameOrChar}:`;
  const char = emoji.get(withColons);
  return char ?? nameOrChar;
}

export function GitHubProfile() {
  const { view } = useView();
  const [status, setStatus] = useState<{ emoji: string; message: string } | null>(
    null,
  );

  useEffect(() => {
    if (view !== "dev") return;

    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null) as Promise<ApiResponse | null>)
      .then((data) => data?.status ?? null)
      .then(setStatus)
      .catch(() => setStatus(null));
  }, [view]);

  const avatarUrl =
    view === "vfx" ? VFX_AVATAR_URL || DEV_AVATAR_URL : DEV_AVATAR_URL;

  return (
    <motion.div
      className="shrink-0 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="relative size-24 md:size-28">
        <AnimatePresence mode="wait">
          <motion.img
            key={view}
            src={avatarUrl}
            alt=""
            width={112}
            height={112}
            className="absolute inset-0 size-full rounded-full ring-2 ring-zinc-700 object-cover"
            {...AVATAR_TRANSITION}
          />
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {view === "dev" && status ? (
          <motion.span
            key="status"
            className="mt-2 rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-mono text-zinc-300"
            title={status.message}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
          >
            {status.emoji ? (
              <span role="img" aria-hidden className="mr-1">
                {toEmoji(status.emoji)}
              </span>
            ) : null}
            <span className="text-zinc-200">{status.message}</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
