const express = require('express');
const bodyParser = require('body-parser');
// var request = require('request');
const { getGenres, getMoviesByGenre } = require('./apiHelpers.js');


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

app.post('/save', function(req, res) {

});

app.post('/delete', function(req, res) {

});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});
