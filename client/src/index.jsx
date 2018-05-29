import React from 'react';
import ReactDOM from 'react-dom';
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
    this.getFavoritesByGenre = this.getFavoritesByGenre.bind(this);
  }

  getMovies(genre_id) {
    axios.get('/search', {
      params: {
        genre_id
      }
    })
          .then((result) => {
            this.setState({
              movies: result.data
            });
          })
          .catch((err) => {
            console.error('There was an error GETTING MOVIES by genre_id: ', err);
          });
  }

  getFavoritesByGenre(genre_id) {
    axios.get('/favorites', {
      params: {
        genre_id
      }
    })
          .then((result) => {
            console.log('WHAT IS THE RESULT FROM GETTING FAVORITES BY GENRE? results data is an array?: ', result.data);
            this.setState({
              favorites: result.data
            });
          })
          .catch((err) => {
            console.error('There was an error in Getting Favorites By Genre! : ', err);
          });
  }

  saveMovie(movie) {
    axios.post('/save', {
      
      id: movie.id,
      title: movie.title,
      genre_id: movie.genre_id,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity

    })
        .then((result) => {
          this.setState({
            favorites: result.data
          });
        })
        .catch((err) => {
          console.error('There was an error in Saving the Movie from React: ', err);
        });
  }

  deleteMovie(movie) {
    axios.post('/delete', {
      id: movie.id
    })
          .then((result) => {
            this.setState({
              favorites: result.data
            });
          })
          .catch((err) => {
            console.error('There was an error in Deleting the Movie from React: ', err);
          });
  }

  swapFavorites() {
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