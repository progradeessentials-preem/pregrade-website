/**
 * Stripe Products Client Library
 *
 * Fetches products from Stripe via our API endpoint.
 * This replaces the hardcoded products array.
 */

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
}

/**
 * Fetch all products from Stripe
 * Client-side and server-side compatible
 */
export async function fetchStripeProducts(): Promise<StripeProduct[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004';
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('[Fetch Stripe Products Error]', error);
    return [];
  }
}

/**
 * Get a single product by Stripe product ID
 */
export async function getStripeProductById(id: string): Promise<StripeProduct | null> {
  const products = await fetchStripeProducts();
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
