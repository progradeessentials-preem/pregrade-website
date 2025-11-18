/**
 * Stripe Products Server Library
 *
 * Server-side functions to fetch products directly from Stripe.
 * Use this in Server Components to avoid HTTP requests.
 */

import { getServerStripe } from './stripe';

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  currency: string;
  image: string;
  metadata: Record<string, string>;
  active: boolean;
  inStock: boolean;
}

/**
 * Fetch all products directly from Stripe (server-side only)
 */
export async function fetchStripeProductsServer(): Promise<StripeProduct[]> {
  try {
    const stripe = getServerStripe();

    // If Stripe is not configured (e.g., during build), return empty array
    if (!stripe) {
      console.warn('[Stripe Products] Stripe not configured, returning empty product list');
      return [];
    }

    // Fetch all active products with their default prices expanded
    const productsResponse = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    // Transform Stripe products into our format
    const products = await Promise.all(
      productsResponse.data.map(async (product) => {
        // Get the default price or fetch prices if not expanded
        let price;
        let priceAmount = 0;
        let currency = 'usd';
        let priceId = '';

        if (product.default_price) {
          // If default_price is expanded, it's a Price object
          if (typeof product.default_price === 'object') {
            price = product.default_price;
            priceAmount = (price.unit_amount || 0) / 100;
            currency = price.currency;
            priceId = price.id;
          } else {
            // If not expanded, fetch the price separately
            price = await stripe.prices.retrieve(product.default_price as string);
            priceAmount = (price.unit_amount || 0) / 100;
            currency = price.currency;
            priceId = price.id;
          }
        } else {
          // No default price, try to get the first active price
          const prices = await stripe.prices.list({
            product: product.id,
            active: true,
            limit: 1,
          });

          if (prices.data.length > 0) {
            price = prices.data[0];
            priceAmount = (price.unit_amount || 0) / 100;
            currency = price.currency;
            priceId = price.id;
          }
        }

        return {
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: priceAmount,
          priceId,
          currency,
          image: product.images && product.images.length > 0 ? product.images[0] : '🔬',
          metadata: product.metadata,
          active: product.active,
          inStock: true, // Default to in stock
        };
      })
    );

    return products;
  } catch (error) {
    console.error('[Fetch Stripe Products Server Error]', error);
    return [];
  }
}

/**
 * Get a single product by Stripe product ID (server-side only)
 */
export async function getStripeProductByIdServer(id: string): Promise<StripeProduct | null> {
  const products = await fetchStripeProductsServer();
  return products.find((p) => p.id === id) || null;
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
}
