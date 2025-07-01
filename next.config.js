/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse']
  },
  // PWA Configuration
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
  // Vercel deployment optimizations
  output: 'standalone'
}

module.exports = nextConfig