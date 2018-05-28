import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.saveOrDelete = this.saveOrDelete.bind(this);
  }

  saveOrDelete(movie) {
    if (this.props.showFaves) {
      this.props.deleteMovie(movie);
    } else {
      this.props.saveMovie(movie);
    }
  }

  render() {
    return (
      <ul className="movies">
        { this.props.movies.map((movie) => 
        <li key={movie.ID} className="movie_item" onClick={() => this.saveOrDelete(movie)}>
          <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}/>
          <div className="movie_description">
            <h2>{movie.Name || movie.title}</h2>
          </div>
        </li>
        )}
      </ul>
    );
  }
}

export default Movies;