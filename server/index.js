const express = require('express');
const bodyParser = require('body-parser');
const { getGenres, getMoviesByGenre } = require('./apiHelpers.js');
const { getAllFavorites, saveFavorite, deleteFavorite, getFavoritesByGenre } = require('./database.js');


const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    getMoviesByGenre(req.query.genre_id, (result) => {
        res.send(result);
    });
});

app.get('/genres', function(req, res) {
    getGenres((result) => res.send(result));
});

app.get('/favorites', function(req, res) {
    getFavoritesByGenre(req.query.genre_id, (err, result) => {
        if (err) {
            console.error('There was an error in Getting Favorites By Genre: ', err);
        } else {
            console.log('WHAT IS THE RESULT FROM getting favorites by genre query into db??: ', result);
            res.send(result);
        }
    });
});

app.post('/save', function(req, res) {
    saveFavorite(req.body, (err, success) => {
        if (err) {
            console.error('There was an error in Saving the Favorite! ', err);
        } else {
            getAllFavorites((err, results) => {
                if (err) {
                    console.error('There was an error in Getting All the Favorites: ', err);
                } else {
                    res.send(results);
                }
            });
        }
    });
});

app.post('/delete', function(req, res) {
    deleteFavorite(req.body, (err, success) => {
        if (err) {
            console.error('There was an error in Deleting the Favorite! ', err);
        } else {
            getAllFavorites((err, results) => {
                if (err) {
                    console.error('There was an error in Getting All the Favorites after Deleting! ', err);
                } else {
                    res.send(results);
                }
            });
        }
    })
});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});
