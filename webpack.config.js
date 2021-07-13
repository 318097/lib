module.exports = () => {
  return {
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
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
    externals: {
      react: "react",
    },
  };
};
