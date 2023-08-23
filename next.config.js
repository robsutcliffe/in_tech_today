const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
});
