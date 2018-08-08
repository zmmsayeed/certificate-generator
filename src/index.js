import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
// import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import PublicCertificate from "./public-certificate/public-certificate";
        
ReactDOM.render(
    <Router>
       <div>
        <Route exact path="/" component={App} />
        <Route path="/:certificateId" component={PublicCertificate} />                                                                    
       </div>
    </Router>, document.getElementById('root')
);
// registerServiceWorker();
