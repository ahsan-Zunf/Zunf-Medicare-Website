import { createContext, useContext, useState, ReactNode } from "react";
import { type Lab, type LabTest, getLabs, getLabTests } from "@/lib/api";
import { useToast } from "@/contexts/toast-context";

export interface CartItem extends LabTest {
  labId: string;
  labName: string;
  cartItemId: string; // Unique ID for cart items
  quantity: number;
  packageId?: string; // Optional: ID of the package this item belongs to
  packageName?: string; // Optional: name of the package this item belongs to
  packagePrice?: number; // Optional: exact package price from package definition
  packageOriginalPrice?: number; // Optional: exact original package price from package definition
}

interface CartContextType {
  items: CartItem[];
  addToCart: (test: LabTest, labId: string, labName: string, packageName?: string) => void;
  addPackageToCart: (packageId: string, packageName: string, testNames: string[], packagePrice: number, packageActualPrice: number, labId?: string, labName?: string) => Promise<{ added: number; notFound: string[] }>;
  removeFromCart: (cartItemId: string) => void;
  removePackage: (packageId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getOriginalTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  const addToCart = (test: LabTest, labId: string, labName: string, packageName?: string) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === test.id && item.labId === labId && item.packageName === packageName
      );

      if (existingItem) {
        return prev.map((item) =>
          item.cartItemId === existingItem.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const cartItemId = `${test.id}-${labId}-${Date.now()}`;
      return [...prev, { ...test, labId, labName, cartItemId, quantity: 1, packageName }];
    });

    showToast("Added to cart", "success", 3000);
  };

  // Helper function to normalize test names for matching
  const normalizeTestName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Helper function to find best matching test
  const findTestByName = (testName: string, tests: LabTest[]): LabTest | null => {
    const normalized = normalizeTestName(testName);

    // Exact match first
    let match = tests.find(t => normalizeTestName(t.name) === normalized);
    if (match) return match;

    // Partial match - test name contains search term or vice versa
    match = tests.find(t => {
      const tNormalized = normalizeTestName(t.name);
      return tNormalized.includes(normalized) || normalized.includes(tNormalized);
    });
    if (match) return match;

    // Keyword matching
    const keywords = normalized.split(' ').filter(k => k.length > 2);
    match = tests.find(t => {
      const tNormalized = normalizeTestName(t.name);
      return keywords.some(keyword => tNormalized.includes(keyword));
    });

    return match || null;
  };

  const addPackageToCart = async (
    packageId: string,
    packageName: string,
    testNames: string[],
    packagePrice: number,
    packageActualPrice: number,
    selectedLabId?: string,
    selectedLabName?: string
  ): Promise<{ added: number; notFound: string[] }> => {
    try {
      let labsToSearch: Lab[] = [];

      if (selectedLabId && selectedLabName) {
        // If a specific lab is selected, only search in that lab
        labsToSearch = [{ id: selectedLabId, name: selectedLabName }];
      } else {
        // Otherwise, search in all labs (excluding jinnah-mri and chughtai-lab)
        const allLabs = await getLabs();
        labsToSearch = allLabs.filter(
          lab => lab.id !== "jinnah-mri" && lab.id !== "chughtai-lab"
        );
      }

      const allTests: Array<{ test: LabTest; labId: string; labName: string }> = [];

      // Fetch all tests from selected labs
      const labPromises = labsToSearch.map(async (lab) => {
        try {
          const labData = await getLabTests(lab.id);
          if (labData && labData.tests) {
            labData.tests.forEach(test => {
              allTests.push({ test, labId: lab.id, labName: lab.name });
            });
          }
        } catch (error) {
          console.error(`Error fetching tests for ${lab.id}:`, error);
        }
      });

      await Promise.all(labPromises);

      const added: string[] = [];
      const notFound: string[] = [];

      // First, find all tests and calculate total original price
      const foundTests: Array<{ test: LabTest; labId: string; labName: string; originalPrice: number }> = [];

      testNames.forEach(testName => {
        // When a lab is selected, ONLY search in that lab's tests
        // Do NOT fall back to other labs - this ensures each lab has its own test data
        const testsToSearch = selectedLabId && selectedLabName
          ? allTests.filter(t => t.labId === selectedLabId)
          : allTests;

        const found = findTestByName(testName, testsToSearch.map(t => t.test));

        if (found) {
          const testData = testsToSearch.find(t => t.test.id === found.id);
          if (testData) {
            const originalPrice = found.price || 0;
            // Use selected lab info if provided, otherwise use the lab where test was found
            const finalLabId = selectedLabId || testData.labId;
            const finalLabName = selectedLabName || testData.labName;

            foundTests.push({
              test: found,
              labId: finalLabId,
              labName: finalLabName,
              originalPrice
            });
            added.push(testName);
          } else {
            notFound.push(testName);
          }
        } else {
          notFound.push(testName);
        }
      });

      // Calculate total original price of found tests
      const totalOriginalPrice = foundTests.reduce((sum, item) => sum + item.originalPrice, 0);

      // Calculate discount ratio to apply to each test to match package price
      const discountRatio = totalOriginalPrice > 0 ? packagePrice / totalOriginalPrice : 1;

      // Add tests to cart with adjusted pricing
      // Distribute package price proportionally, with last test getting remainder to ensure exact total
      let remainingPackagePrice = packagePrice;
      foundTests.forEach(({ test, labId, labName, originalPrice }, index) => {
        let adjustedPrice: number;

        if (index === foundTests.length - 1) {
          // Last test gets the remainder to ensure exact package price
          adjustedPrice = remainingPackagePrice;
        } else {
          adjustedPrice = Math.round(originalPrice * discountRatio);
          remainingPackagePrice -= adjustedPrice;
        }

        // Create test object with package pricing
        const packageTest: LabTest = {
          ...test,
          price: originalPrice, // Keep original price for reference
          discounted_price: adjustedPrice // Apply package discount
        };

        // Add to cart with package information
        setItems((prev) => {
          const cartItemId = `${test.id}-${labId}-${Date.now()}-${Math.random()}`;
          return [...prev, {
            ...packageTest,
            labId,
            labName,
            cartItemId,
            quantity: 1,
            packageId,
            packageName,
            packagePrice, // Store exact package price
            packageOriginalPrice: packageActualPrice // Store exact original package price
          }];
        });
      });

      return { added: added.length, notFound };
    } catch (error) {
      console.error('Error adding package to cart:', error);
      return { added: 0, notFound: testNames };
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const removePackage = (packageId: string) => {
    setItems((prev) => prev.filter((item) => item.packageId !== packageId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getFinalPrice = (item: CartItem) => {
    const price = item.price != null ? item.price : 0;
    const discountedPrice =
      item.discounted_price != null ? item.discounted_price : 0;

    if (discountedPrice > 0 && discountedPrice < price) {
      return discountedPrice;
    }

    return price;
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + getFinalPrice(item) * item.quantity,
      0
    );
  };

  const getOriginalTotal = () => {
    return items.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addPackageToCart,
        removeFromCart,
        removePackage,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getOriginalTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

