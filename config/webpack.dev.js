const paths = require("./paths");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: "development",

  /**
   * Devtool
   *
   * Control how source maps are generated.
   */
  devtool: "inline-source-map",

  plugins: [
    /**
     * DLL Reference Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files).
     *
     * References the already bundled files
     */

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/assets/js/library-manifest.json"),
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
});
