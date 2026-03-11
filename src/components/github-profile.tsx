import { GITHUB_USERNAME } from "@/utils/constants";
import * as emoji from "node-emoji";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const AVATAR_URL = `https://avatars.githubusercontent.com/${GITHUB_USERNAME}?size=160`;

type ApiResponse = { status?: { emoji: string; message: string } };

function toShortcode(emojiChar: string): string {
  const code = emoji.which(emojiChar);
  return code ?? emojiChar;
}

export function GitHubProfile() {
  const [status, setStatus] = useState<{ emoji: string; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null) as Promise<ApiResponse | null>)
      .then((data) => data?.status ?? null)
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  return (
    <motion.div
      className="shrink-0 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="relative">
        <img
          src={AVATAR_URL}
          alt=""
          width={112}
          height={112}
          className="size-24 md:size-28 rounded-full ring-2 ring-zinc-700"
        />
      </div>
      {status && (
        <span
          className="mt-2 rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-mono text-zinc-300"
          title={status.message}
        >
          {status.emoji ? (
            <span className="text-zinc-500">{toShortcode(status.emoji)}</span>
          ) : null}
          {status.emoji && status.message ? " " : null}
          <span className="text-zinc-200">{status.message}</span>
        </span>
      )}
    </motion.div>
  );
}
