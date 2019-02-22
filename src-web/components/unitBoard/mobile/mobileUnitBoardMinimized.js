import React, { Component } from "react";
import database from "../../../data";
import RenderLogo from "../../../renderLogo";
class MobileUnitBoardMinimized extends Component {
  onClickCard = () => {
    this.props.maximiseItem(this.props.unitName, this.props.number);
  };
  nameCanBeShortened(name) {
    return database.shortenName(name) !== name;
  }

  render() {
    console.log(this.props);
    const colorList = [
      "#3e49bb",
      "mediumseagreen",
      "#c5009e",
      "#009888",
      "#682cbf",
      "#50342c",
      "#20B2AA"
    ];
    let borderColor = colorList[this.props.number];
    return (
      <div
        style={{
          minWidth: "250px",
          overflow: "hidden",
          borderRadius: "6px",
          borderColor: borderColor
        }}
        onClick={this.onClickCard}
        className="flex max-w-sm overflow-hidden shadow-lg m-2 bg-white border-b-8 flex-col"
      >
        <div className="flex justify-between content-center px-6 py-3 bg-white border-b border-grey-light flex-no-shrink overflow-hidden">
          <div className="flex overflow-hidden">
            <div className="flex-no-shrink relative" style={{ width: "33px" }}>
              <div
                className="absolute"
                style={{
                  width: "33px",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              >
                <RenderLogo color={borderColor} />
              </div>
            </div>
            <div className="flex flex-col overflow-hidden">
              {this.nameCanBeShortened(this.props.unitName) ? (
                <React.Fragment>
                  <span className=" text-3xl font-semibold ml-4">
                    {database.shortenName(this.props.unitName)}
                  </span>
                  <span
                    title={this.props.unitName}
                    className="text-sm text-grey font-semibold ml-4 whitespace-no-wrap overflow-hidden"
                    style={{ textOverflow: "ellipsis" }}
                  >
                    {this.props.unitName}
                  </span>
                </React.Fragment>
              ) : (
                <span className="text-md font-semibold ml-4">
                  {this.props.unitName}
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-2">
            <i className="text-xl text-grey-dark fas fa-chevron-down" />
          </div>
        </div>
      </div>
    );
  }
}

export default MobileUnitBoardMinimized;
