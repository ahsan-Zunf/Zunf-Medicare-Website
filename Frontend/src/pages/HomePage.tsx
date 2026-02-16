import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { HealthCardBenefits } from "@/components/sections/health-card-benefits";
import { PartneredLabs } from "@/components/sections/partnered-labs";
import { Clients } from "@/components/sections/clients";
import { Packages } from "@/components/sections/packages";
import { ChughtaiLabTests } from "@/components/sections/chughtai-lab-tests";
import { Team } from "@/components/sections/team";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Update Title
    document.title = "Book Lab Tests Online & Diagnostic Services | Zunf Medicare";

    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Find trusted diagnostic labs across Pakistan and book lab tests online with confidence. Reliable and convenient services by Zunf Medicare.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Find trusted diagnostic labs across Pakistan and book lab tests online with confidence. Reliable and convenient services by Zunf Medicare.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 md:-mt-16">
        <Hero />
        <PartneredLabs />
        <ChughtaiLabTests />
        <HealthCardBenefits />
        <Cta />
        <Packages />
        <Clients />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

