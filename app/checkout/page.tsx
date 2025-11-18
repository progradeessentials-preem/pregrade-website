/**
 * Checkout Page
 *
 * Main checkout flow with Stripe payment integration.
 * Creates payment intent and displays payment form.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/lib/cart-store';
import { formatPrice } from '@/lib/stripe-products-server';
import { StripeProvider } from '@/components/StripeProvider';
import { CheckoutForm } from '@/components/CheckoutForm';
import { dollarsToCents } from '@/lib/stripe';

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = getTotalPrice();
  const shippingThreshold = 100;
  const shipping = totalPrice >= shippingThreshold ? 0 : 9.99;
  const finalTotal = totalPrice + shipping;

  // Create payment intent when component mounts
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product.id,
              productName: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            billingDetails: {
              email: 'cvdegroot@gmail.com',
            },
            currency: 'usd',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('[Payment Intent Error]', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to initialize payment. Please refresh the page and try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [items]);

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="container-padding mx-auto max-w-2xl py-24 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingCart className="h-10 w-10" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Add some products to your cart before checking out.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40">
          <div className="container-padding mx-auto max-w-7xl py-8">
            <Link
              href="/cart"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold md:text-4xl">Secure Checkout</h1>
            <p className="mt-2 text-muted-foreground">
              Complete your purchase securely with Stripe
            </p>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="container-padding mx-auto max-w-7xl py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              {error ? (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : isLoading ? (
                <Card className="glass-strong">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Initializing secure payment...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : clientSecret ? (
                <StripeProvider clientSecret={clientSecret}>
                  <CheckoutForm clientSecret={clientSecret} />
                </StripeProvider>
              ) : null}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-strong sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-card text-2xl">
                          {item.product.image}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-border/40 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-primary">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over ${shippingThreshold}
                      </p>
                    )}
                    <div className="flex justify-between border-t border-border/40 pt-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">
                      🔒 Secure 256-bit SSL encryption
                    </p>
                    <p className="text-xs text-muted-foreground">Powered by Stripe</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
