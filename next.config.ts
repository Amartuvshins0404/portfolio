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
    const mainDomain = [
      {
        type: "host" as const,
        value: "amartuvshin.com",
      },
    ];

    return [
      {
        source: "/portfolio",
        has: mainDomain,
        destination: "https://portfolio.amartuvshin.com",
        permanent: true,
      },
      {
        source: "/portfolio",
        has: [
          {
            type: "host",
            value: "portfolio.amartuvshin.com",
          },
        ],
        destination: "https://portfolio.amartuvshin.com",
        permanent: true,
      },
      {
        source: "/blog",
        has: mainDomain,
        destination: "https://portfolio.amartuvshin.com/blog",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        has: mainDomain,
        destination: "https://portfolio.amartuvshin.com/blog/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "host",
              value: "portfolio.amartuvshin.com",
            },
          ],
          destination: "/portfolio",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
