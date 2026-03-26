import { Link } from "react-router-dom";
import { ArrowRight, TestTube, Microscope, Activity, TicketPercent } from "lucide-react";
import { motion } from "framer-motion";

export function ChughtaiLabTests() {
  // 3 Labs ke Special Discount Offers (Voucher Data)
  const offers = [
    {
      id: "chughtai-lab",
      labName: "Chughtai Lab",
      title: "Chughtai Lab Tests",
      discountPrefix: "FLAT",
      discount: "20%",
      description: "Get a guaranteed flat 20% discount on all Chughtai Lab tests booked through us.",
      bgGradient: "bg-gradient-to-br from-[#0b96c0] to-[#065b75]", // Zunf Blue
      accentBg: "bg-[#0b96c0]",
      btnClass: "bg-[#0b96c0] hover:bg-[#087a9c]",
      icon: <TestTube className="w-24 h-24 text-white/10 absolute -right-2 -bottom-2 transform -rotate-12" />,
      link: "/lab/chughtai-lab"
    },
    {
      id: "test-zone",
      labName: "Test Zone",
      title: "Test Zone Diagnostics",
      discountPrefix: "UPTO",
      discount: "40%",
      description: "Avail up to 40% off on Test Zone's comprehensive diagnostic services.",
      bgGradient: "bg-gradient-to-br from-[#94ca43] to-[#5a8026]", // Zunf Green
      accentBg: "bg-[#86b83c]",
      btnClass: "bg-[#94ca43] hover:bg-[#86b83c]",
      icon: <Activity className="w-24 h-24 text-white/10 absolute -right-2 -bottom-2 transform rotate-12" />,
      link: "/lab/test-zone"
    },
    {
      id: "ayzal-lab",
      labName: "Ayzal Lab",
      title: "Ayzal Lab Tests",
      discountPrefix: "UPTO",
      discount: "40%",
      description: "Secure up to 40% discount on all pathology tests at Ayzal Lab.",
      bgGradient: "bg-gradient-to-br from-indigo-500 to-slate-800", // Premium Indigo
      accentBg: "bg-indigo-500",
      btnClass: "bg-indigo-500 hover:bg-indigo-600",
      icon: <Microscope className="w-24 h-24 text-white/10 absolute -right-2 -bottom-2 transform -rotate-12" />,
      link: "/lab/ayzal-lab"
    }
  ];

  return (
    <section className="relative w-full py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-orange-600 mb-4 shadow-sm"
          >
            <TicketPercent className="h-4 w-4" />
            Exclusive Deals
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Mega <span className="text-accent">Discounts</span> & Offers
          </motion.h2>
        </div>

        {/* Voucher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Main Card Container */}
              <div className="group flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-2">
                
                {/* Top Colored Banner */}
                <div className={`relative h-32 ${offer.bgGradient} p-6 overflow-hidden`}>
                  {offer.icon}
                  {/* Lab Name Badge (Glassmorphism) */}
                  <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-wider uppercase border border-white/30 shadow-sm">
                    {offer.labName}
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="relative px-6 pt-10 pb-6 flex-1">
                  
                  {/* Floating Circular Discount Badge */}
                  <div className="absolute -top-12 right-6 w-20 h-20 bg-white rounded-full p-1.5 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <div className={`w-full h-full rounded-full flex flex-col items-center justify-center ${offer.accentBg} text-white shadow-inner`}>
                      <span className="text-[9px] font-black tracking-widest leading-none mb-0.5">{offer.discountPrefix}</span>
                      <span className="text-2xl font-black leading-none">{offer.discount}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Voucher Tear Line (Perforated Line Effect) */}
                <div className="relative flex items-center px-4">
                  <div className="w-5 h-5 rounded-full bg-slate-50/50 absolute -left-2.5 shadow-inner border-r border-slate-200/60 z-10"></div>
                  <div className="w-full border-t-[2.5px] border-dashed border-slate-200"></div>
                  <div className="w-5 h-5 rounded-full bg-slate-50/50 absolute -right-2.5 shadow-inner border-l border-slate-200/60 z-10"></div>
                </div>

                {/* Action Button Area */}
                <div className="p-6">
                  <Link to={offer.link} className="block w-full">
                    <div className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-colors ${offer.btnClass}`}>
                      Claim Voucher <ArrowRight className="h-5 w-5" />
                    </div>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            to="/services/labs" 
            className="inline-flex items-center text-accent font-bold hover:text-accent/80 transition-colors text-lg"
          >
            View All Lab Offers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}