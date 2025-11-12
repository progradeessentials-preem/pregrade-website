"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Store,
  TrendingUp,
  Package,
  Truck,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Star,
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessAddress: "",
    businessType: "",
    taxId: "",
    estimatedVolume: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
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
      toast.success("Wholesale inquiry submitted!", {
        description: "Our wholesale team will contact you within 24 hours.",
      });
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        businessAddress: "",
        businessType: "",
        taxId: "",
        estimatedVolume: "",
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
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-950/30 to-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center">
              <Badge className="mb-6 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm font-semibold px-4 py-2">
                B2B Partnership Program
              </Badge>
              <h1 className="text-5xl font-extrabold text-white md:text-6xl lg:text-7xl mb-6">
                Wholesale{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Partnership
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Join our network of trusted retailers and offer your customers professional-grade card authentication tools. Competitive wholesale pricing, attractive margins, and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#inquiry">Request Wholesale Account</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#pricing">View Pricing Tiers</a>
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
                { icon: Store, label: "Minimum Order", sublabel: "25 Units" },
                { icon: TrendingUp, label: "40-50%", sublabel: "Profit Margins" },
                { icon: Truck, label: "Free Shipping", sublabel: "On Orders $500+" },
                { icon: Award, label: "Net 30", sublabel: "Payment Terms" },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
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
                Why Partner With PreGrade Essentials?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Exclusive benefits designed to help your business grow and succeed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "High Profit Margins",
                  description: "Earn 40-50% margins with our competitive wholesale pricing structure. Retail at $74.99 while purchasing at deep discounts.",
                },
                {
                  icon: Package,
                  title: "Low Minimum Orders",
                  description: "Start with just 25 units minimum. No large capital investment required to begin offering premium products.",
                },
                {
                  icon: Truck,
                  title: "Free Shipping",
                  description: "Free shipping on wholesale orders over $500. Fast order processing and reliable delivery to your location.",
                },
                {
                  icon: Shield,
                  title: "Protected Territory",
                  description: "Exclusive territory protection for brick-and-mortar locations. Be the only retailer in your area.",
                },
                {
                  icon: Award,
                  title: "Flexible Payment Terms",
                  description: "Net 30 payment terms for qualified retailers. Pay after you sell, not before, to manage cash flow effectively.",
                },
                {
                  icon: Users,
                  title: "Dedicated B2B Support",
                  description: "Work with a dedicated wholesale account manager for ordering, support, and product training for your staff.",
                },
              ].map((benefit, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <benefit.icon className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Wholesale Pricing */}
        <section id="pricing" className="bg-gradient-to-br from-blue-950/20 to-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Wholesale Pricing Tiers
              </h2>
              <p className="text-xl text-gray-400">
                Competitive pricing with volume discounts. MSRP $74.99 per unit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  tier: "Starter",
                  units: "25-49 units",
                  price: "$37.50",
                  margin: "50%",
                  color: "emerald",
                  features: ["50% profit margin", "Free shipping over $500", "Online support"]
                },
                {
                  tier: "Professional",
                  units: "50-99 units",
                  price: "$35.00",
                  margin: "53%",
                  color: "blue",
                  features: ["53% profit margin", "Free shipping guaranteed", "Phone + email support", "Marketing materials"]
                },
                {
                  tier: "Premium",
                  units: "100+ units",
                  price: "$32.50",
                  margin: "57%",
                  color: "purple",
                  features: ["57% profit margin", "Priority shipping", "Dedicated account manager", "Territory protection", "Custom display materials"]
                },
              ].map((tier, idx) => (
                <Card
                  key={idx}
                  className={`bg-gradient-to-br ${
                    tier.color === "emerald" ? "from-emerald-900/20 to-gray-900 border-emerald-500/30" :
                    tier.color === "blue" ? "from-blue-900/20 to-gray-900 border-blue-500/30" :
                    "from-purple-900/20 to-gray-900 border-purple-500/30"
                  } border-2 ${idx === 1 ? "md:scale-105 md:shadow-2xl" : ""}`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white mb-2">{tier.tier}</CardTitle>
                    <p className="text-gray-400">{tier.units}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className={`text-5xl font-extrabold ${
                        tier.color === "emerald" ? "text-emerald-400" :
                        tier.color === "blue" ? "text-blue-400" :
                        "text-purple-400"
                      } mb-1`}>
                        {tier.price}
                      </p>
                      <p className="text-gray-400">per unit wholesale</p>
                      <p className="text-sm text-gray-500 mt-2">MSRP: $74.99</p>
                      <p className={`text-lg font-bold mt-2 ${
                        tier.color === "emerald" ? "text-emerald-400" :
                        tier.color === "blue" ? "text-blue-400" :
                        "text-purple-400"
                      }`}>
                        {tier.margin} margin
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <CheckCircle2 className={`h-5 w-5 ${
                            tier.color === "emerald" ? "text-emerald-400" :
                            tier.color === "blue" ? "text-blue-400" :
                            "text-purple-400"
                          } flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p className="text-center text-blue-300 font-semibold mb-2">
                Example: Purchase 50 units at $35.00 = $1,750 wholesale cost
              </p>
              <p className="text-center text-gray-400 text-sm">
                Retail at $74.99 per unit = $3,749.50 revenue | $1,999.50 profit (53% margin)
              </p>
            </div>
          </div>
        </section>

        {/* Ideal Partners */}
        <section className="bg-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Ideal Retail Partners
              </h2>
              <p className="text-xl text-gray-400">
                Perfect for businesses serving collectors and card enthusiasts
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { icon: Store, label: "Card Shops" },
                { icon: Building2, label: "Hobby Stores" },
                { icon: Star, label: "Comic Shops" },
                { icon: Store, label: "Sports Memorabilia" },
                { icon: Building2, label: "Gaming Stores" },
                { icon: Store, label: "Collectibles Dealers" },
                { icon: Building2, label: "Card Shows Vendors" },
                { icon: Store, label: "Online Retailers" },
              ].map((partner, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <partner.icon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                    <p className="font-semibold text-white">{partner.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="bg-gradient-to-br from-gray-900 via-blue-950/30 to-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Request Wholesale Account
              </h2>
              <p className="text-xl text-gray-400">
                Fill out the form below and our wholesale team will contact you within 24 hours
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Store className="h-4 w-4 text-blue-400" />
                        Business Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your Card Shop"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-400" />
                        Contact Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@cardshop.com"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-400" />
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      Business Address
                    </label>
                    <Input
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main St, City, State 12345"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-400" />
                        Business Type
                      </label>
                      <Input
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        placeholder="Card Shop, Hobby Store, etc."
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Tax ID / EIN
                      </label>
                      <Input
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        placeholder="XX-XXXXXXX"
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-400" />
                      Estimated Monthly Volume
                    </label>
                    <Input
                      name="estimatedVolume"
                      value={formData.estimatedVolume}
                      onChange={handleInputChange}
                      placeholder="How many units per month?"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Additional Information
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your business and why you'd like to carry PreGrade Essentials..."
                      rows={4}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Wholesale Inquiry"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to be contacted by our wholesale team regarding partnership opportunities.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-gray-900 py-24 border-t border-gray-800">
          <div className="container-padding mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Wholesale Program Requirements
              </h2>
            </div>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-blue-400" />
                      Required Criteria
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Valid business license",
                        "Physical retail location or established online presence",
                        "Tax ID or EIN",
                        "Minimum order of 25 units",
                        "Credit application (for Net 30 terms)",
                      ].map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Star className="h-6 w-6 text-blue-400" />
                      What We Provide
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Wholesale pricing tiers",
                        "Product training & support",
                        "Point-of-sale materials",
                        "Product photography for your website",
                        "Dedicated account manager",
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Ready to get started?</p>
              <Button size="lg" asChild>
                <a href="#inquiry">Request Wholesale Account</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
