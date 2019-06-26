import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import getEvolution from "../../services/getEvolutionService";
import arrow from "../../images/arrow.svg";
import backArrow from "../../images/back-arrow.svg";
import { Link } from "react-router-dom";

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
    if (this.props.selectedPokemon) {
      const url = this.props.selectedPokemon.evolutionUrl;
      if (url !== null) {
        getEvolution(url).then(data => {
          const evolutionPokemons = [data.chain.species.name];
          let evo2 = null;
          let evo1 = null;

          if (data.chain.evolves_to && data.chain.evolves_to.length > 0) {
            evo1 = data.chain.evolves_to[0].species.name;

            if (
              data.chain.evolves_to[0].evolves_to &&
              data.chain.evolves_to[0].evolves_to.length > 0
            ) {
              evo2 = data.chain.evolves_to[0].evolves_to[0].species.name;
            }
          }

          if (evo1 !== null) {
            evolutionPokemons.push(evo1);
          }
          if (evo2 !== null) {
            evolutionPokemons.push(evo2);
          }

          this.setState({
            evolutionDetails: evolutionPokemons
          });
        });
      }
    } else {
      return <p>Loading...</p>;
    }
  }

  render() {
    const { selectedPokemon } = this.props;
    const { evolutionDetails } = this.state;
    let pokeAbilities = "";
    if (selectedPokemon) {
      selectedPokemon.abilities.map(item => {
        return (pokeAbilities += `${item.ability.name}, `);
      });
    } else {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>
        {selectedPokemon && evolutionDetails ? (
          <div className="PokemonPage">
            <div className="PokemonPage__wrapper">
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
                  {`Habilidades: ${pokeAbilities.substring(
                    0,
                    pokeAbilities.length - 2
                  )}`}
                </p>
              </div>
              <div className="PokemonPage__evolution-header">
                <h1 className="PokemonPage__evolution-header-title">
                  Evolución
                </h1>
              </div>
              <div className="PokemonCard__evolution">
                <p>{evolutionDetails[0]}</p>
                <img className="arrow" src={arrow} alt="flecha" />
                <p>{evolutionDetails[1]}</p>
                {evolutionDetails[2] ? (
                  <React.Fragment>
                    <img className="arrow" src={arrow} alt="flecha" />
                    <p>{evolutionDetails[2]}</p>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Link to="/">
              <img className="backArrow" src={backArrow} alt="Volver atrás" />
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

PokemonPage.propTypes = {
  selectedPokemon: PropTypes.object,
};

export default PokemonPage;
