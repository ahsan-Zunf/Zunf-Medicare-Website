import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How can I book a lab test online?",
    answer: "Booking a test is easy! Just search for your required test or lab, add it to your cart, select a date and time, and confirm your booking. You will receive an SMS confirmation instantly."
  },
  {
    question: "Are the test prices same as the laboratory?",
    answer: "Yes, our prices are exactly the same as the lab's official rates. In fact, we often provide exclusive discounts and promotional offers that make it cheaper to book through Zunf Medicare."
  },
  {
    question: "How will I receive my test reports?",
    answer: "Once your reports are ready, they will be automatically uploaded to your Zunf EHR Vault. You can log in anytime to view, download, or share your reports with your doctor via QR code."
  },
  {
    question: "Do you offer home sampling services?",
    answer: "Yes! Many of our partnered labs offer free home blood sample collection. You can select the 'Home Sampling' option during the checkout process."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden border-t border-slate-100">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Animated Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4"
          >
            <MessageCircleQuestion className="h-4 w-4" />
            Got Questions?
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Everything you need to know about booking tests, accessing reports, and utilizing our healthcare services.
          </motion.p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/40 shadow-lg shadow-primary/5 ring-4 ring-primary/5"
                    : "border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30"
                }`}
              >
                <button
                  className="w-full px-5 py-5 sm:px-6 sm:py-6 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold text-base md:text-lg transition-colors duration-300 pr-4 ${
                      isOpen ? "text-primary" : "text-slate-800 group-hover:text-primary"
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Beautiful Circle Icon Container */}
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}