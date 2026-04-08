import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, ShoppingCart, Clock, CheckCircle2, ShieldCheck, Activity, AlertCircle, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLabTests, type LabTestsResponse, type LabTest } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { Helmet } from 'react-helmet-async'; 
import { labs } from "@/data/labs";

// Map lab IDs to their logo files
const getLabLogo = (labId: string): string | null => {
    const logoMap: Record<string, string> = {
        "chughtai-lab": "/chughtai.jpeg",
        "dr-essa-lab": "/drEssa.jpeg",
        "test-zone": "/testzone.jpeg",
        "biotech-lahore": "/biotech.jpeg",
        "ayzal-lab": "/ayzal.jpeg",
        "jinnah-mri": "/jinnahMRI.jpeg",
        "esthetique-canon": "/esthetic.jpeg",
    };
    return logoMap[labId] || null;
};

export default function TestDetailPage() {
    // ✅ SEO FIX 1: LabId ab URL path se nahi, URL Parameters (?lab=) se aayega
    const { testId } = useParams<{ testId: string }>(); 
    const [searchParams] = useSearchParams();
    const labId = searchParams.get("lab"); // e.g., ?lab=chughtai-lab
    
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [labData, setLabData] = useState<LabTestsResponse | null>(null);
    const [test, setTest] = useState<LabTest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Canonical Tag Generator (Ignoring ?lab parameter)
    const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';

    const lab = labs.find((l) => l.id === labId);
    const isChughtai = labId === 'chughtai-lab';
    const discountPercent = isChughtai ? 20 : 40;

    useEffect(() => {
        const fetchData = async () => {
            if (!testId) return;

            // Agar URL mein lab nahi hai, toh abhi ke liye default behaviour rok dein
            // (Kyunke baad mein hum yahan comparison list dikhayenge)
            if (!labId) {
                setLoading(false);
                setError("Please select a lab to view test details.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Waqti taur par existing API use kar rahe hain
                const response = await getLabTests(labId);
                if (response === null) {
                    setError("Lab data not available");
                } else {
                    setLabData(response);
                    const foundTest = response.tests.find(t => t.id === testId);
                    if (foundTest) {
                        setTest(foundTest);
                    } else {
                        setError("Test not found");
                    }
                }
            } catch (err) {
                setError("Failed to load test details");
                console.error("Error fetching test details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [labId, testId]);

    const handleAddToCart = () => {
        if (test && lab && labId) {
            addToCart(test, labId, lab.name);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-dvh flex-col">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#8CC63F]" />
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !lab || !test) {
        return (
            <div className="flex min-h-dvh flex-col">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto px-4">
                        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Notice</h1>
                        <p className="text-slate-500 mb-6">
                            {error || "The requested test details could not be loaded."}
                        </p>
                        <Button onClick={() => navigate(-1)} variant="outline">
                            Go Back
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-dvh flex-col bg-slate-50">
            
            {/* 🚀 SEO MAGIC STARTS HERE */}
            <Helmet>
                <title>Book {test.name} in Lahore - {lab.name} | ZUNF Medicare</title>
                
                <meta 
                    name="description" 
                    content={`Book ${test.name} online at ${lab.name} through ZUNF Medicare. ${test.description || "Get accurate results, home sampling facility, and up to 40% discount."} Check details and book now!`} 
                />
                
                <meta 
                    name="keywords" 
                    content={`${test.name}, ${lab.name}, lab test Lahore, blood test home sampling, ZUNF Medicare, book ${test.name} online, discounted lab tests Pakistan`} 
                />

                {/* ✅ SEO FIX 2: Canonical Tag strictly locked to Master URL */}
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
            {/* 🚀 SEO MAGIC ENDS HERE */}

            <SiteHeader />
            <main className="flex-1 pt-8 md:pt-12 pb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">

                    {/* Breadcrumb / Back Navigation */}
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8CC63F] transition-colors font-medium text-sm p-0 h-auto"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Go Back</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Header Card */}
                            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8CC63F] to-[#00AEEF]"></div>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 p-2 flex-shrink-0 shadow-inner">
                                        {getLabLogo(labId!) ? (
                                            <img
                                                src={getLabLogo(labId!)!}
                                                alt={lab.name}
                                                className="max-h-full max-w-full object-contain rounded-xl"
                                            />
                                        ) : (
                                            <Activity className="h-8 w-8 text-[#8CC63F]" />
                                        )}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 font-syne">{test.name}</h1>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <span className="bg-[#8CC63F]/10 text-[#8CC63F] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                                                LAB TEST
                                            </span>
                                            <span>•</span>
                                            <span className="font-medium">{lab.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Description & Details */}
                            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 font-syne">
                                    <Activity className="h-5 w-5 text-[#8CC63F]" />
                                    Test Description
                                </h2>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm md:text-base">
                                    <p>{test.description || "Detailed description for this test is currently being updated by our medical team. However, you can still book it online."}</p>

                                    <div className="mt-8 space-y-4">
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-800 mb-2">Why get tested?</h3>
                                            <p className="text-sm text-slate-500">
                                                Regular testing helps in early detection of potential health issues, monitoring existing conditions, and maintaining your overall wellness.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-8 bg-slate-100" />

                                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-800 font-syne">
                                    <ShieldCheck className="h-5 w-5 text-[#8CC63F]" />
                                    What's Included?
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                                    <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <CheckCircle2 className="h-5 w-5 text-[#8CC63F]" />
                                        <span className="font-medium">Home Sample Collection</span>
                                    </li>
                                    <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <CheckCircle2 className="h-5 w-5 text-[#8CC63F]" />
                                        <span className="font-medium">Digital Smart Report</span>
                                    </li>
                                    <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <CheckCircle2 className="h-5 w-5 text-[#8CC63F]" />
                                        <span className="font-medium">Expert Verification</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">

                                {/* Price & Action Card */}
                                <Card className="p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl bg-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CC63F]/5 rounded-full blur-[40px] pointer-events-none" />
                                    
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-syne">Order Summary</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 text-sm font-medium">Standard Price</span>
                                            <span className="text-slate-400 line-through text-sm">
                                                Rs. {(test.price || 0).toLocaleString()}
                                            </span>
                                        </div>

                                        {test.price != null && test.discounted_price != null &&
                                            test.discounted_price > 0 && test.discounted_price < test.price ? (
                                            <>
                                                <div className="flex justify-between items-center font-bold text-[#8CC63F] bg-[#8CC63F]/10 p-2.5 rounded-xl text-sm">
                                                    <span>Discount ({discountPercent}%)</span>
                                                    <span>- Rs. {((test.price || 0) - (test.discounted_price || 0)).toLocaleString()}</span>
                                                </div>
                                                <Separator className="bg-slate-100" />
                                                <div className="flex justify-between items-end pt-2">
                                                    <span className="text-sm font-bold text-slate-500 mb-1">Total to Pay</span>
                                                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                                                        Rs. {(test.discounted_price || 0).toLocaleString()}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between items-end pt-4 border-t border-slate-100 mt-2">
                                                <span className="text-sm font-bold text-slate-500 mb-1">Total to Pay</span>
                                                <span className="text-3xl font-black text-slate-900 tracking-tight">
                                                    Rs. {(test.price || 0).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        onClick={handleAddToCart}
                                        className="w-full h-14 text-base font-bold shadow-[0_10px_20px_rgba(140,198,63,0.3)] transition-all bg-[#8CC63F] hover:bg-[#7ab332] rounded-2xl text-white hover:-translate-y-1"
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>

                                    <div className="mt-5 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                            Reports usually available within 24-48 hours. View directly in your ZUNF Dashboard.
                                        </p>
                                    </div>
                                </Card>

                            </div>
                        </div>

                    </div>
                    
                    {/* ✅ SEO FIX 3: Master Test Aggregation Footer (Google yahan se cross-link banayega) */}
                    <div className="mt-12 text-center border-t border-slate-200 pt-8">
                        <p className="text-sm text-slate-500">
                            The <span className="font-semibold text-slate-700">{test.name}</span> is available at trusted diagnostic centers across Pakistan including {labs.map(l => l.name).join(', ')}. Compare prices and book online via ZUNF Medicare.
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}