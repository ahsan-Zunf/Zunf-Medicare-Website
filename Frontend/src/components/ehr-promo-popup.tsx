import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, QrCode, FileText, ArrowRight, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EhrPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🕒 Delay Logic: Har dafa page refresh hone par theek 2.5 seconds baad open hoga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500); 
    
    // Cleanup timer agar component unmount ho jaye
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExploreClick = () => {
    handleClose();
    navigate("/ehr");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-dm">
          
          {/* 🌌 Dark Blurred Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0A1628]/70 backdrop-blur-md"
          />

          {/* 💎 Premium Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden z-10 flex flex-col border border-white/20"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            {/* 🌟 Top Banner Area (Interactive Floating Visual) */}
            <div className="relative pt-12 pb-10 px-6 bg-gradient-to-br from-[#0A1628] via-[#0f2442] to-[#0A1628] text-center overflow-hidden">
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#8CC63F]/20 rounded-full blur-[50px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00AEEF]/20 rounded-full blur-[50px]" />
              
              {/* Animated Mini Health Card (Floating) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative z-10 mx-auto w-36 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex items-center p-4 mb-6"
              >
                <div className="flex-1 text-left">
                  <div className="w-6 h-6 bg-[#8CC63F]/20 rounded-full flex items-center justify-center mb-2">
                     <Activity className="h-3 w-3 text-[#8CC63F]" />
                  </div>
                  <div className="w-14 h-1.5 bg-white/40 rounded-full mb-1.5"></div>
                  <div className="w-8 h-1 bg-white/20 rounded-full"></div>
                </div>
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  <QrCode className="text-[#0A1628] w-7 h-7" />
                </div>
              </motion.div>

              <h2 className="relative z-10 text-2xl md:text-3xl font-extrabold text-white font-syne tracking-tight leading-tight">
                Your Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] to-[#5a9c1e]">Health Passport</span>
              </h2>
            </div>

            {/* 📝 Content Area */}
            <div className="p-6 md:p-8 bg-white">
              <p className="text-slate-500 text-center mb-6 text-sm leading-relaxed">
                Introducing <strong>My Reports (EHR)</strong>. Store, manage, and share your medical history securely from your phone.
              </p>

              {/* Styled Feature List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors p-3.5 rounded-2xl border border-slate-100 group">
                  <div className="bg-white shadow-sm p-2.5 rounded-xl text-[#00AEEF] group-hover:scale-110 transition-transform">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Digitize Records</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Keep all past reports in one place.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors p-3.5 rounded-2xl border border-slate-100 group">
                  <div className="bg-white shadow-sm p-2.5 rounded-xl text-[#8CC63F] group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">100% Secure</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Encrypted vault only accessible by you.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleExploreClick}
                  className="w-full relative overflow-hidden group bg-[#8CC63F] text-white rounded-2xl h-14 font-bold shadow-[0_10px_20px_rgba(140,198,63,0.3)] transition-all flex items-center justify-center gap-2 text-base hover:-translate-y-1"
                >
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  Explore My Reports <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleClose}
                  className="w-full text-slate-400 hover:text-slate-600 rounded-xl h-10 font-semibold transition-all text-sm underline-offset-4 hover:underline"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}