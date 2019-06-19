import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

const Card = props => {
  const { imageSrc, name, id, types } = props;
  return (
    <div className="Card">
      <div className="Card__header">
        <img className="Card__image" src={imageSrc} alt={name} />
        <p className="Card__id">ID / {id}</p>
      </div>
      <div className="Card__body">
        <h3 className="Card__name">{name}</h3>
        <div className="Card__types">
          {types.map(item => {
            return (
              <p className="Card__types-type" key={item.type.name}>
                {item.type.name.toUpperCase()}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Card;
