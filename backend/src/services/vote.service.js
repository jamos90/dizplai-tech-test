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
          "votes.id as voteId",
          "votes.timestamp as createdAt",
          "option.id as optionId",
          "option.name as optionName",
          "option.poll_id as pollId",
          "option:poll.name as pollName"
        );

      if (result.length > 0) {
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
      } else {
        return {
          operationOutcome: `No votes found for poll with id: ${pollId}`,
          results: []
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  getVotesForPoll: VoteService.prototype.getVotesForGivenPoll
};
