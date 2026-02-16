import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { createLead } from "@/lib/api";
import { useToast } from "@/contexts/toast-context";

export function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createLead({
        ...formData,
        serviceType: "General Inquiry (Footer)",
      });

      showToast("Thank you! Your message has been sent. Our team will contact you soon.", "success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t bg-gradient-to-r from-[#58b437] to-[#7ab630] text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/zunf.png"
                height={28}
                width={140}
                alt="ZUNF logo"
              />
            </Link>
            <p className="text-sm text-slate-100">
              Pakistan's trusted healthcare partner, bringing quality healthcare to your doorstep.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-100">
                <Phone className="h-4 w-4 text-white" />
                <span>03090622004</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100">
                <Mail className="h-4 w-4 text-white" />
                <span>info@zunfmedicare.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100">
                <Clock className="h-4 w-4 text-white" />
                <span>24×7 Helpline</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-slate-100 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/services/labs" className="text-sm text-slate-100 hover:text-white transition-colors">
                Labs
              </Link>
              <Link to="/services/health-program" className="text-sm text-slate-100 hover:text-white transition-colors">
                Health Program
              </Link>
              <Link to="/services/school-health-program" className="text-sm text-slate-100 hover:text-white transition-colors">
                School Health Program
              </Link>
              <Link to="/services/corporate-health-screening" className="text-sm text-slate-100 hover:text-white transition-colors">
                Corporate Health Screening
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/services/labs" className="text-sm text-slate-100 hover:text-white transition-colors">
                Lab Tests
              </Link>
              <Link to="/services/health-program" className="text-sm text-slate-100 hover:text-white transition-colors">
                Home Care
              </Link>
              <Link to="/services/school-health-program" className="text-sm text-slate-100 hover:text-white transition-colors">
                School Screening
              </Link>
              <Link to="/services/corporate-health-screening" className="text-sm text-slate-100 hover:text-white transition-colors">
                Corporate Screening
              </Link>
            </nav>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="footer-name" className="sr-only">Name</Label>
                <Input
                  id="footer-name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="footer-email" className="sr-only">Email</Label>
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-9 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="footer-phone" className="sr-only">Phone</Label>
                <Input
                  id="footer-phone"
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-9 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="footer-message" className="sr-only">Message</Label>
                <Textarea
                  id="footer-message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="text-sm resize-none bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                  required
                />
              </div>
              <Button type="submit" size="sm" className="w-full bg-white text-[#94ca43] hover:bg-slate-100" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Submitting..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-slate-100 text-center sm:text-left">
              © 2025 ZUNF Medicare. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-100">
              <MapPin className="h-3 w-3" />
              <span>Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
