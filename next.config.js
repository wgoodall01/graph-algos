const withPlugins = require("next-compose-plugins");
const typescriptPlugin = require("@zeit/next-typescript");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = withPlugins([[typescriptPlugin]], {
  exportPathMap: () => ({
    "/": { page: "/" }
  }),

  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(new ForkTSCheckerWebpackPlugin());
    }

    return config;
  }
});
