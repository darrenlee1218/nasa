/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["images.unsplash.com", "images-assets.nasa.gov"],
  },
  experimental: { images: { allowFutureImage: true }, scrollRestoration: true },
  optimizeFonts: false,
  compiler: {
    styledComponents: true,
  },
  extends: ["plugin:@next/next/recommended"],
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
