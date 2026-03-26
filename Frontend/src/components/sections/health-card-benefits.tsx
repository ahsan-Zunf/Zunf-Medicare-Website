import { Button } from "@/components/custom";
import { ArrowRight, QrCode, FileText, Smartphone, ShieldCheck, Download, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HealthCardBenefits() {
  const steps = [
    {
      icon: FolderOpen,
      title: "1. Digitize Your Records",
      description: "Safely upload your past medical history and reports in one place.",
    },
    {
      icon: Smartphone,
      title: "2. Auto-Sync Lab Results",
      description: "Lab tests booked through ZUNF are updated automatically in your folder.",
    },
    {
      icon: QrCode,
      title: "3. Share via Smart QR",
      description: "Instantly share history with doctors by scanning your Health Card QR.",
    },
  ];

  return (
    <section className="relative w-full py-12 md:py-24 bg-white overflow-hidden border-t border-slate-100">
      {/* Background Orbs - Hidden on small mobile to improve performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content & Steps */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs md:text-sm font-bold text-accent mb-4 md:mb-6 shadow-sm border border-accent/20">
                <ShieldCheck className="h-4 w-4" />
                Electronic Health Records (EHR)
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight">
                Carry Your Medical History in Your <span className="text-primary">Pocket</span>
              </h2>
              
              <p className="text-base md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed">
                Ditch physical files. Maintain your lifetime health records digitally and share them effortlessly.
              </p>

              {/* Procedure Steps */}
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-10 text-left">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 md:gap-5 group">
                      <div className="flex-shrink-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 md:mb-2 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons - Both pointing to /ehr */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-[#86b83c] text-white rounded-full px-8 h-12 md:h-14 font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                  <Link to="/ehr">
                    <QrCode className="mr-2 h-5 w-5" />
                    Get Health Card
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 md:h-14 font-bold border-slate-200 text-slate-600 hover:text-accent">
                  <Link to="/ehr">
                    <FileText className="mr-2 h-5 w-5" />
                    EHR Portal
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: 3D Visual Showcase */}
          <div className="relative w-full max-w-sm md:max-w-md mx-auto mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* The Smart Card Visual */}
              <div className="relative z-20 w-full aspect-[1.6/1] bg-gradient-to-br from-slate-900 via-[#0a4a60] to-slate-900 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl border border-slate-700 md:transform md:rotate-[-2deg] flex flex-col justify-between">
                
                <div className="flex justify-between items-start w-full">
                  <img src="/zunf.png" alt="ZUNF" className="h-5 md:h-8 brightness-0 invert opacity-90" />
                  <div className="text-right">
                    <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase mb-1">Status</p>
                    <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold border border-green-500/20">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" /> Active
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end w-full">
                  <div className="max-w-[60%]">
                    <p className="text-white/50 text-[8px] md:text-xs font-medium mb-1 uppercase tracking-tight">Patient ID</p>
                    <p className="text-white/90 text-xs md:text-sm font-mono tracking-tighter mb-2 md:mb-4">ZUNF-2026-89X</p>
                    <p className="text-white text-base md:text-xl font-bold tracking-wide truncate">AHMAD RAZA</p>
                  </div>
                  
                  <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-inner flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-slate-100 rounded-md md:rounded-lg flex flex-col items-center justify-center border border-slate-200">
                      <QrCode className="h-8 w-8 md:h-12 md:w-12 text-slate-800" />
                      <span className="text-[6px] md:text-[8px] font-bold text-slate-500 mt-1 uppercase">Scan Me</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges - Repositioned for Mobile to prevent overflow */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -right-2 md:-right-6 top-0 md:top-10 z-30 bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 md:gap-3"
              >
                <div className="bg-primary/10 p-1.5 md:p-2 rounded-lg text-primary">
                  <Download className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="pr-1">
                  <p className="text-[10px] md:text-sm font-bold text-slate-800">Synced</p>
                  <p className="text-[8px] md:text-xs text-slate-500">Just now</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -left-2 md:-left-6 bottom-4 md:bottom-10 z-30 bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 md:gap-3"
              >
                <div className="bg-accent/10 p-1.5 md:p-2 rounded-lg text-accent">
                  <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-[10px] md:text-sm font-bold text-slate-800 pr-1 md:pr-2 whitespace-nowrap">Encrypted</p>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}