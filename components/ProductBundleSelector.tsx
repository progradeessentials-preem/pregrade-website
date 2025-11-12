"use client";

import { useState } from "react";
import { CheckCircle2, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pocketScopeBundle, createBundleProduct } from "@/lib/bundles";
import { useCart } from "@/lib/cart-store";
import { Product } from "@/lib/products";
import { toast } from "sonner";

interface ProductBundleSelectorProps {
  product: Product;
}

export function ProductBundleSelector({ product }: ProductBundleSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<"single" | "bundle">("single");
  const { addItem } = useCart();

  const bundle = pocketScopeBundle;

  const handleAddToCart = () => {
    if (selectedOption === "single") {
      addItem(product);
      toast.success("Added to cart!", {
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      const bundleProduct = createBundleProduct(bundle);
      addItem(bundleProduct);
      toast.success("Bundle added to cart!", {
        description: `${bundle.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Bundle Offer Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <span className="font-bold text-purple-300">Bundle & Save 15%</span>
        </div>
        <p className="text-sm text-gray-300">
          Get The Complete Inspection Kit with premium accessories
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Single Product Option */}
        <Card
          onClick={() => setSelectedOption("single")}
          className={`cursor-pointer transition-all duration-200 ${
            selectedOption === "single"
              ? "border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500"
              : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                <h3 className="font-bold text-white">Single Unit</h3>
              </div>
              {selectedOption === "single" && (
                <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                  <span>The Pocket Scope</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                  <span>USB Charging Cable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                  <span>Basic Instructions</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Bundle Option */}
        <Card
          onClick={() => setSelectedOption("bundle")}
          className={`cursor-pointer transition-all duration-200 relative ${
            selectedOption === "bundle"
              ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500"
              : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
          }`}
        >
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
            Save ${bundle.savings.toFixed(2)}
          </Badge>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h3 className="font-bold text-white">Complete Kit</h3>
              </div>
              {selectedOption === "bundle" && (
                <CheckCircle2 className="h-5 w-5 text-purple-400" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  ${bundle.bundlePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${bundle.regularPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-400">
                Save {bundle.savingsPercentage}% with bundle
              </p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                {bundle.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-purple-400" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/30"
      >
        Add {selectedOption === "bundle" ? "Bundle" : "Item"} to Cart
      </Button>

      {selectedOption === "bundle" && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <h4 className="font-semibold text-white mb-3">Bundle Includes:</h4>
          <div className="space-y-2">
            {bundle.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm">
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </div>
                <span className="text-gray-300">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-white">Total Value:</span>
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                ${bundle.bundlePrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400 line-through">
                ${bundle.regularPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
