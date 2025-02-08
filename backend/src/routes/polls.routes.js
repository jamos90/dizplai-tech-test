const express = require("express");
const PollsController = require("../controllers/polls.controller");

const router = express.Router();

router.get("/active", PollsController.getActivePoll);

router.get("/", (req, res) => {
  //get all polls
  console.log("polls endpoint");
  res.json({
    hello: "world"
  });
});

router.put("/:id", (req, res) => {
  //update a specific poll
});

router.post("/", (req, res) => {
  // create a new poll
});

module.exports = router;
