/**
 * Stripe API Validation Schemas
 *
 * Zod schemas for validating API requests to Stripe endpoints.
 * Ensures type safety and prevents invalid data from reaching Stripe API.
 */

import { z } from 'zod';
import { STRIPE_AMOUNT_LIMITS } from '@/lib/stripe';

/**
 * Cart item validation schema
 */
const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
});

/**
 * Billing details validation schema
 */
const billingDetailsSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
});

/**
 * Shipping details validation schema
 */
const shippingDetailsSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  address: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postal_code: z.string().min(3, 'Postal code is required'),
    country: z.string().length(2, 'Country must be 2-letter code'),
  }),
}).optional();

/**
 * Payment intent creation request schema
 */
export const createPaymentIntentSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Cart cannot be empty'),
  billingDetails: billingDetailsSchema,
  shippingDetails: shippingDetailsSchema,
  currency: z.enum(['usd', 'cad', 'eur', 'gbp']).default('usd'),
}).refine(
  (data) => {
    // Calculate total and validate against Stripe limits
    const totalCents = Math.round(
      data.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
    );
    return (
      totalCents >= STRIPE_AMOUNT_LIMITS.MIN_CENTS &&
      totalCents <= STRIPE_AMOUNT_LIMITS.MAX_CENTS
    );
  },
  {
    message: `Total amount must be between $${STRIPE_AMOUNT_LIMITS.MIN_CENTS / 100} and $${STRIPE_AMOUNT_LIMITS.MAX_CENTS / 100}`,
    path: ['items'],
  }
);

/**
 * TypeScript type inferred from schema
 */
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;

/**
 * Webhook event type validation
 */
export const webhookEventTypes = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.canceled',
  'charge.succeeded',
  'charge.failed',
] as const;

export type WebhookEventType = typeof webhookEventTypes[number];
