// Partner logos - only include images that exist in public folder
const partners = [
  { name: "Chughtai Lab", logo: "/chughtai.jpeg" },
  { name: "Dr. Essa Laboratories & Diagnostic Center", logo: "/drEssa.jpeg" },
  { name: "Test Zone Diagnostic Center", logo: "/testzone.jpeg" },
  { name: "BioTech Lahore Lab", logo: "/biotech.jpeg" },
  { name: "Ayzal Lab", logo: "/ayzal.jpeg" },
  { name: "Lahore PCR Lab", logo: "/testzone.jpeg" },
  { name: "Jinnah MRI & Diagnostic Center", logo: "/jinnahMRI.jpeg" },
  { name: "Esthetique Canon", logo: "/esthetic.jpeg" },
];

// Duplicate for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners, ...partners];

export function Partners() {
  return (
    <section className="relative w-full bg-gradient-to-br from-background via-background to-accent/10 py-8 overflow-hidden -mt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10 pointer-events-none" />

      <div className="relative z-20">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-foreground/90">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Partners</span>
          </h2>
        </div>

        <div className="flex animate-scroll-left-fast">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
              style={{ width: "200px" }}
            >
              <div className="relative w-full h-24 flex items-center justify-center bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/20">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="object-contain max-h-20 w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

