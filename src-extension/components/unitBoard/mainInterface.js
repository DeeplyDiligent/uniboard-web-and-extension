import React, { Component } from "react";
import DesktopMainInterface from "./desktopMainInterface";
import WelcomeToExtensionModal from "./welcomeToExtensionModal";

class MainInterface extends Component {
  state = {};
  render() {
    let desktopInterface = (
      <React.Fragment>
        <WelcomeToExtensionModal />
        <DesktopMainInterface data={this.props.data} />
      </React.Fragment>
    );
    return desktopInterface;
  }
}

export default MainInterface;
