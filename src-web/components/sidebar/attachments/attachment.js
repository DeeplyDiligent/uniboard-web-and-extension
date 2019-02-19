import React, { Component } from "react";
class Attachment extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <a href={this.props.url}  target="_blank" className="flex text-lg w-full no-underline text-purple-darker p-3">
          <div className="w-5/6 flex">
            <img src={this.props.icon} style={{width:'24px',height:'24px'}}/>
            <div className="px-3 font-bold">{this.props.name}</div>
          </div>
          <div className=" w-1/6 pr-2 text-right">
            <i className="fas fa-cloud-download-alt text-purple" />
          </div>
        </a>
        <hr className="bg-grey-light" style={{ height: "1px" }} />
      </React.Fragment>
    );
  }
}

export default Attachment;
