import { Button } from "@/components/custom";
import { Input } from "@/components/ui/input";
import { Search, Loader2, TestTube, ArrowRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchLabsAndTests, type SearchResult } from "@/lib/search";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Helper for logos
const getLabLogo = (labId: string): string | null => {
  const logoMap: Record<string, string> = {
    "chughtai-lab": "/chughtai.jpeg",
    "dr-essa-lab": "/drEssa.jpeg",
    "test-zone": "/testzone.jpeg",
    "biotech-lahore": "/biotech.jpeg",
    "ayzal-lab": "/ayzal.jpeg",
    "jinnah-mri": "/jinnahMRI.jpeg",
    "esthetique-canon": "/esthetic.jpeg",
  };
  return logoMap[labId] || null;
};

// Premium Slider Data
const heroSlides = [
  {
    id: 1,
    title: "Pakistan's All Top Laboratories",
    subtitle: "Get up to 40% OFF. Book tests from leading diagnostic centers from the comfort of your home.",
    bgClass: "from-[#0f172a] via-[#1e3a8a] to-[#0f172a]", // Deep Royal Blue
    badges: ["TestZone 40% OFF", "Ayzal 40% OFF", "Dr. Essa 40% OFF", "Chughtai 20% OFF"],
    buttonText: "Book a Lab Test",
    link: "/services/labs"
  },
  {
    id: 2,
    title: "Your Smart Health Record",
    subtitle: "Create a free account to maintain your medical history, reports, and prescriptions securely.",
    bgClass: "from-[#022c22] via-[#065f46] to-[#022c22]", // Deep Emerald Green
    badges: ["Free Account", "Secure Data", "Family Profiles"],
    buttonText: "Create Free Account",
    link: "/signup"
  },
  {
    id: 3,
    title: "Corporate & School Screenings",
    subtitle: "Comprehensive preventive health screening programs tailored for your employees and students.",
    bgClass: "from-[#171717] via-[#334155] to-[#171717]", // Deep Slate/Charcoal
    badges: ["Annual Checkups", "On-site Sampling", "Detailed Reports"],
    buttonText: "Explore Programs",
    link: "/services/corporate-health-screening"
  }
];

export function Hero() {
  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Slider States
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle outside click for search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    if (showResults) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showResults]);

  // Auto Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  // Perform Universal Search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      setIsSearching(true);
      try {
        // Now it searches everything without any category filters
        const results = await searchLabsAndTests(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };
    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <section className="relative w-full bg-slate-50 flex flex-col items-center">
      
      {/* 1. DARK PREMIUM BACKGROUND AREA */}
      {/* Adjusted heights and paddings to fix the white gap issue */}
      <div className="relative w-full pt-20 pb-28 md:pt-28 md:pb-36 flex flex-col items-center justify-center overflow-hidden z-0 min-h-[60vh] md:min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgClass}`}
          >
            {/* Subtle Tech/Medical Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              {/* Badges - Compact for Mobile */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl">
                {heroSlides[currentSlide].badges.map((badge, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide text-white/90 shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Headings */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-md px-2">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl px-4 font-light">
                {heroSlides[currentSlide].subtitle}
              </p>

              {/* Action Button */}
              <Button asChild size="lg" className="bg-primary hover:bg-[#86b83c] text-white rounded-full px-8 h-12 md:h-14 font-bold text-base shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                <Link to={heroSlides[currentSlide].link}>
                  {heroSlides[currentSlide].buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Elegant Dot Pagination */}
          <div className="absolute -bottom-16 flex gap-2 justify-center w-full">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. OVERLAPPING UNIVERSAL SEARCH BAR */}
      {/* Perfect Overlap: -mt-10 pulls it up exactly over the border without leaving a white void below */}
      <div className="relative z-30 w-full max-w-4xl px-4 sm:px-6 -mt-12 md:-mt-10 mb-16">
        <div 
          className="w-full"
          ref={searchRef}
        >
          {/* Main Search Container - Clean, Universal, No Categories */}
          <div className="bg-white rounded-3xl md:rounded-full shadow-2xl p-2.5 md:p-2 border border-slate-100 flex flex-col md:flex-row items-center gap-2">
            
            {/* Search Input Area */}
            <div className="relative flex-1 w-full h-12 md:h-14 flex items-center">
              <Search className="absolute left-5 h-6 w-6 text-slate-400" />
              <Input
                type="search"
                placeholder="Search for any lab, test, or service (e.g. MRI, Full Body...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="pl-14 pr-12 h-full w-full border-none bg-transparent shadow-none text-base md:text-lg focus-visible:ring-0 placeholder:text-slate-400"
              />
              {isSearching && (
                <Loader2 className="absolute right-4 h-5 w-5 text-accent animate-spin" />
              )}
            </div>

            {/* Search Button */}
            <Button className="w-full md:w-auto h-12 md:h-14 px-10 rounded-2xl md:rounded-full bg-accent hover:bg-[#097b9e] text-white font-bold text-base shadow-md flex-shrink-0">
              Search
            </Button>
          </div>

          {/* New Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs sm:text-sm text-slate-500">
            <span className="font-medium text-slate-700">Popular:</span>
            {['MRI Scan', 'Full Body Profile', 'Dengue Test', 'Home Sampling', 'Dentistry'].map((tag) => (
              <button key={tag} onClick={() => setSearchQuery(tag)} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-accent hover:text-accent transition-colors shadow-sm">
                {tag}
              </button>
            ))}
          </div>

          {/* Auto-Suggest Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-[85px] md:top-[75px] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[400px] overflow-y-auto z-50">
              <div className="p-2">
                {searchResults.map((result, index) => (
                  <Link
                    key={`${result.type}-${result.labId}-${result.testId || index}`}
                    to={`/lab/${result.labId}`}
                    onClick={handleResultClick}
                    className="block p-3 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white flex-shrink-0 shadow-sm overflow-hidden p-1">
                        {result.type === 'lab' && getLabLogo(result.labId) ? (
                          <img src={getLabLogo(result.labId)!} alt={result.labName} className="w-full h-full object-contain" />
                        ) : result.type === 'lab' ? (
                          <Activity className="h-6 w-6 text-accent" />
                        ) : (
                          <TestTube className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${result.type === 'lab' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                            {result.type}
                          </span>
                          <p className="font-bold text-slate-800 text-sm md:text-base truncate">
                            {result.type === 'lab' ? result.labName : result.testName}
                          </p>
                        </div>
                        {result.type === 'test' && (
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-slate-500 truncate">{result.labName}</p>
                            {(result.price || result.discountedPrice) && (
                              <p className="text-xs text-primary font-bold whitespace-nowrap ml-2 bg-primary/5 px-2 py-1 rounded-md">
                                Rs. {result.discountedPrice && result.discountedPrice < (result.price || 0) ? result.discountedPrice : result.price}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}