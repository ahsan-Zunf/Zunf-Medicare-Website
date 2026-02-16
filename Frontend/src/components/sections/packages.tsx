import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { healthPackages, type HealthPackage } from "@/data/packages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, CheckCircle2, Heart, Sparkles, Stethoscope, Pill, X, TestTube } from "lucide-react";
import { getLabs, type Lab } from "@/lib/api";

const packageIcons: Record<string, React.ReactNode> = {
  "heart-health-package": <Heart className="h-8 w-8" />,
  "wellness-journey-package": <Sparkles className="h-8 w-8" />,
  "special-health-profile": <Stethoscope className="h-8 w-8" />,
  "vitamin-health-profile": <Pill className="h-8 w-8" />,
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

  // Fetch labs and filter out Jinnah and Chughtai
  useEffect(() => {
    const fetchLabs = async () => {
      setLoadingLabs(true);
      try {
        const allLabs = await getLabs();
        // Filter out jinnah-mri and chughtai-lab
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
        setTimeout(() => {
          navigate("/cart");
        }, 500);
      } else {
        showToast("Could not find tests for this package. Please contact support.", "error");
      }

      if (result.notFound.length > 0) {
        console.warn("Tests not found:", result.notFound);
      }
    } catch (error) {
      console.error("Error adding package to cart:", error);
      showToast("Failed to add package to cart. Please try again.", "error");
    } finally {
      setLoadingPackage(null);
    }
  };

  const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-background to-primary/5 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Health Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive health screening packages designed for your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthPackages.map((pkg) => {
            const isLoading = loadingPackage === pkg.id;
            const isAdded = addedPackage === pkg.id;
            const discount = Math.round(((pkg.actualPrice - pkg.discountedPrice) / pkg.actualPrice) * 100);

            return (
              <Card
                key={pkg.id}
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {packageIcons[pkg.id] || <Stethoscope className="h-6 w-6" />}
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm min-h-[40px]">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tests List */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Includes:</p>
                    <ul className="space-y-1.5 text-sm max-h-64 overflow-y-auto">
                      {pkg.tests.map((test, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground line-clamp-1">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(pkg.discountedPrice)}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(pkg.actualPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handlePackageClick(pkg)}
                    disabled={isLoading || isAdded}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : isAdded ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Lab Selection Dialog */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Select Laboratory</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPackage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Choose a laboratory for {selectedPackage.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingLabs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : labs.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No laboratories available
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {labs.map((lab) => (
                    <Button
                      key={lab.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-background hover:bg-accent hover:border-primary text-foreground"
                      onClick={() => handleLabSelection(lab.id, lab.name)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <TestTube className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold">{lab.name}</p>
                          {lab.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {lab.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Button>
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

