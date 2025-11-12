# Stripe Integration - Usage Examples

## Quick Start

This guide shows you how to implement secure Stripe payments in your Next.js application.

---

## 1. Basic Checkout Flow

### Step 1: Create a Checkout Page

```typescript
// app/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import StripeProvider from '@/components/stripe/StripeProvider';
import CheckoutForm from '@/components/stripe/CheckoutForm';

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create Payment Intent when page loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 5000, // $50.00 in cents
            currency: 'usd',
            metadata: {
              orderId: 'order_123',
              userId: 'user_456',
            },
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Failed to create payment intent:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  if (loading) {
    return <div>Loading checkout...</div>;
  }

  if (!clientSecret) {
    return <div>Error loading checkout. Please try again.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <StripeProvider clientSecret={clientSecret}>
        <CheckoutForm
          amount={5000}
          onSuccess={() => {
            console.log('Payment successful!');
            window.location.href = '/payment-success';
          }}
          onError={(error) => {
            console.error('Payment failed:', error);
          }}
        />
      </StripeProvider>
    </div>
  );
}
```

---

## 2. Dynamic Amount Calculation

For e-commerce, calculate amounts server-side to prevent tampering:

```typescript
// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, userId } = body;

    // ✅ CORRECT: Calculate amount server-side
    const cart = await getCartFromDatabase(cartId);
    const amount = calculateTotalAmount(cart);

    // Validate user owns this cart
    if (cart.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const stripe = await getServerStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        cartId,
        userId,
        orderDate: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

// Helper functions
async function getCartFromDatabase(cartId: string) {
  // Fetch cart from your database
  // Example: return await db.cart.findUnique({ where: { id: cartId } });
  return { userId: 'user_123', items: [/* ... */] };
}

function calculateTotalAmount(cart: any): number {
  // Calculate total from cart items
  // Example: return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return 5000; // $50.00
}
```

---

## 3. Processing Webhook Events

Handle post-payment actions in your webhook:

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerStripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const stripe = await getServerStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleSuccessfulPayment(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handleFailedPayment(failedPayment);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { id, amount, metadata } = paymentIntent;

  // 1. Update order status in database
  // await db.order.update({
  //   where: { id: metadata.orderId },
  //   data: { status: 'paid', paymentIntentId: id }
  // });

  // 2. Send confirmation email
  // await sendOrderConfirmationEmail(metadata.userId, metadata.orderId);

  // 3. Trigger fulfillment process
  // await triggerOrderFulfillment(metadata.orderId);

  console.log(`Payment succeeded: ${id} for amount: $${amount / 100}`);
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { id, metadata } = paymentIntent;

  // 1. Update order status
  // await db.order.update({
  //   where: { id: metadata.orderId },
  //   data: { status: 'payment_failed' }
  // });

  // 2. Notify customer
  // await sendPaymentFailedEmail(metadata.userId, metadata.orderId);

  console.log(`Payment failed: ${id}`);
}
```

---

## 4. Subscription Payments

For recurring payments:

```typescript
// app/api/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { userId, priceId } = await request.json();

    const stripe = await getServerStripe();

    // Create or retrieve customer
    const customer = await stripe.customers.create({
      metadata: { userId },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice.payment_intent;

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
```

---

## 5. Testing Your Integration

### Test with Stripe Test Cards

```typescript
// Test successful payment
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

// Test authentication required
Card: 4000 0025 0000 3155

// Test declined payment
Card: 4000 0000 0000 9995
```

### Test API Endpoint

```bash
# Test payment intent creation
curl -X POST http://localhost:3000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "usd",
    "metadata": {
      "orderId": "order_123"
    }
  }'
```

### Test Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test events
stripe trigger payment_intent.succeeded
```

---

## 6. Common Patterns

### Loading State

```typescript
'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000 }),
      });
      const data = await response.json();
      // Redirect to checkout page with client secret
      window.location.href = `/checkout?secret=${data.clientSecret}`;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  );
}
```

### Error Handling

```typescript
try {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 5000 }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Payment failed');
  }

  const data = await response.json();
  // Handle success
} catch (error) {
  // Show user-friendly error message
  if (error instanceof Error) {
    alert(`Payment Error: ${error.message}`);
  } else {
    alert('An unexpected error occurred. Please try again.');
  }
}
```

---

## 7. Security Checklist

Before going to production:

- [ ] Replaced test keys with production keys
- [ ] Added `.env.local` to `.gitignore`
- [ ] Verified secret key is ONLY in API routes
- [ ] Enabled webhook signature verification
- [ ] Implemented input validation on all API routes
- [ ] Added rate limiting to API routes
- [ ] Configured HTTPS for production
- [ ] Set up security headers
- [ ] Tested payment flow end-to-end
- [ ] Configured error monitoring (e.g., Sentry)

---

## 8. Next Steps

1. **Customize the checkout UI** to match your brand
2. **Add email notifications** for successful/failed payments
3. **Implement order management** in your database
4. **Set up Stripe webhooks** in production
5. **Add analytics** to track conversion rates
6. **Configure tax calculation** if needed
7. **Add discount codes** support
8. **Implement refund functionality**

---

## Need Help?

- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [STRIPE_SECURITY_GUIDE.md](./STRIPE_SECURITY_GUIDE.md)

---

**Security Note**: Always validate payments server-side. Never trust client-side data for payment amounts or order details.
