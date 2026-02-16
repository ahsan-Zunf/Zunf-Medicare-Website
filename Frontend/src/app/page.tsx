import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { HealthCardBenefits } from "@/components/sections/health-card-benefits";
import { Partners } from "@/components/sections/partners";
import { Clients } from "@/components/sections/clients";
import { Packages } from "@/components/sections/packages";
import { Team } from "@/components/sections/team";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 md:-mt-16">
        <Hero />
        <Partners />
        <HealthCardBenefits />
        <Packages />
        <Cta />
        <Clients />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
