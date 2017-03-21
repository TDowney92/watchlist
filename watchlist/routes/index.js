var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
		title: 'Watch List' ,
		message: 'Media Checklist'
	});
});

/* GET register */
router.get('/register', function(req, res, next) {
	res.render('register', {
		title: 'Please Register with Watchlist'
	});
});

/* GET login */
router.get('/login', function(req, res, next) {

	// create a variable to store any login message
	let messages = req.sessions.messages || [];

	// clear the session messages
	req.session.messages = [];

	res.render('login', {
		title: 'Please login into Watchlist'
	});
});


module.exports = router;
