const express = require("express");
const pollRoutes = require("./polls.routes");
const router = express.Router();

router.use("/polls", pollRoutes);

module.exports = router;
