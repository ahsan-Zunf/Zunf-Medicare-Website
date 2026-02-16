import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
    items: {
        title: string
        content: React.ReactNode
    }[]
    className?: string
}

export function Accordion({ items, className }: AccordionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="rounded-lg border border-primary/20 bg-card overflow-hidden"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="flex w-full items-center justify-between p-4 text-left font-medium transition-all hover:bg-muted/50"
                    >
                        <span className="text-foreground">{item.title}</span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
                                openIndex === index && "rotate-180"
                            )}
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {openIndex === index && (
                            <motion.div
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                    open: { opacity: 1, height: "auto" },
                                    collapsed: { opacity: 0, height: 0 }
                                }}
                                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                                <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-primary/10">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
