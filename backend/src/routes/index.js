const express = require("express");
const pollRoutes = require("./polls.routes");
const voteRoutes = require("./votes.routes");
const router = express.Router();

router.use("/polls", pollRoutes);
router.use("/votes", voteRoutes);

module.exports = router;
