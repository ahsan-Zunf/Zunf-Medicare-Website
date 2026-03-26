import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/custom";
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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info (Takes up more space) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block bg-white p-2 rounded-xl">
              <img
                src="/zunf.png"
                height={32}
                width={140}
                alt="ZUNF logo"
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Pakistan's most trusted healthcare ecosystem. We connect you with top labs, aesthetic centers, and digital health records directly from your home.
            </p>
            <div className="flex flex-col gap-4 text-sm pt-2">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="bg-slate-800 p-2 rounded-lg text-primary"><Phone className="h-4 w-4" /></div>
                <span className="font-medium">0309 0622004</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="bg-slate-800 p-2 rounded-lg text-primary"><Mail className="h-4 w-4" /></div>
                <span className="font-medium">info@zunfmedicare.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="bg-slate-800 p-2 rounded-lg text-primary"><Clock className="h-4 w-4" /></div>
                <span className="font-medium">24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white mb-6 text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {['Home', 'About Us', 'Health Card', 'EHR Portal', 'Contact Us'].map((item) => (
                <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white mb-6 text-lg">Our Services</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/services/labs" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">Lab Tests</Link>
              <Link to="/services/labs" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">Aesthetics</Link>
              <Link to="/services/health-program" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">Home Care</Link>
              <Link to="/services/school-health-program" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">School Screening</Link>
              <Link to="/services/corporate-health-screening" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all">Corporate Plans</Link>
            </nav>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-white mb-6 text-lg">Need Help?</h3>
            <form onSubmit={handleSubmit} className="space-y-3 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    id="footer-name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 text-sm bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Input
                    id="footer-phone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-10 text-sm bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary rounded-xl"
                    required
                  />
                </div>
              </div>
              <div>
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 text-sm bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary rounded-xl"
                  required
                />
              </div>
              <div>
                <Textarea
                  id="footer-message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                  className="text-sm resize-none bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary rounded-xl"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-white hover:bg-[#86b83c] rounded-xl font-bold h-10 shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-white font-semibold">ZUNF Medicare</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Punjab, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}