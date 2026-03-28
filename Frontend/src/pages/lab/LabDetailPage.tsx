import { labs } from "@/data/labs";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, DollarSign, TestTube, Loader2, AlertCircle, Search, ShoppingCart, Pin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getLabTests, type LabTest, type LabTestsResponse } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { Helmet } from 'react-helmet-async'; // 🚀 Advanced SEO Import

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

export default function LabDetailPage() {
  const { labId } = useParams<{ labId: string }>();
  const [labData, setLabData] = useState<LabTestsResponse | null>(null);
  const [pinnedTests, setPinnedTests] = useState<LabTest[]>([]);
  const [regularTests, setRegularTests] = useState<LabTest[]>([]);
  const [filteredPinnedTests, setFilteredPinnedTests] = useState<LabTest[]>([]);
  const [filteredRegularTests, setFilteredRegularTests] = useState<LabTest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const lab = labs.find((l) => l.id === labId);
  const isChughtai = labId === 'chughtai-lab';
  const discountPercent = isChughtai ? 20 : 40;

  useEffect(() => {
    const fetchTests = async () => {
      if (!labId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getLabTests(labId);
        if (response === null) {
          setError("Lab data not available");
        } else {
          setLabData(response);
          // Handle dynamic structure safely
          const allTests = Array.isArray(response) ? response : response.tests;
          
          if (allTests && allTests.length > 0) {
            const pinned = allTests.filter((test: LabTest) => test.pinned === true);
            const regular = allTests.filter((test: LabTest) => !test.pinned);
            setPinnedTests(pinned);
            setRegularTests(regular);
            setFilteredPinnedTests(pinned);
            setFilteredRegularTests(regular);
          }
        }
      } catch (err) {
        setError("Failed to load lab tests");
        console.error("Error fetching lab tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [labId]);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredPinnedTests(pinnedTests);
      setFilteredRegularTests(regularTests);
      return;
    }

    const filterTest = (test: LabTest) =>
      test.name.toLowerCase().includes(query) ||
      (test.description && test.description.toLowerCase().includes(query));

    setFilteredPinnedTests(pinnedTests.filter(filterTest));
    setFilteredRegularTests(regularTests.filter(filterTest));
  }, [searchQuery, pinnedTests, regularTests]);

  const handleAddToCart = (test: LabTest) => {
    if (lab && labId) {
      addToCart(test, labId, lab.name);
    }
  };

  if (!lab) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lab not found</h1>
            <Link to="/" className="text-[#8CC63F] hover:underline">
              Go back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      
      {/* 🚀 ADVANCED SEO MAGIC STARTS HERE */}
      <Helmet>
        <title>{lab.name} Lab Tests & Prices in Lahore | ZUNF Medicare</title>
        <meta 
          name="description" 
          content={`Browse and book ${labData?.tests?.length || 'all'} diagnostic lab tests from ${lab.name} with up to 40% discount. Free home sampling available via ZUNF Medicare.`} 
        />
        <meta 
          name="keywords" 
          content={`${lab.name}, lab tests Lahore, blood tests, book lab test online, ${lab.name} test prices, ZUNF Medicare`} 
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* 🚀 ADVANCED SEO MAGIC ENDS HERE */}

      <SiteHeader />
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative w-full bg-gradient-to-br from-[#8CC63F]/10 via-slate-50 to-[#00AEEF]/10 pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8CC63F]/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#00AEEF]/5 rounded-full blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            {getLabLogo(labId!) && (
              <div className="absolute top-0 right-4 sm:right-6 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none opacity-20" style={{ maxHeight: '100%', maxWidth: '100%' }}>
                <img src={getLabLogo(labId!)!} alt={lab.name} width={384} height={384} className="object-contain w-full h-full" />
              </div>
            )}

            <Link to="/services/labs" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8CC63F] transition-colors mb-6 relative z-10 font-medium text-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Labs</span>
            </Link>

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex-shrink-0">
                {getLabLogo(labId!) ? (
                  <img src={getLabLogo(labId!)!} alt={lab.name} className="object-contain p-2 max-w-full max-h-full" />
                ) : (
                  <TestTube className="h-8 w-8 text-[#8CC63F]" />
                )}
              </div>
              <div className="flex-1 relative">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 relative z-10 font-syne text-slate-900">{lab.name}</h1>
                {!loading && (
                  <p className="text-slate-600 font-medium">
                    {pinnedTests.length + regularTests.length} Medical Tests Available
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tests Section */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#8CC63F] mb-4" />
                <p className="text-slate-500 font-medium">Loading medical tests...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="h-12 w-12 text-slate-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-syne">Tests Not Available</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">
                  {lab.name} test catalog is currently being updated. Please check back shortly.
                </p>
                <Link to="/services/labs" className="inline-flex items-center gap-2 text-[#8CC63F] font-bold hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Back to Labs
                </Link>
              </div>
            )}

            {!loading && !error && (
              <div className="mb-12">
                
                {/* Search Bar */}
                <div className="mb-10 max-w-xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="search"
                      placeholder={`Search in ${lab.name}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-[#8CC63F] focus:ring-[#8CC63F]/20 text-base shadow-inner"
                    />
                  </div>
                </div>

                {/* SEO CRAWLABLE LINKS: Pinned Tests */}
                {filteredPinnedTests.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2 font-syne">
                      <Pin className="h-6 w-6 text-[#8CC63F]" /> Popular Tests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredPinnedTests.map((test) => (
                        <Card key={test.id} className="p-5 border border-slate-100 hover:border-[#8CC63F]/50 bg-white hover:shadow-xl transition-all duration-300 group rounded-2xl relative flex flex-col h-full">
                          <div className="absolute top-4 right-4 bg-[#8CC63F]/10 p-1.5 rounded-lg">
                            <Pin className="h-3.5 w-3.5 text-[#8CC63F]" />
                          </div>
                          
                          <div className="mb-4 pr-8 flex-1">
                            {/* SEO LINK HIGHLIGHT */}
                            <Link to={`/lab/${labId}/test/${test.id}`} className="hover:text-[#8CC63F] transition-colors focus:outline-none">
                              <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">{test.name}</h3>
                            </Link>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-50">
                            <div className="flex flex-col mb-4">
                              {test.price != null && test.discounted_price != null && test.discounted_price < test.price ? (
                                <>
                                  <span className="text-xs text-slate-400 line-through mb-0.5">Rs. {(test.price || 0).toLocaleString()}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-900 text-lg">Rs. {(test.discounted_price || 0).toLocaleString()}</span>
                                    <span className="text-[10px] bg-[#8CC63F]/10 text-[#8CC63F] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{discountPercent}% OFF</span>
                                  </div>
                                </>
                              ) : (
                                <span className="font-black text-slate-900 text-lg mt-4">Rs. {(test.price || 0).toLocaleString()}</span>
                              )}
                            </div>

                            <Button onClick={() => handleAddToCart(test)} className="w-full bg-slate-50 hover:bg-[#8CC63F] text-slate-700 hover:text-white font-bold transition-all rounded-xl shadow-sm border border-slate-100">
                              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO CRAWLABLE LINKS: All Regular Tests */}
                {filteredRegularTests.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2 font-syne">
                      <TestTube className="h-6 w-6 text-[#8CC63F]" /> All Available Tests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredRegularTests.map((test) => (
                        <Card key={test.id} className="p-5 border border-slate-100 hover:border-[#00AEEF]/50 bg-white hover:shadow-xl transition-all duration-300 group rounded-2xl flex flex-col h-full">
                          
                          <div className="mb-4 flex-1">
                             {/* SEO LINK HIGHLIGHT */}
                            <Link to={`/lab/${labId}/test/${test.id}`} className="hover:text-[#00AEEF] transition-colors focus:outline-none">
                              <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">{test.name}</h3>
                            </Link>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-50">
                            <div className="flex flex-col mb-4">
                              {test.price != null && test.discounted_price != null && test.discounted_price < test.price ? (
                                <>
                                  <span className="text-xs text-slate-400 line-through mb-0.5">Rs. {(test.price || 0).toLocaleString()}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-900 text-lg">Rs. {(test.discounted_price || 0).toLocaleString()}</span>
                                    <span className="text-[10px] bg-[#00AEEF]/10 text-[#00AEEF] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{discountPercent}% OFF</span>
                                  </div>
                                </>
                              ) : (
                                <span className="font-black text-slate-900 text-lg mt-4">Rs. {(test.price || 0).toLocaleString()}</span>
                              )}
                            </div>

                            <Button onClick={() => handleAddToCart(test)} className="w-full bg-slate-50 hover:bg-[#00AEEF] text-slate-700 hover:text-white font-bold transition-all rounded-xl shadow-sm border border-slate-100">
                              <ShoppingCart className="h-4 w-4 mr-2" /> Book Test
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}