"use client";

import {
    motion,
    useMotionTemplate,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function IdentityGraphAnimated({ svg }: { svg: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 85%", "end 15%"],
    });

    // Spring-smoothed progress for buttery scroll-linked effects
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });

    // Radial mask reveal — graph fans out from the center photo as you scroll in.
    const maskInner = useTransform(progress, [0, 0.45], reduce ? [120, 120] : [0, 110]);
    const maskOuter = useTransform(progress, [0, 0.45], reduce ? [120, 120] : [12, 130]);
    const maskImage = useMotionTemplate`radial-gradient(circle at 50% 60%, black ${maskInner}%, transparent ${maskOuter}%)`;

    // Subtle zoom + drift on scroll
    const scale = useTransform(progress, [0, 0.45, 1], reduce ? [1, 1, 1] : [0.9, 1, 1.05]);
    const y = useTransform(progress, [0, 0.45, 1], reduce ? [0, 0, 0] : [50, 0, -25]);
    const baseOpacity = useTransform(progress, [0, 0.1, 0.95, 1], [0, 1, 1, 0.7]);

    // Perpetual halo pulse intensity, modulated by scroll so it ramps up as the graph fills in
    const glowOpacity = useTransform(progress, [0, 0.45, 1], [0, 0.35, 0.25]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, y, opacity: baseOpacity }}
            className="relative will-change-transform"
        >
            {/* Pulsing radial glow behind the graph */}
            <motion.div
                aria-hidden
                style={{ opacity: glowOpacity }}
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
            >
                <div className="ig-glow h-2/3 w-2/3 rounded-full" />
            </motion.div>

            {/* The SVG, masked by a scroll-driven radial reveal */}
            <motion.div
                style={{ maskImage, WebkitMaskImage: maskImage }}
                className="identity-graph [&_svg]:block [&_svg]:w-full [&_svg]:h-auto"
            >
                <div dangerouslySetInnerHTML={{ __html: svg }} />
            </motion.div>

            <style>{`
                .ig-glow {
                    background: radial-gradient(circle at center,
                        color-mix(in oklab, var(--color-foreground) 30%, transparent) 0%,
                        transparent 60%);
                    filter: blur(40px);
                    animation: ig-breathe 4.5s ease-in-out infinite;
                }
                .identity-graph svg circle[r="0.55"],
                .identity-graph svg circle[r="0.9"],
                .identity-graph svg circle[r="0.7"] {
                    animation: ig-dot 2.6s ease-in-out infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }
                .identity-graph svg [id^="Group"] {
                    transform-box: fill-box;
                    transform-origin: center;
                }
                @keyframes ig-breathe {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50%      { transform: scale(1.08); opacity: 0.75; }
                }
                @keyframes ig-dot {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0.45; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ig-glow { animation: none !important; }
                    .identity-graph svg circle { animation: none !important; }
                }
            `}</style>
        </motion.div>
    );
}

