const { Model } = require("objection");

class Option extends Model {
  get tableName() {
    return "options";
  }

  get relationMappings() {
    const Poll = require("./poll.model");
    return {
      poll: {
        relation: Model.BelongsToOneRelation,
        modelClass: Poll,
        join: {
          from: "options.poll_id",
          to: "polls.id"
        }
      }
    };
  }
}

module.exports = Option;
