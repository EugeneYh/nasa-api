const http = require('http');

require("dotenv").config({path: '.env'});

const app = require('./app.js');
//const { connectDB } = require("../src/services/mongo");
const { connectDB } = require("./services/mongo")
const { loadLaunchesData } = require("./models/launches.model");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();
	await loadPlanetsData();
	await loadLaunchesData();

	server.listen(PORT, () => {
		console.log("Server started on port", PORT);
	});
}

startServer();

//fonrib-nysxip-pyXvu3
//6PI230GgnyzT5oie - туц