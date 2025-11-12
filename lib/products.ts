export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  tier: "Entry" | "Pro" | "Elite";
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  image: string;
  images: string[]; // Additional product images
  inStock: boolean;
  includedItems?: string[]; // Items included with purchase
}

export const products: Product[] = [
  {
    id: "pocket-scope",
    name: "The Pocket Scope",
    tagline: "Professional Card Authentication & Defect Detection",
    price: 74.99,
    tier: "Entry",
    description: "The ultimate portable authentication tool for sports cards, Pokémon, Magic: The Gathering, and all TCG cards - whether raw or graded. Trusted by collectors, dealers, and PSA graders to reveal every surface scratch, centering issue, and edge defect with crystal-clear 5X-14X magnification on a 2.4-inch HD IPS display. Inspect raw cards before grading submissions to avoid costly fees on flawed cards. Authenticate graded PSA/BGS slabs with built-in UV light that reveals hidden security marks and prevents counterfeit purchases. Essential for card shows, online purchases, and pre-grading inspection. Never miss a defect again - protect your investments with professional-grade inspection technology that fits in your pocket.",
    features: [
      "2.4\" HD IPS Display - Crystal-clear 320×240 screen eliminates eye strain and lets you share findings instantly",
      "5X-14X Adjustable Magnification - Three power levels (5×, 9×, 14×) reveal micro-scratches, print lines, and edge wear invisible to the naked eye",
      "White + UV Light System - Dual lighting modes illuminate every angle. UV light detects PSA/BGS authentication marks on graded slabs",
      "1MP HD Camera - High-definition lens captures clear images of card conditions for grading notes and dispute evidence",
      "Rechargeable 500mAh Battery - Long-lasting power with auto power-off after 10 minutes of inactivity to conserve battery",
      "Pocket-Sized Design - Compact and lightweight, perfect for card shows, private sales, and on-the-go inspection",
      "Raw Card Inspection - Pre-screen cards before PSA/BGS submission to avoid wasting $20-50 grading fees on flawed cards",
      "Graded Slab Authentication - Verify PSA/BGS/SGC slabs and prevent counterfeit purchases with built-in UV blacklight",
    ],
    specifications: [
      { label: "Magnification Levels", value: "5× | 9× | 14× (Adjustable)" },
      { label: "Display", value: "2.4\" HD IPS Screen (320×240)" },
      { label: "Camera", value: "1MP High-Definition Lens" },
      { label: "Lighting", value: "White Light + UV Light" },
      { label: "Battery", value: "500mAh Rechargeable" },
      { label: "Auto Power-Off", value: "10 minutes of inactivity" },
      { label: "Charging", value: "USB (cable included)" },
      { label: "Power Button", value: "Right side (M button)" },
      { label: "Light Button", value: "Left side" },
      { label: "Usage", value: "Must be flush with card surface" },
    ],
    image: "🔬",
    images: ["🔬", "💎", "🔍"],
    inStock: true,
    includedItems: [
      "The Pocket Scope - Professional digital microscope",
      "Premium Protective Case - Hard-shell carrying case",
      "USB Charging Cable - Fast charging cable included",
      "10 Penny Sleeves - Standard card protection sleeves",
      "10 Top Loaders - Rigid card holders for storage",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
