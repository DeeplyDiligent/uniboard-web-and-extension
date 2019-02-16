import React, { Component } from "react";
import SearchBox from "../sidebarSearch/searchBox";
import SearchResults from "../sidebarSearch/searchResults";
import UnitBoards from "./unitBoards";
import FirebaseSyncOff from "../nav/firebaseSyncOff";
import PopOut from "../nav/popOut";
import database from "../../data";
import LastUpdated from "./lastUpdated";
const FirebaseSyncOn = () => (
  <a target="_blank" href="https://uniboard.app/login">
    <button
      title="Go To Mobile App"
      className="bg-transparent hover:bg-green text-green-dark font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded text-xl ml-6 h-full"
    >
      <i className="fas fa-mobile-alt" />
    </button>
  </a>
);

class DesktopMainInterface extends Component {
  state = { firebaseSyncOn: false };
  componentWillMount() {
    this.updateIconBasedOnSyncStatus();
  }
  updateIconBasedOnSyncStatus = () => {
    database.getSyncStatus().then(syncOn => {
      if (syncOn) {
        this.setState({ firebaseSyncOn: true });
      } else {
        this.setState({ firebaseSyncOn: false });
      }
    });
  }
  handleChange = e => {
    this.setState({ searchString: e.target.value });
  };
  render() {
    return (
      <div className="h-full flex flex-col bg-grey-lightest ">
        <div className="searchBox flex flex-no-shrink m-auto pt-4">
          <SearchBox handleChange={this.handleChange} />
          {this.state.firebaseSyncOn ? <FirebaseSyncOn /> : <FirebaseSyncOff onChange={this.updateIconBasedOnSyncStatus} />}
          <PopOut />
          <LastUpdated />
        </div>
        {this.state.searchString ? (
          <SearchResults
            data={this.props.data}
            searchString={this.state.searchString}
            maxWidth={"max-w-md mx-auto"}
          />
        ) : (
          <UnitBoards data={this.props.data} />
        )}
      </div>
    );
  }
}

export default DesktopMainInterface;
