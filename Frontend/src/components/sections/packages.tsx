import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { healthPackages, type HealthPackage } from "@/data/packages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/custom";
import { ShoppingCart, Loader2, CheckCircle2, Heart, Sparkles, Stethoscope, Pill, X, TestTube, ArrowRight } from "lucide-react";
import { getLabs, type Lab } from "@/lib/api";
import { motion } from "framer-motion";

const packageIcons: Record<string, React.ReactNode> = {
  "heart-health-package": <Heart className="h-6 w-6" />,
  "wellness-journey-package": <Sparkles className="h-6 w-6" />,
  "special-health-profile": <Stethoscope className="h-6 w-6" />,
  "vitamin-health-profile": <Pill className="h-6 w-6" />,
};

export function Packages() {
  const navigate = useNavigate();
  const { addPackageToCart } = useCart();
  const { showToast } = useToast();
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const [addedPackage, setAddedPackage] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HealthPackage | null>(null);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loadingLabs, setLoadingLabs] = useState(false);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoadingLabs(true);
      try {
        const allLabs = await getLabs();
        const filteredLabs = allLabs.filter(
          lab => lab.id !== "jinnah-mri" && lab.id !== "chughtai-lab"
        );
        setLabs(filteredLabs);
      } catch (error) {
        console.error("Error fetching labs:", error);
      } finally {
        setLoadingLabs(false);
      }
    };
    fetchLabs();
  }, []);

  const handlePackageClick = (pkg: HealthPackage) => {
    setSelectedPackage(pkg);
  };

  const handleLabSelection = async (labId: string, labName: string) => {
    if (!selectedPackage) return;
    setLoadingPackage(selectedPackage.id);
    setSelectedPackage(null);
    setAddedPackage(null);

    try {
      const result = await addPackageToCart(
        selectedPackage.id,
        selectedPackage.name,
        selectedPackage.tests,
        selectedPackage.discountedPrice,
        selectedPackage.actualPrice,
        labId,
        labName
      );

      if (result.added > 0) {
        setAddedPackage(selectedPackage.id);
        showToast("Package added to cart successfully!", "success");
        setTimeout(() => navigate("/cart"), 1000);
      } else {
        showToast("Could not find tests for this package.", "error");
      }
    } catch (error) {
      showToast("Failed to add package to cart.", "error");
    } finally {
      setLoadingPackage(null);
    }
  };

  const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString()}`;

  return (
    <section className="relative w-full py-20 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Special <span className="text-primary">Health Packages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Comprehensive preventive health screening packages designed for your wellness journey at discounted rates.
          </motion.p>
        </div>

        {/* ✅ MOBILE HORIZONTAL SCROLL UPDATES HERE */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {healthPackages.map((pkg, index) => {
            const isLoading = loadingPackage === pkg.id;
            const isAdded = addedPackage === pkg.id;
            const discount = Math.round(((pkg.actualPrice - pkg.discountedPrice) / pkg.actualPrice) * 100);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // ✅ CARD WIDTH & SNAPPING FOR MOBILE
                className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0"
              >
                <Card className="relative overflow-hidden bg-white border-slate-100 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm z-10">
                      Save {discount}%
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-6">
                    <div className="flex flex-col items-start gap-4 mb-2">
                      <div className="p-3 rounded-xl bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {packageIcons[pkg.id] || <Stethoscope className="h-6 w-6" />}
                      </div>
                      <CardTitle className="text-xl text-slate-800 font-bold leading-tight">
                        {pkg.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-slate-500 min-h-[40px] leading-relaxed">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    {/* Tests List */}
                    <div className="bg-slate-50 p-4 rounded-xl mb-6 flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Includes Tests:</p>
                      <ul className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {pkg.tests.map((test, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-600">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2 leading-tight">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & Button at Bottom */}
                    <div className="mt-auto space-y-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-400 line-through font-medium">
                          {formatCurrency(pkg.actualPrice)}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-slate-900">
                            {formatCurrency(pkg.discountedPrice)}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handlePackageClick(pkg)}
                        disabled={isLoading || isAdded}
                        className={`w-full rounded-xl h-12 font-bold ${
                          isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-[#86b83c]'
                        } text-white shadow-md`}
                      >
                        {isLoading ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                        ) : isAdded ? (
                          <><CheckCircle2 className="h-5 w-5 mr-2" /> Added to Cart</>
                        ) : (
                          <span className="flex items-center justify-center">
                            Select Package <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lab Selection Dialog */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800">Select Laboratory</CardTitle>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <CardDescription className="text-slate-500">
                Choose a laboratory for <span className="font-semibold text-slate-700">{selectedPackage.name}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {loadingLabs ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  <p className="text-sm text-slate-500 font-medium">Fetching available labs...</p>
                </div>
              ) : labs.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl">
                  <TestTube className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-medium">No laboratories currently available.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {labs.map((lab) => (
                    <button
                      key={lab.id}
                      onClick={() => handleLabSelection(lab.id, lab.name)}
                      className="w-full text-left p-4 rounded-xl border border-slate-100 bg-white hover:border-accent hover:shadow-md hover:bg-accent/5 transition-all duration-200 group flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-accent transition-colors border border-slate-100">
                        <TestTube className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 group-hover:text-accent transition-colors">{lab.name}</h4>
                        {lab.description && (
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{lab.description}</p>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}