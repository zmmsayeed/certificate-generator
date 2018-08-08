import React, { Component } from "react";
import "./home-page.css";
import DataSerivce from "./../serivces/data-store";
import ReactToPrint from "react-to-print";
import Certificate from "./../certificate/certificate";
import Course from "./../course/course";
import FirebaseService from "./../serivces/firebase-service";
import firebase from "firebase";

var uuidv1 = require('uuid/v1');

var ds = new DataSerivce();
var fbs = new FirebaseService();

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            usn: "",
            courses: [],
            currentCourse: {},
            error: ""
        };

        this.createCourses = this.createCourses.bind(this);
        this.generateCertificateForCourse = this.generateCertificateForCourse.bind(this);
        this.renderHomePage = this.renderHomePage.bind(this);
        this.signOut = this.signOut.bind(this);

        fbs.getUserCourses().then(data => {
            this.setState({
                courses: data,
                currentCourse: this.state.currentCourse,
                userName: this.state.userName,
                usn: this.state.usn
            });
        }).catch(error => {
            this.setState({
                error: error
            });
        });

        fbs.getUserProfile().then(profile => {
            this.setState({
                courses: this.state.courses,
                currentCourse: this.state.currentCourse,
                userName: profile.username,
                usn: profile.usn
            })
        }).catch(error => {
            this.setState({
                error: error
            })
        });
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            ds.setCurrentUser(null);
        }).catch(() => {

        });
    }

    createCourses = () => {
        let list = this.state.courses.map(course => {
            return (
                <li className="list-group-item" key={course._id}>
                    <Course course={course} onCertificateGenerate={this.generateCertificateForCourse} key={course.Name} />
                </li>
            );
        });
        return (list);
    }

    generateCertificateForCourse = (course) => {
        if (!course.certificate_id || course.certificate_id === "") {
            course.certificate_id = uuidv1();

            fbs.updateCourseWithCertificateIdForUser(
                ds.getCurrentUser().uid, course._id, course.certificate_id).then(() => {
                    this.setState({
                        courses: this.state.courses,
                        currentCourse: course
                    })
                }).catch(() => {
                    console.log("unable to add the certificate id in database");
                });
        } else {
            this.setState({
                courses: this.state.courses,
                currentCourse: course
            })
        }

        
    }

    renderHomePage() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card homepage-course-list">
                            <div className="card-header course-list-header">
                                <b>Courses</b>
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.createCourses()}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {this.state.currentCourse && Object.keys(this.state.currentCourse).length !== 0 ?
                            (
                                <div>
                                    <ReactToPrint
                                        trigger={() => <a href="javascript:void(0)">Print this out!</a>}
                                        content={() => this.componentRef}
                                    />
                                    <Certificate userName={this.state.userName} course={this.state.currentCourse} usn={this.state.usn} ref={el => (this.componentRef = el)} />
                                </div>
                            ) :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <a href="javascript:void(0)" onClick={this.signOut} className="logout">Log out</a>
                {!this.state.error && this.state.error === "" ? this.renderHomePage() : <div className="error-message">{this.state.error}</div>}
            </div>
        );
    }
}

export default HomePage;