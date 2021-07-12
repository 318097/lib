module.exports = () => {
  return {
    mode: "production",
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
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    externals: {
      react: "react",
    },
  };
};
