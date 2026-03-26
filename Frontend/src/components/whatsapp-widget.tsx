import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect } from "react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 3 second baad automatically popup open hoga attraction ke liye
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+923090622004"; 
  const message = "Hi Sarah, I need assistance regarding lab reports or booking.";

  const handleChatClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-dm">
      
      {/* 🚀 Premium Mini Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-80 bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header (WhatsApp Green Style but Premium) */}
            <div className="bg-[#0A1628] p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="relative">
                    <img 
                      src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" 
                      alt="Sarah" 
                      className="h-10 w-10 rounded-full object-cover border border-white/20"
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#25D366] rounded-full border-2 border-[#0A1628]"></div>
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-sm leading-tight">Sarah - Support</h4>
                    <p className="text-[#8CC63F] text-[10px] font-medium">Typically replies instantly</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                 <X className="h-5 w-5" />
               </button>
            </div>

            {/* Chat Body (WhatsApp chat background feel) */}
            <div className="p-5 bg-[#f0f2f5] flex flex-col gap-3 h-[140px] overflow-hidden relative">
               {/* Ambient pattern overlay (optional) */}
               <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]"></div>
               
               {/* Chat Bubble */}
               <motion.div 
                 initial={{ opacity: 0, x: -10 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.2 }}
                 className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 relative w-[90%] z-10"
               >
                 Hi! 👋 Welcome to ZUNF Medicare. How can I help you with your lab bookings or reports today?
                 <p className="text-[9px] text-slate-400 text-right mt-1">Just now</p>
               </motion.div>
            </div>

            {/* Footer / Action */}
            <div className="p-3 bg-white border-t border-slate-100">
               <button 
                 onClick={handleChatClick}
                 className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm transition-colors shadow-md shadow-[#25D366]/20"
               >
                 <MessageCircle className="h-4 w-4" />
                 Start WhatsApp Chat
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Main Avatar Floating Button */}
      <div 
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Pulsing Green Glow */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-16 w-16 bg-white rounded-full p-1 shadow-2xl border border-slate-100 flex items-center justify-center"
        >
          {/* Avatar Image */}
          <img 
            src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" 
            alt="Support" 
            className="h-full w-full rounded-full object-cover object-top"
          />
          
          {/* Official WhatsApp Badge */}
          <div className="absolute -bottom-1 -right-1 bg-[#25D366] p-1.5 rounded-full border-2 border-white shadow-sm">
             <MessageCircle className="h-4 w-4 text-white fill-current" />
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}