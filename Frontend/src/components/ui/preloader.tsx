import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // Start fading out after 2 seconds
        const timer = setTimeout(() => {
            setFading(true);
        }, 2000);

        // Completely remove from DOM after fade transition (0.5s)
        const removeTimer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500",
                fading ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
        >
            <div className="relative flex flex-col items-center gap-4">
                {/* Logo Container with Pulse Effect */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-ring" />
                    <img
                        src="/zunf-1.png"
                        alt="ZUNF Medicare"
                        className="relative w-32 h-32 object-contain animate-bounce-slow"
                    />
                </div>

                {/* Loading Spinner/Text */}
                <div className="flex flex-col items-center gap-2 mt-4">
                    <div className="h-1.5 w-32 bg-secondary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-loading-bar rounded-full" />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
}
