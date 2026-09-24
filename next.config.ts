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
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/mn",
        headers: [{ key: "Content-Language", value: "mn" }],
      },
      {
        source: "/mn/:path*",
        headers: [{ key: "Content-Language", value: "mn" }],
      },
    ];
  },
};

export default nextConfig;
