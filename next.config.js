/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    ...i18n,
    localeDetection: false,
  },
};

module.exports = nextConfig;
