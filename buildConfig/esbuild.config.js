const esBuildConfig = (serverless) => {
  return {
    bundle: true,
    minify: false,
    sourcemap: true,
    target: "node14",
    platform: "node",
    concurrency: 10,
  };
};

module.exports = esBuildConfig;
