const request = require("supertest");
const app = require("../../app.js");
const pollService = require("../../services/polls.service");
const validateAgainstSchema = require("../../validations/poll.validations");

jest.mock("../../services/polls.service", () => ({
  getAllPolls: jest.fn(),
  getActivePolls: jest.fn(),
  addPoll: jest.fn()
}));
jest.mock("../../validations/poll.validations.js", () => jest.fn());

describe("Polls controller - addSinglePoll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 and new poll if result.success is true", async () => {
    const mockPoll = { id: 1, name: "new-poll", options: [] };

    pollService.addPoll.mockResolvedValue({
      success: true,
      data: mockPoll
    });

    validateAgainstSchema.mockReturnValue({ error: null });

    const response = await request(app)
      .post("/api/polls")
      .send({ name: "new-poll", options: ["option1", "option2"] });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPoll);
    expect(pollService.addPoll).toHaveBeenCalledTimes(1);
  });

  it("should return 422 if validation fails", async () => {
    validateAgainstSchema.mockReturnValue({
      error: { message: "Invalid request" }
    });

    const response = await request(app)
      .post("/api/polls")
      .send({ name: "", options: [] });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      errorCode: 422,
      reason: "Invalid Request Body",
      message: "Invalid request"
    });
  });

  it("should return 500 and error message if result.success is false", async () => {
    pollService.addPoll.mockResolvedValue({
      success: false,
      data: {},
      message: "error"
    });
    validateAgainstSchema.mockReturnValue({ error: null });

    const response = await request(app)
      .post("/api/polls")
      .send({ name: "valid name", options: ["option1", "option2"] });

    expect(response.status).toBe(500);
    expect(pollService.addPoll).toHaveBeenCalled();
  });
});
