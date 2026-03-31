import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { HealthCardBenefits } from "@/components/sections/health-card-benefits";
import { PartneredLabs } from "@/components/sections/partnered-labs";
import { Packages } from "@/components/sections/packages";
import { ChughtaiLabTests } from "@/components/sections/chughtai-lab-tests";
import { Team } from "@/components/sections/team";
import { Footer } from "@/components/sections/footer";
import { useEffect, useState } from "react";
import { SEO } from "@/components/seo";
import { Link } from "react-router-dom";
import { Bot, ArrowRight, Activity, FileText, Calendar } from "lucide-react"; // ✅ Calendar import kiya
import { Button } from "@/components/custom";
import { motion } from "framer-motion";
import { AdvisoryPanel } from "@/components/sections/advisory-panel"; 
import { Clients } from "@/components/sections/clients"; 
import { FaqSection } from "@/components/sections/faq";
import { PopularSearches } from "@/components/sections/popular-searches";
import { getBlogs, type BlogPost } from "@/lib/api"; // ✅ Blogs API import ki

function ZunfAiBanner() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Compact Container */}
        {/* ✅ FIX: Mobile par height auto kar di taake picture theek aaye */}
        <div className="bg-slate-900 rounded-[2rem] h-auto min-h-[400px] md:h-[300px] flex flex-col md:flex-row items-center relative shadow-2xl border border-slate-800 overflow-hidden">
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />

          {/* Content Area */}
          <div className="w-full md:w-[60%] p-6 md:p-10 z-30 text-center md:text-left relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[10px] font-bold text-white mb-4 backdrop-blur-md">
              <Bot className="h-3 w-3 text-primary" />
              ZUNF AI Medical Assistant
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              Your Personal <span className="text-primary">AI Doctor</span> <br className="hidden md:block" /> is Online 24/7
            </h2>
            
            <p className="text-sm md:text-base text-slate-400 mb-6 max-w-md mx-auto md:mx-0 font-light">
              Describe symptoms, get test suggestions, and analyze reports instantly.
            </p>
            
            <Button asChild size="default" className="bg-primary hover:bg-[#86b83c] text-white rounded-full px-6 h-11 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <Link to="/chat">
                Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right Visual Area - Doctor Image */}
          {/* ✅ FIX: Mobile par ye absolute nahi rahega, balke proper flow me aayega */}
          <div className="relative w-full h-[250px] md:absolute md:right-0 md:bottom-0 md:w-[45%] md:h-[120%] z-20 flex items-end justify-center pointer-events-none">
            <img 
              src="/robot-doctor.png" // Yaad se isko apni image ka sahi naam dein (e.g. "/Dr. Shaharyar.jpeg")
              alt="AI Doctor" 
              // ✅ FIX: Object-contain kiya hai taake kategi nahi, aur height handle ki hai
              className="h-full w-auto object-contain object-bottom drop-shadow-[-20px_0_50px_rgba(148,202,67,0.2)]"
              onLoad={() => console.log("Robot Doctor is now active!")}
              onError={(e) => {
                // Fallback in case of emergency
                e.currentTarget.src = "https://cdn3d.iconscout.com/3d/premium/thumb/robot-doctor-5691456-4740702.png";
              }}
            />

            {/* Floating Info Bubbles (Hidden on very small screens to avoid clutter) */}
            <div className="hidden sm:block absolute top-10 left-4 md:top-16 md:left-0 space-y-4">
              <motion.div 
                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl w-40 md:w-44"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-3 w-3 text-primary" />
                  <span className="text-white font-bold text-[10px]">Report Analysis</span>
                </div>
                <p className="text-slate-300 text-[9px] leading-tight">I've scanned your reports. Everything looks perfect.</p>
              </motion.div>

              <motion.div 
                animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl w-40 md:w-44 ml-4 md:ml-10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-3 w-3 text-accent" />
                  <span className="text-white font-bold text-[10px]">Symptom Checker</span>
                </div>
                <p className="text-slate-300 text-[9px] leading-tight">Describe how you feel, I'll suggest the tests.</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // ✅ STATE FOR BLOGS
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    document.title = "ZUNF Medicare | Pakistan's Trusted Healthcare Portal";

    // ✅ FETCH LATEST 3 BLOGS ON MOUNT
    const fetchLatestBlogs = async () => {
      try {
        const data = await getBlogs();
        setLatestBlogs(data.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch blogs for homepage", error);
      }
    };
    fetchLatestBlogs();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <SEO
        title="Book Lab Tests Online & Diagnostic Services | Zunf Medicare"
        description="Find trusted diagnostic labs across Pakistan and book lab tests online with confidence. Reliable and convenient services by Zunf Medicare."
      />
      <SiteHeader />
      
      <main className="flex-1">
        <Hero />
        <PartneredLabs />
        <ChughtaiLabTests />
        <HealthCardBenefits />
        <Packages />
        <ZunfAiBanner />
        <AdvisoryPanel />
        <Clients /> 
        <Team />

        {/* 📝 LATEST BLOGS SECTION */}
        {latestBlogs.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-syne mb-4">
                    Latest Health & Medical Insights
                  </h2>
                  <p className="text-lg text-slate-600">
                    Stay informed with expert articles, health tips, and the latest news from ZUNF Medicare.
                  </p>
                </div>
                <Link 
                  to="/blogs" 
                  className="inline-flex items-center gap-2 text-[#8CC63F] font-bold hover:text-[#7ab332] transition-colors whitespace-nowrap"
                >
                  View All Articles <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs.map((blog) => (
                  <Link to={`/blog/${blog.slug}`} key={blog._id} className="group h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                    <div className="h-52 w-full overflow-hidden relative">
                      {blog.coverImage ? (
                        <img 
                          src={blog.coverImage} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8CC63F]/20 to-[#00AEEF]/20 flex items-center justify-center">
                          <span className="font-syne text-2xl text-slate-400 font-bold">ZUNF</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
                        <Calendar className="h-3.5 w-3.5 text-[#8CC63F]" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#00AEEF] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto flex items-center text-sm font-bold text-[#8CC63F] group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FaqSection />
        <PopularSearches />
      </main>
      
      <Footer />
    </div>
  );
}