const { Model } = require("objection");
const Option = require("./option.model");

class Poll extends Model {
  static get tableName() {
    return "polls";
  }

  static get relationMappings() {
    return {
      options: {
        relation: Model.HasManyRelation,
        modelClass: Option,
        join: {
          from: "polls.id",
          to: "options.poll_id"
        }
      }
    };
  }
}

module.exports = Poll;
