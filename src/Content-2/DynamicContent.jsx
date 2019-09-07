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
    fetch("http://www.mocky.io/v2/5d6f8b213100002d006606b0")
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
      if (data !== "undefined" && data) {
        for (let i = 0; i <= data.data.length; i += 1) {
          // eslint-disable-next-line prefer-destructuring
          if (
            data.data[i] &&
            data.data[i] !== "undefined" &&
            data.data[i].type === dataType
          ) {
            // eslint-disable-next-line prefer-destructuring
            categoryTitle = data.data[i].categoryTitle;

            if (dataType === "dropdown") {
              const optionItemsArray = data.data[i].optionItems;
              const optionItemsTags = optionItemsArray.map(item => (
                <option>{item}</option>
              ));
              return [categoryTitle, optionItemsTags];
            }

            return categoryTitle;
          }
        }
      }
    }
    return null;
  }

  renderInputField() {
    const categoryTitle = this.analyzeData("text");
    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <input type="text" id="field-1" />
        <br />
      </div>
    );
  }
  renderTextBlock() {
    const categoryTitle = this.analyzeData("text-block");

    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <textarea
          defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the test standard dummy text ever"
          rows="4"
          cols="50"
        />
        <br />
      </div>
    );
  }
  renderSelect() {
    if (this.state.data !== "undefined" && this.state.data) {
      const [categoryTitle, optionItemsTags] = this.analyzeData("dropdown");

      return (
        <div>
          <label className="category-title" htmlFor="field-1">
            {categoryTitle && categoryTitle !== "undefined"
              ? categoryTitle
              : null}
          </label>
          <br />
          <select>{optionItemsTags}</select>
        </div>
      );
    }
    return null;
  }

  renderUploadPic() {
    const categoryTitle = this.analyzeData("upload");

    return (
      <div>
        <label className="category-title" htmlFor="field-1">
          {categoryTitle && categoryTitle !== "undefined"
            ? categoryTitle
            : null}
        </label>
        <br />
        <input type="file" name="pic" accept="image/*" />
        <br />
      </div>
    );
  }
  render() {
    // console.log("State: ", this.state.data);
    return (
      <React.Fragment>
        <div className="audience-selection">AUDIENCE SELECTION</div>
        <div className="you-can-market-your">
          You can market your product/offerrings to the following set of
          audience
        </div>
        <div className="content-box">
          <div className="other-titles">Customer segments</div>
          {this.renderInputField()}
          {this.renderTextBlock()}
          {this.renderSelect()}
          {this.renderUploadPic()}
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
