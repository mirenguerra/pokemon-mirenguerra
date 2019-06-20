import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

function getMeters(dm) {
  return `${dm / 10} m`;
}

function getKilos(dg) {
  return `${dg / 10} Kg`;
}

const PokemonPage = props => {
  const { pokemons, loading, match } = props;
  const selectedPokemon = pokemons.find(
    item => item.id === parseInt(match.params.pokemonId)
  );

  return (
    <React.Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="PokemonPage">
          <h2 className="PokemonPage__name">{selectedPokemon.name}</h2>
          <img
            className="PokemonPage__image"
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p className="PokemonPage__id">#{selectedPokemon.id}</p>
          <div className="PokemonPage__types">
            <ul>
              {selectedPokemon.types.map(item => {
                return (
                  <li className="PokemonPage__types-type" key={item.type.name}>
                    {item.type.name.toUpperCase()}
                  </li>
                );
              })}
            </ul>
          </div>
          <h2 className="PokemonPage__height">
            {getMeters(selectedPokemon.height)}
          </h2>
          <h2 className="PokemonPage__weight">
            {getKilos(selectedPokemon.weight)}
          </h2>
          <p className="PokemonPage__abilities">
            {selectedPokemon.abilities.map(item => {
              return `${item.ability.name} `;
            })}
          </p>
          <div className="PokemonPage__evolution">
            <img
              className="PokemonPage__image-evolution"
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <img
              className="PokemonPage__image-evolution"
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.evolvesFrom.name}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

PokemonPage.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

export default PokemonPage;
