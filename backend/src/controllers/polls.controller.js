class PollsController {
  getActivePoll = async (req, res) => {
    //add logic to get active poll.
    res.json({
      status: "active"
    });
    console.log("getting active poll");
  };
}

module.exports = new PollsController();
