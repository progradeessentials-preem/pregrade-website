import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { EmailCapturePopup } from "@/components/EmailCapturePopup";
import { WebVitals } from "@/components/WebVitals";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pregradeessentials.com'),
  title: "PreGrade Essentials | Professional Card Authentication & Grading Tools",
  description: "The Pocket Scope: Professional digital magnifier with UV light for PSA authentication, sports card inspection, Pokemon TCG defect detection. 200X magnification reveals hidden defects before grading. Used by collectors and dealers.",
  keywords: [
    "card grading tools",
    "PSA authentication",
    "sports card magnifier",
    "Pokemon card inspection",
    "TCG authentication tool",
    "card defect detection",
    "pre-grading inspection",
    "UV light card authenticator",
    "digital card magnifier",
    "BGS grading tools",
    "counterfeit PSA detection",
    "card show equipment",
    "professional card loupe",
    "trading card microscope"
  ],
  authors: [{ name: "PreGrade Essentials" }],
  openGraph: {
    title: "The Pocket Scope - Professional Card Authentication & Inspection Tool",
    description: "200X digital magnifier with UV light for authenticating PSA slabs and detecting card defects. Essential for collectors, dealers, and graders. $74.99 launch price.",
    type: "website",
    siteName: "PreGrade Essentials",
    images: [
      {
        url: "/pocket-scope.png",
        width: 1200,
        height: 630,
        alt: "The Pocket Scope - Professional Card Authentication Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pocket Scope - Never Buy a Fake Card Again",
    description: "200X magnification + UV authentication. Spot counterfeit PSA slabs and hidden defects instantly. Essential tool for every serious collector.",
    images: ["/pocket-scope.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PreGrade Essentials",
    "url": "https://pregradeessentials.com",
    "logo": "https://pregradeessentials.com/logo.png",
    "description": "Professional card authentication and grading tools for sports cards, Pokemon, and TCG collectors. Trusted by PSA graders and dealers worldwide.",
    "sameAs": [
      // Add social media URLs when available
      // "https://twitter.com/pregradeessentials",
      // "https://www.facebook.com/pregradeessentials",
      // "https://www.instagram.com/pregradeessentials"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@pregradeessentials.com"
    }
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <WebVitals />
        {children}
        <Toaster />
        <EmailCapturePopup />
      </body>
    </html>
  );
}
