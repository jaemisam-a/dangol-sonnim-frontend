/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    const paths = {
      "/": { page: "/" },
      "/test": { page: "/test" },
    };

    return paths;
  },
};

module.exports = nextConfig;
