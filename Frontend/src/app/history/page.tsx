"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  History,
  Loader2,
  Calendar,
  Clock,
  TestTube,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Inbox,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserOrders, type Order } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  Received: { bg: "bg-blue-100 text-blue-800", text: "text-blue-800", icon: Inbox },
  Pending: { bg: "bg-yellow-100 text-yellow-800", text: "text-yellow-800", icon: Clock3 },
  Completed: { bg: "bg-green-100 text-green-800", text: "text-green-800", icon: CheckCircle2 },
};

export default function HistoryPage() {
  const { user, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserOrders = async () => {
      // If user is logged in, ONLY use logged-in user's email (don't rely on localStorage or URL params)
      let email: string | null = null;
      
      if (isAuthenticated && user?.email) {
        // User is logged in - always use logged-in email
        email = user.email;
      } else {
        // User not logged in - get from URL params or localStorage
        email = searchParams.get('email') || localStorage.getItem('lastOrderEmail');
      }

      // Update URL to include email if we have it but it's not in the URL
      if (email && !searchParams.get('email')) {
        router.replace(`/history?email=${encodeURIComponent(email)}`);
      }

      if (!email) {
        setError("Please log in or provide an email to view your order history.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        console.log('📋 [HISTORY] Fetching orders for email:', email);
        console.log('📋 [HISTORY] User is authenticated:', isAuthenticated);
        console.log('📋 [HISTORY] Logged-in user email:', user?.email);
        const data = await getUserOrders(email);
        console.log('📋 [HISTORY] Received orders:', data.length);
        setOrders(data);
        if (data.length === 0) {
          setError("You haven't placed any orders yet.");
        }
      } catch (err) {
        console.error('❌ [HISTORY] Error fetching orders:', err);
        setError("Failed to load your order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user, isAuthenticated, searchParams, router]);

  if (loading) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 py-12 px-4">
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-12 px-4">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Order History</h1>
                <p className="text-muted-foreground">View your previous test bookings</p>
              </div>
            </div>
          </div>

          {error ? (
            <Card className="p-8 border border-primary/20 bg-card">
              <div className="text-center">
                <p className="text-muted-foreground">{error}</p>
                {!user?.email && (
                  <Link href="/health-card/auth">
                    <Button className="mt-4">Log In</Button>
                  </Link>
                )}
              </div>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="p-8 border border-primary/20 bg-card">
              <div className="text-center">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                <Link href="/services/labs">
                  <Button className="mt-4">Browse Labs</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = STATUS_COLORS[order.status] || STATUS_COLORS.Received;
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={order._id} className="p-6 border border-primary/20">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <StatusIcon className={`h-4 w-4 ${statusInfo.text}`} />
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusInfo.bg}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Total Amount</p>
                          <p className="text-xl font-bold text-primary">
                            {formatCurrency(order.totals?.final ?? 0)}
                          </p>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="flex flex-wrap gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-semibold text-foreground">{order.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-semibold text-foreground">{order.preferredTime}</span>
                        </div>
                      </div>

                      {/* Tests */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 mb-3">
                          <TestTube className="h-4 w-4 text-primary" />
                          <p className="font-semibold text-foreground">Tests Booked</p>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={`${order._id}-${item.testId}-${idx}`}
                              className="flex items-start justify-between p-3 rounded-lg bg-muted/30"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.testName}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{item.labName}</span>
                                  <span className="text-xs text-foreground">× {item.quantity}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-foreground">
                                  {formatCurrency(item.discountedPrice * item.quantity)}
                                </p>
                                {item.discountedPrice < item.price && (
                                  <p className="text-xs text-muted-foreground line-through">
                                    {formatCurrency(item.price * item.quantity)}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Customer Information</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>
                            <span className="ml-2 font-medium text-foreground">{order.customer.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <span className="ml-2 font-medium text-foreground">{order.customer.email}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Mobile:</span>
                            <span className="ml-2 font-medium text-foreground">{order.customer.mobile}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">City:</span>
                            <span className="ml-2 font-medium text-foreground">{order.customer.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

