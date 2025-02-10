const PollModel = require("../models/poll.model");
const VoteModel = require("../models/vote.model");
const OptionModel = require("../models/option.model");

class VoteService {
  async getVotesForGivenPoll(pollId) {
    try {
      const result = await VoteModel.query()
        .joinRelated("option.poll")
        .where("option:poll.id", pollId)
        .select(
          "votes.id as votedId",
          "votes.timestamp as createdAt",
          "option.id as optionId",
          "option.name as optionName",
          "option.poll_id as pollId",
          "option:poll.name as pollName"
        );

      console.log("result", result);

      return {
        pollId: result[0].pollId,
        question: result[0].pollName,
        votes: result.map(vote => ({
          voteId: vote.voteId,
          optionId: vote.optionId,
          optionName: vote.optionName,
          createdAt: vote.createdAt
        }))
      };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  getVotesForPoll: VoteService.prototype.getVotesForGivenPoll
};
