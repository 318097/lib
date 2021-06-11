module.exports = () => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      filename: "index.js",
    },
  };
};
