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

async function createTables() {
  try {
    await knexInstance.schema.createTableIfNotExists("polls", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table
        .string("status")
        .notNullable()
        .defaultTo("active");
      table.text("description").nullable();
      table.integer("totalVotes").defaultTo(0);
    });
  } catch (err) {
    return console.error("Error creating Polls table", err);
  }

  try {
    await knexInstance.schema.createTableIfNotExists("options", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.json("votes").defaultTo("[]");
      table
        .integer("poll_id")
        .unsigned()
        .references("id")
        .inTable("polls")
        .onDelete("CASCADE");
    });
  } catch (err) {
    return console.error("Error creating options table", err);
  }
}

module.exports = { createTables };
