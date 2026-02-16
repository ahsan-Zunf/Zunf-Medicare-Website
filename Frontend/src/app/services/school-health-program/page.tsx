"use client";

import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Users, Phone, Mail, Clock, ArrowRight, Eye, Ear, Stethoscope, Activity, Heart } from "lucide-react";
import Link from "next/link";

export default function SchoolHealthProgramPage() {

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
              Empowering Pakistan's Future:
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
                School Health & Nutrition Screening Programs
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Malnutrition, anemia, obesity, and vitamin deficiencies are impacting millions of students in Pakistan. ZUNF MEDICARE's School Health Program prioritizes nutrition screening alongside comprehensive, non-invasive health checks (ENT, eye, dental, hearing, and physical exams) to build a healthier generation – right at your school.
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

        {/* Why Choose */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ZUNF MEDICARE's School Health Program?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                At ZUNF MEDICARE, we partner with schools across Pakistan to deliver affordable, on-site health screenings that focus on early detection and prevention. Our programs are designed by pediatricians and nutritionists to address common issues like anemia, vitamin deficiencies, and growth delays, helping students perform better academically and physically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Early detection of nutrition issues to improve concentration and learning",
                "Non-invasive checks to minimize disruption to school routines",
                "Parental reports and follow-up recommendations",
                "Compliance with Pakistan's health guidelines for educational institutions",
                "Affordable packages starting from PKR 500 per student (group discounts for large schools)",
                "Certified medical team with child-friendly approaches",
              ].map((benefit, idx) => (
                <Card key={idx} className="p-6 border-primary/20">
                  <CheckCircle2 className="h-6 w-6 text-primary mb-3" />
                  <p className="text-sm">{benefit}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nutrition Screening */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nutrition Screening is Essential</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Malnutrition silently affects millions of Pakistani students. Our program emphasizes nutrition to:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 border-primary/20">
                <ul className="space-y-3">
                  {[
                    "Detect anemia & iron deficiency early",
                    "Identify Vitamin D & calcium deficiencies",
                    "Address obesity & underweight risks",
                    "Improve concentration, memory, and school performance",
                    "Prevent lifestyle diseases (diabetes, hypertension) from an early age",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-semibold mb-4">Impact Stats (Pakistan-Specific):</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Over 40% of children under 5 are stunted (WHO data)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Anemia affects 50%+ of school-age kids</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Early intervention can boost academic scores by 15-20%</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Check */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Check in Every School Screening</h2>
              <p className="text-lg text-muted-foreground">
                Our comprehensive screenings are quick (15-20 mins per student) and conducted on-school premises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Activity, title: "Nutrition & Growth Assessment", desc: "BMI, weight-for-age, height-for-age, waist-to-hip ratio, Diet analysis questionnaire" },
                { icon: Stethoscope, title: "ENT Screening", desc: "Ear, nose, throat check for infections/allergies" },
                { icon: Eye, title: "Eye (Ophthalmology) Screening", desc: "Vision chart, color blindness, squint detection" },
                { icon: Heart, title: "Dental Screening", desc: "Oral hygiene, cavities, gum health" },
                { icon: Ear, title: "Hearing Test", desc: "Whisper test / basic audiology (if required)" },
                { icon: Users, title: "General Physical Exam", desc: "Posture, scoliosis, vitals (BP, pulse, respiration)" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={`/contact?service=school-health-program&program=${encodeURIComponent(item.title)}`}
                >
                  <Card className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card hover:bg-primary/5">
                    <item.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our School Health Packages</h2>
              <p className="text-lg text-muted-foreground">
                Tailored for different age groups, our packages ensure age-appropriate checks. All include nutrition focus + basic screenings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Foundation Package",
                  grades: "KG to Grade 2",
                  inclusions: "BMI & Growth Assessment, Vision & Hearing check, Dental cavity & gum check, ENT exam, Nutrition questionnaire for parents",
                  price: "500-700"
                },
                {
                  name: "Junior Package",
                  grades: "Grades 3 to 5",
                  inclusions: "All Foundation services + Hemoglobin (anemia test – finger prick), Vitamin D risk analysis, Random Blood Glucose (risk-based), Nutrition counseling",
                  price: "800-1,000"
                },
                {
                  name: "Middle School Package",
                  grades: "Grades 6 to 8",
                  inclusions: "All Junior services + Full Blood Count (CBC selective), Basic allergy screening, Posture & scoliosis check, Group health education session",
                  price: "1,200-1,500"
                },
                {
                  name: "Senior Package",
                  grades: "Grades 9 to 12",
                  inclusions: "All Middle School services + Fasting Blood Sugar (optional), Complete Lipid Profile, Thyroid Function Test (TSH selective), Detailed nutrition & lifestyle counseling, Musculoskeletal risk evaluation",
                  price: "1,800-2,200"
                },
              ].map((pkg, idx) => (
                <Card key={idx} className="p-6 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3 text-primary">{pkg.name}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div>
                      <span className="font-medium text-foreground">Target Grades:</span>
                      <p className="text-muted-foreground">{pkg.grades}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Key Inclusions:</span>
                      <p className="text-muted-foreground">{pkg.inclusions}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <span className="text-lg font-bold text-primary">PKR {pkg.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">per student</span>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              (Custom packages available for special needs or large schools. Bulk discounts: 10% off for 100+ students.)
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works – Simple Process for Schools</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Initial Consultation", desc: "Free call/meeting with school admin to assess needs and customize the program." },
                { step: "2", title: "Scheduling & Setup", desc: "We handle permissions, parental consent forms, and on-site setup (1-2 days per school)." },
                { step: "3", title: "Screening Day", desc: "Our team arrives with equipment; screenings done class-wise with minimal disruption." },
                { step: "4", title: "Reports & Follow-Ups", desc: "Individual student reports sent to parents within 7 days + school summary report." },
                { step: "5", title: "Ongoing Support", desc: "Annual re-screenings, nutrition workshops, and teacher training on health awareness." },
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

        {/* Contact Form */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bring Health to Your School? Contact Us Today</h2>
              <p className="text-lg text-muted-foreground">Take the first step toward a healthier student body.</p>
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
                "We respond within 1 hour – let's schedule your free demo!"
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

