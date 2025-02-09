const mockData = require("../data/polls.json");
const pollValidation = require("../validations/poll.validations");
const { getAllPolls } = require("../services/polls.service");

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
      console.log(allData);
      res.status(200).send(allData);
    } catch (err) {
      console.log("something broke", err);
      res.status(500).send(err);
    }
  };

  getPollById = async (req, res) => {};

  addVoteToEntry = async (req, res) => {
    console.log("request", req.body);
    res.send(201, "created");
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
    // mockData.polls.push(req.body);
    res.json(mockData);
  };
}

module.exports = new PollsController();
