import { useShowcaseImage } from "@/hooks/use-showcase-image";
import { motion } from "motion/react";

type ShowcaseImageProps = {
  image?: string;
  link?: string;
  className?: string;
  imgClassName?: string;
};

export function ShowcaseImage({
  image,
  link,
  className = "",
  imgClassName = "size-full object-cover",
}: ShowcaseImageProps) {
  const src = useShowcaseImage(image, link);

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {src ? (
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          className={imgClassName}
        />
      ) : (
        <div className="size-full bg-linear-to-br from-zinc-800 via-zinc-900 to-zinc-950">
          {link && !image ? (
            <motion.div
              className="absolute inset-0 bg-zinc-800/40"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
