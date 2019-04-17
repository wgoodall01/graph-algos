const withPlugins = require("next-compose-plugins");
const cssPlugin = require("@zeit/next-css");
const workerPlugin = require("@zeit/next-workers");
const typescriptPlugin = require("@zeit/next-typescript");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = withPlugins(
  [[typescriptPlugin], [workerPlugin], [cssPlugin]],
  {
    exportPathMap: () => ({
      "/": { page: "/" }
    }),

    workerLoaderOptions: {
      inline: true
    },

    webpack(config, options) {
      if (options.isServer) {
        config.plugins.push(new ForkTSCheckerWebpackPlugin());
      }

      return config;
    }
  }
);
