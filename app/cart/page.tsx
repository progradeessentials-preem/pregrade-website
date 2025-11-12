"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Tag, Check, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";
import { toast } from "sonner";

// Valid discount codes
const DISCOUNT_CODES: Record<string, { percentage: number; description: string }> = {
  WELCOME10: { percentage: 10, description: "Welcome discount" },
  SAVE15: { percentage: 15, description: "15% off" },
  LAUNCH25: { percentage: 25, description: "Launch special" },
};

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percentage: number; description: string } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingThreshold = 100;
  const shipping = totalPrice >= shippingThreshold ? 0 : 9.99;

  // Calculate discount amount
  const discountAmount = appliedDiscount ? (totalPrice * appliedDiscount.percentage) / 100 : 0;
  const subtotalAfterDiscount = totalPrice - discountAmount;
  const finalTotal = subtotalAfterDiscount + shipping;

  const handleApplyDiscount = () => {
    setIsApplying(true);
    const code = discountCode.trim().toUpperCase();

    if (!code) {
      toast.error("Please enter a discount code");
      setIsApplying(false);
      return;
    }

    if (DISCOUNT_CODES[code]) {
      setAppliedDiscount({
        code,
        ...DISCOUNT_CODES[code],
      });
      toast.success(`Discount code "${code}" applied!`, {
        description: `You saved ${DISCOUNT_CODES[code].percentage}%`,
      });
    } else {
      toast.error("Invalid discount code", {
        description: "Please check the code and try again",
      });
    }

    setIsApplying(false);
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    toast.success("Discount code removed");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="container-padding mx-auto max-w-2xl py-24 text-center">
            <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-muted-foreground" />
            <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Start adding products to your cart to see them here.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40">
          <div className="container-padding mx-auto max-w-7xl py-8">
            <Link
              href="/products"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold md:text-4xl">Shopping Cart</h1>
            <p className="mt-2 text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="container-padding mx-auto max-w-7xl py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="glass-strong">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/40">
                    {items.map((item) => (
                      <div key={item.product.id} className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <Card className="glass h-24 w-24 overflow-hidden">
                              <CardContent className="flex h-full items-center justify-center p-0 text-4xl">
                                {item.product.image}
                              </CardContent>
                            </Card>
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <Link
                                  href={`/products/${item.product.id}`}
                                  className="font-semibold hover:text-primary transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {item.product.tagline}
                                </p>
                              </div>
                              <p className="text-lg font-bold text-primary">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-strong sticky top-20">
                <CardContent className="p-6">
                  <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>

                    {/* Discount Code Section */}
                    <div className="border-t border-border/40 pt-4">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          Discount Code
                        </label>

                        {appliedDiscount ? (
                          <div className="flex items-center justify-between rounded-lg bg-primary/10 border border-primary/20 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-semibold text-primary">
                                  {appliedDiscount.code}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {appliedDiscount.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleRemoveDiscount}
                              className="h-8 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter code"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleApplyDiscount();
                                }
                              }}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleApplyDiscount}
                              disabled={isApplying || !discountCode.trim()}
                              variant="outline"
                              className="px-6"
                            >
                              {isApplying ? "Applying..." : "Apply"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-sm text-primary">
                        <span className="font-medium">Discount ({appliedDiscount.percentage}%)</span>
                        <span className="font-medium">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-primary">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>

                    {totalPrice < shippingThreshold && (
                      <p className="text-xs text-muted-foreground">
                        Add {formatPrice(shippingThreshold - totalPrice)} more for free
                        shipping
                      </p>
                    )}

                    <div className="border-t border-border/40 pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(finalTotal)}
                        </span>
                      </div>
                      {appliedDiscount && (
                        <p className="mt-1 text-xs text-muted-foreground text-right">
                          You saved {formatPrice(discountAmount)}!
                        </p>
                      )}
                    </div>
                  </div>

                  <Button className="mt-6 w-full" size="lg" asChild>
                    <Link href="/checkout">Request to Purchase</Link>
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    We'll contact you to complete your order
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
