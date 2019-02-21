import React, { Component } from "react";
import Modal from "react-responsive-modal";
class CheckLoginOnWebModal extends Component {
  state = {
    open: true
  };
  constructor(props){
    super(props)
    this.state.open = true;
    if (localStorage.getItem('loginremindermodal') ==='dontshow'){
      this.state.open = false;
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  
  dontShowAgain = () => {
    localStorage.setItem('loginremindermodal','dontshow')
    this.setState({open:false})
  }

  render() {
    const { open } = this.state;
    return (
      <Modal open={open} onClose={this.onCloseModal} center>
        <h2 className="py-3">Login Notice!</h2>
        <p className="py-3">
          Hi everyone! Thanks for using the web/mobile version of the extension.
        </p>
        <p className="py-3">
          Some of the moodle links may not work without logging in. If you are
          not logged in, Please use the button below to log in, and come back to
          this page. If you are already logged in, close this popup!
        </p>
        <a
          href="https://lms.monash.edu/my/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <button className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 border border-purple hover:border-transparent rounded text-xl m-auto block">
            <div className="py-3 text-center">
              <i className="fas fa-external-link-alt text-2xl text-center" />
              <p className="pt-2 ">Click Here</p>
            </div>
          </button>
        </a>
        <button
          onClick={this.dontShowAgain}
          className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 mt-3 border border-purple hover:border-transparent rounded text-xl mx-auto block"
        >
          <div className="text-center">Don't Show Again</div>
        </button>
      </Modal>
    );
  }
}

export default CheckLoginOnWebModal;
