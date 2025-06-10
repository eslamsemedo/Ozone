import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set limit to 10MB (adjust as needed)
    },
  },
  
  images: {
    domains: ['media.musclewiki.com', 'res.cloudinary.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "img-clerk.com",
      },
      {
        protocol: "https",
        hostname: "eyslrmwmvaubiprgyeqt.supabase.co",
      },
    ],
  },
};

export default nextConfig;