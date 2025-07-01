/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
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
  }
}

module.exports = nextConfig