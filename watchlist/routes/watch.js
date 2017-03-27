let express = require('express');
let router = express.Router();

// refrence watch for CRUD
let Watch = require('../modles/watch');

//authentication
let passport = require('passport');

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

// GET watch index page
router.get('/', function(req, res, next) {

	// use the modle qurey for the collection for watchlist in mongodb
	Watch.find(function(err, watch) {
		if (err) {
			console.log(err);
			res.end(err);
			return;
		}
		// load the watch list data
		res.render('watch/index', {
			watch: watch,
			title: 'The Watch List',
				user: req.user
		});
	});
});

//GET watch-add to show the empty form stuff
router.get('/add', isLoggedIn, function(req, res, next) {
	res.render('watch/add', {
		title: 'Add a new Show-Movie',
			user: req.user
	});
});

// POST watch-add proccess the user submission
router.post('/add', isLoggedIn, function(req, res, next) {
	// use the modle to add a new thing to the database
	Watch.create({
		title: req.body.title,
		genre: req.body.genre,
		year: req.body.year
		rating: req.body.rating
	},function(err) {
		if (err) {
			console.log(err);
			res.rendr('error');
			return;
		}
		// no errors = updated watch list
		res.redirect('/watch');
	});
});

// GET watch/deletd_id delte the selected show/movie
router.get('/deleted/:_id' isLoggedIn, function(req, res, next) {
	// deleted media and redirect
	Watch.remove({_id: req.params._id }, function(err) {
		if(err) {
			console.log(err);
			res.render('error');
			return;
		}
		// no error shows up so watch list gets updated
		res.redirect('/watch');
	});
});

// GET watch _id - show edited form
router.get('/:id', isLoggedIn, function(req, res, next) {
	// look up the selected media
	Watch.findById(req.params._id, function(err, watch) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.render('watch/edit', {
			watch: watch,
			title: 'Edit the Watch List'
				user: req.user
		});
	});
});

//POST wath _id - save the updates
router.post('/:_id', isLoggedIn, function(req, res, next) {
	// create and fill watch object
	let watch = new Watch({
		_id: req.params._id,
		title: req.body.title,
		genre: req.body.genre,
		year: req.body.year,
		rating: req.body.rating
	});

	// call Mongo update method, passing he id and the updated game object
	Watch.update({_id: req.params._id }, watch, function(err) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.redirect('/watch');
	});
});

// make public
module.exports = router;