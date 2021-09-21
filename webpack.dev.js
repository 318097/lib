const path = require("path");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...commonConfig,
  entry: "./src/index.js",
  mode: "development",
  output: {
    library: "lib",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build"),
    filename: "script.js",
  },
  devServer: {
    static: { directory: path.join(__dirname, "build") },
    port: 9000,
    open: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
