const mockData = require("../data/polls.json");
const pollValidation = require("../validations/poll.validations");
const { getAllPolls, addVote, addPoll } = require("../services/polls.service");

class PollsController {
  getActivePoll = async (req, res) => {
    //add logic to get active poll.
    res.json({
      status: "active"
    });
  };

  getAllPolls = async (req, res) => {
    console.log(getAllPolls);
    try {
      const allData = await getAllPolls();
      res.status(200).send(allData);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  getPollById = async (req, res) => {};

  addVoteToEntry = async (req, res) => {
    const optionId = req.params.optionId;
    const pollId = req.params.pollId;
    const updatedOption = await addVote(optionId, pollId);
    if (!updatedOption) {
      return res.status(500).send("error adding vote");
    } else {
      return res.status(201).send(updatedOption);
    }
  };

  addSinglePoll = async (req, res) => {
    const { error } = pollValidation(req.body);
    if (error) {
      return res.status(422).send({
        errorCode: 422,
        reason: "Invalid Request Body",
        message: error.message
      });
    }
    const newPoll = await addPoll(req.body);
    if (newPoll) {
      res.status(201).send(newPoll);
    } else {
      res.status(500).send({
        errorCode: 500,
        reason: "Error creating poll"
      });
    }
  };

  getVotesForPoll = async (req, res) => {
    const pollId = req.req.params.pollId;
    // const pollWithVotes = await
  };
}

module.exports = new PollsController();
