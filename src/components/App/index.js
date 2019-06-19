import React from "react";
import "./styles.scss";
import getList from "../../services/getListService";
import getPokemons from "../../services/getPokemonsService";
import Home from '../Home/index';
import PokemonPage from '../PokemonPage/index';
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
      <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
            pokemons={pokemons}
            pokemonByName={pokemonByName}
            handleChangeFilterByName={this.handleChangeFilterByName}
            />
          )}
        />
        <Route
          path="/pokemon/:pokemonId"
          render={routerProps => {
            return (
              <PokemonPage
                match={routerProps.match}
                pokemons={pokemons}
              />
            );
          }}
        />
      </Switch>
    </div>
      
    );
  }
}

export default App;
