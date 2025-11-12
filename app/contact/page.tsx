"use client";

import { useState } from "react";
import { Mail, Clock, MessageSquare, Package, HelpCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", category: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/50 to-transparent" />
          <div className="container-padding relative mx-auto max-w-7xl py-24 md:py-32">
            <div className="text-center space-y-6">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-semibold px-4 py-2">
                Customer Support
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block text-white mb-2">We're Here To</span>
                <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Help You Succeed
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Questions about our tools? Need authentication advice?
                <span className="text-white font-semibold"> Our card collecting experts are ready to assist.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                    <p className="text-base text-gray-400">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300 font-semibold">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 font-semibold">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300 font-semibold">Inquiry Type</Label>
                      <Select onValueChange={handleCategoryChange} value={formData.category} required>
                        <SelectTrigger className="h-12 bg-gray-900/50 border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="product" className="text-white hover:bg-gray-700">Product Questions</SelectItem>
                          <SelectItem value="order" className="text-white hover:bg-gray-700">Order & Shipping</SelectItem>
                          <SelectItem value="warranty" className="text-white hover:bg-gray-700">Returns & Warranty</SelectItem>
                          <SelectItem value="bulk" className="text-white hover:bg-gray-700">Bulk Orders</SelectItem>
                          <SelectItem value="partnership" className="text-white hover:bg-gray-700">Business Partnership</SelectItem>
                          <SelectItem value="general" className="text-white hover:bg-gray-700">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300 font-semibold">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Product inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-12 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300 font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/30"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-blue-500/20 border-2 border-blue-500/40">
                      <Mail className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="mb-2 font-bold text-xl text-white">Email Support</h3>
                    <a
                      href="mailto:progradeessentials@gmail.com"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-lg underline decoration-2 decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
                    >
                      progradeessentials@gmail.com
                    </a>
                    <p className="text-sm text-gray-400 mt-3">
                      Our team typically responds within 24 hours
                    </p>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <Clock className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">Response Time</h3>
                      <p className="text-sm text-gray-400">
                        24-hour guarantee
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Monday - Sunday
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Support Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                      <Package className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">Need Product Help?</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Check out our detailed manuals
                      </p>
                      <a href="/manual" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                        View Manuals →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Help */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      <HelpCircle className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">Quick Answers</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Find instant answers below
                      </p>
                      <a href="#faq" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                        See FAQs ↓
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative border-t border-gray-800 bg-gradient-to-br from-gray-900 to-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-semibold px-4 py-2">
                Common Questions
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl">
                Frequently Asked <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "What is your return policy?",
                  a: "We offer a 30-day money-back guarantee on all products. If you're not satisfied, return it for a full refund - no questions asked.",
                },
                {
                  q: "How long does shipping take?",
                  a: "Standard shipping takes 3-5 business days. Orders ship same-day if placed before 3pm EST. Free shipping on orders over $50.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes! We ship to most countries worldwide. International shipping times vary by location (7-14 business days typically).",
                },
                {
                  q: "Are your products covered by warranty?",
                  a: "All PreGrade Essentials products come with a 1-year warranty against manufacturing defects. We stand behind our quality.",
                },
                {
                  q: "How do I contact customer support?",
                  a: "Email us at progradeessentials@gmail.com and we'll respond within 24 hours. For product help, check out our detailed manuals on the Product Manuals page.",
                },
                {
                  q: "Can I place a bulk order for my business?",
                  a: "Absolutely! Select 'Bulk Orders' in the contact form above and tell us about your needs. We offer special pricing for retailers and large orders.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                  <h3 className="mb-3 font-bold text-lg text-white">{faq.q}</h3>
                  <p className="text-base text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
