const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
	console.log("Mongodb connection established");
})

mongoose.connection.on("error", (error) => {
	console.error(error);
})

async function connectDB() {
	await mongoose.connect(MONGO_URL);
}

module.exports = {
	connectDB,
}