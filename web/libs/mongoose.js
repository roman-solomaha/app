const mongoose = require('mongoose');
//const log = require('./log')(module);

mongoose.connect('mongodb://127.0.0.1/app');
const db = mongoose.connection;

db.on('error', function (error) {
	console.error('connection error:', error.message);
});

db.once('open', function callback() {
	console.info("Connected to DB!");
});

db.dropDatabase();

module.exports = mongoose;