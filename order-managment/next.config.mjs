import withSerwistInit from '@serwist/next'

// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  crossOrigin: 'use-credentials',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
})

export default withSerwist(nextConfig)
