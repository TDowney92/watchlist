// create a watch list model with mongoose to do the user CRUD operations
let mongoose = require('mongoose');

let watchSchema = new mongoose.Schema({

    title: {
        type: String,
        required: 'Title is Required'
    },
    genre: {
        type: String,
        required: 'Genre is Required'
    },
    seasons: {
        type: Number,
        required: 'Seasons is Required',
        min: 1
    },
    rating: {
        type: String,
        required: 'Show-Movie rating is required'
    }
});

// make this modle public
module.exports = mongoose.model('Watch', watchSchema);
