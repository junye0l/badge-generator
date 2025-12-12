/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
      {
        protocol: 'https',
        hostname: 'readme-typing-svg.demolab.com',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats-sigma-five.vercel.app',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "img-src 'self' data: https://img.shields.io https://skillicons.dev https://readme-typing-svg.demolab.com https://github-readme-stats-sigma-five.vercel.app;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
