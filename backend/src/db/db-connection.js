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

    await knexInstance.schema.createTableIfNotExists("options", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("totalVotes").defaultTo(0);
      table
        .integer("poll_id")
        .unsigned()
        .references("id")
        .inTable("polls")
        .onDelete("CASCADE");
    });

    await knexInstance.schema.createTableIfNotExists("votes", table => {
      table.increments("id").primary();
      table
        .integer("option_id")
        .unsigned()
        .notNullable();
      table
        .integer("user_id")
        .unsigned()
        .nullable();
      table.timestamp("timestamp").defaultTo(knexInstance.fn.now());
      table
        .foreign("option_id")
        .references("id")
        .inTable("options")
        .onDelete("CASCADE");
    });
  } catch (err) {
    console.error("Error creating one or more db tables", err);
    return false;
  }
}

module.exports = { createTables };
