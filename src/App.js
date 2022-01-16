import React from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
      apiKey: "AIzaSyAEAoBpFCDspyicISCwf6AJpEtfaSqXPlQ",
      authDomain: "fir-auth-2889f.firebaseapp.com"
    })

class App extends React.Component {
  state = {
    isSignedIn: false
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log(this.state);
    })
  }

  render() {

    return (
      <div className="App">
        {
          this.state.isSignedIn ? (
            <span>
              <div>Signed In!</div>
              <button  onClick={() => firebase.auth().signOut()}>Sign Out!</button>
              <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
              <img className='signIn-logo' src={firebase.auth().currentUser.photoURL} alt="profile picture" />
            </span>
          ) : (
            <div>
            <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
                />
                </div>
          )
        }
      </div>
    );
  }
}

export default App;
