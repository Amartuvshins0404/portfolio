"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import {
  type PointerEvent,
  type ReactNode,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

const spring = { stiffness: 190, damping: 24, mass: 0.45 };
const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ y: distance, filter: "blur(8px)" }}
      whileInView={{ y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type TiltSurfaceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
};

function useTilt<T extends HTMLElement>(intensity: number) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, spring);
  const rotateY = useSpring(rawRotateY, spring);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${glowX}px ${glowY}px, color-mix(in oklab, var(--foreground) 12%, transparent), transparent 68%)`;

  const handlePointerMove = (event: PointerEvent<T>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    glowX.set(x);
    glowY.set(y);
    rawRotateX.set(((y / rect.height) - 0.5) * -intensity);
    rawRotateY.set(((x / rect.width) - 0.5) * intensity);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const style: MotionStyle = reduceMotion
    ? {}
    : {
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      };

  return {
    ref,
    style,
    glowStyle: { background: glow } as MotionStyle,
    handlePointerMove,
    handlePointerLeave,
    reduceMotion,
  };
}

export function TiltCard({
  children,
  className,
  delay = 0,
  intensity = 7,
}: TiltSurfaceProps) {
  const {
    ref,
    style,
    glowStyle,
    handlePointerMove,
    handlePointerLeave,
    reduceMotion,
  } = useTilt<HTMLDivElement>(intensity);

  if (reduceMotion) {
    return (
      <div className={cn("group relative", className)}>
        <div className="relative z-10 h-full">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ y: 36, scale: 0.985, filter: "blur(7px)" }}
      whileInView={{ y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -7, scale: 1.012 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.68, delay, ease }}
      style={style}
      className={cn("group relative", className)}
    >
      <motion.div
        aria-hidden="true"
        style={glowStyle}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full [transform:translateZ(16px)]">{children}</div>
    </motion.div>
  );
}

export function TiltArticle({
  children,
  className,
  delay = 0,
  intensity = 7,
}: TiltSurfaceProps) {
  const {
    ref,
    style,
    glowStyle,
    handlePointerMove,
    handlePointerLeave,
    reduceMotion,
  } = useTilt<HTMLElement>(intensity);

  if (reduceMotion) {
    return (
      <article className={cn("group relative", className)}>
        <div className="relative z-10 h-full">{children}</div>
      </article>
    );
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ y: 36, scale: 0.985, filter: "blur(7px)" }}
      whileInView={{ y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -7, scale: 1.012 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.68, delay, ease }}
      style={style}
      className={cn("group relative", className)}
    >
      <motion.div
        aria-hidden="true"
        style={glowStyle}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full [transform:translateZ(16px)]">{children}</div>
    </motion.article>
  );
}
