const request = require("supertest");
const app = require("../../app.js");
const pollService = require("../../services/polls.service");
const validateAgainstSchema = require("../../validations/poll.validations");
const { describe, it } = require("node:test");

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
      { id: 1, name: "test", options: [] },
      { id: 1, name: "test", options: [] }
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

  it("should return 500 and error message if result.false is true", async () => {
    const mockPolls = [
      { id: 1, name: "test", options: [] },
      { id: 1, name: "test", options: [] },
      { id: 1, name: "test", options: [] }
    ];
    pollService.getActivePolls.mockResolvedValue({
      success: false,
      data: {},
      message: "error"
    });

    const response = await request(app).get("/api/polls");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 500
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
    const mockPoll = [{ id: 1, name: "new-poll", options: [] }];
    pollService.addPoll.mockResolvedValue({
      success: true,
      data: mockPoll[0]
    });

    validateAgainstSchema.mockResolvedValue(true);

    const response = await request(app).post("/api/polls");

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPoll[0]);
    expect(pollService.addPoll).toHaveBeenCalledTimes(1);
  });

  it("should return 500 and error message if result.false is true", async () => {
    const mockPolls = [
      { id: 1, name: "test", options: [] },
      { id: 1, name: "test", options: [] },
      { id: 1, name: "test", options: [] }
    ];
    pollService.addPoll.mockResolvedValue({
      success: false,
      data: {},
      message: "error"
    });

    const response = await request(app).get("/api/polls");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 500
    });
    expect(pollService.addPoll).toHaveBeenCalled();
  });
});
