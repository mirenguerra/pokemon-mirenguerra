import React from "react";
import "./styles.scss";
import Filter from "../Filter/index";
import List from "../List/index";
import getList from "../../services/getListService";
import getPokemons from '../../services/getPokemonsService';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pokemons:[],
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    getList()
    .then(data => {
      data.results.forEach(pokemon => {
        getPokemons(pokemon.url)
        .then(pokemonDetail => {
          this.setState({
            pokemons: [...this.state.pokemons, pokemonDetail],
          })
        }
        )
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Filter />
        <List />
      </React.Fragment>
    );
  }
}

export default App;
