const commonConfig = require("./webpack.common");

module.exports = () => {
  return {
    ...commonConfig,
    mode: "production",
    devtool: "source-map",
    entry: {
      utils: "./src/utils/index.js",
      helpers: "./src/helpers/index.js",
      hooks: "./src/hooks/index.js",
      services: "./src/services/index.js",
      index: "./src/index.js",
    },
    output: {
      library: "lib",
      libraryTarget: "umd",
      filename: "[name].js",
    },
    externals: {
      react: "react",
    },
  };
};
