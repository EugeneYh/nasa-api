const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
	test('should return status 200', async () => {
		const response = await request(app)
			.get("/launches")
			.expect("Content-Type", /json/)
			.expect(200);
	})
})

const completeLaunchData = {
	"mission": "ZMT155",
  "rocket": "ZMT Experimantal IS1",
  "launchDate" : "November 29, 2022",
	"target": "ZemlyaBlya"
}

const launchDataWithoutDate = {
	"mission": "ZMT155",
  "rocket": "ZMT Experimantal IS1",
	"target": "ZemlyaBlya",
}

describe("Test POST /launch", () => {
	test('should respond with 200 success', async () => {
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
		})		
	})

	test('should catch invalid dates', () => {
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
})