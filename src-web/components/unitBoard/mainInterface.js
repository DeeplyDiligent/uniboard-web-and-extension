import React, { Component } from "react";
import DesktopMainInterface from "./desktopMainInterface";
import { isMobileOnly } from "react-device-detect";
import MobileMainInterface from "./mobile/mobileMainInterface";
class MainInterface extends Component {
  state = {};
  render() {
    if (isMobileOnly) {
      return <MobileMainInterface data={this.props.data} />;
    } else {
      return <DesktopMainInterface data={this.props.data} />;
    }
  }
}

export default MainInterface;
