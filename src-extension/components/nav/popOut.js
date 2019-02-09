import React, { Component } from "react";
class PopOut extends Component {
  state = {};
  popOut = () =>{
    window.open('/index.html','_blank');
  }
  render() {
    return (
      <button
        onClick = {this.popOut}
        title="Pop Out"
        className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 border border-purple hover:border-transparent rounded text-xl ml-6"
      >
        <i className="fas fa-external-link-alt"></i>
      </button>
    );
  }
}

export default PopOut;
