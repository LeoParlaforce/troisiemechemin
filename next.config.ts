import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.troisiemechemin.fr' }],
        destination: 'https://troisiemechemin.fr/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;