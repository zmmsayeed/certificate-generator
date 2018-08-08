import React, {Component} from "react";
import "./course.css";

class Course extends Component {
    constructor(props){
        super(props);
        
        this.generateCertificate = this.generateCertificate.bind(this);
    }

    generateCertificate = () => {
        this.props.onCertificateGenerate(this.props.course);
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col course-text">
                        {this.props.course.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <a href="javascript:void(0)" onClick={() => this.generateCertificate()} className="btn btn-primary" >Generate Certificate</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col course-public-url">
                        {this.props.course.certificate_id ? "https://saarthi-test.firebaseapp.com/"+this.props.course.certificate_id : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;