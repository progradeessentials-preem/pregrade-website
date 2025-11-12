import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Explicitly set the Turbopack root to fix workspace detection issues
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
