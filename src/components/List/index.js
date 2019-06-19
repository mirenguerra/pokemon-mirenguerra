import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Card from "../Card/index";

const List = props => {
  const { pokemons, pokemonByName } = props;
  return (
    <ul className="List">
      {pokemons
        .filter(item => item.name.includes(pokemonByName))
        .map(item => {
          const { id, name, types } = item;
          return (
            <li className="List__item" key={id}>
              <Card
                name={name}
                id={id}
                imageSrc={item.sprites.front_default}
                types={types}
              />
            </li>
          );
        })}
    </ul>
  );
};

List.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  pokemonByName: PropTypes.string.isRequired
};

export default List;
