DROP DATABASE IF EXISTS Movies;
CREATE DATABASE Movies;

USE Movies;

DROP TABLE IF EXISTS SavedMovies;
CREATE TABLE SavedMovies (
  ID int not null,
  Name varchar(255) not null,
  poster_path varchar(255),
  Popularity int not null,
  PRIMARY KEY (ID)
);