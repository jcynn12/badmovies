const axios = require('axios');
const { api_key } = require('../server/config.js');

const getGenres = (callback) => {
  axios.get('https://api.themoviedb.org/3/genre/movie/list', {
    params: {
      api_key
    }
  })
        .then((response) => {
          callback(response.data.genres);
        })
        .catch((err) => {
          console.error('There was an error in getting the Genres list: ', err);
        });
};

const getMoviesByGenre = (genre_id, callback) => {
  axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key,
      with_genres: genre_id,
      'vote_count.gte': 100,
      sort_by: 'popularity.asc'
    }
  })
        .then((response) => {
          callback(response.data.results);
        })
        .catch((err) => {
          console.error('The error in getting the movies by genre is: ', err);
        });
};

module.exports = {
  getGenres,
  getMoviesByGenre
};