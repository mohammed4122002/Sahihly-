"use client";

import { motion } from "framer-motion";

/**
 * Cinematic word-by-word headline reveal: each word rises out of a blur.
 */
export default function HeroTitle({
  title,
  accent,
}: {
  title: string;
  accent: string;
}) {
  const lines: { words: string[]; accent: boolean }[] = [
    { words: title.split(" "), accent: false },
    { words: accent.split(" "), accent: true },
  ];
  let index = 0;

  return (
    <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[1.1] sm:text-6xl">
      {lines.map((line, li) => (
        <span key={li} className={line.accent ? "text-gradient block" : "block"}>
          {line.words.map((word) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
                {" "}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
