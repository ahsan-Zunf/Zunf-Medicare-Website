import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { ShieldCheck, FileText, QrCode, Activity, ArrowRight, Lock } from "lucide-react";

export default function EHRPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 font-dm">
      <SiteHeader />
      
      <main className="flex-1">
        {/* 🌟 HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden flex items-center justify-center min-h-[85vh]">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[#0A1628]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00C6A2]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#4D9FFF]/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 bg-[#00C6A2]/10 border border-[#00C6A2]/20 text-[#00C6A2] px-4 py-2 rounded-full text-sm font-bold mb-8 backdrop-blur-md">
              <Lock className="h-4 w-4" /> 100% Secure & Private
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white font-syne tracking-tight mb-6 max-w-4xl leading-tight">
              Your Complete Health History in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6A2] to-[#4D9FFF]">One Secure Vault</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Never lose a medical report again. Digitize your records, get a master smart QR identity, and share reports instantly with your doctors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link 
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C6A2] to-[#009E83] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(0,198,162,0.3)] hover:-translate-y-1 transition-all"
              >
                Login to Access Vault <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-md"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>

        {/* 🌟 FEATURES SECTION */}
        <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] border-t border-slate-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-syne mb-4">Why use ZUNF My Reports?</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to manage your family's healthcare journey efficiently.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:bg-white transition-all group">
                <div className="w-14 h-14 bg-[#00C6A2]/10 text-[#00C6A2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Digitize Everything</h3>
                <p className="text-slate-500 leading-relaxed">Upload past X-rays, blood reports, and prescriptions. Keep your physical files safe at home.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:bg-white transition-all group">
                <div className="w-14 h-14 bg-[#4D9FFF]/10 text-[#4D9FFF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <QrCode className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart QR Access</h3>
                <p className="text-slate-500 leading-relaxed">Get your unique digital health passport. Doctors can scan your QR to view your specific reports instantly.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:bg-white transition-all group">
                <div className="w-14 h-14 bg-[#FF5272]/10 text-[#FF5272] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bank-Grade Security</h3>
                <p className="text-slate-500 leading-relaxed">Your medical data is encrypted. You have full control over who sees your health records.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}