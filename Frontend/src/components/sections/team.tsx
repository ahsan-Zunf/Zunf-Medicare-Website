import { Link } from "react-router-dom";
import { teamMembers } from "@/data/teams"; 
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/custom";
import { useEffect, useRef } from "react";

export function Team() {
  const topLeadership = [
    ...teamMembers.slice(0, 3), 
    {
      name: "Dr. Shaharyar",
      role: "Head of Doctors",
      image: "/Dr. Shaharyar.jpeg", 
      linkedin: "#", 
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (window.innerWidth >= 768) return; 

        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (el.scrollLeft >= maxScroll - 20) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
        }
      }, 3000); 
    };

    startScroll();

    const pauseScroll = () => clearInterval(scrollInterval);
    const resumeScroll = () => startScroll();

    el.addEventListener('touchstart', pauseScroll);
    el.addEventListener('touchend', resumeScroll);
    el.addEventListener('mouseenter', pauseScroll);
    el.addEventListener('mouseleave', resumeScroll);

    return () => {
      clearInterval(scrollInterval);
      el.removeEventListener('touchstart', pauseScroll);
      el.removeEventListener('touchend', resumeScroll);
      el.removeEventListener('mouseenter', pauseScroll);
      el.removeEventListener('mouseleave', resumeScroll);
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-16 md:py-28 border-t border-slate-100 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary border border-primary/10 mb-4"
          >
            The Minds Behind ZUNF
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6"
          >
            Our <span className="text-accent">Leadership</span> Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed px-4"
          >
            A dedicated group of visionaries working together to make quality healthcare accessible to every doorstep in Pakistan.
          </motion.p>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 pb-8 -mx-4 px-4 md:mx-auto md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {topLeadership.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // ✅ FIX: Mobile par w-full aur max-w-sm diya taake zyada phelay na
              className="group flex flex-col items-center min-w-[85vw] sm:min-w-[300px] max-w-[320px] md:min-w-0 shrink-0 snap-center md:max-w-none mx-auto"
            >
              {/* Image Container */}
              {/* ✅ FIX: Mobile pe fixed height (h-[320px] sm:h-[350px]) aur desktop pe aspect-[4/5] */}
              <div className="relative w-full h-[320px] sm:h-[350px] md:h-auto md:aspect-[4/5] mb-5 md:mb-8 overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 md:group-hover:shadow-2xl md:group-hover:shadow-accent/10 md:group-hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  // ✅ FIX: object-cover ensure karega picture apni jagah se bahar na nikle
                  className="w-full h-full object-cover object-top transition-transform duration-700 md:group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x500/f8fafc/94ca43?text=Photo+Missing";
                  }}
                />
                
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-end justify-center pb-8">
                   <div className="flex gap-4">
                      <Link
                        to={member.linkedin || "#"}
                        target="_blank"
                        className="bg-white p-3 rounded-xl text-[#0077b5] hover:scale-110 transition-transform shadow-xl"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        to="/contact"
                        className="bg-primary p-3 rounded-xl text-white hover:scale-110 transition-transform shadow-xl"
                      >
                        <Mail className="h-5 w-5" />
                      </Link>
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center w-full px-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1.5 transition-colors md:group-hover:text-accent truncate">
                  {member.name}
                </h3>
                <div className="inline-block bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-3">
                   <p className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.1em]">
                    {member.role}
                  </p>
                </div>

                <div className="flex md:hidden items-center justify-center gap-3 mt-1">
                  <Link
                    to={member.linkedin || "#"}
                    target="_blank"
                    className="p-2 rounded-full bg-slate-50 text-[#0077b5] hover:bg-slate-100 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="p-2 rounded-full bg-slate-50 text-primary hover:bg-slate-100 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-20 text-center">
           <Button asChild variant="outline" className="rounded-full px-8 md:px-10 h-12 md:h-14 border-slate-200 text-slate-600 hover:border-accent hover:text-accent transition-all font-bold shadow-sm">
              <Link to="/about">
                See Full Organization <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
           </Button>
        </div>

      </div>
    </section>
  );
}