var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(express.static(__dirname+'/client'));
//middleware to initialise body parser
app.use(bodyParser.json());

Movie = require('./models/movie');
Genre = require('./models/genre');

//connect to Mongoose
mongoose.connect('mongodb://52.42.96.27/bollywooddbs', function (err) {
    if (err) 
      throw err;
console.log("Succesfully connected to MongoDB");
});
var db = mongoose.connection;

app.get('/',function(req,res){
	res.send('Please use /api/movie or /api/genre');
});
//MOVIES
app.get('/api/movie',function(req,res){
	
	Movie.getMovies(function(err, movies){
		if(err){
				throw err;
			}
			res.json(movies);
	});
});

app.get('/api/movie/:_id',function(req,res){
	Movie.getMovieById(req.params._id, function(err, movie){
		if(err){
				throw err;
			}
			res.json(movie);
	});
});
app.post('/api/movie',function(req,res){
	var movie = req.body;
	Movie.addMovie(function(err, movies){
		if(err){
				throw err;
			}
			res.json(movies);
	});
});
app.put('/api/movie/:_id',function(req,res){
	var id = req.params._id;
	var movie = req.body;
		Movie.updateMovie(id, movie, {}, function(err, movies){
			if(err){
				throw err;
			}
			res.json(movies);
		});
});
app.delete('api/movie/:._id', function(req, res){
	var id = req.params._id;
	Movie.removeMovie(id, function(err, movies){
		if(err){
				throw err;
			}
			res.json(movies);
	});
});
//GENRES------------------------------
app.get('/api/genre',function(req,res){
	Genre.getGenres(function(err, genres){
		if(err){
				throw err;
			}
			res.json(genres);
	});
});
app.post('/api/genre',function(req,res){
	var genre = req.body;
	Genre.addGenre(function(err, genre){
		if(err){
				throw err;
			}
			res.json(genres);
	});
});
app.put('/api/genre/:_id',function(req,res){
	var id = req.params._id;
	var genre = req.body;
		Genre.updateGenre(id, genre, {}, function(err, genres){
			if(err){
				throw err;
			}
			res.json(genres);
		});
});

app.delete('api/genre/:._id', function(req, res){
	var id = req.params._id;
	Genre.removeGenres(id, function(err, genres){
		if(err){
				throw err;
			}
			res.json(genres);
	});
});
app.listen(1243);
//Listen on port 1243
console.log('Running on port 1243...');

