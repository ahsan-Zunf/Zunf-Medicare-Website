import { Button } from "@/components/custom";
import { ArrowRight, Heart, Shield, FileText, Percent, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function HealthCardBenefits() {
  const benefits = [
    {
      icon: Percent,
      title: "40% Discount",
      description: "Get 40% discount on big labs of Pakistan",
    },
    {
      icon: Heart,
      title: "Digital Health Records",
      description: "Access your complete medical history anytime, anywhere",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected",
    },
    {
      icon: FileText,
      title: "Easy Access",
      description: "Quick access to your medical information when needed",
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-background via-primary/5 to-accent/5 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 mb-4">
            <Heart className="h-4 w-4" />
            Health Card
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Book Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Health Card</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Keep your medical information organized and accessible with our digital health card
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative bg-background/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            <Link to="/health-card">
              <span className="flex justify-center items-center">
                Book Health Card
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

