const mongoose = require('../database');

const InfoSchema = new mongoose.Schema({
	content:{
		type: String,
	},

	createdAt:
	{
		type:Date,
		default: Date.now
	}

});

const Info = mongoose.model('information', InfoSchema);

module.exports = Info;