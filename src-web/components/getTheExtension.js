import React, { Component } from "react";
import * as firebase from "firebase/app";
class GetTheExtension extends Component {
  state = {};
  logout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <div className="center-on-page">
        <div className="leading-loose">
          Hi there, we can't find your database record!<br /> 
          1. Please Check your internet connection and refresh the page<br />
          2. If you're new here, you can get the extension at the link
          below. Ensure you have clicked the phone button next to the search bar on the extension.<br />
          3. Please check that you have logged into the correct account.<br />
        </div>
        <button
          onClick={this.logout}
          className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 my-2 rounded"
        >
          Logout
        </button>
        &emsp;
        <a href="https://chrome.google.com/webstore/detail/synopsis-your-moodle-hero/ikffeebmjnccffbijpcnlhadgdebadmc">
          <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 my-2 rounded">
            Get The Extension
          </button>
        </a>
      </div>
    );
  }
}

export default GetTheExtension;
