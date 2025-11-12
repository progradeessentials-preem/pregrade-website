import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQClient } from "./FAQClient";
import { faqData } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | PreGrade Essentials",
  description: "Find answers to common questions about The Pocket Scope, card authentication, shipping, returns, and how to use our professional card grading tools. Get instant support for your card inspection needs.",
  keywords: [
    "pocket scope FAQ",
    "card grading tools questions",
    "PSA authentication help",
    "card magnifier support",
    "UV light card inspection",
    "sports card tools FAQ",
    "Pokemon card grading questions",
  ],
  openGraph: {
    title: "FAQ - Everything About The Pocket Scope",
    description: "Get answers to all your questions about card authentication, PSA slab verification, defect detection, shipping, and returns.",
    type: "website",
    url: "https://pregradeessentials.com/faq",
  },
  twitter: {
    card: "summary",
    title: "FAQ - The Pocket Scope Support",
    description: "Common questions about card authentication and grading tools.",
  },
  alternates: {
    canonical: "https://pregradeessentials.com/faq",
  },
};

export default function FAQPage() {
  // FAQPage Schema (JSON-LD)
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <Header />
      <FAQClient />
      <Footer />
    </div>
  );
}
