const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: {
    /**
     * Libraries
     *
     * The less changed files that don't need rebuilding.
     */
    library: [
      '@fortawesome/fontawesome-free/css/all.min.css',
      'bootstrap-icons/font/bootstrap-icons.css',
      'animate.css',
      'swiper/css/bundle',
      'jquery',
      '@popperjs/core/dist/umd/popper.min.js',
      'bootstrap/dist/js/bootstrap.min',
      'theia-sticky-sidebar/dist/ResizeSensor.min',
      'theia-sticky-sidebar/dist/theia-sticky-sidebar.min',
      'magnific-popup/dist/jquery.magnific-popup.min',
      'swiper/bundle',
      'svg-injector',
    ],
  },

  mode: 'production',
  devtool: false,
  output: {
    path: `${paths.public}/assets/js`,
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: '/',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' },
          },

          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: '../css/library.css',
    }),

    /**
     * DLL Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files)
     *
     * Creates a 'manifest' for the webapck.dev to connect too
     */
    new webpack.DllPlugin({
      name: '[name]',
      path: `${paths.public}/assets/js/library-manifest.json`,
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
