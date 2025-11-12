"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products, formatPrice } from "@/lib/products";

export function ProductCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="mx-auto w-full max-w-5xl"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="glass-strong group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 text-6xl">{product.image}</div>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="secondary">{product.tier}</Badge>
                    <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-base">{product.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature) => (
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
