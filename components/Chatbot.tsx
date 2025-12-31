// Gemini chatbot component as modal on click. Model series: gemini-2.5-flash-lite
"use client"
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react'
import React from 'react'

const Chatbot = ({ onOpen, className }: { onOpen: () => void; className?: string }) => {
  return (
    <div className={cn(
      "rounded-full p-3 py-2 bg-background/80 backdrop-blur-md border border-white/10 shadow-lg text-foreground transition-all duration-300 z-40 hover:scale-110 hover:bg-background",
      className
    )}>
      <button
        onClick={onOpen}
        aria-label="Chatbot modal"
      >
        <MessageCircle className="" />
      </button>
    </div>
  )
}

export default Chatbot