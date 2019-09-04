import React, { Component } from "react";
import "./App.css";
import DynamicContent from "./Content-2/DynamicContent";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <DynamicContent />
      </div>
    );
  }
}

export default App;
