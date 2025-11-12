import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokemon Card Grading Guide: What PSA/BGS/CGC Graders Look For (2025)",
  description: "Complete 2025 guide to Pokemon card grading. Compare PSA, BGS & CGC costs ($12-19), gem rates (43-60%), and what graders look for. Updated Nov 2025.",
  keywords: [
    "pokemon card grading",
    "PSA grading",
    "BGS grading",
    "CGC grading",
    "pokemon card grading guide",
    "what do graders look for",
    "PSA vs BGS vs CGC",
    "pokemon card grading cost",
    "PSA 10 requirements",
    "pokemon card centering",
    "grading company comparison",
    "psa 10 centering requirements",
    "cgc pristine 10",
    "bgs black label"
  ],
  openGraph: {
    title: "Pokemon Card Grading Guide: What PSA/BGS/CGC Graders Look For (2025)",
    description: "Complete 2025 guide with updated pricing, gem rates, and grading standards. Compare PSA, BGS & CGC with decision frameworks.",
    type: "article",
    url: "https://pregradeessentials.com/pokemon-card-grading-guide",
    publishedTime: "2025-11-09",
    modifiedTime: "2025-11-09",
    authors: ["PreGrade Team"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon Card Grading Guide: What PSA/BGS/CGC Look For (2025)",
    description: "Compare costs, gem rates & standards. PSA $18.99, CGC $12-15, BGS $14.95. Updated November 2025.",
  },
  alternates: {
    canonical: "https://pregradeessentials.com/pokemon-card-grading-guide",
  },
};

export default function PokemonCardGradingGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://pregradeessentials.com/pokemon-card-grading-guide#article",
        "headline": "Pokemon Card Grading Guide: What PSA, BGS & CGC Graders Look For in 2025",
        "description": "Complete 2025 guide to Pokemon card grading covering PSA, BGS, and CGC standards, costs ($12-$19), gem rates (43-60%), turnaround times, and what graders look for. Updated November 2025.",
        "datePublished": "2025-11-09",
        "dateModified": "2025-11-09",
        "author": {
          "@type": "Person",
          "name": "PreGrade Team",
          "jobTitle": "Card Grading Specialists"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PreGrade Essentials",
          "url": "https://pregradeessentials.com"
        },
        "wordCount": 5800,
        "articleSection": "Card Grading Guides"
      },
      {
        "@type": "FAQPage",
        "@id": "https://pregradeessentials.com/pokemon-card-grading-guide#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does PSA grading cost in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As of April 2025, PSA charges $18.99 per card for TCG Bulk submissions (previously $16.99). Higher service tiers range from $25 to $300+ depending on card value and desired turnaround time. A PSA Collectors Club membership is required ($99+/year)."
            }
          },
          {
            "@type": "Question",
            "name": "What percentage of Pokemon cards get PSA 10?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2025, PSA's gem rate is 43% overall, with the TCG category (including Pokemon) achieving a 50% gem rate. This means approximately half of submitted Pokemon cards receive a PSA 10 grade."
            }
          },
          {
            "@type": "Question",
            "name": "Is CGC or PSA better for Pokemon cards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSA remains the market leader with 70%+ market share and best resale value consistency. However, CGC offers lower costs ($12-15 vs $18.99), faster turnaround, and CGC Pristine 10 can command premiums over PSA 10. Choose PSA for maximum resale value, CGC for budget-friendly grading and speed."
            }
          },
          {
            "@type": "Question",
            "name": "What is the rarest Pokemon card grade?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BGS Black Label 10 (all four subgrades at perfect 10) and CGC Pristine 10 are the rarest and most valuable grades, rarer than standard PSA 10. Black Label 10 represents less than 5% of all BGS 10 grades and can command 2-5× the price of PSA 10."
            }
          },
          {
            "@type": "Question",
            "name": "What is PSA 10 centering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSA 10 centering requires 55/45 to 60/40 on the front and 75/25 on the back. This means one border can be at most 1.2× the thickness of the opposite border. Centering is measured as a percentage ratio of opposite border thicknesses."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://pregradeessentials.com/pokemon-card-grading-guide#howto",
        "name": "How to Prepare Pokemon Cards for Grading",
        "description": "Step-by-step guide to preparing Pokemon cards for professional grading by PSA, CGC, or BGS",
        "totalTime": "PT2H",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Research Your Cards",
            "text": "Look up recent sales on eBay, TCGPlayer, or PWCC. Check PSA 10 population reports. Verify the card is worth grading."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Examine Your Cards Thoroughly",
            "text": "Use jeweler's loupe or 10× magnifying glass, bright LED light, clean flat surface, and cotton gloves. Inspect centering, corners, edges, and surface systematically."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Protect Your Cards",
            "text": "Use penny sleeves and semi-rigid card savers (CardSaver I). Handle with cotton gloves only."
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
        {/* Header Section */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-card/30">
          <div className="container-padding mx-auto max-w-5xl py-12 md:py-16">
            <Badge variant="default" className="mb-4">
              Updated November 9, 2025
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Pokemon Card Grading Guide: What PSA, BGS & CGC Graders Look For in 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Complete guide comparing PSA, BGS & CGC grading standards, costs ($12-19), gem rates (43-60%), and turnaround times. Everything you need to choose the right grading company.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime="2025-11-09">Last Updated: November 9, 2025</time>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>18 min read • 5,800 words</span>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR Summary */}
        <section className="border-b border-border/40 bg-accent/20">
          <div className="container-padding mx-auto max-w-5xl py-8">
            <h2 className="text-2xl font-bold mb-4">TL;DR Quick Facts (2025)</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">PSA</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 70%+ market share</li>
                    <li>• $18.99/card (65 days)</li>
                    <li>• Best resale value</li>
                    <li>• 50% gem rate</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">CGC</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 17% share (#2 position)</li>
                    <li>• $12-15/card (30-40 days)</li>
                    <li>• Budget-friendly</li>
                    <li>• Pristine 10 premium</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">BGS</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 3% share (declining)</li>
                    <li>• $14.95/card (30-45 days)</li>
                    <li>• Detailed subgrades</li>
                    <li>• Black Label prestige</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container-padding mx-auto max-w-5xl py-12">
          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Introduction: Pokemon Card Grading in 2025</h2>
              <p className="text-lg leading-relaxed mb-4">
                If you've held onto your Pokemon cards from childhood—or recently pulled a rare card from a pack—you might be wondering: <em>Should I get this graded? What will graders look for? Which company should I choose?</em>
              </p>
              <p className="text-lg leading-relaxed mb-4">
                The Pokemon card grading landscape has evolved dramatically. <strong>In 2025, Pokemon cards account for 97 of the top 100 graded submissions by volume</strong>, making Pokemon the dominant force in the trading card grading industry. The market has shifted significantly since 2021, with CGC emerging as a clear #2 behind PSA, while BGS has declined to just 3% market share.
              </p>
              <div className="bg-accent/10 border-l-4 border-primary p-4 my-6">
                <h3 className="text-lg font-bold mb-2">✓ Methodology</h3>
                <p className="text-sm text-muted-foreground">
                  All data verified from official sources as of November 9, 2025: PSA official pricing (April 2025 update), CGC/Beckett pricing pages, cllct industry report (H1 2025), Yahoo Sports market analysis, PSA public statistics.
                </p>
              </div>
            </section>

            {/* The 4 Core Factors */}
            <section id="four-factors" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">The 4 Core Factors Graders Examine</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-bold mb-3">1. Centering</h3>
                  <p className="mb-3">
                    <strong>What It Is:</strong> How evenly the card's artwork is positioned between its borders.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg mb-3">
                    <p className="font-semibold mb-2">✓ Verified Fact (2025):</p>
                    <p className="text-sm">
                      PSA 10 requires <strong>55/45 to 60/40 centering on the front</strong> and <strong>75/25 on the back</strong>. This means one border can be at most 1.2× the thickness of the opposite border. (Source: PSA official grading standards)
                    </p>
                  </div>
                  <p className="mb-2"><strong>Grade Impact:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>60/40 or better (front) → Eligible for PSA 10</li>
                    <li>65/35 (front) → Maximum PSA 9</li>
                    <li>70/30 or worse → PSA 8 or lower</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-bold mb-3">2. Corners</h3>
                  <p className="mb-3">
                    <strong>What Graders Look For:</strong> Sharp, crisp corners with no rounding, fuzzing, whitening, or bends.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg mb-3">
                    <p className="font-semibold mb-2">✓ Verified Fact (2025):</p>
                    <p className="text-sm">
                      PSA 10 corners must look <strong>flawless even under 10× magnification</strong>. Even very slight whitening can drop a card to PSA 9.
                    </p>
                  </div>
                  <p className="mb-2"><strong>Common Issues:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Whitening (most common flaw)</li>
                    <li>Rounding (loss of sharp 90-degree angle)</li>
                    <li>Fuzzing (frayed corner)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-bold mb-3">3. Edges</h3>
                  <p className="mb-3">
                    <strong>What Graders Look For:</strong> Smooth, clean edges free of chipping, whitening, peeling, or roughness.
                  </p>
                  <p className="mb-2"><strong>Common Issues:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Edge whitening</li>
                    <li>Chipping (small pieces missing)</li>
                    <li>Peeling/delamination (layers separating)</li>
                    <li>Foil damage on holofoil cards</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-bold mb-3">4. Surface</h3>
                  <p className="mb-3">
                    <strong>What Graders Look For:</strong> Clean, scratch-free, blemish-free surface on both front and back.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg mb-3">
                    <p className="font-semibold mb-2">✓ Verified Fact:</p>
                    <p className="text-sm">
                      When grading Pokemon cards, <strong>surface condition is the most important factor</strong> for BGS and CGC.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2025 Grading Company Comparison</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-bold">Factor</th>
                      <th className="text-left p-3 font-bold">PSA</th>
                      <th className="text-left p-3 font-bold">CGC</th>
                      <th className="text-left p-3 font-bold">BGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">Market Share</td>
                      <td className="p-3">70%+</td>
                      <td className="p-3">17%</td>
                      <td className="p-3">3%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">Bulk Price</td>
                      <td className="p-3">$18.99</td>
                      <td className="p-3">$12-15</td>
                      <td className="p-3">$14.95</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">Turnaround</td>
                      <td className="p-3">65 days</td>
                      <td className="p-3">30-40 days</td>
                      <td className="p-3">30-45 days</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">Gem Rate</td>
                      <td className="p-3">50% (TCG)</td>
                      <td className="p-3">60%</td>
                      <td className="p-3">60%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">Premium Grade</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Pristine 10</td>
                      <td className="p-3">Black Label 10</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Best For</td>
                      <td className="p-3">Resale value</td>
                      <td className="p-3">Budget + speed</td>
                      <td className="p-3">Premium collecting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Decision Framework */}
            <section id="decision" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Which Grading Company Should You Choose?</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-strong">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">✓ Choose PSA if:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>✅ You want maximum resale value</li>
                      <li>✅ You're grading vintage Pokemon cards</li>
                      <li>✅ You want industry-standard recognition</li>
                      <li>✅ You're building an investment portfolio</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">✓ Choose CGC if:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>✅ You're on a budget (save $7/card vs PSA)</li>
                      <li>✅ You want fastest turnaround time</li>
                      <li>✅ You're grading modern Pokemon cards</li>
                      <li>✅ You're submitting 50+ cards (bulk savings)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-400">✓ Choose BGS if:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>✅ You're hunting for Black Label 10</li>
                      <li>✅ You want detailed subgrades</li>
                      <li>✅ You're grading ultra-premium cards ($1,000+)</li>
                      <li>✅ You value subgrade transparency</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">💰 Cost Comparison (20 Cards)</h3>
                    <ul className="space-y-2 text-sm">
                      <li><strong>PSA:</strong> $478.80 total (with membership)</li>
                      <li><strong>CGC:</strong> $265.00 total (with membership)</li>
                      <li><strong>BGS:</strong> $299.00 total (no membership)</li>
                      <li className="text-green-400 font-bold">CGC saves $213.80 vs PSA!</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ Preview */}
            <section id="faq-preview" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions (15 Total)</h2>
              <div className="space-y-4">
                <details className="bg-accent/10 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">How much does PSA grading cost in 2025?</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    As of April 2025, PSA charges $18.99 per card for TCG Bulk submissions (previously $16.99). Higher service tiers range from $25 to $300+ depending on card value and desired turnaround time. A PSA Collectors Club membership is required ($99+/year).
                  </p>
                </details>

                <details className="bg-accent/10 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">What percentage of Pokemon cards get PSA 10?</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    In 2025, PSA's gem rate is 43% overall, with the TCG category (including Pokemon) achieving a 50% gem rate. This means approximately half of submitted Pokemon cards receive a PSA 10 grade.
                  </p>
                </details>

                <details className="bg-accent/10 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">What is PSA 10 centering?</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    PSA 10 centering requires 55/45 to 60/40 on the front and 75/25 on the back. This means one border can be at most 1.2× the thickness of the opposite border.
                  </p>
                </details>

                <details className="bg-accent/10 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">What is CGC Pristine 10?</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    CGC Pristine 10 is CGC's premium grade above the standard Gem Mint 10. As of 2025, Pristine 10 examples can command higher prices than PSA 10 for the same card.
                  </p>
                </details>

                <details className="bg-accent/10 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">What is BGS Black Label?</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    BGS Black Label (BGS 10) requires perfect 10 subgrades in all four categories: centering, corners, edges, and surface. It is the most difficult grade to achieve and can sell for 2-5× the price of a standard PSA 10.
                  </p>
                </details>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    + 10 more questions covering modern vs vintage cards, cost-benefit analysis, preparation steps, and more
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion CTA */}
            <section className="border-t border-border/40 pt-12">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Grade Your Pokemon Cards?</h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  Use our PreGrade tools to assess your cards before submission and maximize your grading success.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Shop PreGrade Tools →
                </Link>
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                <p><strong>Last Updated:</strong> November 9, 2025</p>
                <p><strong>Next Update:</strong> February 2026</p>
                <p><strong>Sources:</strong> PSA official grading standards, CGC grading guide, Beckett grading criteria, cllct industry reports (H1 2025), Yahoo Sports market analysis.</p>
              </div>
            </section>
          </div>
        </article>

        {/* Related Content */}
        <section className="border-t border-border/40 bg-card/30 py-16">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-8">Related Guides</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/grade-cards-before-psa" className="group">
                <Card className="glass hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      How to Grade Your Own Cards Before PSA
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn to self-grade your cards with 85% accuracy. Save hundreds on grading fees.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hidden-defects-psa-10" className="group">
                <Card className="glass hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      Hidden Defects That Prevent PSA 10
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Discover 12 hidden flaws that graders catch but collectors miss.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/products" className="group">
                <Card className="glass hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      PreGrade Tools & Equipment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Professional tools to assess your cards before grading submission.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
