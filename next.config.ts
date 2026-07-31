import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // workspace root — node_modules is hoisted one level up
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
