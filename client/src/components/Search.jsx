import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedGenre: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      selectedGenre: e.target.value
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
            if (err) {
              console.error('There was an error with setting the state genres: ', err);
            }
          });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => this.props.swapFavorites()}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={(e) => this.handleChange(e)}>
          {this.state.genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option> )}
        </select>
        <br/><br/>

        <button onClick={() => (this.props.getMovies(this.state.selectedGenre))}>Search</button>

      </div>
    );
  }
}

export default Search;