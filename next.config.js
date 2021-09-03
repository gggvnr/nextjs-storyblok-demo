/** @type {import('next').NextConfig} */

const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
  i18n: {
    localeDetection: false,
    locales: ['en'],
    defaultLocale: 'en',
  },

  reactStrictMode: true,

  images: {
    domains: ['a.storyblok.com'],
  },

  include: path.resolve(__dirname, 'icons'),
  webpack(webpackConfig) {
    return webpackConfig;
  },

})
