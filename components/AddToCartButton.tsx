"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { Product } from "@/lib/products";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ product, className, size = "lg" }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.inStock) return;

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
      disabled={!product.inStock}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.inStock ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
