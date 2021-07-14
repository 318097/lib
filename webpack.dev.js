const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");
const commonConfig = require("./webpack.common");

module.exports = {
  ...commonConfig,
  entry: "./src/services",
  mode: "development",
  output: {
    path: path.resolve("./dev"),
  },

  plugins: [new NodemonPlugin()],
};
