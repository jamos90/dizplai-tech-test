const express = require("express");
const PollsController = require("../controllers/polls.controller");

const router = express.Router();

router.get("/active", PollsController.getActivePoll);

router.get("/", PollsController.getAllPolls);

router.get("/:id", PollsController.getPollById);

router.put("/:poolId/:optionId/vote", PollsController.addVoteToEntry);

router.put("/:id", (req, res) => {
  //update a specific poll
});

router.post("/", PollsController.addSinglePoll);

module.exports = router;
