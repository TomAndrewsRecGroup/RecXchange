import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'haaqtnq6favvrbuh.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Optimize image loading for better LCP
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Performance optimizations
  reactStrictMode: true,
  compress: true, // Enable gzip/brotli compression
  poweredByHeader: false, // Remove X-Powered-By header (security + performance)
  
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production
  
  // SWC compiler optimizations
  swcMinify: true, // Use SWC for faster minification
  
  // Compiler optimizations for better performance
  compiler: {
    // Remove console.log in production for smaller bundle
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
    
    // Enable modern bundling for better performance
    optimizeCss: true,
  },
};

export default nextConfig;
