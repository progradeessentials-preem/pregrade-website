import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, formatPrice } from "@/lib/products";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Products | PreGrade Essentials",
  description: "Professional card authentication and defect detection tools. Protect your investments with precision inspection technology.",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900/50 to-transparent" />
          <div className="container-padding relative mx-auto max-w-7xl py-24 md:py-32">
            <div className="text-center space-y-6">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                Professional Card Authentication Tools
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block text-white mb-2">Protect Your</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Card Investments
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Industry-leading inspection tools trusted by collectors, dealers, and PSA graders.
                <span className="text-white font-semibold"> Never miss a defect. Never buy a fake.</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mt-8">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  UV Authentication
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-400" />
                  Defect Detection
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  Investment Protection
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Choose Your <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Inspection Tool</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                From portable pocket scopes to professional grading stations, we have the precision tools you need
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 flex flex-col"
                >
                  {/* Tier Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                      {product.tier}
                    </Badge>
                  </div>

                  {/* Product Image/Icon */}
                  <div className="relative p-8 text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                    <div className="text-8xl mb-4">{product.image}</div>
                    {product.inStock ? (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        In Stock - Ships Today
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-base text-indigo-300 font-semibold mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 space-y-2 flex-1">
                      {product.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <p className="text-xs text-gray-500 mt-2">
                          +{product.features.length - 4} more features
                        </p>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-auto space-y-4 pt-6 border-t border-gray-700">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 hover:scale-105"
                        size="lg"
                        asChild
                      >
                        <Link href={`/products/${product.id}`}>
                          View Full Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative border-t border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent" />
          <div className="container-padding relative mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-semibold px-4 py-2">
                Trusted by PSA Graders & Dealers
              </Badge>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Why <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">10,000+ Collectors</span> Choose Us
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Professional-grade tools that protect your investments and build collecting confidence
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Accuracy Card */}
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="mb-6 text-6xl">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Catch Every Defect
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  See micro-scratches, centering issues, and edge wear invisible to the naked eye. Never submit a questionable card for grading again.
                </p>
              </div>

              {/* Quality Card */}
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="mb-6 text-6xl">🔬</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  UV Authentication
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  Built-in UV light reveals PSA authentication marks. Spot fake slabs instantly and protect yourself from counterfeit purchases.
                </p>
              </div>

              {/* Warranty Card */}
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="mb-6 text-6xl">💰</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  ROI Guaranteed
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  Pays for itself with one avoided mistake. Save hundreds on bad purchases, grading fees, and counterfeit slabs.
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">Lifetime Warranty</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">Free Shipping Over $50</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">30-Day Money Back</span>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
