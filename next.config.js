const redirects = require('./redirects')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "calgarybisons.payloadcms.app", "app.calgarybisons.ca"],
  },
  redirects
};

module.exports = nextConfig;
