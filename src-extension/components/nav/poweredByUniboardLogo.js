import React, { Component } from "react";
/*global chrome*/
class PoweredByUniboardLogo extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-col mr-3">
        <p>POWERED BY</p>
        <img
          className="w-32 mt-1"
          src={chrome.extension.getURL("img/uniboard-2.svg")}
        />
      </div>
    );
  }
}

export default PoweredByUniboardLogo;
