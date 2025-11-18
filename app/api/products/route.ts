/**
 * Products API Route
 *
 * GET /api/products
 *
 * Fetches products and prices from Stripe.
 * This provides a single source of truth for product catalog.
 *
 * Response format:
 * {
 *   products: [
 *     {
 *       id: string (Stripe product ID)
 *       name: string
 *       description: string
 *       price: number (in dollars)
 *       priceId: string (Stripe price ID for checkout)
 *       currency: string
 *       image: string (URL or placeholder)
 *     }
 *   ]
 * }
 */

import { NextResponse } from 'next/server';
import { getServerStripe } from '@/lib/stripe';

export async function GET() {
  try {
    const stripe = getServerStripe();

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
        };
      })
    );

    // Cache for 5 minutes (product catalogs don't change frequently)
    return NextResponse.json(
      { products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('[Products API Error]', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
