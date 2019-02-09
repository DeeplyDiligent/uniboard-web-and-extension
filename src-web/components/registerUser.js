import React, { Component } from "react";
import * as firebase from "firebase/app";
import firebaseui from "firebaseui";

class RegisterUser extends Component {
  componentDidMount() {
    // Initialize the FirebaseUI Widget using Firebase.
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: 'select_account'
          }
        }
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
      // Other config options...
    });
  }
  componentWillUnmount() {
    this.ui.delete();
  }
  render() {
    // console.log(firebase);
    return (
      <div className="p-12 text-center">
        <div className="py-6 text-xl">
          After getting the extension, please Sign In with your Monash University Google Account Below:
        </div>
        <div id="firebaseui-auth-container" />
      </div>
    );
  }
}

export default RegisterUser;
