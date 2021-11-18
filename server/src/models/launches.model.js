const launches = new Map();

let latestLaunchNumber = 100;

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
}

function addNewLaunch(launch) {
	latestLaunchNumber++;
	launches.set(latestLaunchNumber, Object.assign(launch, {
		flightNumber: latestLaunchNumber,
		success: true,
		upcoming: true,
		customer: ["NASA, UKR"],
	}));

}

module.exports = {
	addNewLaunch,
	getAllLaunches,
}