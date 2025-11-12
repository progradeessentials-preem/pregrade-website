"use client";

import { useState, useEffect } from "react";
import { X, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const POPUP_SHOWN_KEY = "pregrade-email-popup-shown";
const POPUP_DELAY_MS = 30000; // 30 seconds

export function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasBeenShown = localStorage.getItem(POPUP_SHOWN_KEY);
    if (hasBeenShown) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let exitIntentTriggered = false;

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of screen (trying to leave)
      if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setIsOpen(true);
        localStorage.setItem(POPUP_SHOWN_KEY, "true");
      }
    };

    // Delay trigger (backup if user doesn't trigger exit intent)
    timeoutId = setTimeout(() => {
      if (!exitIntentTriggered) {
        setIsOpen(true);
        localStorage.setItem(POPUP_SHOWN_KEY, "true");
      }
    }, POPUP_DELAY_MS);

    // Add event listener
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual email capture service
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store email in localStorage for now
    const emails = JSON.parse(localStorage.getItem("pregrade-emails") || "[]");
    emails.push({
      email,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("pregrade-emails", JSON.stringify(emails));

    setIsSubmitted(true);
    setIsLoading(false);

    // Show success toast
    toast.success("Welcome! Check your email for your 10% discount code", {
      duration: 5000,
    });

    // Close popup after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white p-0 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30">
              <Mail className="h-8 w-8 text-indigo-400" />
            </div>

            {/* Heading */}
            <h2 className="text-center text-2xl font-bold text-white mb-2">
              Wait! Get 10% Off Your First Order
            </h2>
            <p className="text-center text-gray-300 mb-6">
              Join our community of collectors and get exclusive deals, authentication tips, and early access to new products.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Get My 10% Discount"}
              </Button>
            </form>

            {/* Footer Text */}
            <p className="mt-4 text-center text-xs text-gray-400">
              By signing up, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-white mb-2">
              You're All Set!
            </h2>
            <p className="text-gray-300 mb-4">
              Check your email for your exclusive 10% discount code.
            </p>
            <p className="text-sm text-gray-400">
              Use code <span className="font-mono font-bold text-indigo-400">WELCOME10</span> at checkout
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
