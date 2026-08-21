/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Applies to every route in the app
        source: '/:path*',
        headers: [
          {
            // Prevent the site from being loaded in an iframe (clickjacking)
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Stop the browser from MIME-sniffing a response away from the
            // declared content-type
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Force HTTPS for this domain for 2 years, including subdomains
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Limit how much referrer info is sent to other origins
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Restrict access to sensitive browser features
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Backstop against XSS: only allow scripts/styles/connections
            // from the same origin, plus what this app actually needs
            // (OpenRouter API, PayPal, Google auth). Tighten further if you
            // don't need one of these.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.paypalobjects.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://openrouter.ai https://api.paypal.com https://www.paypal.com https://accounts.google.com",
              "frame-src 'self' https://www.paypal.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
