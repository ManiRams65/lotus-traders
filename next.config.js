const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: "public",
        register: true,
        skipWaiting: true,
        runtimeCaching,
        buildExcludes: [/middleware-manifest\.json$/]
    },
    images: {
        domains: ['images.freeimages.com', 'res.cloudinary.com'],
    },
    swcMinify: true,
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.BASE_URL,
    }
})