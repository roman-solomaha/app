const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
	name: {
		type: String
	},
	title: {
		type: String
	},
	image: {
		type: String
	},
	info: [
		{
			name: {
				type: String
			},
			value: {
				type: String
			}
		}
	],
	unit: {
		name: {
			type: String,
			enum: ['л', 'шт']
		},
		step: {
			type: Number
		}
	}
});

module.exports = mongoose.model('Product', Product);
module.exports.ProductSchema = Product;