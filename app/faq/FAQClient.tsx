"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faqCategories,
  getFAQsByCategory,
  searchFAQs,
  type FAQCategory,
} from "@/lib/faq-data";

export function FAQClient() {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const displayedFAQs = searchQuery
    ? searchFAQs(searchQuery)
    : getFAQsByCategory(selectedCategory);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container-padding mx-auto max-w-7xl py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-300 md:text-xl">
              Everything you need to know about The Pocket Scope and our
              services
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b border-gray-800 bg-gray-900">
        <div className="container-padding mx-auto max-w-4xl py-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery("");
                }}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-gray-900 py-12 md:py-16">
        <div className="container-padding mx-auto max-w-4xl">
          {displayedFAQs.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-gray-400">
                {searchQuery ? (
                  <span>
                    Found {displayedFAQs.length} result{displayedFAQs.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </span>
                ) : (
                  <span>
                    {displayedFAQs.length} question{displayedFAQs.length !== 1 ? "s" : ""} in {selectedCategory}
                  </span>
                )}
              </div>
              <Accordion
                type="single"
                collapsible
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden"
              >
                {displayedFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-white text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-lg">
                No questions found matching "{searchQuery}"
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our support team is here to help you with any questions about The
            Pocket Scope
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
            >
              <a href="/contact">Contact Support</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
            >
              <a href="/products/pocket-scope">View Product</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
