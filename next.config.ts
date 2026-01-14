import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    turbo: {
      // This forces Turbopack to treat 'e-farm' as the absolute root
      root: path.resolve(__dirname),
    },
  },
  eslint : {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
