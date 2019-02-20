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
          <div className="flex1">
            <div style={{ width: "33px" }}>
              <RenderLogo color="#e3e3e3" />
            </div>
            <span className=" text-2xl font-semibold ml-4">
              {this.shortUnitName}
            </span>
          </div>
          <div className="flex1 mt-1 cursor-pointer" onClick={this.showOptions}>
            <div className="absolute">
              <i className="text-xl text-grey-dark fas fa-ellipsis-v" />
              <OptionsMenu
                hidden={this.state.optionsHidden}
                data={this.props.unitData}
                unitName={this.shortUnitName}
              />
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
