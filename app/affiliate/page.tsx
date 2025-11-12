"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Zap,
  Gift,
  CheckCircle2,
  ArrowRight,
  Mail,
  User,
  Globe,
  MessageSquare
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    audience: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.audience) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you within 48 hours.",
      });
      setFormData({
        name: "",
        email: "",
        website: "",
        audience: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-indigo-950/30 to-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center">
              <Badge className="mb-6 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                Join Our Partner Network
              </Badge>
              <h1 className="text-5xl font-extrabold text-white md:text-6xl lg:text-7xl mb-6">
                Earn Up To{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  30% Commission
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Partner with PreGrade Essentials and earn generous commissions by promoting professional-grade card authentication tools to your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#apply">Apply Now</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#how-it-works">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-900 py-16 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: DollarSign, label: "Up to 30%", sublabel: "Commission Rate" },
                { icon: TrendingUp, label: "$74.99", sublabel: "Average Order Value" },
                { icon: Users, label: "90 Days", sublabel: "Cookie Duration" },
                { icon: Target, label: "15%+", sublabel: "Conversion Rate" },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-white mb-1">{stat.label}</p>
                    <p className="text-sm text-gray-400">{stat.sublabel}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We provide everything you need to succeed as an affiliate partner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "High Commissions",
                  description: "Earn up to 30% commission on every sale. Our tiered structure rewards top performers with higher rates.",
                },
                {
                  icon: Zap,
                  title: "90-Day Cookies",
                  description: "Extended cookie duration gives you full credit for sales made within 90 days of the initial click.",
                },
                {
                  icon: Gift,
                  title: "Your Own Discount Code",
                  description: "Receive a personalized discount code to share with your audience. We track all sales through your code, making it easy to monitor your earnings.",
                },
                {
                  icon: TrendingUp,
                  title: "High Conversion",
                  description: "Our products convert at 15%+ with an average order value of $74.99, maximizing your earnings.",
                },
              ].map((benefit, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <benefit.icon className="h-12 w-12 text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="bg-gradient-to-br from-indigo-950/20 to-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Commission Structure
              </h2>
              <p className="text-xl text-gray-400">
                The more you sell, the more you earn. Our tiered structure rewards success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { tier: "Starter", sales: "1-10 sales/month", rate: "15%", color: "emerald" },
                { tier: "Pro", sales: "11-30 sales/month", rate: "20%", color: "blue" },
                { tier: "Elite", sales: "30+ sales/month", rate: "30%", color: "purple" },
              ].map((tier, idx) => (
                <Card
                  key={idx}
                  className={`bg-gradient-to-br ${
                    tier.color === "emerald" ? "from-emerald-900/20 to-gray-900 border-emerald-500/30" :
                    tier.color === "blue" ? "from-blue-900/20 to-gray-900 border-blue-500/30" :
                    "from-purple-900/20 to-gray-900 border-purple-500/30"
                  } border-2`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{tier.tier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className={`text-5xl font-extrabold ${
                        tier.color === "emerald" ? "text-emerald-400" :
                        tier.color === "blue" ? "text-blue-400" :
                        "text-purple-400"
                      } mb-2`}>
                        {tier.rate}
                      </p>
                      <p className="text-gray-400">{tier.sales}</p>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className={`h-5 w-5 ${
                          tier.color === "emerald" ? "text-emerald-400" :
                          tier.color === "blue" ? "text-blue-400" :
                          "text-purple-400"
                        } flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-300">90-day cookie duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className={`h-5 w-5 ${
                          tier.color === "emerald" ? "text-emerald-400" :
                          tier.color === "blue" ? "text-blue-400" :
                          "text-purple-400"
                        } flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-300">Real-time tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className={`h-5 w-5 ${
                          tier.color === "emerald" ? "text-emerald-400" :
                          tier.color === "blue" ? "text-blue-400" :
                          "text-purple-400"
                        } flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-300">Monthly payouts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
              <p className="text-center text-indigo-300 font-semibold">
                Example: Sell 25 units/month at $74.99 = Earn $374.95 in commissions at the Pro tier (20%)
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Get started in minutes and begin earning commissions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Apply",
                  description: "Fill out the simple application form below. We review all applications within 48 hours.",
                },
                {
                  step: "2",
                  title: "Get Approved",
                  description: "Once approved, you'll receive your personalized discount code to share with your audience and track sales.",
                },
                {
                  step: "3",
                  title: "Promote",
                  description: "Share your personalized discount code through your website, social media, email list, or any channel you prefer.",
                },
                {
                  step: "4",
                  title: "Earn",
                  description: "Receive commission payments monthly via PayPal or bank transfer. Track everything in real-time.",
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center text-2xl font-bold text-indigo-400 mx-auto mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </CardContent>
                  </Card>
                  {idx < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-indigo-500 h-8 w-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="bg-gradient-to-br from-gray-900 via-indigo-950/30 to-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Apply to Join
              </h2>
              <p className="text-xl text-gray-400">
                Fill out the form below and we'll get back to you within 48 hours
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-400" />
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-indigo-400" />
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-indigo-400" />
                      Website or Social Media URL
                    </label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your primary platform for promoting our products
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-400" />
                      Tell us about your audience <span className="text-red-400">*</span>
                    </label>
                    <Textarea
                      name="audience"
                      value={formData.audience}
                      onChange={handleInputChange}
                      placeholder="Describe your audience size, niche, and how you plan to promote our products..."
                      required
                      rows={4}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-indigo-400" />
                      Additional Information
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any additional information you'd like to share..."
                      rows={3}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="/contact" className="text-indigo-400 hover:underline">
                      affiliate terms and conditions
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How do I get paid?",
                  answer: "We process payments monthly via PayPal or bank transfer. Minimum payout is $50. All commissions are tracked in real-time through your personalized discount code.",
                },
                {
                  question: "How does the discount code tracking work?",
                  answer: "Once approved, you'll receive your personalized discount code. When customers use your code at checkout, we automatically track the sale and credit it to your account. You'll see all sales in real-time on your affiliate dashboard.",
                },
                {
                  question: "What is the cookie duration?",
                  answer: "Our affiliate cookies last for 90 days, giving you plenty of time to earn commissions from your referrals. If a customer clicks your link and purchases within 90 days, you get credited.",
                },
                {
                  question: "Can I promote on social media?",
                  answer: "Absolutely! You can promote through any ethical marketing channel including social media, blogs, YouTube, email lists, and paid advertising. Share your personalized discount code to track all your sales.",
                },
                {
                  question: "How long does approval take?",
                  answer: "We review all applications within 48 hours. Once approved, you'll receive your personalized discount code and access to your affiliate dashboard to start tracking sales immediately.",
                },
                {
                  question: "Can I see my performance metrics?",
                  answer: "Yes! Your affiliate dashboard provides real-time analytics including clicks, conversions, commissions earned, and detailed performance reports. Track everything 24/7.",
                },
              ].map((faq, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Have more questions?</p>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
