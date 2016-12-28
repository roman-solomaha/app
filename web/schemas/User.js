const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
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

module.exports = mongoose.model('User', User);
module.exports.UserSchema = User;
