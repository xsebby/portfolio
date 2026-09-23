import { motion, type Variants } from "motion/react";
import React from "react";

type IAnimatedTextProps = {
  text: string;
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  artificialDelay?: number;
  fast?: boolean;
};

const AnimatedText = ({
  element,
  className,
  text,
  artificialDelay,
  fast,
}: IAnimatedTextProps) => {
  const wordDelay = fast ? 0.04 : 0.25;
  const stagger = fast ? 0.008 : 0.025;
  const charDuration = fast ? 0.15 : 1;

  const charVariants = {
    initial: { opacity: 0, y: 5 },
    animate: (charCount: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: charCount === 1 ? 0.1 : charDuration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  } as const satisfies Variants;

  const wrapClass = element === "p" ? "whitespace-normal" : "whitespace-nowrap";
  const animated = text.split(" ").map((word, index) => (
    <motion.span
      // biome-ignore lint/suspicious/noArrayIndexKey: cry harder
      key={index}
      className={`inline-block mr-[0.25em] ${wrapClass} will-change-transform`}
      initial="initial"
      animate="animate"
      transition={{
        delayChildren: index * wordDelay + (artificialDelay ?? 0),
        staggerChildren: stagger,
      }}
    >
      {[...word].map((character, charIndex) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: cry harder
          key={charIndex}
          className="inline-block"
          custom={word.length}
          variants={charVariants}
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  ));

  // Animated glyphs are decorative; expose the full string to assistive tech
  // so headings/buttons aren't reported as empty (axe: empty-heading, button-name).
  return React.createElement(
    element,
    { className },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{animated}</span>
    </>,
  );
};

export default AnimatedText;
