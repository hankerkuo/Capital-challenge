/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: "",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/capital-challenge',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
