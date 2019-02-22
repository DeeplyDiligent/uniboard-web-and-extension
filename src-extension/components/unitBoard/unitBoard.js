import React, { Component } from "react";
import WeekCard from "./weekCard";
import database from "../../data";
import OptionsMenu from "./optionsMenu";
import RenderLogo from "../../renderLogo";

class UnitBoard extends Component {
  state = { optionsHidden: true };
  constructor(props) {
    super(props);
    this.shortUnitName = database.shortenName(this.props.unitName);
  }
  nameCanBeShortened(name) {
    return database.shortenName(name) !== name;
  }
  showOptions = () => {
    if (this.state.optionsHidden) {
      this.setState({ optionsHidden: false });
    } else {
      this.setState({ optionsHidden: true });
    }
  };
  render() {
    const colorList = [
      "#3e49bb",
      "mediumseagreen",
      "#c5009e",
      "#009888",
      "#682cbf",
      "#50342c",
      "#20B2AA"
    ];
    var borderColor = colorList[this.props.number];
    return (
      <div
        style={{
          minWidth: "250px",
          overflow: "hidden",
          borderRadius: "6px",
          borderColor: borderColor
        }}
        className="flex flex-1 max-w-sm overflow-hidden shadow-lg m-2 bg-white border-b-8 flex-col"
      >
        <div className="flex justify-between content-center px-6 py-3 bg-white border-b border-grey-light flex-no-shrink">
          <div className="flex overflow-hidden">
            <div className="flex-no-shrink" style={{ width: "33px" }}>
              <RenderLogo color={borderColor} />
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
        </div>
        <div className="px-4 py-2" style={{ overflowY: "scroll" }}>
          {Object.keys(this.props.unitData).map((key, _) => {
            let value = this.props.unitData[key];
            return (
              <WeekCard
                weekName={value.name}
                data={value}
                unitName={this.props.unitName}
                key={key}
                branchId={key}
                color={borderColor}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
//height: 'calc(100% - 32px)'
export default UnitBoard;
