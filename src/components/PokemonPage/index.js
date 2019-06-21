import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import getEvolution from "../../services/getEvolutionService";
import arrow from "../../images/arrow.svg";

function changeUnits(x) {
  return x / 10;
}

class PokemonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evolutionDetails: []
    };
  }

  componentDidMount() {
    this.fetchEvolution();
  }

  fetchEvolution() {
    getEvolution(this.props.selectedPokemon.evolutionUrl).then(data => {
      const evolutionPokemons = [data.chain.species.name];
      evolutionPokemons.push(data.chain.evolves_to[0].species.name);
      evolutionPokemons.push(
        data.chain.evolves_to[0].evolves_to[0].species.name
      );

      this.setState({
        evolutionDetails: evolutionPokemons
      });
    });
  }

  render() {
    const { loading, selectedPokemon } = this.props;
    const { evolutionDetails } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="PokemonPage">
            <div className="PokemenPage__header">
              <h2 className="PokemonPage__name">{selectedPokemon.name}</h2>
            </div>
            <div className="PokemonPage__body">
              <img
                className="PokemonPage__image"
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />

              <div className="PokemonPage__types">
                <ul>
                  {selectedPokemon.types.map(item => {
                    return (
                      <li
                        className="PokemonPage__types-type"
                        key={item.type.name}
                      >
                        {item.type.name.toUpperCase()}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="PokemonPage__id">#{selectedPokemon.id}</p>
            </div>
            <div className="PokemonPage__profile-header">
              <h1 className="Pokemon__profile-title">Detalles</h1>
            </div>
            <div className="PokemonPage__profile">
              <p className="PokemonPage__height">
                {`Altura: ${changeUnits(selectedPokemon.height)} m`}
              </p>
              <p className="PokemonPage__weight">
                {`Peso: ${changeUnits(selectedPokemon.weight)} kg`}
              </p>
              <p className="PokemonPage__abilities">
                {selectedPokemon.abilities.map(item => {
                  return `${item.ability.name} `;
                })}
              </p>
            </div>
            <div className="PokemonPage__evolution-header">
              <h1 className="PokemonPage__evolution-header-title">Evolución</h1>
            </div>
            <div className="PokemonCard__evolution">
              <p>{evolutionDetails[0]}</p>
              <img className="arrow" src={arrow} alt="flecha" />
              <p>{evolutionDetails[1]}</p>
              <img className="arrow" src={arrow} alt="flecha" />
              <p>{evolutionDetails[2]}</p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

PokemonPage.propTypes = {
  selectedPokemon: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

export default PokemonPage;
