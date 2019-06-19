import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Filter from "../Filter/index";
import List from "../List/index";

const Home = props => {
  const { pokemonByName, handleChangeFilterByName, pokemons } = props;
  return (
    <div className="App">
      <div className="triangle-left" />
      <div className="triangle-right" />
      <div className="circle-left" />
      <div className="circle-right" />
      <Filter
        pokemonByName={pokemonByName}
        handleChangeFilterByName={handleChangeFilterByName}
      />
      {this.state.loading ? (
        <p>Loading...</p>
      ) : (
        <List pokemons={pokemons} pokemonByName={pokemonByName} />
      )}
    </div>
  );
};

Home.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  pokemonByName: PropTypes.string.isRequired,
  handleChangeFilterByName: PropTypes.func.isRequired
};

export default Home;
