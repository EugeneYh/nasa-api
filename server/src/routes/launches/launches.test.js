const request = require("supertest");
const app = require("../../app");
const { connectDB } = require("../../services/mongo");

describe("Launches API", () => {

	beforeAll(async () => {
		await connectDB();
	});

	describe("Test GET /launches", () => {
		test('should return status 200', async () => {
			const response = await request(app)
				.get("/launches")
				.expect("Content-Type", /json/)
				.expect(200);
		});
	});

	describe("Test POST /launch", () => {
		const completeLaunchData = {
			"mission": "ZMT155",
			"rocket": "ZMT Experimantal IS1",
			"launchDate": "November 29, 2022",
			"target": "Kepler-62 f",
		};

		const launchDataWithoutDate = {
			"mission": "ZMT155",
			"rocket": "ZMT Experimantal IS1",
			"target": "Kepler-62 f",
		};

		const launchDataWithInvalidDate = {
			"mission": "ZMT155",
			"rocket": "ZMT Experimantal IS1",
			"target": "Kepler-62 f",
			"launchDate": "zero zero",
		};

		test('should respond with 201 created', async () => {
			const response = await request(app)
				.post("/launches")
				.send(completeLaunchData)
				.expect("Content-Type", /json/)
				.expect(201)
		
			const requestDate = new Date(completeLaunchData.launchDate).valueOf
			const responseDate = new Date(response.launchDate).valueOf

			expect(requestDate).toBe(responseDate)
			expect(response.body).toMatchObject(launchDataWithoutDate)
		})

		test('should catch missing required properties', async () => {
			const response = await request(app)
				.post("/launches")
				.send(launchDataWithoutDate)
				.expect("Content-Type", /json/)
				.expect(400)

			expect(response.body).toStrictEqual({
				error: "Missed required launch property",
			});
		})

		test('should catch invalid dates', async () => {
			const response = await request(app)
				.post("/launches")
				.send(launchDataWithInvalidDate)
				.expect("Content-Type", /json/)
				.expect(400)
			expect(response.body).toStrictEqual({
				error: "Invalid launch date"
			})
		})
	});
});

