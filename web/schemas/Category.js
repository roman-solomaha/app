const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
	name: {
		type: String
	},
	title: {
		type: String
	},
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}
	],
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

Category.path('title').validate(function (value) {
	return value.length > 5 && value.length < 70;
});

module.exports = mongoose.model('Category', Category);
module.exports.CategorySchema = Category;
