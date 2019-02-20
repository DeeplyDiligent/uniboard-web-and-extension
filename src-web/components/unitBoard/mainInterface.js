import React, { Component } from "react";
import DesktopMainInterface from "./desktopMainInterface";
import { isMobileOnly } from "react-device-detect";
import MobileMainInterface from "./mobile/mobileMainInterface";
import CheckLoginOnWebModal from "./checkLoginOnWebModal";
class MainInterface extends Component {
  state = {};
  render() {
    let mobileInterface = (
      <React.Fragment>
        <CheckLoginOnWebModal />
        <MobileMainInterface data={this.props.data} />
      </React.Fragment>
    );
    let desktopInterface = (
      <React.Fragment>
        <CheckLoginOnWebModal />
        <DesktopMainInterface data={this.props.data} />
      </React.Fragment>
    );
    if (isMobileOnly) {
      return mobileInterface;
    } else {
      return desktopInterface;
    }
  }
}

export default MainInterface;
