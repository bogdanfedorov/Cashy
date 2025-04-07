import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }
    return config;
  },
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  //assetPrefix: isProd ? "/Cashy/" : "",
  //basePath: isProd ? "/Cashy" : "",
  output: "export",
};

export default nextConfig;
