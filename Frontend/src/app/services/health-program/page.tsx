"use client";

import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CheckCircle2, Users, Phone, Mail, Clock, ArrowRight, Stethoscope, Activity, Pill, Calendar, MessageCircle, Quote, Building2, Award, Microscope, PillBottle, TestTube2, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createLead } from "@/lib/api";
import { useToast } from "@/contexts/toast-context";

export default function HealthProgramPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    contactNumber: "",
    city: "",
    program: "",
    message: "",
  });

  const healthPrograms = [
    "Post-Surgery Recovery Program",
    "Stroke Rehabilitation Program",
    "Cancer Care at Home Program",
    "Diabetes Gold Program",
    "Cardiac Rehab Program",
    "Elderly Wellness Program",
    "Critical Care Transition",
    "Custom Program",
  ];

  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createLead({
        name: formData.patientName,
        phone: formData.contactNumber,
        email: "no-email-provided@zunf.com", // Placeholder if not in form
        message: formData.message,
        serviceType: `Health Program: ${formData.program || "General"}`,
      });

      showToast("Thank you! Your enrollment request has been received.", "success");
      setFormData({
        patientName: "",
        contactNumber: "",
        city: "",
        program: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      showToast("Failed to submit request. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactClick = () => {
    // Redirect to contact page
    window.location.href = "/contact?service=health-program";
  };

  const ContactForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="patientName">Patient Name *</Label>
        <Input
          id="patientName"
          placeholder="Enter patient name"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          id="contactNumber"
          type="tel"
          placeholder="03001234567"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="program">Which Health Program are you interested in?</Label>
        <select
          id="program"
          value={formData.program}
          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
          className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
        >
          <option value="">Select a program</option>
          {healthPrograms.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Any message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your requirements..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="mt-1 resize-none"
        />
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        {isLoading ? "Submitting..." : "Submit Enrollment Request"}
      </Button>
    </form>
  );

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
              Comprehensive Health Programs
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
                Tailored for Your Home
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              From recovery to lifelong wellness – Zunf Medicare's structured Health Programs bring hospital-grade care plans directly to your doorstep so you or your loved ones can heal, manage, and thrive at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/contact?service=health-program">
                  Enroll in a Health Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What Are Health Programs */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Are Zunf Medicare Health Programs?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Zunf Medicare Health Programs are fixed-duration or ongoing structured care packages designed by doctors and clinical heads for specific medical needs. Each program combines skilled nursing, doctor visits, physiotherapy, diagnostics, equipment, and regular monitoring – all coordinated under one care manager.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Why choose a Health Program instead of individual services?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>One fixed monthly/quarterly price (transparent & affordable)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Single point of contact (dedicated Care Manager)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Guaranteed visit schedule & protocol adherence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Regular doctor reviews & progress reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>24×7 emergency coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Family app/dashboard for updates</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Comprehensive Care</h3>
                </div>
                <p className="text-muted-foreground">
                  Our programs integrate multiple healthcare services under one coordinated plan, ensuring seamless care delivery and better health outcomes for patients and peace of mind for families.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Programs */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Most Popular Health Programs</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Post-Surgery Recovery Program",
                  bestFor: "Joint replacement, cardiac, general surgery",
                  duration: "30 / 60 / 90 days",
                  inclusions: "Skilled nursing, physio, wound care, doctor visits, equipment, daily monitoring"
                },
                {
                  name: "Stroke Rehabilitation Program",
                  bestFor: "Post-stroke patients",
                  duration: "90 days – 12 months",
                  inclusions: "Neuro-physio, speech therapy, nursing, occupational therapy, family training"
                },
                {
                  name: "Cancer Care at Home Program",
                  bestFor: "Chemotherapy / palliative cancer care",
                  duration: "Flexible (weekly cycles)",
                  inclusions: "Chemo administration (where permitted), pain management, palliative nursing"
                },
                {
                  name: "Diabetes Gold Program",
                  bestFor: "Uncontrolled or new-onset diabetes",
                  duration: "3 / 6 / 12 months",
                  inclusions: "Endocrinologist visits, dietitian, daily glucose tracking, foot care, education"
                },
                {
                  name: "Cardiac Rehab Program",
                  bestFor: "Post-heart attack / heart failure",
                  duration: "90 days – lifelong",
                  inclusions: "Cardiac nursing, physio, BP & ECG monitoring, lifestyle coaching"
                },
                {
                  name: "Elderly Wellness Program",
                  bestFor: "Seniors wanting regular checkups",
                  duration: "Monthly / Quarterly",
                  inclusions: "Monthly doctor visit, annual health checkup package, physio, vaccination"
                },
                {
                  name: "Critical Care Transition",
                  bestFor: "ICU discharge to home",
                  duration: "First 30–60 days",
                  inclusions: "Ventilator/CPAP management, tracheostomy care, 12–24 hr nursing"
                },
              ].map((program, idx) => (
                <Link
                  key={idx}
                  href={`/contact?service=health-program&program=${encodeURIComponent(program.name)}`}
                >
                  <Card className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5">
                    <h3 className="text-lg font-semibold mb-3 text-primary group-hover:text-primary/90 transition-colors">{program.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-foreground">Best For:</span>
                        <p className="text-muted-foreground">{program.bestFor}</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Duration:</span>
                        <p className="text-muted-foreground">{program.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Key Inclusions:</span>
                        <p className="text-muted-foreground">{program.inclusions}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <p className="text-center mt-6 text-muted-foreground">(Custom programs also available)</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works – Simple 4-Step Process</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Free Assessment Call", desc: "Our Care Manager understands the patient's condition, doctor's advice, and family needs." },
                { step: "2", title: "Personalized Program Design", desc: "Within 24 hours you receive a detailed program brochure with exact visits, cost, and timeline." },
                { step: "3", title: "Program Starts at Home", desc: "Team arrives on the agreed date with all equipment & medicines. Care Manager does a home orientation." },
                { step: "4", title: "Regular Reviews & Reports", desc: "Fortnightly doctor review + monthly family meeting. You can upgrade/downgrade anytime." },
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

        {/* Collaborators & Clinical Partners */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collaborators & Clinical Partners</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We work only with trusted names so you get the best care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Visiting Consultants</h3>
                    <p className="text-sm text-muted-foreground">
                      From Apollo, Fortis, Max & Medanta
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Activity className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Physiotherapists</h3>
                    <p className="text-sm text-muted-foreground">
                      Certified by Indian Association of Physiotherapists
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <TestTube2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Diagnostics Partners</h3>
                    <p className="text-sm text-muted-foreground">
                      Thyrocare, SRL & Metropolis (home collection)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Stethoscope className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Equipment Partners</h3>
                    <p className="text-sm text-muted-foreground">
                      Philips Respironics, BPL Medical, Ozocheck
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Pill className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Pharmacy Partners</h3>
                    <p className="text-sm text-muted-foreground">
                      24×7 Pharmacy partners for emergency medicines
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Families Say</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "After my mother's knee replacement, the 60-day Post-Surgery Program was a lifesaver. Everything was planned – no running around."
                </p>
                <p className="text-sm font-medium text-foreground">– Mrs. Sharma, Gurgaon</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The Diabetes Gold Program brought my father's HbA1c from 10.2 to 6.8 in just 4 months. The dietitian and nurse became like family."
                </p>
                <p className="text-sm font-medium text-foreground">– Mr. Ahmed, Noida</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start? Get Your Free Consultation Today</h2>
              <p className="text-lg text-muted-foreground">Take the first step toward stress-free home care.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-primary/20">
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                <ContactForm />
              </Card>

              <div className="space-y-6">
                <Card className="p-6 border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Contact Number</p>
                        <a href="tel:923090622004" className="text-sm text-muted-foreground hover:text-primary">
                          03090622004
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a href="mailto:info@zunfmedicare.com" className="text-sm text-muted-foreground hover:text-primary">
                          info@zunfmedicare.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">24×7 Helpline</p>
                        <a href="tel:1800XYZABCD" className="text-sm text-muted-foreground hover:text-primary">
                          1800-XYZ-ABCD
                        </a>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-6 italic">
                    "We reply within 30 minutes – even at night."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

