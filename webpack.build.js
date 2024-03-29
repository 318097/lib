// const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
      downloads: "./src/downloads/index.js",
      index: "./src/index.js",
    },
    output: {
      library: "lib",
      libraryTarget: "umd",
      globalObject: "this", // to make this build work for browser & node env. Fix for next.js integration (window not defined)
      filename: "[name].js",
    },
    externals: {
      react: "react",
    },
    // plugins: [new BundleAnalyzerPlugin()],
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         compress: {
    //           pure_funcs: ["console.log"],
    //         },
    //       },
    //     }),
    //   ],
    // },
  };
};
