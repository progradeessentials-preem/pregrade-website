import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STRIPE INTEGRATION: Removed 'output: export' to enable API routes
  // Static export doesn't support server-side API endpoints required for payment processing
  // For GitHub Pages deployment, see alternative deployment options in docs

  images: {
    unoptimized: true,
  },
  // Explicitly set the Turbopack root to fix workspace detection issues
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
