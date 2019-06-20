import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

const PokemonPage = props => {
  const { pokemons, loading, match } = props;
  const selectedPokemon = pokemons.find(
    item => item.id === parseInt(match.params.pokemonId)
  );

  return (
    <div>{loading ? <p>Loading...</p> : <p>{selectedPokemon.name}</p>}</div>
  );
};

PokemonPage.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

export default PokemonPage;
