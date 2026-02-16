import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, CheckCircle2, ArrowRight, Activity, Pill, TestTube2, Building2, Stethoscope, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";

export default function HealthProgramPage() {
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
                <Link to="/contact?service=health-program">
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
                  to={`/contact?service=health-program&program=${encodeURIComponent(program.name)}`}
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

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Answers to common questions about home nursing and patient care services in Pakistan.</p>
            </div>

            <Accordion
              items={[
                {
                  title: "How do I find reliable home nursing services in Pakistan?",
                  content: "Zunf Medicare provides verified, background-checked, and skilled nursing staff for home care across major cities in Pakistan. Our nurses are trained for post-operative care, elderly care, and chronic disease management, ensuring hospital-grade care at home."
                },
                {
                  title: "What is the cost of home patient care services in Lahore and Islamabad?",
                  content: "The cost effectively depends on the level of care required (e.g., critical care vs. assisted living). Zunf Medicare offers transparent monthly packages starting from PKR 45,000 for basic care to dedicated ICU setups. Contact us for a customized quote based on your patient's needs."
                },
                {
                  title: "Do you provide physiotherapy at home for stroke patients?",
                  content: "Yes, our Stroke Rehabilitation Program includes specialized neuro-physiotherapy at home. Our certified physiotherapists work on mobility, strength, and balance to help stroke survivors regain independence faster."
                },
                {
                  title: "Can I get a doctor's visit at home for my elderly parents?",
                  content: "Absolutely. We offer scheduled doctor visits as part of our Elderly Wellness Program. Our general physicians and specialists (cardiologists, endocrinologists) visit your home to monitor health, adjust medications, and manage chronic conditions like diabetes and hypertension."
                },
                {
                  title: "Is medical equipment available for rent or purchase?",
                  content: "Yes, we provide medical equipment on rent and for sale, including hospital beds, oxygen concentrators, BiPAP/CPAP machines, and patient monitors. We ensure prompt delivery and setup at your home."
                },
                {
                  title: "Do you offer emergency ambulance services?",
                  content: "While our primary focus is planned home care, we can assist in arranging rapid ambulance transport to the nearest hospital in case of a medical emergency during our care hours."
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

