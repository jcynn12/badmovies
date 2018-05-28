const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.error('There was an error connection to the database!');
  } else {
    console.log('You connected to the database!');
  }
});


const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM SavedMovies', callback);
};

const saveFavorite = function(movie, callback) {
  let queryString = `INSERT INTO SavedMovies (ID, Name, poster_path, Popularity) VALUES (${movie.id}, "${movie.name}", "${movie.poster_path}", ${movie.popularity})`;
  connection.query(queryString, callback);
};

const deleteFavorite = function(movie, callback) {
  connection.query(`DELETE FROM SavedMovies WHERE ID = ${movie.id}`, callback);
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};