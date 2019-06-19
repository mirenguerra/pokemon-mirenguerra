import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

const Filter = props => {
  const { pokemonByName, handleChangeFilterByName } = props;
  return (
    <div className="Filter">
      <label htmlFor="byName" className="Filter__label">
        Búsqueda
      </label>
      <input
        className="Filter__input"
        type="text"
        name="byName"
        id="byName"
        placeholder="Filtra pokemons por nombre..."
        value={pokemonByName}
        onChange={handleChangeFilterByName}
      />
    </div>
  );
};

Filter.propTypes = {
  pokemonByName: PropTypes.string.isRequired,
  handleChangeFilterByName: PropTypes.func.isRequired
};

export default Filter;
