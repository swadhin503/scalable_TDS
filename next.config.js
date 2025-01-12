/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheStartUrl: false,
  dynamicStartUrl: true,
  runtimeCaching: [],
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  reactStrictMode: true,
    env: {
    GOOGLE_CLIENT_SECRET: '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',
    GOOGLE_CLIENT_ID:
      '783863632022-ret6l7asmp5lp0gc6k7dao997pkkp2lt.apps.googleusercontent.com',
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'b3db62ra',
    NEXT_PUBLIC_SANITY_TOKEN:
      'skvUcfXhIofFPFo47O9jhe4qjrs3D1kOmBkgtjccP72j9ng29dmNlSYVfZH2uzs8bKFivJ8lyZG5CEDy2zlSHkGy9jdTzuLmR5oqCuWAh29nbd1pROaXHGVAle3asvCSnSvpIGyEZgu4SOaMMJl0QvhNFwzaJQfVNNnbrK25jMCEg73ORvcx',
    NEXT_PUBLIC_SANITY_API_VERSION: '2023-11-11',
    NEXT_PUBLIC_ROOT_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: '',
      },
    ],
  },
});

module.exports = nextConfig;
