import React, { Component } from 'react';

import UserLogin from "./../login/user-login";
import './App.css';
import DataService from "./../serivces/data-store";
import HomePage from "./../homepage/home-page";

import firebase from "firebase";

var config = {
    apiKey: "AIzaSyBp3l22NGr96ntSzdUrYnZiTx3tIHnwWEI",
    authDomain: "saarthi-test.firebaseapp.com",
    databaseURL: "https://saarthi-test.firebaseio.com",
    projectId: "saarthi-test",
    storageBucket: "saarthi-test.appspot.com",
    messagingSenderId: "903078944289"
};
firebase.initializeApp(config);

  


var ds = new DataService();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: firebase.auth().currentUser
    };

    this.homePage = this.homePage.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.setUser = this.setUser.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      });
    });
    
    ds.setAppCallback(this.setUser);
  }
  
  setUser= (user) => {
    this.setState({
      currentUser: user
    });
  }

  loginPage = () => {
    return (
      <div className="App-intro">
        <UserLogin />
      </div>
    );
  }
  homePage = () => {
    return (
      <HomePage />
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.currentUser ? this.homePage() : this.loginPage()}
      </div>
    );
  }
}

export default App;
