const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: `${paths.public}/assets/js`,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  /*  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
 */
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../imgs/[name][ext][query]',
        },
      },

      // Fonts and SVGs: Copy font files to build folder
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: '../fonts/[name][ext][query]',
        },
      },

      /**
       *
       * Expose jQuery to other scripts - Resolving 'jQuery is undefined' error on console.
       */

      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: [
            {
              globalName: '$',
              override: true,
            },
            {
              globalName: 'jquery',
              override: true,
            },
            {
              globalName: 'jQuery',
              override: true,
            },
          ],
        },
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
