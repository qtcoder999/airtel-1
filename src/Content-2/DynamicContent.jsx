/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable linebreak-style */
import React from "react";
import PieChart from "react-minimal-pie-chart";
import "./style.css";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // let initialPlanets = [];
    fetch("https://jsonblob.com/api/1f15b556-d186-11e9-8f37-8bd3b49d435f")
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ data });
      });
  }
  analyzeData(dataType) {
    if (this.state.data !== "undefined" && this.state.data) {
      let categoryTitle;

      const { data } = this.state;
      let attributes;

      if (data !== "undefined" && data) {
        for (let i = 0; i <= data.data.length; i += 1) {
          if (
            data.data[i] &&
            data.data[i] !== "undefined" &&
            data.data[i].type === dataType
          ) {
            ({ attributes } = data.data[i]);
            ({ categoryTitle } = data.data[i]);

            if (dataType === "dropdown") {
              const optionItemsArray = data.data[i].optionItems;
              const optionItemsTags = optionItemsArray.map(item => (
                <option>{item}</option>
              ));
              return [categoryTitle, optionItemsTags];
            }
            return [categoryTitle, attributes];
          }
        }
      }
    }
    return null;
  }

  renderInputField() {
    const [categoryTitle, attributes] = this.analyzeData("text");
    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <input type="text" id="field-1" {...attributes} />
        <br />
      </div>
    );
  }
  renderTextBlock() {
    const [categoryTitle, attributes] = this.analyzeData("text-block");

    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <textarea {...attributes} />
        <br />
      </div>
    );
  }
  renderSelect() {
    if (this.state.data !== "undefined" && this.state.data) {
      const [categoryTitle, optionItemsTags, attributes] = this.analyzeData(
        "dropdown"
      );

      return (
        <div>
          <label className="category-title" htmlFor="field-1">
            {categoryTitle && categoryTitle !== "undefined"
              ? categoryTitle
              : null}
          </label>
          <br />
          <select {...attributes}>{optionItemsTags}</select>
        </div>
      );
    }
    return null;
  }

  renderUploadPic() {
    const [categoryTitle, attributes] = this.analyzeData("upload");

    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <input type="file" {...attributes} />
        <br />
      </div>
    );
  }
  render() {
    const buffer = [];

    if (this.state.data && this.state.data !== "undefined") {
      this.state.data.data.map(item => {
        switch (item.type) {
          case "text":
            buffer.push(this.renderInputField());
            break;
          case "text-block":
            buffer.push(this.renderTextBlock());
            break;
          case "dropdown":
            buffer.push(this.renderSelect());
            break;
          case "upload":
            buffer.push(this.renderUploadPic());
            break;
          default:
        }
        return null;
      });
    }

    return (
      <React.Fragment>
        <div className="audience-selection">AUDIENCE SELECTION</div>
        <div className="you-can-market-your">
          You can market your product/offerrings to the following set of
          audience
        </div>
        <div className="content-box">
          <div className="other-titles">Customer segments</div>
          {buffer && buffer}
          <PieChart
            data={[
              {
                value: "75",
                color: "#921515"
              }
            ]}
            radius={15}
            cx={20}
            cy={20}
            totalValue={100}
            lineWidth={20}
            label
            labelStyle={{
              fontSize: "10px",
              fontFamily: "sans-serif"
            }}
            labelPosition={0}
          />
        </div>
      </React.Fragment>
    );
  }
}
