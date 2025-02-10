const { getVotesForPoll } = require("../services/vote.service");

class VoteController {
  async getVotesForPoll(req, res) {
    const pollId = req.params.pollId;
    const result = await getVotesForPoll(pollId);
    if (!result)
      return res.status(500).send(`error getting votes for poll id:${pollId}`);
    return res.status(200).send(result);
  }
}

module.exports = new VoteController();
