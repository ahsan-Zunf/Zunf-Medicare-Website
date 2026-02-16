"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/contexts/toast-context";
import { getHealthCard, downloadHealthCard } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Download, FileDown } from "lucide-react";
import Image from "next/image";

export default function HealthCardViewPage() {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [healthCard, setHealthCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/health-card/auth");
        return;
      }
      loadHealthCard();
    }
  }, [isAuthenticated, isLoading, token]);

  const loadHealthCard = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const card = await getHealthCard(token);
      if (card) {
        setHealthCard(card);
      } else {
        router.push("/health-card");
      }
    } catch (err) {
      console.error("Failed to load health card:", err);
      router.push("/health-card");
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!healthCard) {
      showToast("Error: Health card data not available. Please refresh the page and try again.", "error");
      return;
    }

    if (!token) {
      showToast("Error: Authentication token not available. Please log in again.", "error");
      return;
    }

    setDownloading(true);
    
    try {
      const blob = await downloadHealthCard(token);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `health-card-${healthCard.name.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Success feedback
      setTimeout(() => {
        showToast("PDF downloaded successfully!", "success");
      }, 100);
    } catch (error: any) {
      console.error("Failed to download PDF:", error);
      const errorMessage = error?.message || "Unknown error occurred";
      showToast(`Failed to download PDF! Error: ${errorMessage}. Please try again or contact support if the problem persists.`, "error");
    } finally {
      setDownloading(false);
    }
  };

  if (isLoading || !isAuthenticated || !healthCard) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Health Card</h1>
            <Button 
              onClick={downloadCard} 
              disabled={downloading}
              variant="default"
            >
              {downloading ? (
                <>
                  <Download className="h-4 w-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>

          {/* Health Card Display - ID Card Style */}
          <div className="flex justify-center">
            <div
              id="health-card-element"
              className="relative bg-white border-2 border-gray-300 shadow-2xl overflow-hidden rounded-lg"
              style={{
                width: "340px",
                height: "214px",
                aspectRatio: "85.6 / 53.98",
              }}
            >
              {/* Background Logo Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                <Image
                  src="/zunf.png"
                  alt="ZUNF Logo"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>

              {/* Card Content */}
              <div className="relative h-full p-2.5 flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-1.5 border-b-2 border-primary pb-1">
                  <div>
                    <h2 className="text-sm font-bold text-primary leading-tight">ZUNF MEDICARE</h2>
                    <p className="text-[8px] text-gray-600 font-semibold">HEALTH CARD</p>
                  </div>
                  <div className="text-right">
                    {healthCard.healthCardNumber && (
                      <p className="text-[6px] text-gray-500 font-mono leading-tight">{healthCard.healthCardNumber}</p>
                    )}
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-[1fr_50px] gap-x-2 gap-y-0.5 text-[8px] min-h-0">
                  {/* Left Column */}
                  <div className="space-y-0.5 overflow-hidden">
                    {/* Row 1: Name */}
                    <div>
                      <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Name</p>
                      <p className="text-[9px] font-bold text-gray-900 leading-tight truncate">{healthCard.name.toUpperCase()}</p>
                    </div>
                    
                    {/* Row 2: CNIC and DOB in grid */}
                    <div className="grid grid-cols-2 gap-x-1.5">
                      <div>
                        <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">CNIC/B-Form</p>
                        <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.idCard}</p>
                      </div>
                      <div>
                        <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">DOB</p>
                        <p className="text-[7px] font-semibold text-gray-900 leading-tight">{healthCard.dateOfBirth}</p>
                      </div>
                    </div>

                    {/* Row 3: Gender and Blood Group */}
                    <div className="grid grid-cols-2 gap-x-1.5">
                      {healthCard.gender && (
                        <div>
                          <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Gender</p>
                          <p className="text-[7px] font-semibold text-gray-900 leading-tight">{healthCard.gender}</p>
                        </div>
                      )}
                      {healthCard.bloodGroup && (
                        <div>
                          <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Blood</p>
                          <p className="text-[7px] font-bold text-primary leading-tight">{healthCard.bloodGroup}</p>
                        </div>
                      )}
                    </div>

                    {/* Row 4: Corporate Info */}
                    {(healthCard.organizationName || healthCard.employeeId) && (
                      <div className="grid grid-cols-2 gap-x-1.5">
                        {healthCard.organizationName && (
                          <div>
                            <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Org</p>
                            <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.organizationName}</p>
                          </div>
                        )}
                        {healthCard.employeeId && (
                          <div>
                            <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Emp ID</p>
                            <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.employeeId}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Row 5: Contact Info */}
                    <div className="grid grid-cols-2 gap-x-1.5">
                      <div>
                        <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Phone</p>
                        <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.phone}</p>
                      </div>
                      {healthCard.emergencyContact?.phone && (
                        <div>
                          <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Emergency</p>
                          <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.emergencyContact.phone}</p>
                        </div>
                      )}
                    </div>

                    {/* Row 6: Email */}
                    {healthCard.email && (
                      <div>
                        <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Email</p>
                        <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.email}</p>
                      </div>
                    )}

                    {/* Row 7: Address */}
                    <div>
                      <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Address</p>
                      <p className="text-[7px] font-semibold text-gray-900 leading-tight line-clamp-1">{healthCard.address}</p>
                    </div>

                    {/* Row 8: Medical Info */}
                    {(healthCard.medicalConditions || healthCard.allergies) && (
                      <div className="grid grid-cols-2 gap-x-1.5">
                        {healthCard.medicalConditions && (
                          <div>
                            <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Conditions</p>
                            <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.medicalConditions}</p>
                          </div>
                        )}
                        {healthCard.allergies && (
                          <div>
                            <p className="text-[6px] text-gray-500 uppercase font-semibold leading-tight">Allergies</p>
                            <p className="text-[7px] font-semibold text-gray-900 leading-tight truncate">{healthCard.allergies}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column - QR Code */}
                  {healthCard.qrCode && (
                    <div className="flex items-start justify-center pt-0.5">
                      <img
                        src={healthCard.qrCode}
                        alt="QR Code"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-0.5 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-[5px] text-gray-400 leading-tight">
                    {healthCard.issueDate && (
                      <p>Issued: {new Date(healthCard.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    )}
                    {healthCard.validity && (
                      <p>Valid: {new Date(healthCard.validity).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    )}
                  </div>
                  <p className="text-[5px] text-gray-400 font-semibold leading-tight">ZUNF MEDICARE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => router.push("/health-card")}>
              Back to Health Card
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


