const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	age: { type: Number },
	height: { type: Number },
	messages: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
});

const User = mongoose.model('User', userSchema);

const messageSchema = new Schema({
	message: { type: String, required: true },
	date: { type: Date, default: Date.now },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
	User,
	Message,
};
