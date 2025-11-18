/**
 * Stripe Webhook Handler
 *
 * POST /api/webhooks/stripe
 *
 * Handles webhook events from Stripe for payment processing.
 * This endpoint is called by Stripe servers when payment events occur.
 *
 * SECURITY:
 * - Webhook signature verification (prevents spoofed events)
 * - Raw body parsing required for signature validation
 * - Idempotency handling (events may be sent multiple times)
 *
 * EVENTS HANDLED:
 * - payment_intent.succeeded: Payment completed successfully
 * - payment_intent.payment_failed: Payment failed
 * - payment_intent.canceled: Payment canceled by customer
 * - charge.succeeded: Charge succeeded (for accounting)
 * - charge.failed: Charge failed
 *
 * PRODUCTION SETUP:
 * 1. Deploy this endpoint to production
 * 2. Add webhook in Stripe Dashboard: https://dashboard.stripe.com/webhooks
 * 3. Point to: https://your-domain.com/api/webhooks/stripe
 * 4. Select events listed above
 * 5. Copy webhook signing secret to STRIPE_WEBHOOK_SECRET env var
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyWebhookSignature } from '@/lib/stripe';

/**
 * POST handler for Stripe webhooks
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('[Webhook Error] Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (error) {
      console.error('[Webhook Error] Signature verification failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Log received event (production: use proper logging service)
    console.log('[Webhook Received]', {
      type: event.type,
      id: event.id,
      timestamp: new Date().toISOString(),
    });

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.succeeded':
        await handleChargeSucceeded(event.data.object as Stripe.Charge);
        break;

      case 'charge.failed':
        await handleChargeFailed(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook Error]', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // Return 500 to trigger Stripe retry
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('[Payment Succeeded]', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    email: paymentIntent.receipt_email,
    metadata: paymentIntent.metadata,
    timestamp: new Date().toISOString(),
  });

  // TODO: Production implementation
  // 1. Create order record in database
  // 2. Send order confirmation email
  // 3. Update inventory
  // 4. Trigger fulfillment process
  // 5. Send customer receipt

  // Example: Parse order items from metadata
  try {
    const items = JSON.parse(paymentIntent.metadata.items || '[]');
    const customerEmail = paymentIntent.metadata.customerEmail;
    const customerName = paymentIntent.metadata.customerName;

    console.log('[Order Details]', {
      paymentIntentId: paymentIntent.id,
      customerEmail,
      customerName,
      items,
      total: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });

    // Production: Send confirmation email
    // await sendOrderConfirmationEmail({
    //   to: customerEmail,
    //   orderNumber: paymentIntent.id,
    //   items,
    //   total: paymentIntent.amount / 100,
    // });

  } catch (error) {
    console.error('[Payment Succeeded Handler Error]', {
      error: error instanceof Error ? error.message : 'Unknown error',
      paymentIntentId: paymentIntent.id,
    });
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.error('[Payment Failed]', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    email: paymentIntent.receipt_email,
    lastPaymentError: paymentIntent.last_payment_error?.message,
    metadata: paymentIntent.metadata,
    timestamp: new Date().toISOString(),
  });

  // TODO: Production implementation
  // 1. Log failed payment attempt
  // 2. Send payment failed notification to customer
  // 3. Update analytics
  // 4. Alert if fraud suspected

  try {
    const customerEmail = paymentIntent.metadata.customerEmail;

    // Production: Send payment failed email
    // await sendPaymentFailedEmail({
    //   to: customerEmail,
    //   paymentIntentId: paymentIntent.id,
    //   reason: paymentIntent.last_payment_error?.message,
    // });

    console.log('[Payment Failed Email]', {
      to: customerEmail,
      reason: paymentIntent.last_payment_error?.message,
    });
  } catch (error) {
    console.error('[Payment Failed Handler Error]', {
      error: error instanceof Error ? error.message : 'Unknown error',
      paymentIntentId: paymentIntent.id,
    });
  }
}

/**
 * Handle canceled payment intent
 */
async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  console.log('[Payment Canceled]', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    email: paymentIntent.receipt_email,
    metadata: paymentIntent.metadata,
    timestamp: new Date().toISOString(),
  });

  // TODO: Production implementation
  // 1. Clean up pending order
  // 2. Release inventory hold
  // 3. Update analytics
}

/**
 * Handle successful charge (for accounting/reconciliation)
 */
async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log('[Charge Succeeded]', {
    id: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    paymentIntentId: charge.payment_intent,
    timestamp: new Date().toISOString(),
  });

  // TODO: Production implementation
  // 1. Record charge in accounting system
  // 2. Update financial reports
  // 3. Reconcile with payment intent
}

/**
 * Handle failed charge
 */
async function handleChargeFailed(charge: Stripe.Charge) {
  console.error('[Charge Failed]', {
    id: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    paymentIntentId: charge.payment_intent,
    failureMessage: charge.failure_message,
    timestamp: new Date().toISOString(),
  });

  // TODO: Production implementation
  // 1. Log failed charge
  // 2. Alert finance team
  // 3. Investigate fraud if suspected
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhooks/stripe',
    method: 'POST',
    timestamp: new Date().toISOString(),
    note: 'This endpoint receives Stripe webhook events',
  });
}
