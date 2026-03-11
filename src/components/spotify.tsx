import { Marquee } from "@/components/marquee";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const EQUALIZER_DELAYS = [0, 0.15, 0.3];

const EQUALIZER_ANIMATION = {
  animate: {
    scaleY: [2, 10, 4, 8, 2].map((h) => h / 10), // the max height is tw's 2.5 = 10px
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    layout: {
      type: "tween",
      ease: "easeInOut",
    },
  },
} as const;

const SONG_CHANGE = {
  initial: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  transition: {
    duration: 0.3,
  },
} as const;

const SPOTIFY_PILL_ANIMATION = {
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  transition: {
    type: "spring",
    stiffness: 60,
    delay: 0.8,
  },
} as const;

interface SpotifyState {
  song: string;
  artist: string;
  albumArtUrl: string;
  isPlaying: boolean;
}

export function Spotify() {
  const [spotify, setSpotify] = useState<SpotifyState | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/lastfm/now-playing");
      const data = (await res.json()) as {
        playing?: boolean;
        song?: string;
        artist?: string;
        albumArtUrl?: string;
      };

      if (data.song && data.artist !== undefined) {
        setSpotify({
          song: data.song,
          artist: data.artist,
          albumArtUrl: data.albumArtUrl ?? "",
          isPlaying: data.playing ?? false,
        });
      } else {
        setSpotify(null);
      }
    } catch {
      setSpotify(null);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  return (
    <AnimatePresence>
      {spotify ? (
        <motion.div
          animate={SPOTIFY_PILL_ANIMATION.animate}
          initial={SPOTIFY_PILL_ANIMATION.initial}
          exit={SPOTIFY_PILL_ANIMATION.initial}
          transition={SPOTIFY_PILL_ANIMATION.transition}
          className="will-change-[transform,opacity,filter] grid" // for whatever reason, this needs to be grid... otherwise safari has a spazm, bit too lazy to find out why... its gotta do with something with the LayoutGroup though.
        >
          <motion.div
            layout
            style={{
              borderRadius: 9999,
            }}
            className="absolute -top-6 left-0 p-0.5 overflow-hidden bg-zinc-800/80 min-w-40 max-w-52 rounded-full"
          >
            <motion.div
              layout
              style={{
                borderRadius: 9999,
              }}
              className="relative flex gap-2 items-center px-2 py-1 bg-zinc-900 overflow-hidden rounded-[9999px]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={spotify.song}
                  className="flex items-center min-w-0 gap-5 py-1 will-change-[transform,opacity,filter]"
                  animate={SONG_CHANGE.animate}
                  initial={SONG_CHANGE.initial}
                  exit={SONG_CHANGE.initial}
                  transition={SONG_CHANGE.transition}
                >
                  {spotify.albumArtUrl ? (
                    <img
                      className="size-5 rounded shrink-0 object-cover gap-10 ml-[3px]"
                      src={spotify.albumArtUrl}
                      alt=""
                    />
                  ) : null}
                  <Marquee className="min-w-0">
                    <span className="text-zinc-100 text-xs">{spotify.song}</span>
                    <span className="text-zinc-500 text-xs mx-1">·</span>
                    <span className="text-zinc-400 text-xs whitespace-nowrap">
                      {spotify.artist}
                    </span>
                  </Marquee>
                </motion.div>
              </AnimatePresence>

              <div className="relative flex items-center gap-0.5 h-[stretch] ml-0 mr-0 pl-2 pr-2 pt-0.5 bg-zinc-900">
                <div className="absolute right-full h-full w-2 bg-linear-to-r from-transparent to-zinc-900 pointer-events-none" />
                {EQUALIZER_DELAYS.map((delay, i) => (
                  <motion.div
                    layout
                    key={i}
                    className={
                      (spotify.isPlaying
                        ? "bg-emerald-500 h-2"
                        : "bg-zinc-500 h-0.5") +
                      " w-0.5 rounded-full origin-center will-change-transform"
                    }
                    animate={
                      spotify.isPlaying
                        ? EQUALIZER_ANIMATION.animate
                        : undefined
                    }
                    transition={{
                      ...EQUALIZER_ANIMATION.transition,
                      delay,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
