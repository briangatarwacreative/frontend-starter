const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  rules: [
    /**
     * JavaScript
     *
     * Use Babel to transpile JavaScript files.
     */
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env"]],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    },
    /**
     *
     * Expose jQuery to other scripts - Resolving 'jQuery is undefined' error on console.
     */

    {
      test: require.resolve("jquery"),
      loader: "expose-loader",
      options: {
        exposes: [
          {
            globalName: "$",
            override: true,
          },
          {
            globalName: "jquery",
            override: true,
          },
          {
            globalName: "jQuery",
            override: true,
          },
        ],
      },
    },

    /**
     * Styles
     *
     */
    {
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        },
        "postcss-loader",
        "sass-loader",
      ],
    },

    /**
     * Fonts
     *
     * Inline font files.
     */
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      loader: "url-loader",
      options: {
        limit: 8192,
        // If you want to see where the file is coming from, add [path] before [name]
        name: "[name].[ext]",
        outputPath: "../fonts/",
        context: "src", // prevent display of src/ in filename
      },
    },

    /**
     * Source Maps
     *
     * Remove source maps error on console
     */
    {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    },
  ],
};
