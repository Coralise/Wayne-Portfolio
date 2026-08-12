/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true
    }
};

// Skip ESLint during production builds to avoid CI build failures from dev-only lint rules
nextConfig.eslint = {
    ignoreDuringBuilds: true
};

export default nextConfig;
