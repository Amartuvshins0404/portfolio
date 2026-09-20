"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? false : { y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </h1>
  );
}

export function HeroFade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollCue() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href="#focus"
      aria-label="Scroll to next section"
      className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Scroll
      </span>
      <span className="relative h-10 w-px overflow-hidden bg-foreground/15">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-foreground"
          animate={reduceMotion ? undefined : { y: ["-100%", "260%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}
