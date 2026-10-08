import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.amartuvshin.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/hire",
        permanent: true,
      },
      {
        source: "/consulting",
        destination: "/hire",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
