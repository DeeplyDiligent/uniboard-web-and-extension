import React, { Component } from "react";
import SearchBox from "../sidebarSearch/searchBox";
import SearchResults from "../sidebarSearch/searchResults";
import UnitBoards from "./unitBoards";
class DesktopMainInterface extends Component {
  state = {};
  handleChange = e => {
    this.setState({ searchString: e.target.value });
  };
  render() {
    return (
      <div className="h-full flex flex-col bg-grey-lightest overflow-hidden ">
        <div className="searchBox flex-shrink m-auto pt-4">
          <SearchBox handleChange={this.handleChange} />
        </div>
        {this.state.searchString ? (
          <SearchResults
            data={this.props.data}
            searchString={this.state.searchString}
            maxWidth={"max-w-sm mx-auto"}
          />
        ) : (
          <React.Fragment>
            <div className="pl-6 w-64 text-2xl" style={{ marginTop: "-27px" }}>
              Your Units:
            </div>
            <UnitBoards data={this.props.data} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default DesktopMainInterface;
