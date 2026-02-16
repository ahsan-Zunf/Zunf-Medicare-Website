import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Download,
  Eye,
  Ear,
  Heart,
  Smile,
  Activity,
  Scale,
  FileText,
  Building2,
  Award,
  TestTube2,
  Stethoscope,
  Users,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

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
                <Link to="/contact?service=school-health-program">
                  Schedule a School Screening
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose ZUNF MEDICARE's School Health Program */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ZUNF MEDICARE's School Health Program?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                At ZUNF MEDICARE, we partner with schools across Pakistan to deliver affordable, on-site health screenings that focus on early detection and prevention. Our programs are designed by pediatricians and nutritionists to address common issues like anemia, vitamin deficiencies, and growth delays, helping students perform better academically and physically.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Key Benefits for Schools & Students</h3>
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
          </div>
        </section>

        {/* Why Nutrition Screening is Essential */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nutrition Screening is Essential</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Malnutrition silently affects millions of Pakistani students. Our program emphasizes nutrition to:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 border-primary/20">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Detect anemia & iron deficiency early</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Identify Vitamin D & calcium deficiencies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Address obesity & underweight risks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Improve concentration, memory, and school performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Prevent lifestyle diseases (diabetes, hypertension) from an early age</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Impact Stats (Pakistan-Specific)
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">•</span>
                    <span>Over 40% of children under 5 are stunted (WHO data)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">•</span>
                    <span>Anemia affects 50%+ of school-age kids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">•</span>
                    <span>Early intervention can boost academic scores by 15-20%</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Check in Every School Screening */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Check in Every School Screening</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive screenings are quick (15-20 mins per student) and conducted on-school premises. Here's the breakdown:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Nutrition & Growth Assessment (Priority)",
                  icon: Scale,
                  items: [
                    "BMI, weight-for-age, height-for-age, waist-to-hip ratio",
                    "Diet analysis questionnaire"
                  ]
                },
                {
                  title: "ENT Screening",
                  icon: Ear,
                  items: [
                    "Ear, nose, throat check for infections/allergies"
                  ]
                },
                {
                  title: "Eye (Ophthalmology) Screening",
                  icon: Eye,
                  items: [
                    "Vision chart, color blindness, squint detection"
                  ]
                },
                {
                  title: "Dental Screening",
                  icon: Smile,
                  items: [
                    "Oral hygiene, cavities, gum health"
                  ]
                },
                {
                  title: "Hearing Test",
                  icon: Ear,
                  items: [
                    "Whisper test / basic audiology (if required)"
                  ]
                },
                {
                  title: "General Physical Exam",
                  icon: Activity,
                  items: [
                    "Posture, scoliosis, vitals (BP, pulse, respiration)"
                  ]
                },
              ].map((check, idx) => (
                <Card key={idx} className="p-6 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <check.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">{check.title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {check.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our School Health Packages */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our School Health Packages</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Tailored for different age groups, our packages ensure age-appropriate checks. All include nutrition focus + basic screenings. Blood tests are optional and minimally invasive (finger prick).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-primary/20 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-primary/20 p-4 text-left font-semibold">Package Name</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Target Grades</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Key Inclusions</th>
                    <th className="border border-primary/20 p-4 text-left font-semibold">Price per Student (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Foundation Package</td>
                    <td className="border border-primary/20 p-4">KG to Grade 2</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      BMI & Growth Assessment, Vision & Hearing check, Dental cavity & gum check, ENT exam, Nutrition questionnaire for parents
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">500-700</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Junior Package</td>
                    <td className="border border-primary/20 p-4">Grades 3 to 5</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      All Foundation services + Hemoglobin (anemia test – finger prick), Vitamin D risk analysis (diet + lifestyle survey), Random Blood Glucose (risk-based), Nutrition counseling
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">800-1,000</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Middle School Package</td>
                    <td className="border border-primary/20 p-4">Grades 6 to 8</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      All Junior services + Full Blood Count (CBC selective), Basic allergy screening, Posture & scoliosis check, Group health education session
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">1,200-1,500</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="border border-primary/20 p-4 font-medium">Senior Package</td>
                    <td className="border border-primary/20 p-4">Grades 9 to 12</td>
                    <td className="border border-primary/20 p-4 text-sm">
                      All Middle School services + Fasting Blood Sugar (optional), Complete Lipid Profile (cholesterol, HDL/LDL, triglycerides), Thyroid Function Test (TSH selective), Detailed nutrition & lifestyle counseling, Musculoskeletal risk evaluation
                    </td>
                    <td className="border border-primary/20 p-4 font-semibold text-primary">1,800-2,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-muted-foreground text-sm">
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
                {
                  step: "1",
                  title: "Initial Consultation",
                  desc: "Free call/meeting with school admin to assess needs and customize the program."
                },
                {
                  step: "2",
                  title: "Scheduling & Setup",
                  desc: "We handle permissions, parental consent forms, and on-site setup (1-2 days per school)."
                },
                {
                  step: "3",
                  title: "Screening Day",
                  desc: "Our team arrives with equipment; screenings done class-wise with minimal disruption."
                },
                {
                  step: "4",
                  title: "Reports & Follow-Ups",
                  desc: "Individual student reports sent to parents within 7 days + school summary report. Optional follow-up clinics."
                },
                {
                  step: "5",
                  title: "Ongoing Support",
                  desc: "Annual re-screenings, nutrition workshops, and teacher training on health awareness."
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

        {/* Additional Services */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services Integrated with School Programs</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Blood Testing", desc: "On-site labs for anemia, glucose, vitamins (add-on)", icon: TestTube2 },
                { title: "Nutritional Services", desc: "Dietitian-led workshops for students/parents", icon: Heart },
                { title: "Corporate Health Screening", desc: "For school staff (optional tie-in)", icon: Building2 },
                { title: "Dental Consultancy", desc: "Follow-up treatments at discounted rates", icon: Smile },
                { title: "Aesthetic & Preventive Care", desc: "Skin health checks for teens", icon: Activity },
                { title: "Mental Health", desc: "Basic stress/anxiety screening + counseling referrals", icon: Heart },
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

        {/* Our Collaborators & Partners */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collaborators & Partners</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We collaborate with top institutions for quality assurance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Stethoscope className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Pediatric Specialists</h3>
                    <p className="text-sm text-muted-foreground">
                      From Aga Khan University Hospital & Shaukat Khanum
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Nutrition Experts</h3>
                    <p className="text-sm text-muted-foreground">
                      Certified by Pakistan Nutrition Society
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <TestTube2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Diagnostic Partners</h3>
                    <p className="text-sm text-muted-foreground">
                      Chughtai Labs & Excel Labs (for blood tests)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Equipment Partners</h3>
                    <p className="text-sm text-muted-foreground">
                      Trusted brands like Omron & 3M
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials – Voices of Trust</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "ZUNF MEDICARE's screening caught my son's anemia early – now he's more energetic in class!"
                </p>
                <p className="text-sm font-medium text-foreground">– Parent, Lahore Public School</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Our school saw a 25% drop in sick days after the program. Highly recommended!"
                </p>
                <p className="text-sm font-medium text-foreground">– Principal, Beaconhouse School System, Karachi</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The nutrition focus helped us address obesity in grades 4-5 effectively."
                </p>
                <p className="text-sm font-medium text-foreground">– Teacher, The City School, Islamabad</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Excellent service and professional team. The reports were detailed and very helpful for parents."
                </p>
                <p className="text-sm font-medium text-foreground">– School Administrator, Rawalpindi</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The program helped identify vision issues in several students. Parents are very grateful."
                </p>
                <p className="text-sm font-medium text-foreground">– Principal, Faisalabad</p>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Affordable, comprehensive, and well-organized. Highly recommend to all schools."
                </p>
                <p className="text-sm font-medium text-foreground">– School Owner, Multan</p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Answers to common questions about school health screening and student wellness programs.</p>
            </div>

            <Accordion
              items={[
                {
                  title: "Why is an annual health screening important for school students in Pakistan?",
                  content: "Regular health screenings help identify issues like poor vision, anemia, and dental problems early on, which can affect a child's learning ability. Our program ensures early detection and timely intervention for better academic performance."
                },
                {
                  title: "What does the Zunf Medicare School Health Program cover?",
                  content: "Our comprehensive program includes general physical examinations, eye testing (vision screening), dental checkups, growth monitoring (BMI), and anemia screening. We also provide digital health reports for parents and schools."
                },
                {
                  title: "How does the school administration access the health reports?",
                  content: "We provide a secure digital dashboard for schools where administrators can view aggregate health data and individual student reports. This helps in planning targeted health interventions and awareness sessions."
                },
                {
                  title: "Do you conduct awareness sessions for students?",
                  content: "Yes, we organize interactive health awareness sessions on topics like hygiene, nutrition, mental health, and substance abuse prevention, tailored to different age groups."
                },
                {
                  title: "Is the program customizable for different school sizes and budgets?",
                  content: "Absolutely. We offer flexible packages tailored to the specific needs and budget of your school, whether it's a small private school or a large chain of institutions."
                },
                {
                  title: "How do you handle parental consent for screenings?",
                  content: "We provide consent forms to the school administration to be distributed to parents before the screening camp. Only students with signed parental consent are examined by our medical team."
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
