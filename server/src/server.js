const http = require('http');
const app = require('./app.js');
const { connectDB } = require("../src/services/mongo");
 
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
 	await connectDB();
	await loadPlanetsData();
	server.listen(PORT, () => {
		console.log("Server started on port", PORT);
	});
}

startServer();





