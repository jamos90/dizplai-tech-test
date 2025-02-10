const dbInstance = require("../db/db-connection");
const PollModel = require("../models/poll.model");
const VoteModel = require("../models/vote.model");
const OptionModel = require("../models/option.model");

class PollService {
  //TODO:: add db logic when we have it set up

  async getAllPolls() {
    try {
      const polls = PollModel.query()
        .where("status", "active")
        .withGraphFetched("options");
      return polls;
    } catch (err) {
      console.error("Error fetch all polls", err);
      return {
        query: "All polls",
        error: err
      };
    }
  }

  async addPoll(pollData) {
    try {
      const pollOptions = pollData.options;
      // console.log(pollData);
      // console.log(pollData.options);
      const newPoll = await PollModel.query().insertGraphAndFetch({
        ...pollData,
        options: pollOptions.map(data => {
          return data;
        })
      });
      console.log(newPoll);
      return newPoll;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async addVote(optionId, pollId) {
    let updatedPoll;
    //BUG need to check if option exits before adding to votes table;
    try {
      await VoteModel.transaction(async transaction => {
        await VoteModel.query(transaction).insert({
          option_id: optionId,
          timestamp: new Date()
        });

        await OptionModel.query(transaction)
          .where("id", optionId)
          .increment("totalVotes", 1);

        await PollModel.query(transaction)
          .where("id", pollId)
          .increment("totalVotes", 1);

        updatedPoll = await PollModel.query(transaction)
          .where("id", pollId)
          .first()
          .withGraphFetched("options");
      });
      return updatedPoll;
    } catch (err) {
      console.error(`Error adding vote to option with ${optionId}`, err);
      return false;
    }
  }
}

module.exports = {
  getAllPolls: PollService.prototype.getAllPolls,
  addVote: PollService.prototype.addVote,
  addPoll: PollService.prototype.addPoll
};
