import { Button } from "@/components/custom";
import { FlippingText } from "@/components/ui/flipping-text";
import { Input } from "@/components/ui/input";
import { labs } from "@/data/labs";
import { ArrowRight, CheckCircle, Search, Sparkles, TestTube, Loader2, Wallet, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchLabsAndTests, type SearchResult } from "@/lib/search";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// Map lab IDs to their logo files
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

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchLabsAndTests(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
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
    <section className="relative w-full pt-0 pb-16 md:pt-14 md:pb-24 min-h-screen flex overflow-hidden">
      {/* Search Bar with Filter - Center Top - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4">
        <div className="flex items-center gap-2" ref={searchRef}>
          <div className="relative group flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-primary z-10" />
              <Input
                type="search"
                placeholder="Search for labs, tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="pl-12 pr-4 h-12 bg-white/15 backdrop-blur-md border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white/20 transition-all duration-300 w-full text-base shadow-lg shadow-primary/10"
              />
              {isSearching && (
                <Loader2 className="absolute right-4 h-5 w-5 text-primary animate-spin" />
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto bg-background/95 backdrop-blur-md border border-border/40 shadow-xl z-50">
                <div className="p-2">
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.labId}-${result.testId || index}`}
                      to={result.type === 'lab' ? `/lab/${result.labId}` : `/lab/${result.labId}`}
                      onClick={handleResultClick}
                      className="block p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white flex-shrink-0 overflow-hidden">
                          {result.type === 'lab' && getLabLogo(result.labId) ? (
                            <img
                              src={getLabLogo(result.labId)!}
                              alt={result.labName}
                              width={32}
                              height={32}
                              className="object-contain p-0.5"
                            />
                          ) : result.type === 'lab' ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <TestTube className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Search className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {result.type === 'lab' ? result.labName : result.testName}
                          </p>
                          {result.type === 'test' && (
                            <>
                              <p className="text-xs text-muted-foreground truncate">
                                {result.labName}
                              </p>
                              {result.price && (
                                <p className="text-xs text-primary font-medium mt-1">
                                  Rs. {result.discountedPrice && result.discountedPrice < result.price
                                    ? result.discountedPrice
                                    : result.price}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.jpg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div
        className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none z-0"
        aria-hidden
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto flex flex-col items-center justify-center max-w-[1400px] gap-8 px-4 sm:gap-10 md:px-6 mt-0 md:mt-20 sm:mt-24 z-10 w-full">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-base font-medium text-primary ring-1 ring-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              Har Qadam pe Aapkay Sath!!
            </span>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <h1
              className="text-balance text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight xl:leading-[1.1]"
            >
              Healthcare at Your Home, {" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>
            <p
              className="max-w-2xl mx-auto text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
            >
              ZUNF MEDICARE: Pakistan’s trusted partner for preventive healthcare. Empowering schools, workplaces, and families with home diagnostics, consultancy, and patient care.
            </p>

            <div className="flex justify-center">
              <FlippingText
                phrases={[
                  "Trusted Lab Tests, Wherever You Are",
                  "Accurate Results, Right from Home",
                  "Modern Diagnostics Made Convenient"
                ]}
                className="text-lg md:text-xl font-medium text-primary justify-center"
              />
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <Link to="/booking">
                <span className="flex justify-center items-center">
                  Book a service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mt-8 w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              {
                label: "Affordable",
                desc: "Cost-effective solutions",
                icon: <Wallet className="h-6 w-6 text-primary" />
              },
              {
                label: "Easily Accessible",
                desc: "Available everywhere",
                icon: <MapPin className="h-6 w-6 text-primary" />
              },
              {
                label: "Convenient",
                desc: "Hassle-free service",
                icon: <Clock className="h-6 w-6 text-primary" />
              },
            ].map((item, index) => (
              <li
                key={item.label}
                className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg text-foreground">
                    {item.label}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div className="w-[500px] h-[500px] border border-primary/10 rounded-full animate-ping-slow opacity-30" />
          <div className="absolute w-[700px] h-[700px] border border-accent/10 rounded-full animate-pulse-ring opacity-20" />
        </div>
      </div>
    </section>
  );
}
