import React, { Component } from "react";
import database from "../../data";
import EditableLabel from "react-inline-editing";
import { Textfit } from "react-textfit";
/*global chrome*/

class ViewEditTitle extends Component {
  state = {
    currently: "view",
    unitTitle: "",
    editKey: new Date().getTime()
  };
  constructor(props) {
    super(props);
    this.getTitle = this.getTitle.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  componentDidMount() {
    this.getTitle();
    if (database.getBuildType() === "extension") {
      this.divClass = "table bg-transparent hover:bg-grey-lighter rounded-lg";
      this.labelClass = "cursor-pointer px-2";
    } else {
      this.divClass = "table";
      this.labelClass = "px-2";
    }
  }
  componentWillReceiveProps() {
    this.getTitle();
  }
  _handleFocus = text => {};

  _handleFocusOut = text => {
    if (text) {
      this.setState({ unitTitle: text, editKey: new Date().getTime() });
    } else {
      this.setState({
        unitTitle: "Enter Name...",
        editKey: new Date().getTime()
      });
    }
    this.setTitle(text);
  };

  async getTitle() {
    let unittitles =
      database.getBuildType() === "extension"
        ? await database.getUserPreferences("unittitles")
        : database.getSubjectNames();
    if (unittitles[this.props.unitName]) {
      this.setState({
        unitTitle: unittitles[this.props.unitName],
        editKey: new Date().getTime()
      });
    } else {
      this.setState({
        unitTitle: database.shortenName(this.props.unitName),
        editKey: new Date().getTime()
      });
    }
  }

  async setTitle(title) {
    let unitTitles = await database.getUserPreferences("unittitles");
    unitTitles[this.props.unitName] = title;
    database.updateUserPreferences("unittitles", unitTitles);
  }

  changeToEditable = () => {
    this.setState({ unitTitle: "Enter Name..." });
  };

  render() {
    return (
      <Textfit mode="single" max={28}>
        <div className={this.divClass}>
          {database.getBuildType() === "extension" ? (
            <EditableLabel
              key={this.state.editKey}
              text={this.state.unitTitle}
              labelClassName={this.labelClass}
              inputWidth="100%"
              inputMaxLength={50}
              labelFontWeight="bold"
              inputFontWeight="bold"
              onFocus={this._handleFocus}
              onFocusOut={this._handleFocusOut}
            />
          ) : (
            <label className={this.labelClass + " font-bold"}>
              {this.state.unitTitle}
            </label>
          )}
        </div>
      </Textfit>
    );
  }
}

export default ViewEditTitle;
