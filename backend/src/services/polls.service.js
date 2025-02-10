const dbInstance = require("../db/db-connection");
const PollModel = require("../models/poll.model");
const VoteModel = require("../models/vote.model");
const OptionModel = require("../models/option.model");

class PollService {
  async getActivePolls() {
    try {
      const polls = await PollModel.query()
        .where("status", "active")
        .withGraphFetched("options");
      return this.createReturnObject(true, polls);
    } catch (err) {
      return createReturnObject(
        false,
        {},
        "Error fetching poll with active status"
      );
    }
  }

  async addPoll(pollData) {
    try {
      const pollOptions = pollData.options;
      const newPoll = await PollModel.query().insertGraphAndFetch({
        ...pollData,
        options: pollOptions.map(data => {
          return data;
        })
      });
      return {
        success: true,
        data: newPoll
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        errorMessage: "Error adding new poll",
        err
      };
    }
  }

  async addVote(optionId, pollId) {
    let transactionOutcome;
    try {
      await VoteModel.transaction(async transaction => {
        console.log("this?", this);
        const optionEntry = await this.queryForOptionByIdInTransaction(
          transaction,
          optionId
        );
        if (optionEntry.length > 0) {
          const transactionData = await this.handleVoteAddTransaction(
            transaction,
            optionId,
            pollId
          );
          transactionOutcome = this.createReturnObject(true, transactionData);
        } else {
          transactionOutcome = this.createReturnObject(
            false,
            {},
            `no option with ${optionId} exits, unable to add a vote`
          );
        }
      });
      return transactionOutcome;
    } catch (err) {
      console.log(err);
      return this.createReturnObject(
        false,
        {},
        `Error adding vote to option with ${optionId}`
      );
    }
  }

  async queryForOptionByIdInTransaction(transaction, optionId) {
    return await OptionModel.query(transaction).where("id", optionId);
  }

  async handleVoteAddTransaction(transaction, optionId, pollId) {
    await VoteModel.query(transaction).insert({
      option_id: optionId,
      timestamp: new Date()
    });

    await OptionModel.query(transaction)
      .where("id", optionId)
      .increment("totalVotes", 1);

    await PollModel.query(transaction)
      .where("id", pollId)
      .increment("totalVotes", 1);

    const updatedPoll = await PollModel.query(transaction)
      .where("id", pollId)
      .first()
      .withGraphFetched("options");

    return updatedPoll;
  }

  createReturnObject(successType, returnData = {}, returnedErrorMessage = "") {
    return {
      success: successType,
      data: returnData ? returnData : {},
      errorMessage: returnedErrorMessage ? returnedErrorMessage : ""
    };
  }
}

module.exports = new PollService();
