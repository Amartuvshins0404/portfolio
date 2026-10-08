"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ShowcaseVideo({
  src,
  poster,
  className,
  title,
}: {
  src: string;
  poster?: string;
  className?: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduceMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden rounded-2xl bg-muted", className)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        aria-label={title}
        className="pointer-events-none h-full w-full object-cover"
      />
    </div>
  );
}
