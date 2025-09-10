import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        pathname: "/**",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        pathname: "/**",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
