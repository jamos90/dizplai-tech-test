const { Model } = require("objection");
const Option = require("./option.model");

class VoteModel extends Model {
  static get tableName() {
    return "votes";
  }

  static get relationMappings() {
    return {
      options: {
        relation: Model.BelongsToOneRelation,
        modelClass: Option,
        join: {
          from: "votes.option_id",
          to: "options.id"
        }
      }
    };
  }
}

module.exports = VoteModel;
