/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images and future CDN domains
    domains: [],
    unoptimized: true, // useful for static export; remove if using Next.js image optimization
  },
};

module.exports = nextConfig;