"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, formatPrice } from "@/lib/products";

export function StackedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + products.length) % products.length;

    if (position === 0) {
      // Front card - prominent
      return "translate-x-0 scale-100 z-30 opacity-100";
    } else if (position === 1) {
      // Right back card
      return "translate-x-[60%] scale-90 z-20 opacity-60";
    } else {
      // Left back card
      return "-translate-x-[60%] scale-90 z-10 opacity-60";
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-12">
      {/* Cards Container */}
      <div className="relative h-[500px] md:h-[550px]">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-500 ease-out ${getCardStyle(index)}`}
          >
            <Card className="glass-strong h-full hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 text-7xl text-center">{product.image}</div>
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary">{product.tier}</Badge>
                  <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                </div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription className="text-base">{product.tagline}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                <ul className="mb-6 space-y-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="mr-2 text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="default" asChild>
                  <Link href={`/products/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none z-40">
        <Button
          onClick={prev}
          size="icon"
          variant="outline"
          className="pointer-events-auto rounded-full bg-background/80 backdrop-blur hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={next}
          size="icon"
          variant="outline"
          className="pointer-events-auto rounded-full bg-background/80 backdrop-blur hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
