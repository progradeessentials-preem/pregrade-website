import { Product } from "./products";

export interface BundleItem {
  name: string;
  description: string;
  value: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  items: BundleItem[];
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercentage: number;
}

export const pocketScopeBundle: Bundle = {
  id: "pocket-scope-complete-bundle",
  name: "The Complete Inspection Kit",
  description: "Everything you need for professional card authentication and inspection",
  items: [
    {
      name: "The Pocket Scope",
      description: "Professional digital magnifier with UV light",
      value: 74.99,
    },
    {
      name: "Premium Carrying Case",
      description: "Hard-shell protective case with custom foam insert",
      value: 19.99,
    },
    {
      name: "Microfiber Cleaning Cloth",
      description: "Lens cleaning cloth for crystal-clear viewing",
      value: 4.99,
    },
    {
      name: "Quick Start Guide",
      description: "Professional inspection techniques and tips",
      value: 9.99,
    },
  ],
  regularPrice: 109.96,
  bundlePrice: 93.47,
  savings: 16.49,
  savingsPercentage: 15,
};

export interface CartBundle extends Bundle {
  quantity: number;
}

// Helper function to create a bundle product for cart
export function createBundleProduct(bundle: Bundle): Product {
  return {
    id: bundle.id,
    name: bundle.name,
    tagline: bundle.description,
    price: bundle.bundlePrice,
    tier: "Pro",
    description: bundle.description,
    features: bundle.items.map((item) => `${item.name} - ${item.description}`),
    specifications: bundle.items.map((item) => ({
      label: item.name,
      value: item.description,
    })),
    image: "📦",
    images: ["📦", "🎁", "✨"],
    inStock: true,
  };
}
