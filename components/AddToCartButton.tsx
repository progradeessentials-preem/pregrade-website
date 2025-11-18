"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: any; // Accept both Product and StripeProduct types
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ product, className, size = "lg" }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);

  // Handle both inStock (old Product) and active (Stripe Product)
  const isAvailable = product.inStock ?? product.active ?? true;

  const handleAddToCart = () => {
    if (!isAvailable) return;

    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      description: "View your cart to continue shopping or checkout.",
    });
  };

  return (
    <Button
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={!isAvailable}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isAvailable ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
