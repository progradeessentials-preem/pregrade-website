/**
 * Stripe Products Page (Server Component)
 *
 * Fetches and displays products from Stripe.
 * This is a server component that fetches data at build time.
 */

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchStripeProducts, formatPrice } from '@/lib/stripe-products';

export default async function StripeProductsPage() {
  const products = await fetchStripeProducts();

  if (products.length === 0) {
    return (
      <section className="container-padding mx-auto max-w-7xl py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold">No products available</h2>
        <p className="text-muted-foreground">
          Please check back later or contact support if this persists.
        </p>
      </section>
    );
  }

  return (
    <section className="container-padding mx-auto max-w-7xl py-12">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4">
          Professional Card Authentication Tools
        </Badge>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          Protect Your{' '}
          <span className="text-gradient">Card Investments</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Industry-leading inspection tools trusted by collectors, dealers, and PSA graders.
          Never miss a defect. Never buy a fake.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="glass-strong card-hover">
            <CardHeader>
              <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-card text-6xl">
                {product.image.startsWith('http') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <span>{product.image}</span>
                )}
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="line-clamp-3">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.currency.toUpperCase()}
                </span>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href={`/products/${product.id}`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          💳 Secure checkout powered by Stripe
        </p>
      </div>
    </section>
  );
}
