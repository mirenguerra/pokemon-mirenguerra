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
      pokemonByName: "",
    };
    this.handleChangeFilterByName = this.handleChangeFilterByName.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  // fetchList() {
  //   getList().then(data => {
  //     data.results.forEach(pokemon => {
  //       getPokemons(pokemon.url).then(pokemonDetail => {
  //         this.setState({
  //           pokemons: [...this.state.pokemons, pokemonDetail],
  //           loading: false
  //         });
  //       });
  //     });
  //   });
  // }

  fetchList() {
    getList().then(data => {
      let pokemonsList = data.results;
      const pokemonDetail = pokemonsList.map(item => getPokemons(item.url));
      const pokemonEvolution = pokemonsList.map(item => {
        getPokemons(item.url).then(res => {
          getEvolution(res.id).then(data => {
            console.log(data);
          });
        });
      });     

      Promise.all(pokemonDetail, pokemonEvolution).then(responses => {
        this.setState({
          pokemons: responses,
          loading: false,
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
