import React, { Component } from "react";
import moment from "moment";
/*global chrome*/
class LastUpdated extends Component {
  state = { lastUpdated: false };
  componentWillMount() {
    this.onUpdate();
    chrome.storage.onChanged.addListener(this.onUpdate);
  }

  onUpdate = () => {
    chrome.storage.local.get(null,this.dateToState);
  };

  dateToState = result => {
    if (result["MoodleBeast"]) {
      let obj = result["MoodleBeast"];
      this.setState({ lastUpdated: obj[Object.keys(obj)[0]]["dateCreated"] });
    }
  };

  render() {
    if (this.state.lastUpdated) {
      console.log(this.state.lastUpdated);
      return (
        <div className="text-lg py-1 ml-6">
          <div>Last Updated</div>
          <div>
            {moment(this.state.lastUpdated)
              .fromNow()
              .toString()}
          </div>
        </div>
      );
    }
    return false;
  }
}

export default LastUpdated;
