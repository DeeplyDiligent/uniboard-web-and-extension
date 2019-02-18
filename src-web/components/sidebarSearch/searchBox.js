import React, { Component } from "react";
class SearchBox extends Component {
  state = {crossButton:<div/>, searchString: ''};
  componentDidMount(){
  }
  deleteText = () => {
    this.setState({searchString:''})
    let e = {};
    e.target = {};
    e.target.value = ''
    this.showDeleteButton(e);

  }
  showDeleteButton = (e) => {
    if(e.target.value){
      this.setState({crossButton:<i className="fas fa-times text-xl" onClick = {this.deleteText} />});
    } else {
      this.setState({crossButton:<div/>});
    }
    this.setState({searchString: e.target.value});
    this.props.handleChange(e)
  }
  render() {
    return (
      <div
        className="rounded-full shadow-inner bg-white sm:bg-grey-lightest p-4  flex flex-no-shrink"
        style={{ display1: "-webkit-fill-available" }}
      >
        <i className="fas fa-search mr-4" />
        <input
          type="text"
          className="bg-transparent w-full"
          value={this.state.searchString}
          onChange={this.showDeleteButton}
          placeholder="Search..."
        />
        {this.state.crossButton}
      </div>
    );
  }
}

export default SearchBox;
