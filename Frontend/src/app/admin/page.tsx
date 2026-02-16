"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  ShoppingBag,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Inbox,
  Trash2,
  Calendar,
  X,
} from "lucide-react";
import { getOrders, updateOrderStatus, deleteOrder, type Order, type OrderStatus } from "@/lib/api";
import { useToast } from "@/contexts/toast-context";

const SECRET_CODE = "9878084";

const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

const STATUS_COLUMNS: { title: string; status: OrderStatus; icon: React.ComponentType<{ className?: string }> }[] = [
  { title: "Received", status: "Received", icon: Inbox },
  { title: "Pending", status: "Pending", icon: Clock3 },
  { title: "Completed", status: "Completed", icon: CheckCircle2 },
];

export default function AdminPage() {
  const { showToast } = useToast();
  const [code, setCode] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [labFilter, setLabFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim() === SECRET_CODE) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Invalid secret code. Please try again.");
    }
  };

  const handleLogout = () => {
    setAuthorized(false);
    setCode("");
    setError("");
    setOrders([]);
    setOrdersError("");
    setLabFilter("all");
    setDateFilter("");
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    setDeletingOrderId(orderId);
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      showToast("Order deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete order. Please try again.", "error");
    } finally {
      setDeletingOrderId(null);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError("");
    try {
      const data = await getOrders();
      if (!data.length) {
        setOrdersError("No orders have been placed yet.");
      } else {
        setOrdersError("");
      }
      setOrders(data);
    } catch (err) {
      console.error(err);
      setOrdersError("Failed to load orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  const labOptions = useMemo(() => {
    const labsMap = new Map<string, string>();
    orders.forEach((order) =>
      order.items.forEach((item) => {
        if (!labsMap.has(item.labId)) {
          labsMap.set(item.labId, item.labName);
        }
      })
    );
    return Array.from(labsMap.entries()).map(([id, name]) => ({ id, name }));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Lab filter
      if (labFilter !== "all" && !order.items.some((item) => item.labId === labFilter)) {
        return false;
      }
      
      // Date filter
      if (dateFilter) {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        return orderDate === dateFilter;
      }
      
      return true;
    });
  }, [orders, labFilter, dateFilter]);

  const dashboardStats = useMemo(() => {
    const pendingOrders = filteredOrders.filter((order) => order.status === "Pending").length;
    const uniquePatients = new Set(filteredOrders.map((order) => order.customer.email)).size;
    const revenue = filteredOrders.reduce((sum, order) => sum + (order.totals?.final ?? 0), 0);

    return [
      { label: "Pending Orders", value: pendingOrders, icon: ShoppingBag },
      { label: "Registered Patients", value: uniquePatients, icon: Users },
      { label: "Revenue (Filtered)", value: formatCurrency(revenue), icon: IndianRupee },
    ];
  }, [filteredOrders]);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-12 px-4">
        <div className="mx-auto w-full max-w-4xl">
          {!authorized ? (
            <Card className="p-8 border border-primary/20 bg-card shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Admin Access</h1>
                <p className="text-muted-foreground max-w-md">
                  Please enter the secret code to access the administrative dashboard.
                </p>
                <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
                  <Input
                    type="password"
                    placeholder="Enter secret code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-center text-lg tracking-widest"
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Unlock Dashboard
                  </Button>
                </form>
              </div>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Secure Area
                  </p>
                  <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
                  <p className="text-muted-foreground">
                    Overview of today’s operations and lab bookings.
                  </p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="self-start sm:self-auto">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {dashboardStats.map((stat) => (
                  <Card key={stat.label} className="p-4 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 border border-primary/20">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Order Pipeline</h2>
                    <p className="text-sm text-muted-foreground">
                      Move bookings through Received → Pending → Completed
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <div className="relative flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground absolute left-3 pointer-events-none" />
                      <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="pl-10 border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground w-full sm:w-auto"
                        placeholder="Filter by date"
                      />
                      {dateFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setDateFilter("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <select
                      value={labFilter}
                      onChange={(event) => setLabFilter(event.target.value)}
                      className="border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
                    >
                      <option value="all">All labs</option>
                      {labOptions.map((lab) => (
                        <option key={lab.id} value={lab.id}>
                          {lab.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={fetchOrders}
                      disabled={loadingOrders}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
                {loadingOrders ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground">
                    Loading orders...
                  </div>
                ) : ordersError ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground">
                    {ordersError}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {STATUS_COLUMNS.map((column) => {
                      const columnOrders = filteredOrders.filter(
                        (order) => order.status === column.status
                      );
                      return (
                        <div key={column.status} className="rounded-2xl border border-border/60 bg-card/70 p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <column.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{column.title}</p>
                              <p className="text-xs text-muted-foreground">{columnOrders.length} orders</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {columnOrders.length === 0 ? (
                              <p className="text-sm text-muted-foreground text-center py-6">
                                {labFilter === "all" ? "No orders yet" : "No orders for selected lab"}
                              </p>
                            ) : (
                              columnOrders.map((order) => (
                                <div key={order._id} className="rounded-xl border border-border/70 bg-background/70 p-3 space-y-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                                    <p className="text-base font-semibold text-foreground">{order.customer.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {order.customer.city} • Age {order.customer.age}
                                    </p>
                                  </div>
                                  <div className="rounded-lg bg-muted/30 p-2 text-xs">
                                    <p className="font-semibold text-foreground mb-1">Tests</p>
                                    <ul className="space-y-1">
                                      {order.items.map((item) => (
                                        <li key={`${order._id}-${item.testId}`} className="text-muted-foreground leading-snug">
                                          • {item.testName}
                                          <span className="text-[10px] uppercase tracking-wide text-primary ml-1">
                                            {item.labName}
                                          </span>
                                          <span className="text-foreground font-semibold ml-2">x{item.quantity}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <div>
                                      <p className="text-muted-foreground">Slot</p>
                                      <p className="font-semibold text-foreground">
                                        {order.preferredDate} • {order.preferredTime}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-muted-foreground">Total</p>
                                      <p className="font-semibold text-primary">
                                        {formatCurrency(order.totals?.final ?? 0)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {STATUS_COLUMNS.filter((s) => s.status !== column.status).map((target) => (
                                      <Button
                                        key={target.status}
                                        size="sm"
                                        variant="secondary"
                                        className="flex-1"
                                        disabled={updatingOrderId === order._id || deletingOrderId === order._id}
                                        onClick={async () => {
                                          try {
                                            setUpdatingOrderId(order._id);
                                            await updateOrderStatus(order._id, target.status);
                                            setOrders((prev) =>
                                              prev.map((o) =>
                                                o._id === order._id ? { ...o, status: target.status } : o
                                              )
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          } finally {
                                            setUpdatingOrderId(null);
                                          }
                                        }}
                                      >
                                        Move to {target.title}
                                      </Button>
                                    ))}
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="flex-1"
                                      disabled={deletingOrderId === order._id || updatingOrderId === order._id}
                                      onClick={() => handleDeleteOrder(order._id)}
                                    >
                                      {deletingOrderId === order._id ? (
                                        <>Deleting...</>
                                      ) : (
                                        <>
                                          <Trash2 className="h-3 w-3 mr-1" />
                                          Delete
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


