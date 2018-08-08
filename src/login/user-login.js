import React, { Component } from "react";
import "./user-login.css";
import logo from "./../assets/Saarthi-logo.png";
import firebase from "firebase";
import DataService from "./../serivces/data-store";

var ds = new DataService();

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        };

        this.onLoginButtonClicked = this.onLoginButtonClicked.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    onLoginButtonClicked = () => {
        var self = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(data=>{;
            ds.setCurrentUser(data.user);
        }).catch((error)=> {
            let email = self.state.email;
            let password = self.state.password;
            self.setState({
                email: email,
                password: password,
                error: error.message
            });
        });
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value, error: "" });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value, error:"" });
    }

    render() {
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-sm-12 col-md-8">
                        <div className="card login-card">
                            <div className="card-body">
                                <img src={logo} className="img-fluid login-logo-image" alt="saarthi logo"></img>
                                <div className="login-form">
                                    <div className="form-group">
                                        <label htmlFor="emailInput">Email address</label>
                                        <input type="email" className="form-control" id="emailInput"
                                            placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordInput">Password</label>
                                        <input type="password" className="form-control" id="passwordInput"
                                            placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                                    </div>
                                    <button onClick={this.onLoginButtonClicked} className="btn btn-primary login-btn">Login</button>
                                    <div className="login-error">{this.state.error ? this.state.error : ""}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default UserLogin;