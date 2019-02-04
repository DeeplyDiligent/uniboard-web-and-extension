import React, { Component } from "react";
import download from "../../download";


class OptionsMenu extends Component {
  state = {};
  startDownload = () => {
    download.startDownload(this.props.data,this.props.unitName);
  }
  render() {
    let hidden = this.props.hidden?"hidden":'';
    return (
      <div className = {"rounded overflow-hidden shadow absolute bg-white mt-2 "+hidden} style={{right:"-15px"}}>
        <div className = "p-2 text-xl" onClick={this.startDownload} >Download</div>
      </div> 
    );
  }
}

export default OptionsMenu;
