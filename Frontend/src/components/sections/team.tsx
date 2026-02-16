import { Link } from "react-router-dom";
import { teamMembers } from "@/data/teams";
import { Linkedin, ExternalLink } from "lucide-react";



export function Team() {
  return (
    <section className="relative w-full bg-gradient-to-br from-background via-background to-accent/5 min-h-screen py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 mb-4">
            Our Team
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Meet the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Passionate professionals dedicated to revolutionizing healthcare in Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group relative flex flex-col items-center w-full max-w-[280px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-[280px] h-[280px] mb-4 animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="text-center w-full">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 min-h-[2.5rem] flex items-center justify-center">
                  {member.role}
                  {/* {member.ruwwaad && (
                    <>
                      <span className="mx-1">,</span>
                      <Link
                        to={member.ruwwaad}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline transition-colors"
                      >
                      RUWWAAD
                      </Link>
                    </>
                  )} */}
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Link
                    to={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group/link"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  {member.portfolio && (
                    <Link
                      to={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 group/link"
                      title="Portfolio"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

