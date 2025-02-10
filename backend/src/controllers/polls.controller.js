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
    const pollId = req.params.poolId;
    const updatedOption = await addVote(optionId, pollId);
    console.log(updatedOption);
    if (!updatedOption) {
      return res.status(500).send("error adding vote");
    } else {
      return res.status(201).send(updatedOption);
    }
  };

  addSinglePoll = async (req, res) => {
    console.log(req.body);
    const { error } = pollValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(500).send({
        errorCode: 500,
        reason: "Invalid Request Body",
        message: error.message
      });
    }
    const newPoll = await addPoll(req.body);
    if (newPoll) {
      res.status(201).send(newPoll);
    } else {
      res.status(500).send("somethings gone wrong");
    }
  };
}

module.exports = new PollsController();
