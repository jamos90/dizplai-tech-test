const dbInstance = require("../db/db-connection");

class PollService {
  //TODO:: add db logic when we have it set up

  async getAllPolls() {
    try {
      const polls = await dbInstance("polls").select("*");
      console.log(polls);
      return polls;
    } catch (err) {
      console.error("Error fetch all polls", err);
      return {
        query: "All polls",
        error: err
      };
    }
  }
}

module.exports = {
  getAllPolls: PollService.prototype.getAllPolls
};
