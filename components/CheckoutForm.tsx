/**
 * Checkout Form Component
 *
 * Handles payment submission with Stripe Elements.
 * Integrates with /api/create-payment-intent endpoint.
 *
 * Features:
 * - PaymentElement for card input
 * - AddressElement for shipping
 * - Real-time validation
 * - Error handling
 * - Loading states
 */

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/lib/cart-store';
import { toast } from 'sonner';
import { CreditCard, MapPin, AlertCircle } from 'lucide-react';

interface CheckoutFormProps {
  clientSecret: string;
}

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Clear error message when user starts typing
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [email, name]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name,
              email,
            },
          },
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        // Handle payment errors
        console.error('[Payment Error]', error);
        setErrorMessage(error.message || 'Payment failed. Please try again.');
        toast.error('Payment failed', {
          description: error.message || 'Please check your payment details and try again.',
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        console.log('[Payment Succeeded]', paymentIntent.id);
        toast.success('Payment successful!', {
          description: 'Your order has been confirmed.',
        });

        // Clear cart
        clearCart();

        // Redirect to success page
        router.push(`/checkout/success?payment_intent=${paymentIntent.id}`);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // 3D Secure or other action required
        toast.info('Additional verification required', {
          description: 'Please complete the verification step.',
        });
      }
    } catch (err) {
      console.error('[Payment Exception]', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      toast.error('Payment error', {
        description: 'An unexpected error occurred. Please contact support if this persists.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            We&apos;ll send your receipt to this email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
          <CardDescription>
            Where should we send your order?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddressElement
            options={{
              mode: 'shipping',
              allowedCountries: ['US', 'CA'],
            }}
          />
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </CardTitle>
          <CardDescription>
            Enter your payment information securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
      </Card>

      {/* Error Message */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || isProcessing || !email || !name}
      >
        {isProcessing ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </>
        )}
      </Button>

      {/* Security Notice */}
      <p className="text-center text-xs text-muted-foreground">
        Payments are securely processed by Stripe. Your card information is never stored on our servers.
      </p>
    </form>
  );
}
