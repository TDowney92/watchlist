let mongoose = require('mongoose');

let plm = require('passport-local-mongoose');
let findOrCreate =  require('mongoose-findorcreate');

let accountSchema = new mongoose.Schema({
	facebookID: String,
	goodleID: String
});

accountSchema.plugin(plm);
accountSchema.plugin(findOrCreate);

module.exports = mongoose.model('Account', accountSchema);
