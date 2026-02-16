import { ArrowRight } from "lucide-react";
import { Button } from "@/components/custom";
import { Link } from "react-router-dom";

export function Cta() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
        </div>
        </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/30 mb-6">
            Get Started Today
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-4">
            Get upto 40% off on your healthcare services
          </h2>
          <p className="mx-auto max-w-2xl text-white/90 md:text-lg leading-relaxed mb-8">
            ZUNF Medicare offers cost-effective, diagnostic and preventive healthcare services to you and your family.
          </p>
          <div className="flex flex-col gap-3 min-[420px]:mx-auto min-[420px]:w-auto min-[420px]:flex-row min-[420px]:justify-center">
          <Button asChild size="lg" variant="secondary" className="min-w-[180px] shadow-lg hover:shadow-xl transition-all">
            <Link to="/booking">
              <span className="flex justify-center items-center">
                Book a Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
