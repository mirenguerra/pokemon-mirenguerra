import React from "react";
import "./styles.scss";
import Filter from "../Filter/index";
import List from "../List/index";
import getList from "../../services/getListService";
import getPokemons from "../../services/getPokemonsService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pokemons: [],
      pokemonByName: ""
    };
    this.handleChangeFilterByName = this.handleChangeFilterByName.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    getList().then(data => {
      data.results.forEach(pokemon => {
        getPokemons(pokemon.url).then(pokemonDetail => {
          this.setState({
            pokemons: [...this.state.pokemons, pokemonDetail],
            loading: false
          });
        });
      });
    });
  }

  handleChangeFilterByName(event) {
    const { value } = event.currentTarget;
    this.setState({
      pokemonByName: value
    });
  }

  render() {
    const { pokemons, pokemonByName } = this.state;
    return (
      <React.Fragment>
        <Filter
          pokemonByName={pokemonByName}
          handleChangeFilterByName={this.handleChangeFilterByName}
        />
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <List pokemons={pokemons} pokemonByName={pokemonByName} />
        )}
      </React.Fragment>
    );
  }
}

export default App;
