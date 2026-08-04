import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitalhub.fifa.com',
      },
      {
        protocol: 'https',
        hostname: 'https://www.thesportsdb.com',
      },
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
      },
      {
        protocol: 'https',
        hostname: 'r2.thesportsdb.com',
      },
    ],
  },
};

export default nextConfig;
