const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    // connection: {

    //   host: process.env.POSTGRESQL_DB_HOST,
    //   user: process.env.POSTGRESQL_DB_USER,
    //   password: process.env.POSTGRESQL_DB_PASSWORD,
    //   database: process.env.POSTGRESQL_DB,
    //   port: 5432,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING_PROD,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};

module.exports = config;
