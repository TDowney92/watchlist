// create a watch list model with mongoose to do the user CRUD operations
let mongoose = require('mongoose');

let watchSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'Title is Required'
	},
	rating: {
		type: String,
		required: 'Show-Movie rating is required'
	},
	genre: {
		title: String,
		required: 'Genre is Required'
	},
	year: {
		type: Number,
		required: 'Year is Required',
		min: 1900
	}
});

// make this modle public
module.exports = mongoose.model('Watch', watchSchema);
