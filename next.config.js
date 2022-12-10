/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    i18n: {
        defaultLocale: 'es',
        locales: ['es'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tofuu.getjusto.com',
                port: '',
                pathname: '/orioneat-prod-resized/**',
            },
            {
                protocol: 'https',
                hostname: 'img.mesa247.pe',
                port: '',
                pathname: '/archivos/**',
            },
        ],
    },
}

module.exports = nextConfig
