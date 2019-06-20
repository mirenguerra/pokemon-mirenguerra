import React from "react";
import "./styles.scss";
import getList from "../../services/getListService";
import getPokemons from "../../services/getPokemonsService";
import getEvolution from "../../services/getEvolutionService";
import Home from "../Home/index";
import PokemonPage from "../PokemonPage/index";
import { Switch, Route } from "react-router-dom";

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
              : (pokemon.evolvesFrom = "");
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
    const { pokemons, pokemonByName, loading } = this.state;
    return (
      <div className="App">
        <div className="triangle-left" />
        <div className="triangle-right" />
        <div className="circle-left" />
        <div className="circle-right" />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                pokemons={pokemons}
                pokemonByName={pokemonByName}
                handleChangeFilterByName={this.handleChangeFilterByName}
                loading={loading}
              />
            )}
          />
          <Route
            path="/pokemon/:pokemonId"
            render={routerProps => {
              return (
                <PokemonPage match={routerProps.match} pokemons={pokemons} loading={loading}/>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
