/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.sanity.io'],
        disableStaticImages: true,
    },
};

module.exports = nextConfig;
