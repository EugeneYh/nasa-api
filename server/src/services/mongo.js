const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://NASA-API:fonrib-nysxip-pyXvu3@cluster0.buvu3.mongodb.net/nasa?retryWrites=true&w=majority";

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