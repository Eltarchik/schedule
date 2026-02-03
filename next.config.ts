import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pwimages-a.akamaihd.net', // todo edit
                pathname: '/arc/**',
            },
        ],
    },
}

export default nextConfig
