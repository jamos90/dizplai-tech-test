const express = require("express");
const VotesController = require("../controllers/votes.controller");

const router = express.Router();

router.get("/:pollId", VotesController.getVotesForPoll);

module.exports = router;
