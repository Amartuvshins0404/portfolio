"use client"
import { useEffect, useState } from 'react'
import BackToTop from './back-to-top'
import ChatModal from './ChatModal'
import Chatbot from './Chatbot'
import { cn } from '@/lib/utils';

const FixedButtons = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className='fixed bottom-10 right-10 z-50 flex flex-col items-end'>
            {isChatOpen ? (
                <ChatModal onClose={() => setIsChatOpen(false)} />
            ) : (
                <div className="relative w-12 h-12">
                    {/* Chatbot: Moves from Row 2 (bottom-0) to Row 1 (bottom-20) when scrolled */}
                    <Chatbot
                        onOpen={() => setIsChatOpen(true)}
                        className={cn(
                            "absolute right-0 transition-all duration-500 ease-in-out",
                            isVisible ? "bottom-20" : "bottom-0"
                        )}
                    />

                    {/* BackToTop: Appears at Row 2 (bottom-0) when scrolled */}
                    <BackToTop
                        scrollToTop={scrollToTop}
                        className={cn(
                            "absolute right-0 bottom-0 transition-all duration-500 ease-in-out",
                            isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45 pointer-events-none"
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default FixedButtons