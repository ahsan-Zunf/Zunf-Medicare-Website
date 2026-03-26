import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, Phone, Camera, Stethoscope, ShieldCheck, Clock, Award, Users, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SEO } from "@/components/seo";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    url: `/gallery/a${i + 1}.jpeg`,
    title: `Medical Camp Action ${i + 1}`,
    description: "ZUNF Medicare in the field providing quality diagnostic services."
}));

const doctors = [
    { name: "Dr. Shaharyar", role: "Head of Doctors", image: "/Dr. Shaharyar.jpeg" },
    { name: "Dr. Ammar Zafar", role: "Consultant Physician", image: "/ammar.jpeg" },
    { name: "Dr. Awais Sikandar", role: "Medical Specialist", image: "/awais.jpeg" },
    { name: "Dr. Muntazir Omar Malik", role: "Clinical Expert", image: "/muntazir.jpeg" }
];

const faqs = [
    { question: "What is ZUNF Medicare's primary mission?", answer: "Our mission is to digitize and simplify healthcare across Pakistan by providing easy lab bookings, secure Electronic Health Records (EHR), and reliable home sampling services." },
    { question: "How do you ensure the accuracy of lab tests?", answer: "We partner only with globally certified and top-tier laboratories (like Chughtai, Dr. Essa, etc.) to guarantee 100% authentic and accurate test results." },
    { question: "Can I organize a medical camp for my company?", answer: "Absolutely! We specialize in corporate and school health screenings. You can contact us to set up a comprehensive medical camp at your premises." },
    { question: "Are my medical records safe with ZUNF?", answer: "Yes, security is our top priority. Your EHR Vault is fully encrypted, and only you or the doctors you share your Master QR with can access your records." }
];

const keywords = "Zunf Medicare, Best Diagnostic Labs in Pakistan, Online Lab Test Booking, Home Blood Collection, Electronic Health Records Pakistan, Corporate Medical Camps, Full Body Checkup, Chughtai Lab Tests, Dr Essa Lab Near Me, Authentic Medical Reports, Health Passport, Smart EHR Vault, Affordable Lab Packages.";

export default function AboutPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-dvh flex-col bg-slate-50 font-dm">
            <SEO
                title="About Zunf Medicare | Trusted Healthcare Services"
                description="Learn about Zunf Medicare, a trusted healthcare provider offering quality medical services, diagnostic labs, and patient-focused solutions."
            />
            <SiteHeader />
            
            <main className="flex-1">
                
                {/* 🌟 1. HERO SECTION (COMPACT & BRAND ACCURATE) */}
                <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-[#0A1628] text-white border-b border-slate-800">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img src="/gallery/a1.jpeg" alt="About Zunf" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 via-[#0A1628]/60 to-[#0A1628]" />
                    </div>
                    
                    {/* Glowing Orbs - Green & Blue Branding */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8CC63F]/15 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00AEEF]/15 rounded-full blur-[100px] pointer-events-none" />

                    <div className="container relative z-10 mx-auto px-4 max-w-7xl text-center md:text-left">
                        <div className="max-w-3xl mx-auto md:mx-0">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] sm:text-xs font-bold mb-4 border border-white/20 backdrop-blur-md">
                                    <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-[#8CC63F]" /> 
                                    Trusted Healthcare Partner
                                </div>
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight font-syne leading-[1.1]">
                                    Empowering Health Through <span className="text-[#8CC63F]">Innovation</span> & <span className="text-[#00AEEF]">Care</span>
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 leading-relaxed font-light">
                                    ZUNF Medicare brings world-class diagnostic services directly to you. From individual EHR vaults to large-scale medical camps, we ensure quality care is accessible to everyone.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                    <Link to="/contact" className="w-full sm:w-auto">
                                        <Button size="lg" className="w-full bg-[#8CC63F] hover:bg-[#7ab332] text-white rounded-xl h-12 md:h-14 px-8 font-bold shadow-[0_6px_20px_rgba(140,198,63,0.3)] transition-all hover:-translate-y-1">
                                            Get in Touch
                                            <MoveRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link to="/services/labs" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full border-white/30 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 md:h-14 px-8 font-bold backdrop-blur-sm transition-all hover:-translate-y-1">
                                            Explore Services
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 🌟 2. CORE VALUES SECTION */}
                <section className="py-16 bg-white border-b border-slate-100">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Award, title: "Certified Excellence", desc: "Strictly partnered with accredited labs to ensure 100% authentic results.", color: "#8CC63F" },
                                { icon: Clock, title: "Time-Saving Care", desc: "Enjoy home sample collection and instant digital report delivery.", color: "#00AEEF" },
                                { icon: ShieldCheck, title: "Data Security", desc: "Highly encrypted EHR vault. You control exactly who sees your history.", color: "#8CC63F" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${item.color}15` }}>
                                        <item.icon className="h-6 w-6" style={{ color: item.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-syne">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🌟 3. MEDICAL EXPERTS (MAGIC POSITIONS APPLIED) */}
                <section className="py-20 bg-slate-50 border-b border-slate-100">
                    <div className="container mx-auto px-4 max-w-7xl relative">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-bold mb-4 border border-[#00AEEF]/20">
                                <Stethoscope className="h-4 w-4" /> Expert Panel
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 font-syne">
                                Meet Our <span className="text-[#00AEEF]">Medical Team</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {doctors.map((doctor, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                    key={index}
                                    className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* MAGIC POSITIONING: object-[50%_15%] sets alignment for both standing and sitting doctors */}
                                    <div className="relative w-full h-[320px] bg-slate-200 overflow-hidden">
                                        <img 
                                            src={doctor.image} 
                                            alt={doctor.name} 
                                            className="w-full h-full object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x500/f8fafc/8CC63F?text=Photo+Missing"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                                        
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white font-syne mb-0.5">{doctor.name}</h3>
                                            <p className="text-[10px] font-bold text-[#8CC63F] uppercase tracking-widest">{doctor.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🌟 4. GALLERY SECTION */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8CC63F]/10 text-[#8CC63F] text-xs font-bold mb-4 border border-[#8CC63F]/20">
                                <Camera className="h-4 w-4" /> In Action
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 font-syne">
                                Our <span className="text-[#8CC63F]">Medical Camps</span>
                            </h2>
                        </div>

                        <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl aspect-video mb-10 border-4 sm:border-8 border-white bg-[#0A1628]">
                            {galleryImages.map((img, idx) => (
                                <div key={img.id} className={cn("absolute inset-0 transition-opacity duration-1000", idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0")}>
                                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                                        <h3 className="text-xl md:text-3xl font-bold text-white mb-2 font-syne">{img.title}</h3>
                                        <p className="text-white/80 text-xs md:text-sm max-w-2xl">{img.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
                            {galleryImages.slice(0, 6).map((img, idx) => (
                                <button key={img.id} onClick={() => setCurrentSlide(idx)} className={cn("relative aspect-square rounded-xl overflow-hidden transition-all duration-300 shadow-sm", idx === currentSlide ? "ring-2 ring-[#8CC63F] ring-offset-2 scale-105 opacity-100" : "opacity-60 hover:opacity-100")}>
                                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🌟 5. FAQS SECTION */}
                <section className="py-20 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-slate-900 font-syne">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                                    >
                                        <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.question}</span>
                                        <ChevronDown className={`h-5 w-5 text-[#00AEEF] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                <div className="px-6 pb-5 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-50 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🌟 6. CALL TO ACTION SECTION */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <Card className="bg-[#0A1628] text-white p-10 md:p-16 rounded-[3rem] overflow-hidden relative shadow-2xl border border-[#8CC63F]/20">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#8CC63F]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00AEEF]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
                            
                            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 mb-6">
                                    <Users className="h-8 w-8 text-[#8CC63F]" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight font-syne leading-tight">
                                    Need a Medical Camp at <span className="text-[#8CC63F]">Your Premises?</span>
                                </h2>
                                <p className="text-slate-300 mb-10 text-base md:text-lg font-light leading-relaxed">
                                    We organize comprehensive health screenings for schools, corporations, and communities. Build a healthier future with ZUNF.
                                </p>
                                <Link to="/contact">
                                    <Button size="lg" className="bg-[#8CC63F] text-white hover:bg-[#7ab332] transition-all shadow-lg rounded-full px-10 h-14 font-bold text-base hover:scale-105">
                                        <Phone className="mr-2 h-5 w-5" /> Contact Us Today
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* 🌟 7. SEO KEYWORDS SECTION */}
                <section className="py-10 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-6xl text-center">
                        <p className="text-[10px] text-slate-400 font-medium leading-loose">
                            <strong className="text-slate-500">Popular Searches: </strong> {keywords}
                        </p>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}