const { Model } = require("objection");
const knex = require("knex");

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite"
  },
  userNullAsDefault: true
});

Model.knex(knexInstance);

module.exports = knexInstance;
