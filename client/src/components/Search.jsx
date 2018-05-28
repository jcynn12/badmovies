import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genre_id: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      genre_id: e.target.value
    });
  }
  
  componentDidMount() {
    axios.get('/genres')
          .then((result) => {
            this.setState({
              genres: result.data
            });
          })
          .catch((err) => {
            console.error('There was an error Getting the Genres from within Search! ', err);
          });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={(e) => this.handleSelect(e)}>
          { this.state.genres.map((genre) => 
            <option key={genre.id} value={genre.id}>{genre.name}</option>)
          }
        </select>
        <br/><br/>
        <button onClick={() => this.props.getMovies(this.state.genre_id)}>Search</button>
      </div>
    );
  }
}

export default Search;