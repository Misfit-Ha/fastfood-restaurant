/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      '127.0.0.1',
      'arkanstrapi2.storage.iran.liara.space',
      'cms.arkanburger.ir',
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
