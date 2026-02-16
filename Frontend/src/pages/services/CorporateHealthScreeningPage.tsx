import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Accordion } from "@/components/ui/accordion";
import { Packages } from "@/components/sections/packages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Download,
  MessageCircle,
  TrendingUp,
  Users,
  Building2,
  Heart,
  Activity,
  Award,
  FileText,
  BarChart3,
  Dumbbell,
  Brain,
  Shield,
  Smile
} from "lucide-react";
import { Link } from "react-router-dom";

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
                <Link to="/contact?service=corporate-health-screening">
                  Book a Corporate Health Camp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Corporate Health Screening is a Smart Investment */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Corporate Health Screening is a Smart Investment</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Investing in employee health is no longer optional — it's a competitive advantage.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-primary/20 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-primary/20 p-4 text-left font-semibold">Benefit</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Business Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Higher Productivity</td>
                    <td className="border border-primary/20 p-4 text-sm">Employees with better nutrition & energy focus more</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Early Detection</td>
                    <td className="border border-primary/20 p-4 text-sm">Catch diabetes, hypertension, anemia before they become costly</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Reduced Absenteeism</td>
                    <td className="border border-primary/20 p-4 text-sm">Up to 30% drop in sick leaves (global studies)</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Lower Healthcare Costs</td>
                    <td className="border border-primary/20 p-4 text-sm">Preventive care saves 3–5x compared to treatment</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Stronger Employer Branding</td>
                    <td className="border border-primary/20 p-4 text-sm">Attract & retain talent with genuine wellness culture</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Tax Benefits & CSR Compliance</td>
                    <td className="border border-primary/20 p-4 text-sm">Qualifies under corporate social responsibility</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Our Corporate Health Screening Packages */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Corporate Health Screening Packages</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Customized for every level and budget. All tests done on-site with minimal disruption.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-primary/20 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-primary/20 p-4 text-left font-semibold">Package Name</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Best For</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Key Inclusions</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Price per Person (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Executive Health Package</td>
                    <td className="border border-primary/20 p-4">C-Level, Directors, Top Management</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      • Full Nutrition & Lifestyle Assessment<br />
                      • Lipid Profile + Fasting Blood Sugar<br />
                      • Vitamin D, B12, Calcium<br />
                      • Thyroid (TSH, T3, T4 optional)<br />
                      • ECG + Stress Test (optional)<br />
                      • Dental + Eye + ENT Check<br />
                      • 1-on-1 Doctor Consultation<br />
                      • Personalised Diet & Fitness Plan
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">8,000 – 15,000</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Departmental Screening Package</td>
                    <td className="border border-primary/20 p-4">Managers & Office Staff</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      • BMI + Detailed Nutrition Assessment<br />
                      • Hemoglobin + Random Blood Sugar + BP<br />
                      • Vitamin D Risk Analysis<br />
                      • Lipid Profile (selective)<br />
                      • Eye & Dental Screening<br />
                      • Stress & Sleep Assessment<br />
                      • Group Counseling Session
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">2,500 – 4,500</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">On-Site Health Camp (Bulk)</td>
                    <td className="border border-primary/20 p-4">All Employees (100+ participants)</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      • BMI & Basic Nutrition Check<br />
                      • Hemoglobin + Random Glucose<br />
                      • Blood Pressure & Oxygen Saturation<br />
                      • Dental + Vision + Hearing Quick Check<br />
                      • Posture & Basic Fitness Advice<br />
                      • Fun Health Awareness Session<br />
                      • Digital Reports + HR Dashboard
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">1,200 – 2,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-muted-foreground text-sm">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Free Consultation Call",
                  desc: "We understand your company size, concerns, and budget."
                },
                {
                  step: "2",
                  title: "Custom Proposal Within 24 Hours",
                  desc: "Detailed plan with exact tests, date options, and pricing."
                },
                {
                  step: "3",
                  title: "We Come to Your Office",
                  desc: "Full mobile team with equipment arrives at your preferred time (even weekends)."
                },
                {
                  step: "4",
                  title: "Quick & Private Screening",
                  desc: "15–45 minutes per employee. Separate area for privacy."
                },
                {
                  step: "5",
                  title: "Instant Preliminary Results + Full Reports in 48 Hours",
                  desc: "Individual PDF reports + consolidated anonymized HR dashboard (Excel/Power BI)."
                },
                {
                  step: "6",
                  title: "Follow-Up Support",
                  desc: "Free doctor teleconsultations for abnormal results + nutrition workshops."
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Corporate Wellness Services */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Corporate Wellness Services (Add-Ons)</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Monthly/Quarterly Health Challenges", desc: "Steps, hydration, sugar-free challenges", icon: TrendingUp },
                { title: "On-site Gym & Yoga Sessions", desc: "Regular fitness sessions at your workplace", icon: Dumbbell },
                { title: "Mental Health & Stress Management Workshops", desc: "Professional counseling and stress relief programs", icon: Brain },
                { title: "Flu Vaccination Drives", desc: "Seasonal vaccination programs for all employees", icon: Shield },
                { title: "Women's Health Program", desc: "PCOS, anemia, bone health screening and counseling", icon: Heart },
                { title: "Ergonomics & Posture Training", desc: "Desk job ergonomics and posture correction", icon: Activity },
              ].map((service, idx) => (
                <Card key={idx} className="p-6 border-primary/20">
                  <div className="flex items-start gap-3">
                    <service.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted by Leading Organizations */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Leading Organizations in Pakistan</h2>
            </div>

            <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                {[
                  "Bank Alfalah",
                  "Engro",
                  "Packages Group",
                  "Nestlé Pakistan",
                  "Jazz",
                  "Foodpanda",
                  "Daraz",
                  "Philip Morris",
                  "Siemens",
                  "Local Pharma Companies",
                ].map((company, idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    <p className="text-sm font-medium text-muted-foreground">{company}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                & Many More
              </p>
            </Card>
          </div>
        </section>

        {/* Health Packages Section */}
        <section className="py-16 md:py-24">
          <Packages />
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Corporate Clients Say</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "ZUNF's Executive Package caught my prediabetes early. The diet plan actually worked!"
                </p>
                <p className="text-sm font-medium text-foreground">– CEO, Leading FMCG Company, Lahore</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "We ran a 350-employee camp in Karachi. Reports were professional and the HR dashboard is super useful."
                </p>
                <p className="text-sm font-medium text-foreground">– Head of HR, Multinational Bank</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Best ROI we've seen – sick leaves dropped 28% in 6 months after the program."
                </p>
                <p className="text-sm font-medium text-foreground">– Wellness Lead, Telecom Giant</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Excellent service and very professional team. The reports helped us identify health trends in our workforce."
                </p>
                <p className="text-sm font-medium text-foreground">– HR Director, Manufacturing Company</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The executive health package was comprehensive and convenient. Great value for money."
                </p>
                <p className="text-sm font-medium text-foreground">– Director, IT Company, Islamabad</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Our employees really appreciated the on-site health camp. Minimal disruption, maximum benefit."
                </p>
                <p className="text-sm font-medium text-foreground">– Operations Manager, Service Industry</p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Answers to common questions about corporate wellness and employee health screening in Pakistan.</p>
            </div>

            <Accordion
              items={[
                {
                  title: "What are the benefits of corporate health screening for companies in Pakistan?",
                  content: "Corporate health screenings lead to a healthier, more productive workforce, reduced absenteeism, and lower long-term healthcare costs. It also boosts employee morale and demonstrates the company's commitment to their well-being."
                },
                {
                  title: "Can we customize the health screening package for our employees?",
                  content: "Yes, Zunf Medicare offers fully customizable packages. You can choose specific tests (e.g., cardiac markers, diabetes screening, executive checkups) based on the demographics and needs of your workforce."
                },
                {
                  title: "Is on-site sample collection available for offices?",
                  content: "Yes, we organize on-site health camps where our phlebotomists and medical team visit your office for sample collection and basic checkups, minimizing work disruption for your employees."
                },
                {
                  title: "Are digital reports provided for employees?",
                  content: "Yes, each employee receives a confidential digital health report via email. We also provide a consolidated company health report (anonymized) to helping HR understand the overall health trends of the organization."
                },
                {
                  title: "Do you offer pre-employment health screening?",
                  content: "Yes, we provide comprehensive pre-employment medical checkups to ensure new hires are fit for their roles, complying with industry standards and safety regulations."
                },
                {
                  title: "How do you ensure the privacy of employee health data?",
                  content: "We strictly adhere to data privacy regulations. Individual health reports are shared confidentially only with the employee. The employer receives an anonymized aggregate report unless specific consent is given for individual sharing."
                },
              ]}
            />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
