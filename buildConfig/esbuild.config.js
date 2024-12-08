const esBuildConfig = (serverless) => {
  return {
    bundle: true,
    minify: false,
    sourcemap: true,
    target: "node14",
    platform: "node",
    concurrency: 10,
    exclude: [
      "aws-sdk",
      "better-sqlite3",
      "sqlite3",
      "oracledb",
      "mysql2",
      "tedious",
      "pg-query-stream",
      "mysql",
    ],
  };
};

module.exports = esBuildConfig;
