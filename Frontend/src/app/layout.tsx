import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ToastProvider } from "@/contexts/toast-context";
import { ChatbotButton } from "@/components/chatbot-button";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zunfmedicare.com/"),
  title: {
    default: "ZUNF Medicare | Healthcare at Your Doorstep",
    template: "%s | ZUNF Medicare",
  },
  description:
    "ZUNF Medicare is Pakistan's trusted healthcare partner, offering blood tests at home, radiology services, medical consultancy, home patient care, aesthetics, dentistry, and nutrition analysis.",
  icons: {
    icon: "/zunf-1.png",
    shortcut: "/zunf.png",
    apple: "/zunf.png",
  },
  keywords: [
    "healthcare services",
    "home healthcare",
    "blood tests at home",
    "medical consultancy",
    "radiology services",
    "healthcare Pakistan",
    "home patient care",
    "preventive healthcare",
    "lab tests",
    "diagnostic services",
  ],
  authors: [{ name: "ZUNF Medicare" }],
  creator: "ZUNF Medicare",
  publisher: "ZUNF Medicare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zunfmedicare.com/",
    siteName: "ZUNF Medicare",
    title: "ZUNF Medicare | Healthcare at Your Doorstep",
    description:
      "ZUNF Medicare is Pakistan's trusted healthcare partner, offering blood tests at home, radiology services, medical consultancy, home patient care, aesthetics, dentistry, and nutrition analysis.",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "ZUNF Medicare - Healthcare at Your Doorstep",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUNF Medicare | Healthcare at Your Doorstep",
    description:
      "ZUNF Medicare is Pakistan's trusted healthcare partner, offering blood tests at home, radiology services, medical consultancy, home patient care, aesthetics, dentistry, and nutrition analysis.",
    images: ["/open-graph.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <ChatbotButton />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
