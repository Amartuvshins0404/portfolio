"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const wordsContainer: Variants = {
  rest: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const word: Variants = {
  rest: { y: "100%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

export function TextReveal({
  text,
  as: Tag = "p",
  className,
}: {
  text: string;
  as?: "p" | "h2" | "h3";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Tag];
  const parts = text.split(/\s+/);

  return (
    <MotionTag
      aria-label={text}
      initial={reduceMotion ? false : "rest"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
      variants={wordsContainer}
      className={className}
    >
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {part}
          </motion.span>
          {i < parts.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </MotionTag>
  );
}

export function Counter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const digits = String(value).split("");
  return (
    <span className={cn("inline-flex overflow-hidden", className)}>
      {digits.map((d, i) => {
        const n = Number(d);
        if (Number.isNaN(n) || reduceMotion) {
          return <span key={i}>{d}</span>;
        }
        return (
          <span key={i} className="relative inline-block h-[1em] leading-none">
            <motion.span
              className="flex flex-col"
              initial={{ y: 0 }}
              whileInView={{ y: `-${n}em` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.1 + i * 0.12, ease }}
            >
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k} className="h-[1em] leading-none">
                  {k}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
