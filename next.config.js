/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['st3.depositphotos.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
