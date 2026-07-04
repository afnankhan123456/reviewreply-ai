/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["pdfmake"],
  },
};

module.exports = nextConfig;
