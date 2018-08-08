import React, { Component } from "react";
import "./certificate.css";
import logo from "./../assets/Saarthi-logo.png";

class Certificate extends Component {
    
    render() {
        return (
            <div className="card certificate-card">
                <div className="certificate-background-large"></div>
                <div className="certificate-background-small"></div>
                <img src={logo} className="certificate-logo" alt="saarthi logo"/>
                <div className="card-body">
                    <div className="certificate-achivement"><b>
                        <div>Certificate</div><div>of Achievement</div>
                        </b>
                    </div>
                    <div className="certificate-course-text">{this.props.course.name}</div>
                    <div className="certificate-certify-text">this is to certify that</div>
                    <div className="certificate-Name-text">{this.props.userName}</div>
                    {this.props.usn ? <div className="certificate-usn-text">{this.props.usn}</div>:<div></div>}
                    <p className="certificate-general-text">Has successfully completed and undergone an {this.props.course.type} program offered 
                    <br/>by <b>Saarthi Career </b>{this.props.course.fromdate ? "from " + this.props.course.fromdate + " to " + this.props.course.date:""}</p>

                    <div className="certificate-date-link">
                        <div>Date: {this.props.course.date}</div>
                        <div>{this.props.course.certificate_id}</div>
                    </div>
                    <div className="certificate-signature">
                        <div>Khushboo Murarka, Director</div>
                        <div>Your Career Navigator Pvt Ltd</div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Certificate;