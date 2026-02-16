import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { getHealthCard, createOrUpdateHealthCard, type CreateHealthCardPayload } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  XCircle,
  Percent,
  Activity,
  Home,
  Smile,
  Sparkles,
  Shield,
  FileText,
  Calendar,
  Users,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Mail
} from "lucide-react";

export default function HealthCardPage() {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
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
        navigate("/health-card/auth");
        return;
      }
      loadHealthCard();
    }
  }, [isAuthenticated, isLoading, token, navigate]);

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

  // Show comprehensive health card information and form when creating a new card
  if (showForm || !healthCard) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative w-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 py-20 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                ZUNF MEDICARE HEALTH CARD
                <span className="block text-lg md:text-xl font-normal mt-4 text-muted-foreground">
                  Structured Access to Discounted Healthcare Services
                </span>
              </h1>
            </div>
          </section>

          {/* Registration Form */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Health Card</h2>
                <p className="text-lg text-muted-foreground">Get started with your digital health card today</p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Registration Form</CardTitle>
                  <CardDescription>
                    Step 1: Register via ZUNF MEDICARE and provide basic identification details
                  </CardDescription>
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
                    <Button type="submit" className="w-full" disabled={saving} size="lg">
                      {saving ? (
                        "Creating Health Card..."
                      ) : (
                        <>
                          Register & Get Health Card
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What the Health Card Is */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What the Health Card Is</h2>
              </div>
              <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>A healthcare discount and access card</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Designed to reduce routine healthcare expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Applicable only at ZUNF MEDICARE partner facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Valid across Pakistan (partner-dependent)</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* What the Health Card Is NOT */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What the Health Card Is NOT</h2>
              </div>
              <Card className="p-6 border-primary/20">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Not a health insurance policy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Not a reimbursement or cashback program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Not applicable for emergency hospital admissions</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Key Benefits & Discounts */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits & Discounts</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Percent className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Diagnostics (Up to 40% Discount)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Blood Testing: Up to 40%</li>
                    <li>• Routine & specialized lab investigations</li>
                    <li>• Discounts applied at partner laboratories only</li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Radiology Services (Up to 25% Discount)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• X-Ray</li>
                    <li>• Ultrasound</li>
                    <li>• Other diagnostic imaging (partner-dependent)</li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Home Patient Care Services (Up to 25% Discount)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Home nursing services</li>
                    <li>• Medical attendants</li>
                    <li>• Elderly care at home</li>
                    <li>• Physiotherapy at home</li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Smile className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Dentistry Services (Up to 20% Discount)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Dental consultations</li>
                    <li>• Basic dental procedures</li>
                    <li>• Preventive dental care</li>
                    <li className="text-xs">(Excludes advanced surgical procedures unless stated)</li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Aesthetic Services (Up to 25% Discount)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Non-invasive aesthetic treatments</li>
                    <li>• Skin and cosmetic care services</li>
                    <li className="text-xs">(Service availability varies by partner)</li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">Preventive Healthcare Access</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Eligibility for structured health screening programs</li>
                    <li>• Student and institutional screening initiatives</li>
                    <li>• Standardized health reports where applicable</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Eligibility, Validity & Coverage Limitations */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Eligibility</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span>Individual card holders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span>Students under registered institutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span>Families (only if issued as a family card)</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Validity & Usage</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-primary mt-0.5" />
                      <span>Valid for 12 months from activation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-0.5" />
                      <span>Non-transferable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-0.5" />
                      <span>Valid CNIC / B-Form required for verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Discounts subject to partner availability</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="mt-8 p-6 border-primary/20 bg-destructive/5">
                <h3 className="text-xl font-semibold mb-4">Coverage Limitations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <span>Applicable only at authorized ZUNF MEDICARE partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <span>Discount percentage may vary by service and location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <span>Medicines purchased externally are not covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <span>Emergency services are excluded</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Booking & Usage Procedure */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Booking & Usage Procedure</h2>
              </div>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  {
                    step: "1",
                    title: "Registration",
                    desc: "Register via ZUNF MEDICARE. Provide basic identification details."
                  },
                  {
                    step: "2",
                    title: "Card Issuance",
                    desc: "Digital Health Card issued. Unique Health Card ID assigned."
                  },
                  {
                    step: "3",
                    title: "Appointment Booking",
                    desc: "Book services via Phone or Website. Mention Health Card ID, required service, preferred partner/location."
                  },
                  {
                    step: "4",
                    title: "Service Verification",
                    desc: "Card validity verified at partner facility. ID verification mandatory."
                  },
                  {
                    step: "5",
                    title: "Avail Discounted Service",
                    desc: "Discount applied at billing counter. Payment made directly to service provider."
                  },
                ].map((item) => (
                  <Card key={item.step} className="p-6 border-primary/20 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Data & Privacy</h2>
              </div>
              <Card className="p-6 border-primary/20">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Patient data handled under confidentiality protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Data accessed only with consent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>No third-party data sharing without legal obligation</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Support & Final Note */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <Card className="p-8 border-primary/20">
                <h3 className="text-xl font-semibold mb-6">Support & Assistance</h3>
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href="tel:923090622004" className="text-sm text-muted-foreground hover:text-primary">
                        03090622004
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <a href="mailto:info@zunfmedicare.com" className="text-sm text-muted-foreground hover:text-primary">
                        info@zunfmedicare.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Final Note:</strong> The ZUNF MEDICARE Health Card is a cost-reduction and access tool for planned healthcare services. It offers structured discounts, not unlimited coverage.
                  </p>
                </div>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Existing card view (when user already has a card)
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
              <Button onClick={() => navigate("/health-card/view")}>
                View & Download Card
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
                  <p className="text-sm text-muted-foreground">CNIC / B-Form</p>
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
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-semibold">{healthCard.gender || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-semibold">{healthCard.bloodGroup || "N/A"}</p>
                </div>
                {healthCard.organizationName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Name</p>
                    <p className="font-semibold">{healthCard.organizationName}</p>
                  </div>
                )}
                {healthCard.employeeId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Employee ID</p>
                    <p className="font-semibold">{healthCard.employeeId}</p>
                  </div>
                )}
                {healthCard.healthCardNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Health Card Number</p>
                    <p className="font-semibold">{healthCard.healthCardNumber}</p>
                  </div>
                )}
                {healthCard.issueDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-semibold">{new Date(healthCard.issueDate).toLocaleDateString()}</p>
                  </div>
                )}
                {healthCard.validity && (
                  <div>
                    <p className="text-sm text-muted-foreground">Validity</p>
                    <p className="font-semibold">{new Date(healthCard.validity).toLocaleDateString()}</p>
                  </div>
                )}
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
                {healthCard.qrCode && (
                  <div className="md:col-span-2 flex flex-col items-center justify-center pt-4">
                    <p className="text-sm text-muted-foreground mb-2">QR Code</p>
                    <img
                      src={healthCard.qrCode}
                      alt="Health Card QR Code"
                      className="w-32 h-32 object-contain border border-gray-200 rounded p-2"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What the Health Card Is */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What the Health Card Is</h2>
            </div>
            <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>A healthcare discount and access card</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Designed to reduce routine healthcare expenses</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Applicable only at ZUNF MEDICARE partner facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Valid across Pakistan (partner-dependent)</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* What the Health Card Is NOT */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What the Health Card Is NOT</h2>
            </div>
            <Card className="p-6 border-primary/20">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Not a health insurance policy</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Not a reimbursement or cashback program</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Not applicable for emergency hospital admissions</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Key Benefits & Discounts */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits & Discounts</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Diagnostics (Up to 40% Discount)</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Blood Testing: Up to 40%</li>
                  <li>• Routine & specialized lab investigations</li>
                  <li>• Discounts applied at partner laboratories only</li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Radiology Services (Up to 25% Discount)</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• X-Ray</li>
                  <li>• Ultrasound</li>
                  <li>• Other diagnostic imaging (partner-dependent)</li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Home Patient Care Services (Up to 25% Discount)</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Home nursing services</li>
                  <li>• Medical attendants</li>
                  <li>• Elderly care at home</li>
                  <li>• Physiotherapy at home</li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Smile className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Dentistry Services (Up to 20% Discount)</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dental consultations</li>
                  <li>• Basic dental procedures</li>
                  <li>• Preventive dental care</li>
                  <li className="text-xs">(Excludes advanced surgical procedures unless stated)</li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Aesthetic Services (Up to 25% Discount)</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Non-invasive aesthetic treatments</li>
                  <li>• Skin and cosmetic care services</li>
                  <li className="text-xs">(Service availability varies by partner)</li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Preventive Healthcare Access</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Eligibility for structured health screening programs</li>
                  <li>• Student and institutional screening initiatives</li>
                  <li>• Standardized health reports where applicable</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Eligibility, Validity & Coverage Limitations */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Eligibility</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Individual card holders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Students under registered institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Families (only if issued as a family card)</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Validity & Usage</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-primary mt-0.5" />
                    <span>Valid for 12 months from activation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary mt-0.5" />
                    <span>Non-transferable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <span>Valid CNIC / B-Form required for verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                    <span>Discounts subject to partner availability</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="mt-8 p-6 border-primary/20 bg-destructive/5">
              <h3 className="text-xl font-semibold mb-4">Coverage Limitations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <span>Applicable only at authorized ZUNF MEDICARE partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <span>Discount percentage may vary by service and location</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <span>Medicines purchased externally are not covered</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <span>Emergency services are excluded</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Booking & Usage Procedure */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Booking & Usage Procedure</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: "1",
                  title: "Registration",
                  desc: "Register via ZUNF MEDICARE. Provide basic identification details."
                },
                {
                  step: "2",
                  title: "Card Issuance",
                  desc: "Digital Health Card issued. Unique Health Card ID assigned."
                },
                {
                  step: "3",
                  title: "Appointment Booking",
                  desc: "Book services via Phone or Website. Mention Health Card ID, required service, preferred partner/location."
                },
                {
                  step: "4",
                  title: "Service Verification",
                  desc: "Card validity verified at partner facility. ID verification mandatory."
                },
                {
                  step: "5",
                  title: "Avail Discounted Service",
                  desc: "Discount applied at billing counter. Payment made directly to service provider."
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 border-primary/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Data & Privacy</h2>
            </div>
            <Card className="p-6 border-primary/20">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Patient data handled under confidentiality protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Data accessed only with consent</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No third-party data sharing without legal obligation</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Support & Final Note */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Card className="p-8 border-primary/20">
              <h3 className="text-xl font-semibold mb-6">Support & Assistance</h3>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a href="tel:923090622004" className="text-sm text-muted-foreground hover:text-primary">
                      03090622004
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email Support</p>
                    <a href="mailto:info@zunfmedicare.com" className="text-sm text-muted-foreground hover:text-primary">
                      info@zunfmedicare.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  <strong>Final Note:</strong> The ZUNF MEDICARE Health Card is a cost-reduction and access tool for planned healthcare services. It offers structured discounts, not unlimited coverage.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
