/**
 * Checkout Success Page
 *
 * Displays order confirmation after successful payment.
 * Shows order details and next steps.
 */

'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, Mail, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    // Redirect if no payment intent ID
    if (!paymentIntentId) {
      router.push('/');
    }
  }, [paymentIntentId, router]);

  if (!paymentIntentId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Success Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-padding mx-auto max-w-4xl py-16 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We&apos;ve received your payment and will begin processing your order shortly.
            </p>
          </div>
        </section>

        {/* Order Details */}
        <section className="container-padding mx-auto max-w-4xl py-12">
          <div className="grid gap-6 md:grid-cols-2">
            {/* What's Next */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  What&apos;s Next?
                </CardTitle>
                <CardDescription>Here&apos;s what happens now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive an email confirmation shortly
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll prepare your order for shipment
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive tracking information via email
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your order will arrive within 5-7 business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Information */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Order Information
                </CardTitle>
                <CardDescription>Your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono text-sm">{paymentIntentId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmation Email</p>
                  <p className="text-sm">Check your inbox for order details</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Questions?</p>
                  <p className="text-sm">
                    Contact us at{' '}
                    <a
                      href="mailto:support@pregradeessentials.com"
                      className="text-primary hover:underline"
                    >
                      support@pregradeessentials.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Want to Learn More?</h2>
            <p className="mb-6 text-muted-foreground">
              Check out our guides on card grading and authentication
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/blog">
                  Read Our Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
