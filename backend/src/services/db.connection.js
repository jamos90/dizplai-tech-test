const { Model, knex } = require("objection");
const Knex = require("knex");

const db = Knex({
  client: "sqlite3",
  connection: { filename: "database.sqlite" },
  useNullAsDefault: true
});

Model.knex(db);
