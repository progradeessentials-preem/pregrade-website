import Link from "next/link";
import { ArrowRight, Shield, Users, Target, Award, CheckCircle, TrendingUp, Heart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About Us - Our Story & Mission | PreGrade Essentials",
  description: "Learn how PreGrade Essentials was founded by collectors who were tired of costly grading mistakes and counterfeit purchases. Our mission: Give every collector professional-grade inspection tools.",
  keywords: "PreGrade Essentials story, card collecting company, professional grading tools, collector tools, card authentication mission",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900/50 to-transparent" />
          <div className="container-padding relative mx-auto max-w-7xl py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                Built By Collectors, For Collectors
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block text-white mb-2">Every Collector Deserves</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Professional Tools
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                We're on a mission to <span className="text-white font-semibold">protect collectors from costly mistakes</span> by providing affordable, professional-grade inspection tools that were previously only available to dealers and grading companies.
              </p>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Story Content */}
              <div className="space-y-6">
                <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold px-4 py-2">
                  Our Origin Story
                </Badge>
                <h2 className="text-4xl font-extrabold text-white md:text-5xl leading-tight">
                  Born From a <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">$1,200 Mistake</span>
                </h2>
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    It was a cold Saturday morning at a major card show. Our founder, a passionate sports card collector for over 15 years, was about to make what seemed like the deal of a lifetime — a PSA 10 vintage rookie card at 20% below market value.
                  </p>
                  <p className="text-white font-semibold">
                    Something felt off, but without proper tools to authenticate the slab, he took the seller's word.
                  </p>
                  <p>
                    Two weeks later, he discovered the truth: counterfeit slab, fake label, worthless card. <span className="text-red-400 font-bold">$1,200 gone.</span>
                  </p>
                  <p>
                    That painful experience sparked a question: <span className="text-indigo-300 font-semibold italic">"Why don't collectors have access to the same professional inspection tools that dealers and grading companies use?"</span>
                  </p>
                  <p className="text-white font-semibold">
                    PreGrade Essentials was born to answer that question.
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">The Problem We Solve</h3>
                    <div className="space-y-6">
                      {[
                        { stat: "$850", label: "Average loss from bad grading submission", icon: TrendingUp },
                        { stat: "$1,200", label: "Average loss from counterfeit purchase", icon: Shield },
                        { stat: "40%", label: "Of submissions grade lower than expected", icon: Award },
                        { stat: "10,000+", label: "Collectors we've helped protect", icon: Users },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-3xl font-extrabold text-white">{item.stat}</p>
                              <p className="text-sm text-gray-400">{item.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="relative border-y border-gray-800 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                Our Mission & Values
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                What We <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Stand For</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                These principles guide everything we do, from product design to customer support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Shield,
                  title: "Protection First",
                  description: "Every tool we create is designed to protect collectors from costly mistakes, whether it's a bad grading submission or a counterfeit purchase.",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  iconColor: "text-blue-400",
                },
                {
                  icon: Heart,
                  title: "Collector-Centric",
                  description: "We're collectors ourselves. We understand the frustration of hidden defects and fake slabs because we've experienced it firsthand.",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  iconColor: "text-purple-400",
                },
                {
                  icon: Target,
                  title: "Accessible Excellence",
                  description: "Professional-grade inspection tools shouldn't cost thousands. We make premium quality accessible at prices that make sense for serious collectors.",
                  gradient: "from-emerald-500/20 to-teal-500/20",
                  iconColor: "text-emerald-400",
                },
              ].map((value, i) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={i}
                    className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient}`}>
                        <Icon className={`h-8 w-8 ${value.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-semibold px-4 py-2">
                What Makes Us Different
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-4">
                Why Collectors <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Trust Us</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "We're Collectors, Not Just Sellers",
                  description: "Every product we offer is something we use ourselves. We don't sell anything we wouldn't trust with our own collections.",
                },
                {
                  title: "Honest, No-BS Approach",
                  description: "We'll never promise a tool will guarantee PSA 10s. We promise it will help you make informed decisions and avoid costly mistakes.",
                },
                {
                  title: "Educational Focus",
                  description: "Our blog, guides, and support aren't just marketing — they're genuine resources to help you become a better, more informed collector.",
                },
                {
                  title: "Real Customer Support",
                  description: "Questions about using our tools? Confused about what you're seeing? We're here to help, not just take your order.",
                },
                {
                  title: "Quality Over Quantity",
                  description: "We'd rather offer one exceptional tool than dozens of mediocre ones. Every product meets professional standards.",
                },
                {
                  title: "Community-Driven",
                  description: "Product improvements come from collector feedback. You tell us what you need, and we build it.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="relative border-y border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Trusted By <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">10,000+ Collectors</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From casual collectors to professional dealers, thousands trust PreGrade Essentials to protect their investments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The Pocket Scope saved me from submitting three cards with hidden scratches. That's $105 in grading fees I would've wasted. Paid for itself immediately.",
                  author: "Marcus Chen",
                  role: "Modern Sports Card Investor",
                  saved: "$850+",
                },
                {
                  quote: "I caught a fake PSA slab at a show using the UV light feature. The seller couldn't explain why it didn't glow. Saved me $1,200 on a counterfeit purchase.",
                  author: "Jennifer Martinez",
                  role: "Vintage Card Dealer",
                  saved: "$1,200",
                },
                {
                  quote: "As a professional grader, I appreciate tools that help collectors make informed decisions. The Pocket Scope is exactly what the hobby needs.",
                  author: "David Thompson",
                  role: "PSA Grading Consultant",
                  saved: "Countless hours",
                },
              ].map((testimonial, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="text-yellow-400 text-xl">★</div>
                        ))}
                      </div>
                      <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                    <div className="border-t border-gray-700 pt-6 space-y-3">
                      <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-3">
                        <p className="text-xs text-gray-400">Saved:</p>
                        <p className="text-xl font-bold text-emerald-400">{testimonial.saved}</p>
                      </div>
                      <div>
                        <p className="font-bold text-white">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-24 md:py-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

          <div className="relative z-10 container-padding mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl mb-6">
              Join the <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PreGrade Community</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Protect your investments with professional-grade tools designed by collectors who've been exactly where you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/50 transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/products/pocket-scope">
                  Shop The Pocket Scope
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 hover:border-indigo-500 text-white font-semibold text-lg px-8 py-6 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-200"
                asChild
              >
                <Link href="/blog">
                  Read Our Guides
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>10,000+ Collectors</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
