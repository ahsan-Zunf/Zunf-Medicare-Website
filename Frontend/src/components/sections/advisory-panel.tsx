import { motion } from "framer-motion";
import { ShieldCheck, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function AdvisoryPanel() {
  // Updated Data with Full Names, Precision Roles, and LinkedIn URLs
  const advisors = [
    {
      id: 1,
      name: "Obaidullah Qazi",
      role: "Head of Microbiology & Diagnostic Research",
      image: "/Obaidullah Qazi.jpeg", 
      linkedin: "https://www.linkedin.com/in/obaidullah-qazi-27828113?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      id: 2,
      name: "Prof. Dr. Farooq Ahmad Gujar",
      role: "Health Data Analytics Advisor & Academic Liaison", 
      image: "/Professor Dr. Farooq Ahmad Gujar.jpeg", 
      linkedin: "https://www.linkedin.com/in/prof-dr-farooq-ahmad-gujar-59297260?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      id: 3,
      name: "Prof. Dr. Muhammad Saqib Shahzad (Ch)",
      role: "Head of Clinical Genomics & Precision Medicine", 
      image: "/Professor Dr. Muhammad Saqib Shahzad.jpeg", 
      linkedin: "https://www.linkedin.com/in/muhammad-saqib-shahzad-ch?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      id: 4,
      name: "SM Waqar Azeem",
      role: "Head of School Nutrition Project", 
      image: "/Waqar Azeem.jpeg", // Fixed the backslash issue here
      linkedin: "https://www.linkedin.com/in/smwaqarazeem?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 border-b border-slate-100" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4 shadow-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            Guiding Excellence
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Meet Our <span className="text-accent">Advisory Panel</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed"
          >
            A prestigious panel of industry experts and medical professionals who guide ZUNF Medicare's vision for a healthier tomorrow.
          </motion.p>
        </div>

        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group flex flex-col h-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-100 flex-shrink-0">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 opacity-[0.05] bg-[size:20px_20px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
                
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x400/f8fafc/94ca43?text=Image+Missing";
                  }}
                />
                
                {/* Gradient Overlay for seamless blend */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
              </div>

              {/* Content Box */}
              <div className="relative z-30 flex flex-col flex-1 w-full p-6 text-center -mt-10 bg-white rounded-t-[2rem]">
                <h3 className="text-lg lg:text-xl font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                  {advisor.name}
                </h3>
                
                <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-wider mb-6 leading-relaxed">
                  {advisor.role}
                </p>
                
                {/* LinkedIn Button (Pushed to bottom automatically) */}
                <div className="mt-auto pt-2">
                  <Link
                    to={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-3 bg-slate-50 text-[#0077b5] rounded-full hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}