import { Link } from "react-router-dom";
import { labs } from "@/data/labs";
import { ArrowUpRight } from "lucide-react";

// Helper to get logo (duplicated logic for now, could be moved to utils)
const getLabLogo = (labId: string): string | null => {
    const logoMap: Record<string, string> = {
        "chughtai-lab": "/chughtai.jpeg",
        "dr-essa-lab": "/drEssa.jpeg",
        "test-zone": "/testzone.jpeg",
        "biotech-lahore": "/biotech.jpeg",
        "ayzal-lab": "/ayzal.jpeg",
        "jinnah-mri": "/jinnahMRI.jpeg",
        "esthetique-canon": "/esthetic.jpeg",
    };
    return logoMap[labId] || null;
};

export function PartneredLabs() {
    return (
        <section className="w-full py-16 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110 pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Trusted Networks
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Our <span className="text-primary">Partnered Labs</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We collaborate with Pakistan's leading diagnostic centers to ensure accuracy and reliability.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] py-4">
                        {[...labs, ...labs, ...labs].map((lab, index) => {
                            const logo = getLabLogo(lab.id);
                            return (
                                <div key={`${lab.id}-${index}`} className="mx-4 w-[280px]">
                                    <Link
                                        to={`/lab/${lab.id}`}
                                        className="group relative bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px]"
                                    >
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ArrowUpRight className="h-5 w-5 text-primary" />
                                        </div>

                                        <div className="relative w-full h-20 flex items-center justify-center">
                                            {logo ? (
                                                <img
                                                    src={logo}
                                                    alt={lab.name}
                                                    className="w-full h-full object-contain transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                    {lab.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className={`text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-2 ${logo ? 'mt-2' : ''}`}>
                                            {lab.name}
                                        </h3>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
