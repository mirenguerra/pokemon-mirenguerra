import React from "react";
import "./styles.scss";
import Filter from "../Filter/index";
import List from "../List/index";
import getList from "../../services/getListService";
import getPokemons from "../../services/getPokemonsService";
import getEvolution from "../../services/getEvolutionService";

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
      const pokemons = data.results;
      const pokemonData = pokemons.map(item => {
        let pokemon = {};
        return getPokemons(item.url)
          .then(pokemonDetail => {
            pokemon = pokemonDetail;
            return getEvolution(pokemonDetail.species.url);
          })
          .then(data => {
            const evolves = data.evolves_from_species;
            evolves
              ? (pokemon.evolvesFrom = evolves.name)
              : (pokemon.evolvesFrom = "none");
            return pokemon;
          });
      });

      Promise.all(pokemonData).then(responses => {
        this.setState({
          pokemons: responses,
          loading: false
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
      <div className="App">
        <div className="triangle-left" />
        <div className="triangle-right" />
        <div className="circle-left" />
        <div className="circle-right" />
        <Filter
          pokemonByName={pokemonByName}
          handleChangeFilterByName={this.handleChangeFilterByName}
        />
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <List pokemons={pokemons} pokemonByName={pokemonByName} />
        )}
      </div>
    );
  }
}

export default App;
