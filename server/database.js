const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/savedMovies', (err, res) => {
  if (err) {
    console.error('There was an error connecting with Mongoose connect: ', err);
  } else {
    console.log('The database is now connected with mongoose!');
  }
});

const { Schema } = mongoose;
const movieSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  title: String,
  genre_id: String,
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  poster_path: String
});

const Movie = mongoose.model('Movie', movieSchema);

const getAllFavorites = function(callback) {
  Movie.find({}, callback);
};

const saveFavorite = function(movie, callback) {
  let movieToSave = new Movie(movie);
  movieToSave.save(callback);
};

const deleteFavorite = function(movie, callback) {
  Movie.find({ id: movie.id }).remove().exec(callback);
};

const getFavoritesByGenre = function(genre_id, callback) {
  Movie.find({ genre_id: `${genre_id}` }, callback);
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite,
  getFavoritesByGenre
};