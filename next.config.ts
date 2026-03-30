import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com'],
  },
}

export default nextConfig
