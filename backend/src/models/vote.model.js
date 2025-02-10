const { Model } = require("objection");

class VoteModel extends Model {
  static get tableName() {
    return "votes";
  }

  static get relationMappings() {
    return {
      option: {
        relation: Model.BelongsToOneRelation,
        modelClass: () => require("./option.model"),
        join: {
          from: "votes.option_id",
          to: "options.id"
        }
      }
    };
  }
}

module.exports = VoteModel;
