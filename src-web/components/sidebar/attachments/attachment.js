import React, { Component } from "react";
class Attachment extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <a href={this.props.url} className="flex text-lg w-full no-underline text-purple-darker p-3">
          <div className="w-5/6 flex">
            <i className="fas fa-file-pdf" />
            <div className="px-3 font-bold">{this.props.name}</div>
          </div>
          <div className=" w-1/6 pr-2 text-right" target="_blank">
            <i className="fas fa-cloud-download-alt text-purple" />
          </div>
        </a>
        <hr className="bg-grey-light" style={{ height: "1px" }} />
      </React.Fragment>
    );
  }
}

export default Attachment;
