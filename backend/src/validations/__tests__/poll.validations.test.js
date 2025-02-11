const validateAgainstSchema = require("../poll.validations");

describe("Poll Validation Schema", () => {
  it("should validate a correct poll object successfully", () => {
    const validPoll = {
      name: "Sample Poll",
      description: "A test poll",
      status: "active",
      totalVotes: 0,
      options: [
        { name: "Option 1", totalVotes: 0 },
        { name: "Option 2", totalVotes: 0 }
      ]
    };

    const { error, value } = validateAgainstSchema(validPoll);
    expect(error).toBeUndefined();
    expect(value).toEqual(validPoll);
  });

  it("should return error if less than two options provided", () => {
    const validPoll = {
      name: "Sample Poll",
      description: "A test poll",
      status: "active",
      totalVotes: 0,
      options: [{ name: "Option 1", totalVotes: 0 }]
    };

    const { error, value } = validateAgainstSchema(validPoll);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain(
      '"options" must contain at least 2 items'
    );
    expect(value).toEqual(validPoll);
  });

  it("should return error if less more then 7 options provided", () => {
    const validPoll = {
      name: "Sample Poll",
      description: "A test poll",
      status: "active",
      totalVotes: 0,
      options: Array(8).fill({ name: "Option", totalVotes: 0 })
    };

    const { error, value } = validateAgainstSchema(validPoll);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain(
      '"options" must contain less than or equal to 7 items'
    );
    expect(value).toEqual(validPoll);
  });

  it("should return error if no name provided", () => {
    const validPoll = {
      name: "",
      description: "test",
      status: "active",
      totalVotes: 0,
      options: Array(2).fill({ name: "Option", totalVotes: 0 })
    };

    const { error, value } = validateAgainstSchema(validPoll);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain(
      '"name" is not allowed to be empty'
    );
    expect(error).toBeDefined();
    expect(value).toEqual(validPoll);
  });

  it("should return error if no description provided", () => {
    const validPoll = {
      name: "test",
      description: "",
      status: "active",
      totalVotes: 0,
      options: Array(2).fill({ name: "Option", totalVotes: 0 })
    };

    const { error, value } = validateAgainstSchema(validPoll);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain(
      '"description" is not allowed to be empty'
    );
    expect(error).toBeDefined();
    expect(value).toEqual(validPoll);
  });
});
