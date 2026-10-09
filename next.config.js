const withPWA = require('next-pwa')({
  dest: 'public', disable: process.env.NODE_ENV === 'development', register: true, skipWaiting: true,
  runtimeCaching: [
    // Only same-origin pages and static files are cached. Streams and API requests never are.
    { urlPattern: ({url,request}) => url.origin === self.location.origin && request.mode === 'navigate', handler: 'NetworkFirst', options: {cacheName:'pages', networkTimeoutSeconds:3, expiration:{maxEntries:20}} },
    { urlPattern: ({url}) => url.origin === self.location.origin && /\.(?:png|ico|svg|woff2|css|js)$/.test(url.pathname), handler:'StaleWhileRevalidate', options:{cacheName:'static-assets',expiration:{maxEntries:64}} }
  ]
});
module.exports = withPWA({reactStrictMode:true});
