import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname), // force le bon root
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/api/:path*", destination: "/api/:path*", permanent: false, basePath: false },
      { source: "/api/webhooks/stripe", destination: "/api/webhooks/stripe", permanent: false, basePath: false },
    ];
  },
};

export default nextConfig;
