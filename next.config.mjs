import { config } from "dotenv";

config({ path: ".env" });

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "djangobnb.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
        NEXT_PUBLIC_WS_HOST: process.env.NEXT_PUBLIC_WS_HOST,
    },
};

export default nextConfig;
