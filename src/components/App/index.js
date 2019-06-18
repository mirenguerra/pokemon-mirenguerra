import React from "react";
import "./styles.scss";
import Filter from "../Filter/index";
import List from "../List/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Filter />
        <List />
      </React.Fragment>
    );
  }
}

export default App;
