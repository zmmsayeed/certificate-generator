import React, {Component} from 'react';
import "./public-certificate.css";
import Certificate from "./../certificate/certificate";
import FirebaseService from "./../serivces/firebase-service";

var fs = new FirebaseService();

class PublicCertificate extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            course: null,
            username: "",
            usn: "",
            error: ""
        };


        this.generateCertificate = this.generateCertificate.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        fs.getCertificateData(params.certificateId).then((details)=>{
            this.setState({course: details.course, username: details.username, usn: details.usn, error: ""});
        }).catch((error)=>{
            this.setState({error: error});
        }); 
    }

    generateCertificate = () => {
        return (
            <Certificate course={this.state.course} userName={this.state.username} usn={this.state.usn}/>
        );
    }

    showError = () =>{
        return (
            <div className="public-certificate-error-body">
                <div className="public-certificate-error">
                    {this.state.error != "" ? this.state.error : ""}
                </div>
            </div>
        )
    }


    render() {
        return (
            <div> 
                {this.state.course ? this.generateCertificate() : this.showError()}
            </div>
        );
    }
}

export default PublicCertificate;