import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Card from "../Card/index";

const List = props => {
  const { pokemons } = props;
  return (
    <ul className="List">
      {pokemons.map(item => {
        const { id, name, types } = item;
        return (
          <li key={id}>
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
};

export default List;
