"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingThreshold = 100;
  const shipping = totalPrice >= shippingThreshold ? 0 : 9.99;
  const finalTotal = totalPrice + shipping;

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate sending inquiry
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Purchase inquiry sent!", {
      description: "We'll contact you within 24 hours to complete your order.",
    });

    clearCart();
    setIsProcessing(false);
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="container-padding mx-auto max-w-2xl py-24 text-center">
            <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Add some products to your cart before checking out.
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
              href="/cart"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold md:text-4xl">Request to Purchase</h1>
            <p className="mt-2 text-muted-foreground">Complete this form and we'll contact you to finalize your order</p>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="container-padding mx-auto max-w-7xl py-12">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Your Information
                    </CardTitle>
                    <CardDescription>
                      We'll use this to contact you about your order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Any special requests or questions? (Optional)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Enter any special requests, shipping preferences, or questions..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="glass-strong sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-card text-2xl">
                            {item.product.image}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border/40 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-primary">FREE</span>
                          ) : (
                            formatPrice(shipping)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border/40 pt-2 text-lg font-bold">
                        <span>Estimated Total</span>
                        <span className="text-primary">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isProcessing}
                    >
                      <Mail className="h-4 w-4" />
                      {isProcessing ? "Sending..." : "Submit Purchase Request"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      We'll contact you within 24 hours
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
