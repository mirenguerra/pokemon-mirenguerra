import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Filter from "../Filter/index";
import List from "../List/index";

const Home = props => {
  const { pokemonByName, handleChangeFilterByName, pokemons, loading } = props;
  return (
    <div className="Home">
      <Filter
        pokemonByName={pokemonByName}
        handleChangeFilterByName={handleChangeFilterByName}
      />
      {loading 
      ? (<p>Loading...</p>) 
      : (<List pokemons={pokemons} pokemonByName={pokemonByName} />)
      }
    </div>
  );
};

Home.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  pokemonByName: PropTypes.string.isRequired,
  handleChangeFilterByName: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
