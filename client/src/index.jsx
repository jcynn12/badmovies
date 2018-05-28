import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  getMovies(genreID) {
    axios.get('/search', {
      params: {
        with_genre: genreID
      }
    })
    .then((result) => {
      this.setState({
        movies: result.data
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  saveMovie(movie) {
    axios.post('/save', {
      id: movie.id,
      name: movie.title,
      poster_path: movie.poster_path,
      popularity: movie.popularity
    })
        .then((result) => {
          this.setState({
            favorites: result.data
          });
        })
        .catch((err) => {
          console.error('When trying to save the movie, we got this error: ', err);
        });
  }

  deleteMovie(movie) {
    axios.post('/delete', {
      id: movie.ID,
      name: movie.Name,
      poster_path: movie.poster_path,
      popularity: movie.Popularity
    })
          .then((result) => {
            this.setState({
              favorites: result.data
            });
          })
          .catch((err) => {
            console.error('When trying to delete the movie, we got this error: ', err);
          });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));