import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'schedule-test-bucket.storage.yandexcloud.net', // todo edit
                pathname: '/avatars/**',
            },
        ],
    },
}

export default nextConfig
