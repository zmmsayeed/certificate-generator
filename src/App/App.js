import React, { Component } from 'react';

import UserLogin from "./../login/user-login";
import './App.css';
import DataService from "./../serivces/data-store";
import HomePage from "./../homepage/home-page";

import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDqGAiZ4ClvA1HnPHeL9nKdlb4dQ-D3Vpw",
  authDomain: "certificate-generator-7911d.firebaseapp.com",
  databaseURL: "https://certificate-generator-7911d.firebaseio.com",
  projectId: "certificate-generator-7911d",
  storageBucket: "certificate-generator-7911d.appspot.com",
  messagingSenderId: "971330613453"
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
