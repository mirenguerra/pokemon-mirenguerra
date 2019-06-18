import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Card from "../Card/index";

const List = props => {
  return (
    <React.Fragment>
      <h1>List</h1>
      <Card />
    </React.Fragment>
  );
};

List.propTypes = {};

export default List;
