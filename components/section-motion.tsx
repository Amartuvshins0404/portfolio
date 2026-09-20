"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
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

export function Line({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="block h-px w-full origin-left bg-border"
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay, ease }}
    />
  );
}

export function Row({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.li
      className={cn("group relative list-none", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {children}
    </motion.li>
  );
}

export function Marquee({
  items,
  speed = 40,
  className,
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const track = [...items, ...items];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <motion.ul
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
          </li>
        ))}
      </motion.ul>
    </div>
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
