/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
        NEXT_PUBLIC_WS_HOST: process.env.NEXT_PUBLIC_WS_HOST,
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "164.90.164.114",
                port: "1337",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
