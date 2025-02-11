const express = require("express");
const PollsController = require("../controllers/polls.controller");

const router = express.Router();

router.get("/active", PollsController.getActivePoll);

router.get("/", PollsController.getAllPolls);

router.get("/:pollId", PollsController.getPollById);

router.post("/", PollsController.addSinglePoll);

router.put("/:pollId/:optionId/vote", PollsController.addVoteToEntry);

router.put("/:id", (req, res) => {
  //update a specific poll
});

router.post("/", PollsController.addSinglePoll);

module.exports = router;
