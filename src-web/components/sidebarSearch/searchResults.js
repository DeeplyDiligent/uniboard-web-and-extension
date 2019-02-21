import React, { Component } from "react";
import SearchCard from "./searchCard";
import database from "../../data";
import fuzzysort from "fuzzysort";

class SearchResults extends Component {
  state = {};

  render() {
    let searchString = this.props.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      this.allData = database.transformToFlatDict(this.props.data);
      this.allData = fuzzysort.go(searchString, this.allData, {
        key: "searchString"
      });
    }
    let SearchResultsClasses = {};
    SearchResultsClasses.maxWidth = this.props.maxWidth
      ? this.props.maxWidth
      : "";
    if (searchString) {
      return (
        <div
          className={`flex-grow container overflow-scroll ${
            SearchResultsClasses.maxWidth
          } mt-2`}
        >
          {this.allData.slice(0, 30).map((i, j) => (
            <SearchCard
              key={j}
              link={i.obj.url}
              img={i.obj.iconLink}
              text={i.obj.name}
              subject={i.obj.subject}
              searchString={searchString}
            />
          ))}
        </div>
      );
    }
    return false;
  }
}

export default SearchResults;
