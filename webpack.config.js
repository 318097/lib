module.exports = () => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      library: "cd",
      libraryTarget: "umd",
      filename: "index.js",
    },
  };
};
