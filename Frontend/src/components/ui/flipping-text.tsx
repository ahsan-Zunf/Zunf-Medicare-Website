import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FlippingTextProps {
    phrases: string[];
    interval?: number;
    className?: string;
}

export function FlippingText({ phrases, interval = 5000, className }: FlippingTextProps) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false); // Start fading out
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % phrases.length);
                setFade(true); // Start fading in
            }, 500); // Wait for fade out to complete
        }, interval);

        return () => clearInterval(timer);
    }, [phrases.length, interval]);

    return (
        <div className={cn("relative overflow-hidden h-10 sm:h-12 md:h-16 flex items-center", className)}>
            <span
                className={cn(
                    "transition-all duration-500 transform absolute w-full",
                    fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                {phrases[index]}
            </span>
        </div>
    );
}
