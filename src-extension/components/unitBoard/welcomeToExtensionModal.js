import React, { Component } from "react";
import Modal from "react-responsive-modal";
/*global chrome*/
class WelcomeToExtensionModal extends Component {
  state = {
    open: true,
    modalToOpen:localStorage.getItem('modalToOpen'),
    version: localStorage.getItem('version')
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    let WelcomeModal = (
      <Modal open={open} onClose={this.onCloseModal} center>
        <h2 className="pb-3 pr-10">Welcome to UniBoard!</h2>
        <p className="py-3 text-lg">Hi everyone! Thanks for using this extension.</p>
        <p className="py-3 text-lg">
          This is Deep, one of the main developers at UniBoard. We love making
          new user experiences. If you do have any feedback, please do let us
          know on our website here:{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://uniboard.app/about">https://uniboard.app/about</a>
        </p>
        <button
          onClick={this.onCloseModal}
          className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 mt-3 border border-purple hover:border-transparent rounded text-xl mx-auto block"
        >
          <div className="text-center">Close</div>
        </button>
      </Modal>
    );
    let OnUpgrade = (
      <Modal open={open} onClose={this.onCloseModal} center>
        <h2 className="pb-3 pr-10">Welcome to UniBoard version {this.state.version}!</h2>
        <p className="py-3 text-lg">The main changes in this version are</p>
        <div className="py-3 text-lg">
          - Dont see a unit is now an faq <br />
        </div>
        <button
          onClick={this.onCloseModal}
          className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 mt-3 border border-purple hover:border-transparent rounded text-xl mx-auto block"
        >
          <div className="text-center">Close</div>
        </button>
      </Modal>
    );
    localStorage.setItem('modalToOpen', '')
    localStorage.setItem('version', '')
    if(this.state.modalToOpen === 'welcome') {
        return WelcomeModal;
    } else if (this.state.modalToOpen ==='update') {
        return OnUpgrade;
    }
    return false;
  }
}

export default WelcomeToExtensionModal;
