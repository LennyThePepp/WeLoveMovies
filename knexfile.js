const path = require("path");

require("dotenv").config();

//Thinkful given url postgresql://postgres@localhost/postgres
// my db url postgres://adgbjgpb:ej5XBvC2in7xL0T5cOHM_MOFXFeYCOwR@raja.db.elephantsql.com/adgbjgpb

const {
  DATABASE_URL = "postgres://jduawdpd:i1PgQi9nbCcxGjH2nK-5oIDA8pw3vfge@castor.db.elephantsql.com/jduawdpd",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
