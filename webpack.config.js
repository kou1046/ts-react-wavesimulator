const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type import ("webpack").Configuration */
module.exports = {
  mode: "development",
  entry: {
    sample: path.resolve(__dirname, "src/index.tsx"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
    watchFiles: ["src/**/*"],
    liveReload: true,
    port: 3000,
    static: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
