const PollModel = require("../models/poll.model");
const VoteModel = require("../models/vote.model");
const OptionModel = require("../models/option.model");

class PollService {
  async getAllPolls() {
    try {
      const polls = await PollModel.query().withGraphFetched("options");
      return this.createReturnObject(true, polls);
    } catch (err) {
      return this.createReturnObject(false, {}, "error fetching all polls");
    }
  }

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

  async getPollById(pollId) {
    let result;
    try {
      const foundPoll = await PollModel.query()
        .where("id", pollId)
        .withGraphFetched("options");
      if (foundPoll.length > 0) {
        result = this.createReturnObject(true, foundPoll);
      } else {
        result = this.createReturnObject(
          false,
          {},
          `No poll with found id: ${pollId}`
        );
      }

      return result;
    } catch (err) {
      return this.createReturnObject(
        false,
        {},
        `Error searching for Poll with id ${pollId}: ${err}`
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
      return {
        success: false,
        errorMessage: `Error adding new poll ${err}`,
        err
      };
    }
  }

  async addVote(optionId, pollId) {
    let transactionOutcome;
    try {
      await VoteModel.transaction(async transaction => {
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
      return this.createReturnObject(
        false,
        {},
        `Error adding vote to option with ${optionId} ${err}`
      );
    }
  }

  async setPollAsActive(pollId) {
    let updatedPoll;
    try {
      await PollModel.transaction(async trx => {
        await PollModel.query(trx)
          .where("status", "active")
          .patch({
            status: "inactive"
          });
        updatedPoll = await PollModel.query(trx).patchAndFetchById(pollId, {
          status: "active"
        });
      });
      return this.createReturnObject(true, updatedPoll);
    } catch (err) {
      return this.createReturnObject(
        false,
        {},
        `error updating poll ${pollId} status to active ${err}`
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
