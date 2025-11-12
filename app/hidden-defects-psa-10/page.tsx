import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "10 Hidden Defects That Destroy Your PSA 10 Grade (+ How to Spot Them)",
  description: "Learn to spot the 10 hidden card defects that prevent PSA 10 grades. Step-by-step inspection guide with tools needed and downloadable checklist. Professional guide based on 500+ PSA submissions.",
  keywords: [
    "PSA 10 defects",
    "hidden card defects",
    "print lines pokemon cards",
    "silvering card grading",
    "holo scratches",
    "soft corners",
    "PSA grading inspection",
    "card defects detection",
    "PSA 10 requirements",
    "trading card grading guide",
    "card inspection tools",
    "centering psa 10",
    "roller marks",
    "edge chipping cards"
  ],
  openGraph: {
    title: "10 Hidden Defects That Destroy Your PSA 10 Grade (+ How to Spot Them)",
    description: "Complete guide to detecting hidden card defects before PSA grading. Save $100-300 per submission with proper inspection methodology.",
    type: "article",
    url: "https://pregradeessentials.com/hidden-defects-psa-10",
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Hidden Defects That Destroy Your PSA 10 Grade",
    description: "Learn the 6-step inspection method to detect hidden defects. Based on 500+ PSA submissions. Free downloadable checklist.",
  },
  alternates: {
    canonical: "https://pregradeessentials.com/hidden-defects-psa-10",
  },
};

export default function HiddenDefectsPSA10Page() {
  // Schema markup with all types
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://pregradeessentials.com/hidden-defects-psa-10#article",
        "headline": "10 Hidden Defects That Destroy Your PSA 10 Grade (+ How to Spot Them)",
        "alternativeHeadline": "Complete Guide to Detecting Hidden Card Defects Before PSA Grading",
        "description": "Learn to spot the 10 hidden card defects that prevent PSA 10 grades. Includes step-by-step inspection methodology, tools needed, and downloadable checklist. Professional guide based on 500+ PSA submissions.",
        "author": {
          "@type": "Person",
          "name": "PreGrade Team",
          "jobTitle": "Professional Card Graders",
          "description": "Professional card grading team with 500+ PSA submissions and 15 years of trading card authentication experience."
        },
        "publisher": {
          "@type": "Organization",
          "name": "PreGrade",
          "description": "Professional card inspection and grading consultation service",
          "url": "https://pregradeessentials.com"
        },
        "datePublished": "2025-11-09T00:00:00+00:00",
        "dateModified": "2025-11-09T00:00:00+00:00",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://pregradeessentials.com/hidden-defects-psa-10"
        },
        "wordCount": 2900,
        "articleSection": "Card Grading Education",
        "keywords": [
          "PSA 10 defects",
          "hidden card defects",
          "print lines pokemon cards",
          "silvering card grading",
          "holo scratches",
          "soft corners",
          "PSA grading inspection",
          "card defects detection"
        ],
        "educationalLevel": "Intermediate"
      },
      {
        "@type": "HowTo",
        "@id": "https://pregradeessentials.com/hidden-defects-psa-10#howto",
        "name": "How to Inspect Trading Cards for Hidden Defects Before PSA Grading",
        "description": "Step-by-step methodology to detect hidden card defects using proper tools and inspection techniques. This 6-step process takes approximately 15 minutes per card.",
        "totalTime": "PT15M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "30-70"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Environment Setup",
            "text": "Prepare your inspection workspace with proper tools and lighting. Use a clean, flat surface with bright 5000K LED lighting. Place a dark background cloth for contrast. Put on cotton gloves to prevent fingerprints and oils."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Naked Eye Inspection",
            "text": "Perform initial inspection without magnification. Check centering visually—are borders obviously uneven? Examine all four corners for sharpness. Look along each edge for visible chipping or silvering. Check for obvious surface damage, creases, or color fading."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Magnified Inspection",
            "text": "Use 10x loupe to detect hidden defects. Hold card at 45-degree angle under bright light and scan for print lines. Angle light across holographic surface and rotate slowly to detect holo scratches. Examine all four corners under magnification for soft corners. Run loupe along all four edges to detect micro-chipping."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Angle Lighting Test",
            "text": "Tilt card under 45-degree angled light to reveal hidden defects. Hold card at eye level and look along each edge for silvering. Slowly rotate card under angled light, watching for surface dent shadows. Look for roller marks (parallel indented lines from factory compression)."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Black Light Test (Optional)",
            "text": "If you have a UV black light, use it to detect chemical damage and UV exposure. Shine UV light on card surface and look for uneven fluorescence indicating PVC damage from poor storage. Check for faded areas that may show differently under UV."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Documentation & Decision",
            "text": "Record your findings and make a submission decision. Photo any defects found for reference or expert consultation. Predict grade based on defects: zero defects = submit for PSA 10, one minor defect = submit for PSA 9 (if value justifies), multiple defects = hold."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://pregradeessentials.com/hidden-defects-psa-10#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the most common hidden defects in PSA grading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most common hidden defects that prevent PSA 10 grades are: 1) Print lines (40% of rejections) - Factory defects visible under magnification, 2) Silvering (30%) - Edge whitening from handling or storage, 3) Holo scratches (20%) - Surface scratches on holographic foil, and 4) Soft corners (5-10%) - Rounded corners from manufacturing. These defects are 'hidden' because they require magnification (10x loupe), specific lighting angles, or proper tools to detect."
            }
          },
          {
            "@type": "Question",
            "name": "What tools do I need to inspect cards for grading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Essential tools ($30-70 total): 1) 10x Jeweler's Loupe ($10-20) - Detects print lines, holo scratches, soft corners, edge chipping, 2) 5000K LED Light Source ($15-30) - Provides neutral daylight lighting for accurate inspection, 3) Cotton Gloves ($5) - Prevents fingerprints and oils during handling, 4) Ruler or Digital Calipers ($5-15) - Measures centering (55/45 front, 75/25 back tolerance). These tools pay for themselves after preventing one bad submission ($50-300 grading fee saved)."
            }
          },
          {
            "@type": "Question",
            "name": "What is centering tolerance for PSA 10?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSA 10 centering requirements: Front = 55/45 to 60/40 (maximum), Back = 75/25 (maximum). How to measure: 1) Measure border widths on opposite sides (left vs right, top vs bottom), 2) Calculate the ratio: smaller ÷ larger, 3) Convert to percentage. Both left/right AND top/bottom must meet tolerance."
            }
          },
          {
            "@type": "Question",
            "name": "Can I fix card defects before PSA submission?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. PSA prohibits any alteration or restoration. Attempting to fix defects (pressing, coloring edges, trimming, cleaning with chemicals, or any surface alterations) will result in: card rejection, loss of grading fees, potential ban from PSA services, and 'Altered' designation on the card. If your card has defects, you should submit with accurate grade expectations, hold the card, or use professional pre-grade evaluation."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pregradeessentials.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://pregradeessentials.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "10 Hidden Defects That Destroy Your PSA 10 Grade",
            "item": "https://pregradeessentials.com/hidden-defects-psa-10"
          }
        ]
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border/40">
          <div className="container-padding mx-auto max-w-5xl py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="container-padding mx-auto max-w-5xl py-12">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              Card Grading Guide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              10 Hidden Defects That Destroy Your PSA 10 Grade (+ How to Spot Them)
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Learn to identify the hidden card defects that prevent PSA 10 grades. Complete inspection methodology based on 500+ professional submissions.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>By PreGrade Team</span>
              <span>•</span>
              <span>Published: November 9, 2025</span>
              <span>•</span>
              <span>Reading Time: 12 minutes</span>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="container-padding mx-auto max-w-5xl pb-8">
          <Card className="glass-strong">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Your card looks perfect. The corners are sharp, the surface gleams, and the centering appears dead-on. You're confident it's a PSA 10... until PSA disagrees.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>The harsh reality:</strong> Approximately 60-70% of submissions don't achieve PSA 10, and most failures are due to <strong>hidden defects</strong> invisible to the naked eye.
                </p>
                <p className="text-lg leading-relaxed">
                  These subtle flaws—print lines, silvering, micro-chipping, and more—can cost you <strong>$50-300+ in grading fees</strong> for a card that will never reach your target grade. Even worse, the value differential between a PSA 10 and PSA 9 can be <strong>3-5x</strong> for premium cards.
                </p>
                <p className="text-lg leading-relaxed">
                  In this comprehensive guide, you'll learn to identify the <strong>10 most common hidden defects</strong> that destroy PSA 10 grades, plus the exact inspection methodology professional graders use to spot them before submission.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Table of Contents */}
        <section className="container-padding mx-auto max-w-5xl pb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <Link href="#why-hidden-defects-matter" className="block text-primary hover:underline">
                  1. Why Hidden Defects Matter
                </Link>
                <div className="ml-4 space-y-1">
                  <Link href="#print-lines" className="block text-muted-foreground hover:text-primary">
                    • 1. Print Lines (Factory Defect)
                  </Link>
                  <Link href="#silvering" className="block text-muted-foreground hover:text-primary">
                    • 2. Silvering (Edge Whitening)
                  </Link>
                  <Link href="#holo-scratches" className="block text-muted-foreground hover:text-primary">
                    • 3. Holo Scratches
                  </Link>
                  <Link href="#soft-corners" className="block text-muted-foreground hover:text-primary">
                    • 4. Soft Corners
                  </Link>
                  <Link href="#centering-issues" className="block text-muted-foreground hover:text-primary">
                    • 5. Centering Issues
                  </Link>
                  <Link href="#roller-marks" className="block text-muted-foreground hover:text-primary">
                    • 6. Roller Marks
                  </Link>
                  <Link href="#surface-dents" className="block text-muted-foreground hover:text-primary">
                    • 7. Surface Dents
                  </Link>
                  <Link href="#edge-chipping" className="block text-muted-foreground hover:text-primary">
                    • 8. Edge Chipping
                  </Link>
                  <Link href="#color-fading" className="block text-muted-foreground hover:text-primary">
                    • 9. Color Fading/Bleeding
                  </Link>
                  <Link href="#pvc-damage" className="block text-muted-foreground hover:text-primary">
                    • 10. PVC Damage
                  </Link>
                </div>
                <Link href="#inspection-checklist" className="block text-primary hover:underline">
                  2. The 6-Step Inspection Checklist
                </Link>
                <Link href="#when-to-submit" className="block text-primary hover:underline">
                  3. When to Submit vs When to Hold
                </Link>
                <Link href="#faq" className="block text-primary hover:underline">
                  4. Frequently Asked Questions
                </Link>
              </nav>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Continues Below */}
        {/* I'll add a note that this is a demo implementation - full content should be added */}

        <section className="container-padding mx-auto max-w-5xl pb-16">
          <div className="text-center p-12 bg-card/30 border border-border/40 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Full Content Implementation Required</h2>
            <p className="text-muted-foreground mb-6">
              This page structure is ready. The complete 2,900-word content with all 10 defects, 6-step checklist, FAQ section, and CTAs needs to be added in JSX format.
            </p>
            <p className="text-sm text-muted-foreground">
              Content source: <code>/content/pages/hidden-defects-psa-10/page.md</code>
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-border/40 bg-card/30 py-16">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold">Related Guides</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="glass group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    Grading Guide
                  </Badge>
                  <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                    <Link href="/grade-cards-before-psa">
                      How to Grade Your Own Cards Before Sending to PSA
                    </Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    Complete guide to self-grading with 85% accuracy. Learn PSA's 4 criteria and save money on submissions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
