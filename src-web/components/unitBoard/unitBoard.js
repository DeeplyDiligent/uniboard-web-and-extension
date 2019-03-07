import React, { Component } from "react";
import WeekCard from "./weekCard";
import database from "../../data";
import OptionsMenu from "./optionsMenu";
import RenderLogo from "../../renderLogo";
import AddEditTitle from "./viewEditTitle";
class UnitBoard extends Component {
  state = { optionsHidden: true };
  showOptions = () => {
    if (this.state.optionsHidden) {
      this.setState({ optionsHidden: false });
    } else {
      this.setState({ optionsHidden: true });
    }
  };
  nameCanBeShortened(name) {
    return database.shortenName(name) !== name;
  }
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
        className="flex flex-1 max-w-sm overflow-hidden shadow-lg m-2 mb-4 bg-white border-b-8 flex-col"
      >
        <div className="flex pl-6 pr-3 py-3 bg-white border-b border-grey-light flex-no-shrink">
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
          <div className="flex flex-col flex-grow mx-1 overflow-hidden">
            {this.nameCanBeShortened(this.props.unitName) ? (
              <React.Fragment>
                <AddEditTitle unitName={this.props.unitName} />
                <span
                  title={this.props.unitName}
                  className="text-sm text-grey font-semibold whitespace-no-wrap overflow-hidden px-2"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {this.props.unitName}
                </span>
              </React.Fragment>
            ) : (
              <AddEditTitle unitName={this.props.unitName} />
            )}
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
