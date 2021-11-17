const paths = require("./paths");
const commonModules = require("./common-module-loaders");
const commonModulesResolve = require("./common-module-resolve");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vendorPath = `${paths.src}/assets/vendor`;

module.exports = {
  /**
   * Context
   *
   * Context of requests in the manifest file
   */
  context: __dirname,

  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: "development",
  entry: {
    /**
     * Libraries
     *
     * The less changed files that don't need rebuilding.
     */
    library: [
      "@fortawesome/fontawesome-free/css/all.min.css",
      "bootstrap-icons/font/bootstrap-icons.css",
      "animate.css",
      "swiper/css/bundle",
      "jquery",
      "@popperjs/core/dist/umd/popper.min.js",
      "bootstrap/dist/js/bootstrap.min",
      "theia-sticky-sidebar/dist/ResizeSensor.min",
      "theia-sticky-sidebar/dist/theia-sticky-sidebar.min",
      "magnific-popup/dist/jquery.magnific-popup.min",
      "swiper/bundle",
      "svg-injector",
    ],
  },
  /**
   * Libraries
   *
   * Where the bundled files will be outputted.
   */
  output: {
    path: `${paths.build}/assets/js`,
    filename: "[name].dll.js",
    library: "[name]",
    publicPath: "",
  },

  /**
   * Resolve
   *
   * Resolves 'jQuery and Popper.js module not found' error on webpack.
   */
  resolve: commonModulesResolve,

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: commonModules,

  plugins: [
    /**
     * Extracted Library CSS
     *
     */
    new MiniCssExtractPlugin({
      filename: "../css/library.css",
    }),

    /**
     * DLL Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files)
     *
     * Creates a 'manifest' for the webapck.dev to connect too
     */
    new webpack.DllPlugin({
      name: "[name]",
      path: `${paths.build}/assets/js/library-manifest.json`,
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
