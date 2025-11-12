"use client";

import { useState, useEffect } from "react";
import { Eye, Package, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Simulated data
const INITIAL_STOCK = 247;
const INITIAL_VIEWERS = 5;

const purchaseNames = [
  "Alex from California",
  "Sarah from Texas",
  "Mike from Florida",
  "Jessica from New York",
  "David from Illinois",
  "Emily from Pennsylvania",
  "Chris from Ohio",
  "Amanda from Georgia",
  "Ryan from North Carolina",
  "Lauren from Michigan",
  "Brandon from Virginia",
  "Nicole from Washington",
  "Kevin from Arizona",
  "Samantha from Massachusetts",
  "Tyler from Colorado",
];

interface LiveViewersProps {
  className?: string;
}

export function LiveViewers({ className }: LiveViewersProps) {
  const [viewers, setViewers] = useState(INITIAL_VIEWERS);

  useEffect(() => {
    // Randomly fluctuate viewers between 3-8
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(3, Math.min(8, newValue));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge className={`bg-blue-500/20 text-blue-300 border border-blue-500/30 gap-2 ${className}`}>
      <Eye className="h-3 w-3" />
      <span className="font-medium">{viewers} people viewing this right now</span>
    </Badge>
  );
}

interface StockCounterProps {
  className?: string;
}

export function StockCounter({ className }: StockCounterProps) {
  const [stock, setStock] = useState(INITIAL_STOCK);

  useEffect(() => {
    // Simulate stock decreasing occasionally
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to decrease
        setStock((prev) => Math.max(150, prev - 1));
      }
    }, 25000); // Every 25 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine urgency level
  const getUrgencyStyle = () => {
    if (stock <= 180) {
      return "bg-red-500/20 text-red-300 border-red-500/30 animate-pulse";
    } else if (stock <= 220) {
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  };

  const getUrgencyIcon = () => {
    if (stock <= 180) {
      return "🔥";
    } else if (stock <= 220) {
      return "⚡";
    }
    return "✓";
  };

  return (
    <Badge className={`${getUrgencyStyle()} border gap-2 ${className}`}>
      <Package className="h-3 w-3" />
      <span className="font-medium">
        {getUrgencyIcon()} Only {stock} units left at launch price!
      </span>
    </Badge>
  );
}

interface RecentPurchasesProps {
  className?: string;
}

export function RecentPurchases({ className }: RecentPurchasesProps) {
  useEffect(() => {
    // Show random purchase notifications
    const showPurchaseNotification = () => {
      const randomName = purchaseNames[Math.floor(Math.random() * purchaseNames.length)];
      const minutesAgo = Math.floor(Math.random() * 30) + 1;

      toast.success(
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <Package className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">New Purchase!</p>
            <p className="text-sm text-gray-300">
              {randomName} just purchased The Pocket Scope
            </p>
            <p className="text-xs text-gray-400 mt-1">{minutesAgo} minute{minutesAgo !== 1 ? 's' : ''} ago</p>
          </div>
        </div>,
        {
          duration: 5000,
          className: "bg-gray-800 border-gray-700",
        }
      );
    };

    // Show first notification after 5 seconds
    const firstTimeout = setTimeout(showPurchaseNotification, 5000);

    // Then show notifications every 45-90 seconds
    const interval = setInterval(() => {
      showPurchaseNotification();
    }, 45000 + Math.random() * 45000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  return null; // This component just triggers toasts
}

interface SocialProofBannerProps {
  className?: string;
}

export function SocialProofBanner({ className }: SocialProofBannerProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <LiveViewers />
      <StockCounter />
      <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 gap-2">
        <TrendingUp className="h-3 w-3" />
        <span className="font-medium">Top seller in Card Authentication</span>
      </Badge>
    </div>
  );
}
