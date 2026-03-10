import { GITHUB_USERNAME } from "@/utils/constants";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const AVATAR_URL = `https://avatars.githubusercontent.com/${GITHUB_USERNAME}?size=160`;

type ApiResponse = { status?: { emoji: string; message: string } };

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
      className="shrink-0"
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
          className="size-24 md:size-22 rounded-full ring-2 ring-zinc-700"
        />
        {status && (
          <span
            className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300 ring-2 ring-zinc-900"
            title={status.message}
          >
            {status.emoji && (
              <span className="text-sm leading-none">{status.emoji}</span>
            )}
            <span className="max-w-24 truncate">{status.message}</span>
          </span>
        )}
      </div>
    </motion.div>
  );
}
