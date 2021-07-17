const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const removeImports = require('next-remove-imports')({
  options: { }
});

const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const config = {};

module.exports = withPlugins([[withBundleAnalyzer], withImages, removeImports, i18n], config);
