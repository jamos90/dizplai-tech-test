const knexInstance = require("./db-connection");

async function createTables() {
  try {
    //TODO: consider removing
    await knexInstance.schema.dropTableIfExists("options");
    await knexInstance.schema.dropTableIfExists("polls");
    await knexInstance.schema.dropTableIfExists("votes");

    await knexInstance.schema.createTableIfNotExists("polls", table => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("totalVotes").defaultTo(0);
      table
        .string("status")
        .notNullable()
        .defaultTo("inactive");
      table.text("description").nullable();
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
      table.timestamp("timestamp").defaultTo(knexInstance.fn.now());
      table
        .foreign("option_id")
        .references("id")
        .inTable("options")
        .onDelete("CASCADE");
    });

    const [poll] = await knexInstance("polls")
      .insert([
        {
          name: "Premier League Poll",
          status: "active",
          description: "Who will win the Premier League?",
          totalVotes: 0
        }
      ])
      .returning("*");

    await knexInstance("options").insert([
      { name: "Manchester City", poll_id: poll.id, totalVotes: 0 },
      { name: "Manchester United", poll_id: poll.id, totalVotes: 0 }
    ]);
  } catch (err) {
    console.error("Error creating one or more db tables", err);
    return false;
  }
}

module.exports = { createTables };
