const { Model } = require("objection");

class Poll extends Model {
  get tableName() {
    return "polls";
  }

  get relationMappings() {}
}
