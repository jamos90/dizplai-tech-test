const request = require("supertest");
const app = require("../../app.js");
const pollService = require("../../services/polls.service");
const validateAgainstSchema = require("../../validations/poll.validations");

jest.mock("../../services/polls.service");
jest.mock("../../validations/poll.validations.js");

describe("Polls controller - Get all polls", () => {
  afterEach(() => {
    jest.clearAllMocks();
    pollService.getActivePolls.mockClear();
  });

  it("should return 200 and list of polls if result.success is true", async () => {
    const mockPolls = [
      { id: 1, name: "test", options: [] },
      { id: 2, name: "test2", options: [] },
      { id: 3, name: "test3", options: [] }
    ];
    pollService.getActivePolls.mockResolvedValue({
      success: true,
      data: mockPolls
    });

    const response = await request(app).get("/api/polls");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPolls);
    expect(pollService.getActivePolls).toHaveBeenCalledTimes(1);
  });

  it("should return 500 and error message if result.success is false", async () => {
    pollService.getActivePolls.mockResolvedValue({
      success: false,
      data: {},
      errorMessage: "Error fetching poll with active status"
    });

    const response = await request(app).get("/api/polls");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 500,
      message: "Error fetching poll with active status"
    });
    expect(pollService.getActivePolls).toHaveBeenCalled();
  });
});

describe("Polls controller - addSinglePoll", () => {
  afterEach(() => {
    jest.clearAllMocks();
    pollService.addPoll.mockClear();
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
