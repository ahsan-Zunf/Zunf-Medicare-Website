"use client";

import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle2, TrendingUp, Phone, Mail, Clock, ArrowRight, Users, Activity, Heart, Eye } from "lucide-react";
import Link from "next/link";

export default function CorporateHealthScreeningPage() {

  return (
    <div className="flex min-h-dvh flex-col bg-background">
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
              Healthy Employees = Thriving Business
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              ZUNF MEDICARE brings hospital-grade preventive health & nutrition screening directly to your workplace across Pakistan. Boost productivity, cut sick leaves, and show your team you truly care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/booking">
                  Book Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Corporate Health Screening */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Corporate Health Screening is a Smart Investment</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Investing in employee health is no longer optional — it's a competitive advantage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { benefit: "Higher Productivity", impact: "Employees with better nutrition & energy focus more" },
                { benefit: "Early Detection", impact: "Catch diabetes, hypertension, anemia before they become costly" },
                { benefit: "Reduced Absenteeism", impact: "Up to 30% drop in sick leaves (global studies)" },
                { benefit: "Lower Healthcare Costs", impact: "Preventive care saves 3–5x compared to treatment" },
                { benefit: "Stronger Employer Branding", impact: "Attract & retain talent with genuine wellness culture" },
                { benefit: "Tax Benefits & CSR Compliance", impact: "Qualifies under corporate social responsibility" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={`/contact?service=corporate-health-screening&program=${encodeURIComponent(item.benefit)}`}
                >
                  <Card className="p-4 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.benefit}</h3>
                    <p className="text-sm text-muted-foreground">{item.impact}</p>
                    <div className="mt-3 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Corporate Health Screening Packages</h2>
              <p className="text-lg text-muted-foreground">
                Customized for every level and budget. All tests done on-site with minimal disruption.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/contact?service=corporate-health-screening&program=Executive Health Package">
                <Card className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Executive Health Package</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">C-Level, Directors, Top Management</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Full Nutrition & Lifestyle Assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Lipid Profile + Fasting Blood Sugar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Vitamin D, B12, Calcium</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Thyroid (TSH, T3, T4 optional)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>ECG + Stress Test (optional)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Dental + Eye + ENT Check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>1-on-1 Doctor Consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Personalised Diet & Fitness Plan</span>
                    </li>
                  </ul>
                  <p className="text-lg font-semibold text-primary">PKR 8,000 – 15,000</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              <Link href="/contact?service=corporate-health-screening&program=Departmental Screening Package">
                <Card className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Departmental Screening Package</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Managers & Office Staff</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>BMI + Detailed Nutrition Assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Hemoglobin + Random Blood Sugar + BP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Vitamin D Risk Analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Lipid Profile (selective)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Eye & Dental Screening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Stress & Sleep Assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Group Counseling Session</span>
                    </li>
                  </ul>
                  <p className="text-lg font-semibold text-primary">PKR 2,500 – 4,500</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              <Link href="/contact?service=corporate-health-screening&program=On-Site Health Camp (Bulk)">
                <Card className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">On-Site Health Camp (Bulk)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">All Employees (100+ participants)</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>BMI & Basic Nutrition Check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Hemoglobin + Random Glucose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Blood Pressure & Oxygen Saturation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Dental + Vision + Hearing Quick Check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Posture & Basic Fitness Advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Fun Health Awareness Session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Digital Reports + HR Dashboard</span>
                    </li>
                  </ul>
                  <p className="text-lg font-semibold text-primary">PKR 1,200 – 2,000</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              *Minimum 25 participants for on-site camps | Bulk discounts up to 25% | Custom add-ons available (ECG, Bone Density, Cancer Markers, etc.)
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works – Hassle-Free Process</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Free Consultation Call", desc: "We understand your company size, concerns, and budget." },
                { step: "2", title: "Custom Proposal Within 24 Hours", desc: "Detailed plan with exact tests, date options, and pricing." },
                { step: "3", title: "We Come to Your Office", desc: "Full mobile team with equipment arrives at your preferred time (even weekends)." },
                { step: "4", title: "Quick & Private Screening", desc: "15–45 minutes per employee. Separate area for privacy." },
                { step: "5", title: "Instant Preliminary Results", desc: "Full Reports in 48 Hours - Individual PDF reports + consolidated anonymized HR dashboard." },
                { step: "6", title: "Follow-Up Support", desc: "Free doctor teleconsultations for abnormal results + nutrition workshops." },
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

        {/* Additional Services */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Corporate Wellness Services (Add-Ons)</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Monthly/Quarterly Health Challenges (steps, hydration, sugar-free)",
                "On-site Gym & Yoga Sessions",
                "Mental Health & Stress Management Workshops",
                "Flu Vaccination Drives",
                "Women's Health Program (PCOS, anemia, bone health)",
                "Ergonomics & Posture Training for desk jobs",
              ].map((service, idx) => (
                <Card key={idx} className="p-6 border-primary/20">
                  <CheckCircle2 className="h-5 w-5 text-primary mb-3" />
                  <p className="text-sm">{service}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Invest in Your Team's Health?</h2>
              <p className="text-lg text-muted-foreground">Let's design a wellness program that fits your company perfectly.</p>
            </div>

            <Card className="p-8 border-primary/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Phone className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Contact Number</p>
                  <p className="text-sm text-muted-foreground">03090622004</p>
                </div>
                <div>
                  <Mail className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">info@zunfmedicare.com</p>
                </div>
                <div>
                  <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">24×7 Helpline</p>
                  <p className="text-sm text-muted-foreground">03090622004</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                "We reply within 1 hour – even on weekends."
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

