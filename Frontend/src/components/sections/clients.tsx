// Client logos
const clients = [
  { name: "Client 1", logo: "/client-1.jpeg" },
  { name: "Client 2", logo: "/client-2.jpeg" },
  { name: "Client 3", logo: "/client-3.jpeg" },
  { name: "Client 4", logo: "/client-4.jpeg" },
  { name: "Client 5", logo: "/client-5.jpeg" },
  { name: "Client 6", logo: "/client-6.jpeg" },
  { name: "Client 7", logo: "/client-7.jpeg" },
];

// Duplicate for seamless infinite scroll
const duplicatedClients = [...clients, ...clients, ...clients];

export function Clients() {
  return (
    <section className="relative w-full bg-gradient-to-br from-background via-background to-accent/10 py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10 pointer-events-none" />
      
      <div className="relative z-20">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-foreground/90">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trusted Clients</span>
          </h2>
        </div>
      
        <div className="flex animate-scroll-left-very-fast">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
              style={{ width: "200px" }}
            >
              <div className="relative w-full h-24 flex items-center justify-center bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/20">
                <img
                  src={client.logo}
                  alt={client.name}
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


