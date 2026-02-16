"use client";

import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, DollarSign, Trash2, ArrowLeft, CheckCircle, Minus, Plus, CalendarDays, Building2, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createOrder } from "@/lib/api";

const getLabDiscount = (labId: string) => (labId === "chughtai-lab" ? 20 : 40);

const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getOriginalTotal, getItemCount } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    age: "",
    city: "",
    date: "",
    time: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // If user is logged in, auto-fill email from user account
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user]);

  // Convert phone number from 030 format to +92 format
  const convertPhoneNumber = (phone: string): string => {
    // Remove any spaces, dashes, or other characters
    let cleaned = phone.replace(/\s|-|\(|\)/g, '');
    
    // If it starts with 0, replace with +92
    if (cleaned.startsWith('0')) {
      cleaned = '+92' + cleaned.substring(1);
    }
    // If it starts with 92, add +
    else if (cleaned.startsWith('92')) {
      cleaned = '+' + cleaned;
    }
    // If it doesn't start with +, add +92
    else if (!cleaned.startsWith('+')) {
      cleaned = '+92' + cleaned;
    }
    
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert phone number format when user types in mobile field
    if (name === 'mobile') {
      const converted = convertPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: converted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🚀 [FRONTEND] ===== ORDER PLACEMENT STARTED =====");
    console.log("🚀 [FRONTEND] Button clicked - handlePlaceOrder called");
    console.log("🚀 [FRONTEND] Form data:", formData);
    console.log("🚀 [FRONTEND] Cart items count:", items.length);
    
    // Basic validation (date and time are optional)
    console.log("🔍 [FRONTEND] Validating form data...");
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim() ||
      !formData.age.trim() ||
      !formData.city.trim()
    ) {
      console.error("❌ [FRONTEND] Validation failed: Missing required fields");
      showToast("Please fill in all required fields", "error");
      return;
    }
    console.log("✅ [FRONTEND] All required fields present");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error("❌ [FRONTEND] Validation failed: Invalid email format");
      showToast("Please enter a valid email address", "error");
      return;
    }
    console.log("✅ [FRONTEND] Email format valid");

    // Mobile validation (basic)
    if (formData.mobile.length < 10) {
      console.error("❌ [FRONTEND] Validation failed: Invalid mobile number");
      showToast("Please enter a valid mobile number", "error");
      return;
    }
    console.log("✅ [FRONTEND] Mobile number valid");

    setSubmitError("");
    setIsSubmitting(true);

    try {
      console.log("🛒 [FRONTEND] Starting order creation process...");
      console.log("🛒 [FRONTEND] Customer:", formData.name, formData.email);
      console.log("🛒 [FRONTEND] Cart items:", items.length);

      const orderItems = items.map((item) => ({
        testId: item.id,
        testName: item.name,
        labId: item.labId,
        labName: item.labName,
        quantity: item.quantity,
        price: item.price || 0,
        discountedPrice:
          item.discounted_price && item.discounted_price > 0 && item.discounted_price < (item.price || 0)
            ? item.discounted_price
            : item.price || 0,
        pinned: item.pinned ?? false,
      }));

      // Convert phone number to +92 format
      const convertedMobile = convertPhoneNumber(formData.mobile);

      // If user is logged in, always use logged-in user's email for the order
      const orderEmail = isAuthenticated && user?.email ? user.email : formData.email;
      
      // Store last used email separately (for reference, not for fetching orders)
      if (formData.email && formData.email !== orderEmail) {
        localStorage.setItem('lastOrderEmail', formData.email);
      }

      const payload = {
        customer: {
          name: formData.name,
          email: orderEmail, // Use logged-in email if authenticated
          mobile: convertedMobile,
          age: formData.age,
          city: formData.city,
          lastUsedEmail: isAuthenticated && formData.email !== orderEmail ? formData.email : undefined, // Store last used email separately
        },
        preferredDate: formData.date || undefined,
        preferredTime: formData.time || undefined,
        items: orderItems,
        totals: {
          original: originalTotal,
          final: finalTotal,
          planCoverage: totalCoverage,
        },
      };

      console.log("🛒 [FRONTEND] Sending order to backend...");
      console.log("🛒 [FRONTEND] User authenticated:", isAuthenticated);
      console.log("🛒 [FRONTEND] Using email for order:", orderEmail);
      console.log("🛒 [FRONTEND] Payload:", JSON.stringify(payload, null, 2));

      const orderResponse = await createOrder(payload);
      
      console.log("✅ [FRONTEND] Order created successfully!");
      console.log("✅ [FRONTEND] Order ID:", orderResponse._id);
      console.log("📧 [FRONTEND] Confirmation email will be sent to:", orderEmail);

      clearCart();
      setFormData(initialFormState);
      
      // Navigate to history page - if logged in, use logged-in email, otherwise use form email
      const historyEmail = isAuthenticated && user?.email ? user.email : formData.email;
      router.push(`/history?email=${encodeURIComponent(historyEmail)}`);
    } catch (error) {
      console.error("❌ [FRONTEND] Failed to create order");
      console.error("❌ [FRONTEND] Error:", error);
      if (error instanceof Error) {
        console.error("❌ [FRONTEND] Error message:", error.message);
        console.error("❌ [FRONTEND] Error stack:", error.stack);
      }
      setSubmitError(error instanceof Error ? error.message : "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order! A confirmation email has been sent to your email address.
            </p>
            <p className="text-muted-foreground mb-8">
              We will contact you shortly to confirm your booking.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button className="bg-primary text-primary-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some tests to your cart to get started.
            </p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Tests
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const originalTotal = getOriginalTotal();
  const finalTotal = getTotalPrice();
  const totalCoverage = Math.max(0, originalTotal - finalTotal);

  const coverageBreakdown = items.map((item) => {
    const originalUnitPrice = item.price || 0;
    const discountedUnitPrice =
      item.discounted_price && item.discounted_price > 0 && item.discounted_price < (item.price || 0)
        ? item.discounted_price
        : item.price || 0;
    const originalPrice = originalUnitPrice * item.quantity;
    const discountedPrice = discountedUnitPrice * item.quantity;
    const coverageAmount = Math.max(0, originalPrice - discountedPrice);
    return {
      ...item,
      originalPrice,
      discountedPrice,
      coverageAmount,
    };
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getItemCount()} {getItemCount() === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const labDiscount = getLabDiscount(item.labId);
                const hasDiscount =
                  item.price != null &&
                  item.discounted_price != null &&
                  item.discounted_price > 0 &&
                  item.discounted_price < item.price;
                const finalPrice = hasDiscount ? item.discounted_price || 0 : item.price || 0;
                return (
                  <Card key={item.cartItemId} className="p-6 border-2 border-primary/20">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                              {item.labName}
                            </p>
                            {hasDiscount && (
                              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {labDiscount}% OFF
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="border border-border rounded-full h-10 w-10"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="border border-border rounded-full h-10 w-10"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          {hasDiscount ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                              <span className="text-muted-foreground line-through text-sm">
                                {formatCurrency(item.price || 0)}
                              </span>
                              <span className="font-semibold text-primary text-lg">
                                {formatCurrency(finalPrice)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                You save {formatCurrency((item.price || 0) - finalPrice)} per test
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-foreground text-lg">
                              {formatCurrency(finalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Line Total</p>
                            <p className="text-lg font-semibold text-foreground">
                              {formatCurrency(finalPrice * item.quantity)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary & Transaction */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 border-2 border-primary/20">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Transaction Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Provider</p>
                      <p className="font-semibold text-foreground">ZUNF Medicare Labs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground flex items-center gap-1 justify-end">
                        <CalendarDays className="h-4 w-4" /> Today
                      </p>
                      <p className="font-semibold text-foreground">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-2">
                    <p className="text-sm font-semibold text-foreground">Estimated Coverage & Cost</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="font-semibold text-foreground">{formatCurrency(originalTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Your Plan Covers</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(totalCoverage)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base border-t border-primary/10 pt-2">
                      <span className="font-semibold text-foreground">You Pay</span>
                      <span className="font-bold text-primary text-lg">{formatCurrency(finalTotal)}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      Coverage Breakdown
                    </p>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {coverageBreakdown.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="border border-border rounded-lg p-3 text-sm bg-card/80"
                        >
                          <div className="flex justify-between flex-wrap gap-1">
                            <span className="font-semibold text-foreground">{item.name}</span>
                            <span className="text-muted-foreground">
                              {getLabDiscount(item.labId)}% OFF
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{item.labName}</p>
                          <div className="flex justify-between text-xs">
                            <span>Plan Covers</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(item.coverageAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>You Pay</span>
                            <span className="font-semibold text-primary">
                              {formatCurrency(item.discountedPrice)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ReceiptText className="h-4 w-4 text-primary" />
                      Scanned Receipt
                    </p>
                    <div className="border border-dashed border-primary/30 rounded-xl p-4 text-center text-sm text-muted-foreground">
                      Upload receipt after sample pickup (coming soon)
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary/20 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({getItemCount()} items)</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(originalTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan Covers</span>
                    <span className="font-semibold text-green-600">
                      - {formatCurrency(totalCoverage)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      disabled={isAuthenticated && !!user?.email}
                      className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    {isAuthenticated && user?.email && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Using your logged-in email address
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-foreground">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="03001234567 or +923001234567"
                      className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-foreground">
                        Age *
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="0"
                        required
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter age"
                        className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-foreground">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-foreground">
                        Preferred Date (Optional)
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-foreground">
                        Preferred Time (Optional)
                      </Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/50 backdrop-blur-md border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-sm text-destructive">{submitError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity mt-6"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <DollarSign className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

