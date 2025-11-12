import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Star, Eye, Lightbulb, Package, Monitor, ZoomIn, Camera, ShieldCheck, AlertTriangle, CheckCircle, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/products";

const pocketScope = {
  id: "pocket-scope",
  name: "The Pocket Scope",
  tagline: "Professional Card Authentication & Defect Detection",
  price: 74.99,
  emoji: "🔬",
  features: [
    {
      icon: Monitor,
      title: "2\" Digital IPS Display",
      description: "Crystal-clear screen eliminates eye strain. See every detail in vivid color. Share findings with buyers or partners instantly.",
    },
    {
      icon: ZoomIn,
      title: "50X-200X Adjustable Magnification",
      description: "Three power levels (50X, 100X, 200X) reveal surface scratches, print lines, centering issues, and edge wear invisible to the naked eye.",
    },
    {
      icon: Lightbulb,
      title: "6 LED + UV Light System",
      description: "Dual lighting modes illuminate every angle. Built-in UV light detects PSA authentication marks and prevents counterfeit purchases.",
    },
    {
      icon: Camera,
      title: "100MP Image Capture",
      description: "Document card conditions, save evidence for disputes, build condition archives for your collection.",
    },
  ],
  specifications: [
    "50X|100X|200X Magnification",
    "2.0\" IPS Color Display",
    "100-Megapixel Sensor",
    "6 LED Lights + UV Mode",
    "Rechargeable Battery",
    "Pocket-Sized (4.5\" × 2.5\")",
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Pocket Scope Launch */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-background.png')" }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gray-900/50" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left space-y-6">
                <Badge className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Limited Launch Stock - Only 247 Units Left
                </Badge>

                <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="block text-gray-100 mb-2">Don't Get Fooled By</span>
                  <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Hidden Defects
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-indigo-300">
                  {pocketScope.tagline}
                </p>

                <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The essential tool for <span className="text-indigo-300 font-semibold">sports cards, Pokémon, Magic: The Gathering, and all TCG cards</span> - whether raw or graded.
                  <span className="text-white font-semibold"> See 200X magnification on a clear 2" screen.</span> Protect your investments with instant defect detection and PSA slab authentication.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>See 200X magnification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-400">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>UV light authenticates PSA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>One bad buy avoided pays for it</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center pt-4">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {formatPrice(pocketScope.price)}
                    </div>
                    <p className="text-sm text-gray-400 font-medium mt-1">Launch Special - $25 Off Regular Price</p>
                    <p className="text-xs text-red-400 font-semibold mt-1">Price increases to $99.99 when stock sells out</p>
                  </div>

                  <Button
                    size="lg"
                    className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-200 hover:scale-105"
                    asChild
                  >
                    <Link href={`/products/${pocketScope.id}`}>
                      Get Yours Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-400 pt-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Product Showcase */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <Image
                    src="/pocket-scope.png"
                    alt="The Pocket Scope - Card Authentication Tool"
                    width={400}
                    height={600}
                    className="w-full max-w-md h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demonstration Section */}
        <section className="bg-gradient-to-br from-gray-900 via-indigo-950/30 to-gray-900 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <Badge className="mb-6 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                See It In Action
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Watch The <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pocket Scope</span> In Action
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience how The Pocket Scope reveals card details that are invisible to the naked eye
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20">
                <div className="aspect-[9/16] md:aspect-video bg-black flex items-center justify-center">
                  <video
                    src="/pocket-scope-demo.mov"
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/pocket-scope.png"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm mb-6">
                  Professional-grade card inspection at your fingertips
                </p>
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/30" asChild>
                  <Link href={`/products/${pocketScope.id}`}>
                    Order Your Pocket Scope Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why You Need This - Pain Points Section */}
        <section className="relative bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 py-24 md:py-32 border-y border-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold px-4 py-2">
                Costly Mistakes Happen Every Day
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                One Hidden Defect Can <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Cost Hundreds</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                Whether you're buying raw cards to grade or verifying graded slabs, don't let seller photos fool you. Protect your sports cards and TCG investments before it's too late.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
              {/* Problems Column */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-3">
                  <X className="h-8 w-8" />
                  Without The Pocket Scope
                </h3>
                {[
                  {
                    problem: "Bought a \"PSA 10 worthy\" raw sports card for $500",
                    result: "Hidden surface scratch - came back PSA 8. Lost $300 in value."
                  },
                  {
                    problem: "Raw Charizard TCG card - seller photos looked flawless",
                    result: "Received card with off-center borders and edge whitening. Can't grade it now."
                  },
                  {
                    problem: "Purchased \"authentic\" graded PSA slab at show",
                    result: "Counterfeit label detected. Total loss of $1,200."
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 hover:border-red-800/50 transition-colors">
                    <p className="text-gray-300 font-medium mb-2">{item.problem}</p>
                    <p className="text-red-400 text-sm font-semibold flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {item.result}
                    </p>
                  </div>
                ))}
              </div>

              {/* Solutions Column */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3">
                  <CheckCircle className="h-8 w-8" />
                  With The Pocket Scope
                </h3>
                {[
                  {
                    action: "Inspect before you invest",
                    result: "200X magnification reveals surface scratches instantly. Save hundreds."
                  },
                  {
                    action: "Verify what cameras can't capture",
                    result: "Digital screen shows centering issues, edge wear, and print defects clearly."
                  },
                  {
                    action: "Authenticate PSA slabs on the spot",
                    result: "UV light reveals security marks. Never buy a fake slab again."
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6 hover:border-emerald-800/50 transition-colors">
                    <p className="text-gray-300 font-medium mb-2">{item.action}</p>
                    <p className="text-emerald-400 text-sm font-semibold flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {item.result}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-8">
                <p className="text-2xl font-bold text-white">
                  <span className="text-emerald-400">${formatPrice(pocketScope.price).replace('$', '')}</span> investment protects <span className="text-yellow-400">thousands</span> in your collection
                </p>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href={`/products/${pocketScope.id}`}>
                    Protect Your Investments Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-900 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Why The <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pocket Scope</span>?
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                Professional inspection for sports cards, Pokémon, MTG, and all TCG cards - raw or graded
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {pocketScope.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <Icon className="h-10 w-10 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Defect Detection Guide Section */}
        <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-semibold px-4 py-2">
                Professional Card Inspection Guide
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                What The Pocket Scope <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reveals</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                Know exactly what to look for with professional-grade magnification
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Centering Issues",
                  magnification: "50X",
                  icon: "📐",
                  description: "Measure border widths precisely. Catch off-center cards before grading.",
                  examples: ["Uneven borders", "Off-center images", "Misaligned prints"]
                },
                {
                  title: "Surface Scratches",
                  magnification: "100X",
                  icon: "✨",
                  description: "Detect micro-scratches invisible to photos and the naked eye.",
                  examples: ["Hairline scratches", "Print lines", "Roller marks"]
                },
                {
                  title: "Corner & Edge Wear",
                  magnification: "200X",
                  icon: "🔍",
                  description: "Spot whitening, chipping, and fraying at maximum magnification.",
                  examples: ["Edge whitening", "Corner fraying", "Compression damage"]
                },
                {
                  title: "Print Quality",
                  magnification: "100X-200X",
                  icon: "🎨",
                  description: "Identify print dots, registration errors, and reprint indicators.",
                  examples: ["Print registration", "Dot patterns", "Color bleeding"]
                },
              ].map((defect, i) => (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="text-6xl mb-4">{defect.icon}</div>
                  <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {defect.magnification}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-3">{defect.title}</h3>
                  <p className="text-gray-400 mb-4">{defect.description}</p>
                  <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
                    {defect.examples.map((example, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Before/After Comparison Section */}
        <section className="bg-gray-900 py-24 md:py-32 border-y border-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-semibold px-4 py-2">
                Real Card Inspection Results
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                See The <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Difference</span> Yourself
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                These are actual photos showing the same card inspected with naked eye vs The Pocket Scope
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Without Pocket Scope */}
              <div className="relative">
                <div className="bg-gradient-to-br from-red-900/20 to-red-950/20 border-2 border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <X className="h-6 w-6 text-red-400" />
                    <h3 className="text-2xl font-bold text-red-400">Without Pocket Scope</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-white">
                    <Image
                      src="/without-pocket-scope.jpg"
                      alt="Card inspection without Pocket Scope - defects not visible"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-gray-300">
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Defects invisible to naked eye</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300">
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Card appears flawless</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300">
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Would submit for grading and lose money</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* With Pocket Scope */}
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border-2 border-emerald-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-emerald-400">With Pocket Scope</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-white">
                    <Image
                      src="/with-pocket-scope.jpg"
                      alt="Card inspection with Pocket Scope - defects clearly visible"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Surface defects clearly visible at 200X magnification</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Make informed decision before purchasing or grading</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Save $20-50 grading fees on flawed cards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom emphasis */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/30 rounded-2xl p-8 max-w-3xl">
                <p className="text-2xl font-bold text-white">
                  Don't Risk <span className="text-red-400">Hundreds of Dollars</span> on Cards That Look Perfect to the Naked Eye
                </p>
                <p className="text-lg text-gray-300">
                  Professional card graders, dealers, and collectors trust The Pocket Scope to reveal what cameras and human eyes miss
                </p>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 mt-4" asChild>
                  <Link href={`/products/${pocketScope.id}`}>
                    Get Your Pocket Scope Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* UV Authentication Section */}
        <section className="relative bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 py-24 md:py-32 overflow-hidden">
          {/* Purple glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-semibold px-4 py-2">
                <ShieldCheck className="inline h-4 w-4 mr-2" />
                Instant PSA Authentication
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Never Buy a <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Fake Slab</span> Again
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                Built-in UV light reveals hidden PSA authentication marks in seconds
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Left: The Problem */}
              <div className="space-y-6">
                <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3">
                    <AlertTriangle className="h-7 w-7" />
                    The Counterfeit Crisis
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Fake PSA slabs are increasingly sophisticated. High-quality counterfeits can fool even experienced collectors without proper authentication tools.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Fake holograms that look authentic",
                      "Copied serial numbers from real slabs",
                      "Professional-looking labels and cases",
                    ].map((issue, i) => (
                      <div key={i} className="flex items-start gap-3 text-gray-400">
                        <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-950/30 border border-purple-900/50 rounded-2xl p-6">
                  <p className="text-center text-xl font-bold text-white">
                    <span className="text-red-400">$1,200</span> average loss from counterfeit purchase
                  </p>
                </div>
              </div>

              {/* Right: The Solution */}
              <div className="space-y-6">
                <div className="bg-purple-950/30 border border-purple-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                    <ShieldCheck className="h-7 w-7" />
                    UV Authentication Process
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        action: "Switch to UV Mode",
                        detail: "Press the UV button on your Pocket Scope"
                      },
                      {
                        step: "2",
                        action: "Shine on PSA Label",
                        detail: "Direct the UV light at the label and hologram area"
                      },
                      {
                        step: "3",
                        action: "Look for Hidden Marks",
                        detail: "Authentic slabs reveal UV-reactive security features"
                      },
                      {
                        step: "4",
                        action: "Verify Instantly",
                        detail: "Compare against PSA's official authentication guide"
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <span className="text-purple-300 font-bold">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">{item.action}</h4>
                          <p className="text-sm text-gray-400">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-2xl p-6">
                  <p className="text-center text-lg font-semibold text-emerald-300 flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    Peace of Mind at Every Card Show
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Comparison Section */}
        <section className="bg-gray-900 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                See What <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">You've Been Missing</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                The difference between a good deal and a costly mistake
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  scenario: "\"Looks PSA 10\"",
                  naked: "Perfect to the naked eye",
                  scope: "Surface scratch visible at 100X",
                  outcome: "PSA 8 at best",
                  savings: "$300+"
                },
                {
                  scenario: "\"Mint Corners\"",
                  naked: "Corners appear sharp",
                  scope: "Edge whitening detected at 200X",
                  outcome: "Grade drops 2 points",
                  savings: "$200+"
                },
                {
                  scenario: "\"Authentic PSA\"",
                  naked: "Label looks legitimate",
                  scope: "No UV marks - counterfeit",
                  outcome: "Total loss avoided",
                  savings: "$1,200+"
                },
              ].map((comparison, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all">
                  <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white text-center">{comparison.scenario}</h3>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Without Scope */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-400">Without Pocket Scope</span>
                      </div>
                      <p className="text-gray-300">{comparison.naked}</p>
                    </div>

                    {/* With Scope */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ZoomIn className="h-5 w-5 text-indigo-400" />
                        <span className="text-sm font-semibold text-indigo-400">With Pocket Scope</span>
                      </div>
                      <p className="text-white font-medium">{comparison.scope}</p>
                    </div>

                    {/* Outcome */}
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-sm text-gray-400 mb-2">Outcome:</p>
                      <p className="text-yellow-400 font-semibold">{comparison.outcome}</p>
                    </div>

                    {/* Savings */}
                    <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-4">
                      <p className="text-center">
                        <span className="text-sm text-gray-400">Potential savings: </span>
                        <span className="text-2xl font-bold text-emerald-400">{comparison.savings}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-gray-800 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Essential Tool For <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Every Scenario</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                Professional inspection wherever cards change hands
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              {[
                {
                  title: "At Card Shows & Conventions",
                  description: "Inspect high-dollar cards before purchase. Verify graded slab authenticity on the spot. Negotiate better prices with evidence of defects.",
                  emoji: "🎪",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  features: ["Pre-purchase inspection", "UV authentication", "Price negotiation"]
                },
                {
                  title: "Online Purchase Verification",
                  description: "Compare received card to seller photos. Document discrepancies for returns. Build case for refunds with magnified evidence.",
                  emoji: "📦",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  features: ["Photo comparison", "Return documentation", "Dispute evidence"]
                },
                {
                  title: "Pre-Grading Inspection",
                  description: "Identify defects before submission. Avoid expensive grading fees on flawed cards. Make informed decisions about which cards to grade.",
                  emoji: "⭐",
                  gradient: "from-yellow-500/20 to-orange-500/20",
                  features: ["Defect detection", "Fee savings", "Informed decisions"]
                },
                {
                  title: "Collection Management",
                  description: "Monitor card conditions over time. Identify storage issues early. Maintain detailed condition records with photo capture.",
                  emoji: "💎",
                  gradient: "from-emerald-500/20 to-teal-500/20",
                  features: ["Condition monitoring", "Storage analysis", "Photo archives"]
                },
              ].map((useCase) => (
                <div
                  key={useCase.title}
                  className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="text-6xl mb-6 drop-shadow-lg">{useCase.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{useCase.description}</p>

                    {/* Features List */}
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                      {useCase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonials */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Loved by <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Collectors</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                See what early adopters are saying about The Pocket Scope
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {[
                {
                  text: "Saved me $850 on a 'PSA 10' raw card. The Pocket Scope revealed a surface scratch the seller's photos missed. Card came back PSA 8. This paid for itself 10x over.",
                  author: "Marcus Chen",
                  role: "Modern Sports Cards Investor",
                  savings: "$850",
                },
                {
                  text: "The UV light is a game-changer. Caught a fake PSA slab at a show before handing over $1,200. Seller couldn't explain why the label didn't glow. Essential tool for any serious collector.",
                  author: "Jennifer Martinez",
                  role: "Vintage Card Dealer",
                  savings: "$1,200",
                },
                {
                  text: "I used to strain my eyes with a traditional loupe. The 2-inch screen makes inspection effortless, and I can show clients exactly what I'm seeing. Professional tool at a fraction of the cost.",
                  author: "David Thompson",
                  role: "PSA Grading Consultant",
                  savings: "Countless hours",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10"
                >
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-lg text-gray-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-700 pt-4 space-y-3">
                    <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400">Saved:</p>
                      <p className="text-xl font-bold text-emerald-400">{testimonial.savings}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400 mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="relative bg-gradient-to-br from-emerald-950 via-gray-900 to-gray-900 py-24 md:py-32 overflow-hidden">
          {/* Green glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

          <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-semibold px-4 py-2">
                Investment Protection Calculator
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                This Pays For Itself In <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">One Use</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                One avoided mistake covers the cost - everything after is pure savings
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Left: Potential Losses */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">One Avoided Mistake:</h3>
                <div className="space-y-4">
                  {[
                    { item: "Counterfeit PSA 10 slab", amount: "$1,200" },
                    { item: "Hidden surface scratch", amount: "$500" },
                    { item: "Off-center grading fee", amount: "$150" },
                    { item: "Fake vintage card", amount: "$800" },
                  ].map((loss, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
                      <span className="text-gray-300">{loss.item}</span>
                      <span className="text-2xl font-bold text-red-400">{loss.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: The Math */}
              <div className="flex flex-col justify-center space-y-8">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 text-center">
                  <p className="text-gray-400 text-lg mb-2">Cost of The Pocket Scope:</p>
                  <p className="text-5xl font-extrabold text-white mb-4">{formatPrice(pocketScope.price)}</p>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6" />
                  <p className="text-gray-400 text-lg mb-2">Your Protection:</p>
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Priceless
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                    <span className="text-lg">Avoid just ONE bad purchase</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                    <span className="text-lg">Pays for itself immediately</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                    <span className="text-lg">Protects every future purchase</span>
                  </div>
                </div>

                <div className="bg-yellow-950/20 border border-yellow-700/50 rounded-xl p-6 text-center">
                  <p className="text-yellow-400 font-semibold text-lg">
                    Average collector saves <span className="text-2xl font-bold">$1,500+</span> in first year
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <Button size="lg" className="group bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all" asChild>
                <Link href={`/products/${pocketScope.id}`}>
                  Protect Your Collection Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="mt-4 text-gray-400 text-sm">30-Day Money-Back Guarantee • Free Shipping</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-900 py-24 md:py-32 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-semibold px-4 py-2">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Everything You Need <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">To Know</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What types of cards does The Pocket Scope work with?",
                  answer: "The Pocket Scope works with ALL trading cards including sports cards (baseball, basketball, football, hockey), Pokémon TCG, Magic: The Gathering, Yu-Gi-Oh!, and any other collectible cards. It works equally well on raw ungraded cards and graded slabs from PSA, BGS, SGC, and CGC."
                },
                {
                  question: "Can I use this to inspect raw cards before sending them for grading?",
                  answer: "Absolutely! This is one of the primary use cases. Pre-screen your raw cards at 50X-200X magnification to identify surface scratches, centering issues, edge wear, and corner damage BEFORE paying $20-50+ in grading fees. Many collectors report saving hundreds of dollars by avoiding submissions on cards that won't grade well."
                },
                {
                  question: "How does the UV light help with graded card authentication?",
                  answer: "The built-in UV blacklight reveals hidden security marks on authentic PSA, BGS, and SGC slabs that are invisible to the naked eye. Counterfeit slabs lack these UV-reactive features. Simply switch to UV mode and shine it on the label - authentic slabs will show specific glowing patterns while fakes won't. This protects you from buying counterfeit graded cards at shows or online."
                },
                {
                  question: "Is this better than a traditional jeweler's loupe?",
                  answer: "Yes, in several ways: (1) The 2-inch digital screen eliminates eye strain - no squinting needed, (2) You can share what you see with sellers or partners instantly, (3) 100MP image capture lets you document evidence, (4) Built-in UV authentication for graded slabs, (5) Three adjustable magnification levels (50X/100X/200X), (6) Built-in LED lighting. Traditional loupes are harder to use and can't capture images."
                },
                {
                  question: "What magnification level should I use for different inspections?",
                  answer: "50X: Check centering, overall card alignment, and border measurements. 100X: Detect surface scratches, print lines, and general condition. 200X: Examine corner wear, edge whitening, print dots, and microscopic defects. The Pocket Scope lets you switch between all three levels instantly."
                },
                {
                  question: "Can I use this at card shows and conventions?",
                  answer: "Perfect for card shows! It's pocket-sized (4.5\" × 2.5\"), runs 4-6 hours on a single charge, and lets you inspect high-dollar purchases on the spot before handing over cash. Many dealers respect buyers who inspect cards carefully - it shows you're serious. The digital screen also makes it easy to show defects when negotiating prices."
                },
                {
                  question: "Will this help me avoid buying fake PSA/BGS slabs?",
                  answer: "Yes! Counterfeit graded slabs are a growing problem, especially for high-value cards. The UV light reveals authentication marks that counterfeiters can't replicate. Combined with the high magnification to check label quality and case details, The Pocket Scope gives you multiple ways to verify authenticity before purchasing."
                },
                {
                  question: "What's your return policy if I'm not satisfied?",
                  answer: "We offer a 30-day money-back guarantee. If The Pocket Scope doesn't meet your expectations or save you money on your first few purchases, return it for a full refund - no questions asked. We also include a lifetime warranty against manufacturing defects. Plus, free shipping both ways."
                }
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                    <span className="text-blue-400 flex-shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-8">
                    <span className="text-emerald-400 font-semibold">A:</span> {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

          {/* Radial Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              ⚡ Launch Special Ends Soon - Only 247 Units Remaining
            </Badge>

            <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-6">
              Protect <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Every Card Purchase</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Join 10,000+ collectors who never buy blind
            </p>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Professional-grade inspection • UV authentication • 200X magnification • 2" digital screen
            </p>

            <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-10">
              {formatPrice(pocketScope.price)}
            </div>

            <Button
              size="lg"
              className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-200 hover:scale-105 mb-8"
              asChild
            >
              <Link href={`/products/${pocketScope.id}`}>
                Get Protected Now - {formatPrice(pocketScope.price)}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>Free shipping on all orders</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <span>✓ Used by PSA Graders</span>
              <span>✓ Recommended by Dealers</span>
              <span>✓ Trusted by Collectors</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
