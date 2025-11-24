/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: '*.googleusercontent.com' },
      { hostname: 'youtube.com' },
      { hostname: '*.youtube.com' },
    ],
  },
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
