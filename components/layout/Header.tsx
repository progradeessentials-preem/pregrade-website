"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Product Manuals", href: "/manual" },
  { name: "Wholesale", href: "/wholesale" },
  { name: "Affiliate Program", href: "/affiliate" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = useCart((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-padding mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ProGrade Essentials"
            width={2880}
            height={440}
            className="h-32 w-auto md:h-40"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative px-4 py-2 text-base font-semibold text-foreground/80 transition-all duration-300 hover:text-foreground"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 rounded-lg bg-primary/0 transition-all duration-300 group-hover:bg-primary/10" />
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </div>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="ProGrade Essentials"
                    width={2880}
                    height={440}
                    className="h-24 w-auto"
                  />
                </Link>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group relative rounded-lg px-4 py-3 text-lg font-semibold transition-all duration-300 hover:bg-primary/10"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 bg-gradient-to-b from-primary to-secondary transition-all duration-300 group-hover:h-3/4" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
