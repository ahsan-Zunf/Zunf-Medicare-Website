import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLabTests, type LabTest } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestTube, Loader2, ShoppingCart, Pin, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";

export function ChughtaiLabTests() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await getLabTests("chughtai-lab");
        if (response && response.tests) {
          // Get pinned tests first, then take top 4
          const pinnedTests = response.tests.filter(test => test.pinned === true);
          const topTests = pinnedTests.slice(0, 4);
          setTests(topTests);
        }
      } catch (error) {
        console.error("Error fetching Chughtai lab tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleAddToCart = (test: LabTest) => {
    if (!test.price || !test.discounted_price) {
      showToast("Test pricing not available", "error");
      return;
    }

    addToCart(test, "chughtai-lab", "Chughtai Lab");

    showToast(`${test.name} added to cart`, "success");
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return "N/A";
    return `Rs. ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
  };

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Book Lab Test at Chughtai Lab
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get accurate and reliable lab tests with 20% discount at Chughtai Lab
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tests available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tests.map((test) => (
                <Card
                  key={test.id}
                  className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <TestTube className="h-6 w-6" />
                      </div>
                      {test.pinned && (
                        <div className="absolute top-2 right-2">
                          <Pin className="h-4 w-4 text-primary fill-primary" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{test.name}</CardTitle>
                    {test.description && (
                      <CardDescription className="text-sm line-clamp-2 mt-2">
                        {test.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing */}
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex items-baseline gap-2">
                        {test.discounted_price && (
                          <span className="text-xl font-bold text-primary">
                            {formatCurrency(test.discounted_price)}
                          </span>
                        )}
                        {test.price && test.discounted_price && test.price > test.discounted_price && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                            20% OFF
                          </span>
                        )}
                      </div>
                      {test.price && test.discounted_price && test.price > test.discounted_price && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {formatCurrency(test.price)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(test)}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/lab/chughtai-lab">
                  See More Tests
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
