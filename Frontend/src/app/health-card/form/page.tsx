"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { getHealthCard, createOrUpdateHealthCard, type CreateHealthCardPayload } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Textarea } from "@/components/ui/textarea";

export default function HealthCardPage() {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [healthCard, setHealthCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<CreateHealthCardPayload>({
    name: "",
    idCard: "",
    phone: "",
    email: user?.email || "",
    dateOfBirth: "",
    gender: "",
    address: "",
    bloodGroup: "",
    organizationName: "",
    employeeId: "",
    emergencyContact: {
      name: "",
      phone: "",
    },
    medicalConditions: "",
    allergies: "",
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/health-card/auth");
        return;
      }
      loadHealthCard();
    }
  }, [isAuthenticated, isLoading, token]);

  const loadHealthCard = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const card = await getHealthCard(token);
      if (card) {
        setHealthCard(card);
        setFormData({
          name: card.name,
          idCard: card.idCard,
          phone: card.phone,
          email: card.email,
          dateOfBirth: card.dateOfBirth,
          gender: card.gender || "",
          address: card.address,
          bloodGroup: card.bloodGroup || "",
          organizationName: card.organizationName || "",
          employeeId: card.employeeId || "",
          emergencyContact: card.emergencyContact || { name: "", phone: "" },
          medicalConditions: card.medicalConditions || "",
          allergies: card.allergies || "",
        });
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load health card");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSaving(true);
    setError("");

    try {
      const card = await createOrUpdateHealthCard(formData, token);
      setHealthCard(card);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || "Failed to save health card");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showForm || !healthCard) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Health Card</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="idCard">CNIC / B-Form *</Label>
                      <Input
                        id="idCard"
                        value={formData.idCard}
                        onChange={(e) =>
                          setFormData({ ...formData, idCard: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          setFormData({ ...formData, dateOfBirth: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Input
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) =>
                          setFormData({ ...formData, bloodGroup: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationName">Organization Name</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, organizationName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, employeeId: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyName"
                        value={formData.emergencyContact?.name || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyContact: {
                              name: e.target.value,
                              phone: formData.emergencyContact?.phone || "",
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyContact?.phone || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyContact: {
                              name: formData.emergencyContact?.name || "",
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={(e) =>
                        setFormData({ ...formData, medicalConditions: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) =>
                        setFormData({ ...formData, allergies: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? "Saving..." : "Save Health Card"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Health Card</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowForm(true)}>
                Edit Card
              </Button>
              <Button onClick={() => router.push("/health-card/view")}>
                View Card
              </Button>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">{healthCard.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Card</p>
                  <p className="font-semibold">{healthCard.idCard}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">{healthCard.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{healthCard.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold">{healthCard.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-semibold">{healthCard.bloodGroup || "N/A"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold">{healthCard.address}</p>
                </div>
                {healthCard.emergencyContact?.name && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency Contact</p>
                      <p className="font-semibold">{healthCard.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency Phone</p>
                      <p className="font-semibold">{healthCard.emergencyContact.phone}</p>
                    </div>
                  </>
                )}
                {healthCard.medicalConditions && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Medical Conditions</p>
                    <p className="font-semibold">{healthCard.medicalConditions}</p>
                  </div>
                )}
                {healthCard.allergies && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <p className="font-semibold">{healthCard.allergies}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}


