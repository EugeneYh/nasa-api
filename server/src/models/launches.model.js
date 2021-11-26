const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration X",
	rocket: "Explorer X1",
	launchDate: new Date("December 27, 2030"),
	target: "Kepler-442 b",
	customer: ["ZTM", "NASA"],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

async function getAllLaunches() {
	return await launchesDatabase.find({}, {
		"_id": 0,
		"__v": 0,
	});
};

function existsLaunchWithId(id) {
	return launches.has(id);
};

async function getLatestFlightNumber() {
	const latestLaunch = await launchesDatabase
		.findOne()
		.sort("-flightNumber")
	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}
	return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error("No matching planet found");
	}

	await launchesDatabase.updateOne({
		flightNumber: launch.flightNumber,
	}, launch, {
		upsert: true
	});
}

async function scheduleNewLaunch(launch) {
	const lastFlightNumber = await getLatestFlightNumber() + 1;
	const newLaunch = Object.assign(launch, {
		upcoming: true,
		success: true,
		customer: ["ZTM", "NASA"],
		flightNumber: lastFlightNumber,
	});
	await saveLaunch(newLaunch);
}

function abortLaunchById(id) {
	const aborted = launches.get(id);
	aborted.upcoming = false;
	aborted.success = false;
	return aborted
};

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
}