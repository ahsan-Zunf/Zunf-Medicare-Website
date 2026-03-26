import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/custom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ChevronDown, Heart, GraduationCap, Briefcase, TestTube, CreditCard, History, Search, Loader2, FileText, Home, Menu, X, ArrowLeft, LogOut, Users, Activity } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect, useRef } from "react";
import { searchLabsAndTests, type SearchResult } from "@/lib/search";
import { motion, AnimatePresence } from "framer-motion";

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

export function SiteHeader() {
  const { getItemCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const itemCount = getItemCount();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Universal Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Active Link Checker
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      const isDesktopClick = desktopDropdownRef.current?.contains(target);
      const isMobileClick = mobileDropdownRef.current?.contains(target);
      if (!isDesktopClick && !isMobileClick) setIsServicesOpen(false);

      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchResults(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setShowSearchResults(false);
      }

      const isHamburgerClick = (target as HTMLElement).closest('[data-hamburger-button]') !== null;
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target) && !isHamburgerClick) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, showSearchResults]);

  // Perform Live Search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchLabsAndTests(searchQuery);
        setSearchResults(results || []);
        setShowSearchResults(true);
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

  const handleSearchResultClick = (url: string) => {
    setShowSearchResults(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    navigate(url);
  };

  // 🔍 Reusable Search Results Dropdown Component
  const SearchResultsDropdown = () => (
    <AnimatePresence>
      {showSearchResults && searchQuery.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[110] max-h-[300px] overflow-y-auto"
        >
          {isSearching ? (
             <div className="flex items-center justify-center p-6 text-slate-400">
               <Loader2 className="h-6 w-6 animate-spin text-[#8CC63F]" />
             </div>
          ) : searchResults.length > 0 ? (
             <div className="flex flex-col p-2 gap-1">
               {searchResults.map((res: any, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => handleSearchResultClick(res.url || `/search?q=${res.name}`)}
                   className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors text-left"
                 >
                   <div className="flex items-center gap-3">
                     {res.type === 'Lab' && getLabLogo(res.id) && (
                       <img src={getLabLogo(res.id)!} alt={res.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                     )}
                     <div>
                       <p className="text-sm font-bold text-slate-800">{res.name || res.title}</p>
                       <p className="text-[10px] text-slate-400 uppercase tracking-wider">{res.type || 'Result'}</p>
                     </div>
                   </div>
                   <ArrowLeft className="h-4 w-4 text-slate-300 rotate-135" />
                 </button>
               ))}
             </div>
          ) : (
             <div className="p-6 text-center text-sm text-slate-500 font-medium">
               No results found for "{searchQuery}"
             </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="sticky top-0 z-[100] h-[72px] bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
        <div className="mx-auto flex h-full w-full items-center gap-4 px-4 sm:px-6 max-w-7xl relative">
          
          {!isHomePage && (
            <Link to="/" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-[#8CC63F] hover:border-[#8CC63F]/30 hover:bg-[#8CC63F]/5 transition-all flex-shrink-0" aria-label="Back to Home">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}

          <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-2 md:mr-4">
            <img src="/zunf.png" height={24} width={110} alt="ZUNF logo" className="object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-2 xl:gap-4">
            <Link to="/" className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all ${isActive('/') ? 'bg-[#8CC63F] text-white shadow-sm' : 'text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F]'}`}><Home className="h-4 w-4" /> Home</Link>
            <Link to="/services/labs" className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all ${isActive('/services/labs') ? 'bg-[#8CC63F] text-white shadow-sm' : 'text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F]'}`}><TestTube className="h-4 w-4" /> Labs</Link>
            <Link to="/ehr" className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/ehr') ? 'bg-[#8CC63F] text-white shadow-[0_4px_10px_rgba(140,198,63,0.3)] hover:-translate-y-0.5' : 'text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F]'}`}><FileText className="h-4 w-4" /> My Reports</Link>
            <Link to="/about" className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all ${isActive('/about') ? 'bg-[#8CC63F] text-white shadow-sm' : 'text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F]'}`}><Users className="h-4 w-4" /> About Us</Link>
            
            <div ref={desktopDropdownRef} className="relative z-[100]">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-bold transition-all ${isServicesOpen || (location.pathname.includes('/services') && !location.pathname.includes('/labs')) ? 'bg-[#8CC63F] text-white shadow-sm' : 'text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F]'}`}>
                Services <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 rounded-xl bg-white border border-slate-100 shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    <Link to="/services/health-program" className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F] rounded-lg transition-colors" onClick={() => setIsServicesOpen(false)}><div className="bg-[#8CC63F]/10 p-1.5 rounded-md text-[#8CC63F]"><Heart className="h-4 w-4" /></div><span className="font-medium">Health Program</span></Link>
                    <Link to="/services/school-health-program" className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F] rounded-lg transition-colors" onClick={() => setIsServicesOpen(false)}><div className="bg-[#8CC63F]/10 p-1.5 rounded-md text-[#8CC63F]"><GraduationCap className="h-4 w-4" /></div><span className="font-medium">School Program</span></Link>
                    <Link to="/services/corporate-health-screening" className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F] rounded-lg transition-colors" onClick={() => setIsServicesOpen(false)}><div className="bg-[#8CC63F]/10 p-1.5 rounded-md text-[#8CC63F]"><Briefcase className="h-4 w-4" /></div><span className="font-medium">Corporate Screening</span></Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="ml-auto hidden lg:flex items-center gap-3 flex-shrink-0">
            <div className="relative w-48 xl:w-64" ref={searchRef}>
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search labs, tests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => { if (searchQuery) setShowSearchResults(true); }} className="w-full h-10 pl-9 pr-4 rounded-full bg-slate-100 border border-transparent focus:bg-white focus:border-[#8CC63F] focus:ring-4 focus:ring-[#8CC63F]/10 transition-all text-sm outline-none text-slate-700 font-medium" />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); setShowSearchResults(false); }} className="absolute right-3 text-slate-400 hover:text-slate-600"><X className="h-3.5 w-3.5" /></button>
                )}
              </div>
              <SearchResultsDropdown />
            </div>

            {isAuthenticated ? (
              <Link to="/account"><Button size="sm" variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:text-[#8CC63F] hover:bg-[#8CC63F]/10 hover:border-[#8CC63F]/30 transition-all flex items-center gap-2"><Users className="h-4 w-4" /></Button></Link>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost" className="text-slate-600 hover:text-[#8CC63F] hover:bg-[#8CC63F]/10 rounded-full font-bold"><Link to="/login">Login</Link></Button>
                <Button asChild size="sm" variant="outline" className="rounded-full border-[#8CC63F]/30 text-[#8CC63F] hover:bg-[#8CC63F] hover:text-white transition-all font-bold"><Link to="/signup">Sign Up</Link></Button>
              </>
            )}
            
            <Link to="/cart">
              <Button size="sm" variant="outline" className="relative rounded-full border-slate-200 text-slate-600 hover:text-[#8CC63F] hover:bg-[#8CC63F]/10 hover:border-[#8CC63F]/30 transition-all">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#8CC63F] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">{itemCount}</span>}
              </Button>
            </Link>
          </div>

          {/* Mobile Right Side Actions */}
          <div className="ml-auto flex lg:hidden items-center gap-2 flex-shrink-0">
            <Link to="/cart">
              <Button size="sm" variant="outline" className="relative h-9 w-9 p-0 rounded-full border-slate-200 text-slate-600 hover:text-[#8CC63F] hover:bg-[#8CC63F]/10">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#8CC63F] text-white text-[10px] font-bold flex items-center justify-center">{itemCount}</span>}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <Link to="/account"><Button size="sm" variant="outline" className="h-9 w-9 p-0 rounded-full border-slate-200 text-slate-600 hover:text-[#8CC63F] hover:bg-[#8CC63F]/10"><Users className="h-4 w-4" /></Button></Link>
            ) : (
              <Button asChild size="sm" variant="outline" className="h-9 px-3 text-xs rounded-full border-[#8CC63F]/30 text-[#8CC63F] font-bold"><Link to="/login">Login</Link></Button>
            )}
            
            <Button ref={hamburgerButtonRef} data-hamburger-button onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen); }} size="sm" variant="ghost" className="h-9 w-9 p-0 rounded-full text-slate-600 hover:bg-slate-100" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* 📱 Mobile Menu Dropdown (Added absolute top-full to snap right below header) */}
          {isMobileMenuOpen && (
            <div ref={mobileMenuRef} className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
              
              <div className="px-4 py-4 space-y-1">
                
                {/* 🔍 UNIVERSAL SEARCH BAR (MOBILE) - Fixed and Highlighted */}
                <div className="relative mb-5" ref={mobileSearchRef}>
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search labs, tests or services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => { if (searchQuery) setShowSearchResults(true); }}
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-100 border border-transparent focus:bg-white focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 transition-all text-sm outline-none text-slate-800 font-medium shadow-inner"
                    />
                    {searchQuery && (
                      <button onClick={() => { setSearchQuery(""); setShowSearchResults(false); }} className="absolute right-4 text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full p-1">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <SearchResultsDropdown />
                </div>
                
                <div className="h-px bg-slate-100 w-full mb-3"></div>

                {/* Mobile Menu Links */}
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive('/account') ? 'bg-[#8CC63F]/10 text-[#8CC63F]' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Users className="h-4 w-4" /></div><span>My Account</span>
                </Link>
                
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive('/') ? 'bg-[#8CC63F]/10 text-[#8CC63F]' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Home className="h-4 w-4" /></div><span>Home</span>
                </Link>
                
                <Link to="/ehr" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${isActive('/ehr') ? 'bg-[#8CC63F] text-white shadow-md' : 'text-[#8CC63F] bg-[#8CC63F]/10 hover:bg-[#8CC63F]/20'}`}>
                  <div className={isActive('/ehr') ? 'bg-white/20 text-white p-2 rounded-lg' : 'bg-[#8CC63F] text-white p-2 rounded-lg'}><FileText className="h-4 w-4" /></div><span>My Reports</span>
                </Link>

                <Link to="/services/labs" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive('/services/labs') ? 'bg-[#8CC63F]/10 text-[#8CC63F]' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><TestTube className="h-4 w-4" /></div><span>Labs</span>
                </Link>

                <Link to="/health-card" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive('/health-card') ? 'bg-[#8CC63F]/10 text-[#8CC63F]' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><CreditCard className="h-4 w-4" /></div><span>Health Card</span>
                </Link>

                <Link to={(() => {
                  const email = isAuthenticated && user?.email ? user.email : localStorage.getItem('lastOrderEmail');
                  return email ? `/history?email=${encodeURIComponent(email)}` : '/history';
                })()} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive('/history') ? 'bg-[#8CC63F]/10 text-[#8CC63F]' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><History className="h-4 w-4" /></div><span>History</span>
                </Link>

                {/* Mobile Services Dropdown */}
                <div className="relative" ref={mobileDropdownRef}>
                  <button onClick={(e) => { e.stopPropagation(); setIsServicesOpen(!isServicesOpen); }} className="flex items-center justify-between w-full p-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3"><div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Briefcase className="h-4 w-4" /></div><span>Services</span></div>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isServicesOpen && (
                    <div className="pl-14 pr-4 pb-2 space-y-1">
                      <Link to="/services/health-program" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${isActive('/services/health-program') ? 'text-[#8CC63F] font-bold bg-[#8CC63F]/5' : 'text-slate-600 hover:text-[#8CC63F]'}`}><Heart className="h-3 w-3" /> <span>Health Program</span></Link>
                      <Link to="/services/school-health-program" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${isActive('/services/school-health-program') ? 'text-[#8CC63F] font-bold bg-[#8CC63F]/5' : 'text-slate-600 hover:text-[#8CC63F]'}`}><GraduationCap className="h-3 w-3" /> <span>School Program</span></Link>
                    </div>
                  )}
                </div>
                
                <div className="p-4 pt-4 pb-6">
                  <Button asChild className="w-full bg-[#8CC63F] text-white hover:bg-[#7ab332] rounded-xl font-bold shadow-md h-14 text-base">
                    <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>Book a service</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}