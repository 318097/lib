module.exports = () => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      library: "lib",
      libraryTarget: "umd",
      filename: "index.js",
    },
  };
};
