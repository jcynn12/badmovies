var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var apiHelpers = require('./apiHelpers.js');
var db = require('./database.js');



var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    apiHelpers.getMoviesByGenre(req.query.with_genre)
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.error('The error within GET search is: ', err);
                });
});

app.get('/genres', function(req, res) {
    apiHelpers.getGenres()
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    if (err) {
                        console.error('The error within the server GET request is: ', err);
                    }
                });
});

app.post('/save', function(req, res) {
    db.saveFavorite(req.body, (err, success) => {
        if (err) {
            console.error('There was an error saving the movie! ', err);
        } else {
            db.getAllFavorites((err, result) => {
                if (err) {
                    console.error('There was an error retrieving all the favorites after the addition: ', err);
                } else {
                    res.send(result);
                }
            });
        }
    });
});

app.post('/delete', function(req, res) {
    db.deleteFavorite(req.body, (err, success) => {
        if (err) {
            console.error('There was an error deleting the movie! ', err);
        } else {
            db.getAllFavorites((err, result) => {
                if (err) {
                    console.error('There was an error retrieving the movies after the delete: ', err);
                } else {
                    res.send(result);
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});
