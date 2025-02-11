const pollValidation = require("../validations/poll.validations");
const pollService = require("../services/polls.service.js");

class PollsController {
  getActivePoll = async (req, res) => {
    res.json({
      status: "active"
    });
  };

  getAllPolls = async (req, res) => {
    const result = await pollService.getActivePolls();
    if (result.success) {
      res.status(200).send(result.data);
    } else {
      return res.status(500).send({
        status: 500,
        message: result.errorMessage
      });
    }
  };

  getPollById = async (req, res) => {
    const pollId = req.params.pollId;
    const result = await pollService.getPollById(pollId);
    if (result.success) {
      res.status(200).send(result.data);
    } else {
      res.status(500).send(result.errorMessage);
    }
  };

  addVoteToEntry = async (req, res) => {
    const optionId = req.params.optionId;
    const pollId = req.params.pollId;
    const result = await pollService.addVote(optionId, pollId);
    if (result.success) {
      return res.status(201).send(result.data);
    } else {
      return res.status(400).send({
        status: 400,
        message: result.errorMessage
      });
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
    const result = await pollService.addPoll(req.body);
    if (result.success) {
      res.status(201).send(result.data);
    } else {
      res.status(500).send({
        errorCode: 500,
        message: result.errorMessage
      });
    }
  };
}

module.exports = new PollsController();
