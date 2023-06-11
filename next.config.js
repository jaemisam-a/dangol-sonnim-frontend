/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["dangol.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/juso/:path*",
        destination: "https://business.juso.go.kr/:path*",
      },
      {
        source: "/api/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
      },
      {
        source: "/static/:path*",
        destination: "https://dangol.s3.ap-northeast-2.amazonaws.com/static/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
