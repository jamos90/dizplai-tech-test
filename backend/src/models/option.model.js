const { Model } = require("objection");
const Poll = require("./poll.model");
const VoteModel = require("./vote.model");

class Option extends Model {
  static get tableName() {
    return "options";
  }

  static get relationMappings() {
    const Poll = require("./poll.model");
    return {
      poll: {
        relation: Model.BelongsToOneRelation,
        modelClass: Poll,
        join: {
          from: "options.poll_id",
          to: "polls.id"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: VoteModel,
        join: {
          from: "options.id",
          to: "votes.option_id"
        }
      }
    };
  }
}

module.exports = Option;
