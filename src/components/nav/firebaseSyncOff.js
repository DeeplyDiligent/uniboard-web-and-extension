import React, { Component } from "react";
import tingle from "tingle.js";
import "tingle.js/dist/tingle.min.css";
/*global chrome*/

class FirebaseSyncOff extends Component {
  state = { step: 1 };
  incrementStep = () => {
    this.setState({ step: this.state.step + 1 });
  };
  sync = () => {
    let modal3 = this.modal3;
    chrome.storage.local.set({ sendDataOnline: "true" });
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      console.log(changes);
      if ("lastOnlineSync" in changes) {
        modal3();
      }
    });
  };
  modal1 = () => {
    this.modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ["overlay", "button", "escape"],
      closeLabel: "Close",
      cssClass: ["custom-class-1", "custom-class-2"]
    });

    // set content

    this.modal.setContent(
      '<h2 className="text-center my-2"> Online Sync </h2><hr className="bg-grey-light" style={{ height: "1px" }} /><div className="text-center text-xl py-2 ">Get started with using moodle on your phone to access your subjects and files today! </div>'
    );
    // add a button
    this.modal.addFooterBtn(
      "Yes! Sync Me To The Cloud!",
      "tingle-btn tingle-btn--primary",
      this.modal2
    );
    this.modal.open();
  };
  modal2 = () => {
    let modal = this.modal;
    modal.setContent(
      '<h1 class="text-center">Loading...</h1> <div class="text-center py-3 text-3xl"><i class="fas fa-circle-notch fa-spin"></i></div>'
    );
    modal.setFooterContent("");
    this.sync();
  };
  modal3 = () => {
    let modal = this.modal;
    let afterChange = this.props.onChange;
    let link =
      '<a target="_blank" href="https://uniboard.app/">https://uniboard.app/</a>';
    modal.setContent(
      '<h1 class="text-center">Done!</h1> <div class="text-center py-3 text-lg">Your data has been synced!</div>' +
        '<div class="text-center py-3 text-lg">Please visit ' +
        link +
        " on your phone or laptop to access your data from anywhere.</div>"
    );
    modal.setFooterContent("");
    modal.addFooterBtn("Close", "tingle-btn tingle-btn--primary", function() {
      modal.close();
      afterChange();
    });
  };
  render() {
    return (
      <button
        onClick={this.modal1}
        title="Set Up Mobile Sync"
        className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded text-xl ml-6"
      >
        <i className="fas fa-mobile-alt" />
      </button>
    );
  }
}

export default FirebaseSyncOff;
