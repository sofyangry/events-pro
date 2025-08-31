/** @format */

const mongoose = require('mongoose');

async function connectDB() {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/eventsDB');
		console.log('Database Connected');
	} catch (err) {
		console.error('Database Connection Error:', err);
		process.exit(1);
	}
}

module.exports = connectDB;
