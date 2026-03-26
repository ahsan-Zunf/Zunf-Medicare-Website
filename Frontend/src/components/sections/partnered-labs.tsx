import { Link } from "react-router-dom";
import { labs } from "@/data/labs";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// Helper to get logo
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
    // Unique labs filter kiye
    const uniqueLabs = labs.filter((lab, index, self) => 
        index === self.findIndex((t) => t.id === lab.id)
    );

    // Array ko 3 dafa multiply kiya taake continuous infinite loop ban sake
    const infiniteLabs = [...uniqueLabs, ...uniqueLabs, ...uniqueLabs];

    return (
        <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-100">
            {/* Soft decorative background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center mb-10 md:mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full bg-accent/5 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/10 mb-4"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Trusted Healthcare Network
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4"
                    >
                        Our Partnered <span className="text-primary">Laboratories</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
                    >
                        We collaborate with Pakistan's leading diagnostic centers to ensure accuracy, reliability, and the highest standards of care.
                    </motion.p>
                </div>

                {/* Continuous Infinite Auto-Slider (Marquee) */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] py-4">
                        {infiniteLabs.map((lab, index) => {
                            const logo = getLabLogo(lab.id);
                            return (
                                <div key={`${lab.id}-${index}`} className="mx-3 w-[260px] md:w-[280px]">
                                    <Link
                                        to={`/lab/${lab.id}`}
                                        className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-4 h-[180px] w-full overflow-hidden"
                                    >
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/5 p-2 rounded-full">
                                            <ArrowUpRight className="h-4 w-4 text-accent" />
                                        </div>

                                        <div className="relative w-full h-16 flex items-center justify-center">
                                            {logo ? (
                                                <img
                                                    src={logo}
                                                    alt={lab.name}
                                                    className="max-h-full max-w-full object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="h-14 w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-bold text-xl shadow-inner">
                                                    {lab.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className={`text-sm md:text-base font-semibold text-center text-slate-600 group-hover:text-accent transition-colors duration-300 line-clamp-2 ${logo ? 'mt-2' : ''}`}>
                                            {lab.name}
                                        </h3>
                                        
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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