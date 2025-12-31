'use client';

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop({ scrollToTop, className }: { scrollToTop: () => void, className?: string }) {
    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "rounded-full p-3 bg-background/80 backdrop-blur-md border border-white/10 shadow-lg text-foreground transition-all duration-300 z-40 hover:scale-110 hover:bg-background",
                className
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
}
