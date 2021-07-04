module.exports = () => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      library: "lib",
      libraryTarget: "umd",
      filename: "index.js",
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
  };
};
