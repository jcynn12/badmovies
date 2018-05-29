import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="movies">
        { this.props.movies.map((movie) => 
        <li key={movie.id} className="movie_item" onClick={() => this.props.showFaves ? this.props.deleteMovie(movie) : this.props.saveMovie(movie)}>
          <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}` || 'https://www.shutterstock.com/image-vector/not-available-grunge-rubber-stamp-on-549465907' }/>
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Votes</span>
                <span>{movie.vote_count}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>)
        }
      </ul>
    );
  }
}

export default Movies;