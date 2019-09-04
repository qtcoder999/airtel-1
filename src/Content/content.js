/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable linebreak-style */
import React from "react";
import PieChart from "react-minimal-pie-chart";
import "./content.css";

export default class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      data: [
        { title: "One", value: 10, color: "#E38627" },
        { title: "Two", value: 15, color: "#C13C37" }
      ]
    };
  }
  handleSelect = event => {
    console.log(event.target.value);
    console.log("id =", event.target.value);
    switch (event.target.value) {
      case 1:
        this.setState({
          value: 1,
          data: [
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" }
          ]
        });
        break;
      case 2:
        this.setState({
          value: 2,
          data: [
            { title: "One", value: 50, color: "#E38627" },
            { title: "Two", value: 25, color: "#C13C37" }
          ]
        });

        break;
      default:
    }
  };
  render() {
    console.log("State: ", this.state.data);
    return (
      <React.Fragment>
        <h3>Audience Selection </h3>
        <h4>Select from the existing consumer base</h4>
        <select onChange={this.handleSelect} value={this.state.value}>
          <option value={1}>Millenials</option>
          <option value={2}>Oils</option>
          <option value={3}>Metal</option>
          <option value={4}>Machinery</option>
          <option value={5}>Commerce</option>
        </select>
        <PieChart data={this.state.data} radius={10} cx={60} cy={15} />;
      </React.Fragment>
    );
  }
}
