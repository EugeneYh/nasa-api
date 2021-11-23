const http = require('http');
const app = require('./app.js');
const mongoose = require('mongoose');

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URL = "mongodb+srv://NASA-API:fonrib-nysxip-pyXvu3@cluster0.buvu3.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
	console.log("Mongodb connection established");
})

mongoose.connection.on("error", (error) => {
	console.error(error);
})

async function startServer() {
	await mongoose.connect(MONGO_URL)

	await loadPlanetsData();
	server.listen(PORT, () => {
		console.log("Server started on port", PORT);
	});
}

startServer();





