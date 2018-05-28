
const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../server/config.js');

const getGenres = () => {
  return axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
    params: {
      api_key: API_KEY
    }
  })
        .then((result) => {
          return result.data.genres;
        })
        .catch((err) => {
          console.error('We could not get the Genres you requested: ', err);
        });
};

const getMoviesByGenre = (genreID) => {
  return axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: API_KEY,
      sort_by: 'popularity.asc',
      with_genres: genreID
    }
  })
              .then((result) => {
                return result.data.results;
              })
              .catch((err) => {
                console.error('There is an error getting movies by the genre: ', err);
              });
};

module.exports = {
  getGenres,
  getMoviesByGenre
};