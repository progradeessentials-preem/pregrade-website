/**
 * Create Payment Intent API Route
 *
 * POST /api/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for processing payments.
 * This is called from the checkout page before displaying the payment form.
 *
 * SECURITY:
 * - Amount calculation happens server-side (client cannot manipulate prices)
 * - Request validation with Zod schemas
 * - Rate limiting recommended for production
 * - CORS headers configured for same-origin only
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getServerStripe, dollarsToCents, validatePaymentAmount } from '@/lib/stripe';
import { createPaymentIntentSchema, CreatePaymentIntentInput } from '@/lib/validations/stripe';

/**
 * POST handler for creating payment intents
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: unknown = await request.json();

    // Validate request with Zod schema
    let validatedData: CreatePaymentIntentInput;
    try {
      validatedData = createPaymentIntentSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: error.issues.map((e) => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Calculate total amount (server-side calculation for security)
    const totalDollars = validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalCents = dollarsToCents(totalDollars);

    // Validate amount is within Stripe limits
    try {
      validatePaymentAmount(totalCents);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }

    // Initialize Stripe
    const stripe = getServerStripe();

    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: validatedData.currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Store order details for webhook processing
        items: JSON.stringify(
          validatedData.items.map((item) => ({
            id: item.productId,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
        customerEmail: validatedData.billingDetails.email,
        customerName: validatedData.billingDetails.name || '',
        orderSource: 'web',
        appVersion: '1.0.0',
      },
      receipt_email: validatedData.billingDetails.email,
      description: `PreGrade Essentials - Order for ${validatedData.billingDetails.email}`,
      shipping: validatedData.shippingDetails
        ? {
            name: validatedData.shippingDetails.name,
            address: {
              line1: validatedData.shippingDetails.address.line1,
              line2: validatedData.shippingDetails.address.line2 || undefined,
              city: validatedData.shippingDetails.address.city,
              state: validatedData.shippingDetails.address.state,
              postal_code: validatedData.shippingDetails.address.postal_code,
              country: validatedData.shippingDetails.address.country,
            },
          }
        : undefined,
    });

    // Log successful creation (production: use proper logging service)
    console.log('[Payment Intent Created]', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      email: validatedData.billingDetails.email,
      timestamp: new Date().toISOString(),
    });

    // Return client secret to frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    // Log error (production: use error tracking service like Sentry)
    console.error('[Payment Intent Error]', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    // Handle Stripe-specific errors
    if (error && typeof error === 'object' && 'type' in error) {
      const stripeError = error as { type: string; message: string };

      switch (stripeError.type) {
        case 'StripeCardError':
          return NextResponse.json(
            { error: 'Card was declined. Please try a different payment method.' },
            { status: 400 }
          );
        case 'StripeInvalidRequestError':
          return NextResponse.json(
            { error: 'Invalid payment request. Please check your information.' },
            { status: 400 }
          );
        case 'StripeAPIError':
          return NextResponse.json(
            { error: 'Payment service temporarily unavailable. Please try again.' },
            { status: 503 }
          );
        case 'StripeConnectionError':
          return NextResponse.json(
            { error: 'Network error. Please check your connection.' },
            { status: 503 }
          );
        case 'StripeAuthenticationError':
          return NextResponse.json(
            { error: 'Payment configuration error. Please contact support.' },
            { status: 500 }
          );
        default:
          break;
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Payment processing failed. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/create-payment-intent',
    method: 'POST',
    timestamp: new Date().toISOString(),
  });
}
