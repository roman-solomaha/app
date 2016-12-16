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

const Schema = mongoose.Schema;

const Product = new Schema({
	name: {type: String, required: true},
	title: {type: String, required: true},
	image: String,
	info: [{name: String, value: String}],
	unit: {
		name: {type: String, enum: ['л', 'шт'], required: true},
		step: {type: Number, required: true}
	}
});

const Category = new Schema({
	name: {type: String, required: true},
	title: {type: String, required: true},
	items: Array
});

Category.path('title').validate(function (value) {
	return value.length > 5 && value.length < 70;
});

const CategoryModel = mongoose.model('Category', Category);

module.exports.CategoryModel = CategoryModel;