/**
 * Stripe Configuration
 *
 * This module provides type-safe Stripe initialization for both client and server environments.
 *
 * SECURITY NOTES:
 * - getStripe() is safe for client-side use (uses NEXT_PUBLIC_* env var)
 * - getServerStripe() is SERVER-ONLY (uses secret key)
 * - NEVER import getServerStripe() in client components
 * - Webhook verification prevents unauthorized webhook calls
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import StripeServer from 'stripe';

// ============================================================================
// Client-Side Stripe (Safe for Browser)
// ============================================================================

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe.js instance for client-side use.
 * Safe to call in client components - uses publishable key.
 * Implements singleton pattern for performance.
 */
export function getStripe(): Promise<Stripe | null> {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. ' +
      'Add it to .env.local for development or Vercel dashboard for production.'
    );
  }

  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
}

// ============================================================================
// Server-Side Stripe (API Routes Only)
// ============================================================================

let stripeServerInstance: StripeServer | null = null;

/**
 * Get Stripe server instance for API routes.
 * WARNING: SERVER-ONLY - NEVER import in client components.
 * Uses secret key with full API access.
 */
export function getServerStripe(): StripeServer | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    // During build time (GitHub Actions), Stripe keys might not be available
    // Return null to allow static generation to complete
    console.warn('[Stripe] STRIPE_SECRET_KEY not found - Stripe features disabled');
    return null;
  }

  // Validate key format
  if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('sk_live_')) {
    throw new Error(
      'Invalid STRIPE_SECRET_KEY format. Expected sk_test_... or sk_live_...'
    );
  }

  // Singleton pattern - reuse instance across API calls
  if (!stripeServerInstance) {
    stripeServerInstance = new StripeServer(secretKey, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
      appInfo: {
        name: 'PreGrade Essentials',
        version: '1.0.0',
        url: 'https://pregradeessentials.com',
      },
    });
  }

  return stripeServerInstance;
}

// ============================================================================
// Webhook Verification
// ============================================================================

/**
 * Verify Stripe webhook signature.
 * Prevents unauthorized webhook calls by validating signature.
 * ALWAYS call this before processing webhook events.
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): StripeServer.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      'Missing STRIPE_WEBHOOK_SECRET environment variable. ' +
      'Get from Stripe CLI (stripe listen) or Stripe Dashboard webhooks section.'
    );
  }

  const stripe = getServerStripe();

  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const error = err as Error;
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
}

// ============================================================================
// Utility Types & Helpers
// ============================================================================

/**
 * Stripe payment amount validation limits
 */
export const STRIPE_AMOUNT_LIMITS = {
  MIN_CENTS: 50,
  MAX_CENTS: 999999,
} as const;

/**
 * Convert dollars to Stripe cents format
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convert Stripe cents to dollars format
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Validate payment amount is within Stripe limits
 */
export function validatePaymentAmount(cents: number): boolean {
  if (cents < STRIPE_AMOUNT_LIMITS.MIN_CENTS) {
    throw new Error(
      `Payment amount too small. Minimum is $${centsToDollars(STRIPE_AMOUNT_LIMITS.MIN_CENTS)}`
    );
  }

  if (cents > STRIPE_AMOUNT_LIMITS.MAX_CENTS) {
    throw new Error(
      `Payment amount too large. Maximum is $${centsToDollars(STRIPE_AMOUNT_LIMITS.MAX_CENTS)}`
    );
  }

  return true;
}
