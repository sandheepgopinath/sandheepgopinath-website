import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.112", "192.168.0.113"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*": {
        condition: { path: /src\/app\/globals\.css$/ },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
