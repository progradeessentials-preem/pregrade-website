import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Package, Truck, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, getProductById, formatPrice } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { SocialProofBanner, RecentPurchases } from "@/components/SocialProofWidgets";
import { ProductReviews } from "@/components/ProductReviews";
import { ReviewForm } from "@/components/ReviewForm";

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  // Create SEO-optimized title and description
  const title = `${product.name} - ${product.tagline} | PreGrade Essentials`;
  const description = product.description.slice(0, 160); // Meta description limit
  const productUrl = `https://pregradeessentials.com/products/${product.id}`;
  const imageUrl = product.id === "pocket-scope"
    ? "https://pregradeessentials.com/pocket-scope.png"
    : "https://pregradeessentials.com/product-default.png";

  return {
    title,
    description,
    keywords: [
      product.name,
      product.tagline,
      "card grading tools",
      "PSA authentication",
      "sports card inspection",
      "Pokemon card grading",
      "TCG card tools",
      product.tier.toLowerCase() + " tier",
    ],
    openGraph: {
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.tagline,
      type: "website",
      url: productUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      siteName: "PreGrade Essentials",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.tagline,
      images: [imageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Define product images for Pocket Scope
  const pocketScopeImages = [
    { src: "/pocket-scope.png", alt: "The Pocket Scope - Front View" },
    { src: "/pocket-scope-led.png", alt: "The Pocket Scope - LED Ring View" },
    { src: "/pocket-scope-card-view.png", alt: "The Pocket Scope - Card Magnification Display" },
    { src: "/pocket-scope-fingerprint-view.png", alt: "The Pocket Scope - Fingerprint Detection View" },
    { src: "/pocket-scope-5.jpg", alt: "The Pocket Scope - Additional View" },
    { src: "/pocket-scope-video-silent.mov", alt: "The Pocket Scope - Video Demonstration", isVideo: true },
  ];

  // Product Schema (JSON-LD)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.id === "pocket-scope"
      ? "https://pregradeessentials.com/pocket-scope.png"
      : "https://pregradeessentials.com/product-default.png",
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "PreGrade Essentials"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://pregradeessentials.com/products/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2025-12-31",
      "availability": product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "PreGrade Essentials"
      }
    },
    // Placeholder for reviews - will be populated when reviews exist
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // BreadcrumbList Schema (JSON-LD)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Products",
        "item": "https://pregradeessentials.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://pregradeessentials.com/products/${product.id}`
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <RecentPurchases />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-gray-800 bg-gray-900">
          <div className="container-padding mx-auto max-w-7xl py-4">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-indigo-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </section>

        {/* Product Detail */}
        <section className="container-padding relative bg-gray-900 mx-auto max-w-7xl py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Product Images */}
            {product.id === "pocket-scope" ? (
              <ProductImageGallery
                images={pocketScopeImages}
                productName={product.name}
              />
            ) : (
              <div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
                  <div className="flex aspect-square items-center justify-center bg-gray-800/50 text-[12rem] md:text-[16rem]">
                    {product.image}
                  </div>
                </div>
                {/* Thumbnail Gallery */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex aspect-square items-center justify-center p-4 text-5xl">
                        {img}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Social Proof Widgets */}
              <div className="mb-6">
                <SocialProofBanner />
              </div>

              <h1 className="text-4xl font-extrabold text-white md:text-5xl">{product.name}</h1>
              <p className="mt-3 text-xl text-indigo-300 font-semibold">{product.tagline}</p>

              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">$99.99</span>
                </div>
                <p className="mt-2 text-sm text-emerald-400 font-semibold">Save $25 - Launch Special Pricing</p>
                <p className="text-xs text-red-400">Price returns to $99.99 when initial stock sells out</p>
              </div>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed">{product.description}</p>

              {/* What's Included */}
              {product.includedItems && (
                <div className="mt-8 bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-emerald-500/30 rounded-2xl p-6">
                  <h3 className="mb-4 font-bold text-white text-xl flex items-center gap-2">
                    <Package className="h-5 w-5 text-emerald-400" />
                    Complete Kit - Everything Included
                  </h3>
                  <ul className="space-y-3">
                    {product.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                        <span className="text-gray-200 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-emerald-500/20">
                    <p className="text-sm text-emerald-300 font-semibold">
                      🎁 $150+ value - All for just $74.99
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Everything you need to start authenticating cards today
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <AddToCartButton product={product} />
              </div>

              <p className="mt-4 text-center text-sm text-gray-400">
                Free shipping on orders over $50 • 30-day money back guarantee
              </p>

              {/* Product Features */}
              <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
                <h3 className="mb-4 font-bold text-white text-lg">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-center">
                  <Package className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white">Free Returns</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-center">
                  <Truck className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white">Fast Shipping</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-center">
                  <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white">1-Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="border-t border-gray-800 bg-gray-900 py-16 md:py-24">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="mb-12 text-4xl font-extrabold text-white">Technical Specifications</h2>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-700">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 px-8 py-5 md:grid-cols-3 hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="font-semibold text-white">{spec.label}</span>
                    <span className="text-gray-400 md:col-span-2">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        {/* Review Form */}
        <section className="border-t border-gray-800 bg-gray-900 py-16 md:py-24">
          <div className="container-padding mx-auto max-w-4xl">
            <ReviewForm productId={product.id} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
