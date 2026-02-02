import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.discordapp.net', // todo edit
                pathname: '/attachments/**',
            },
        ],
    },
}

export default nextConfig
