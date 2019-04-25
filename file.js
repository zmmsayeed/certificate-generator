var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqGAiZ4ClvA1HnPHeL9nKdlb4dQ-D3Vpw",
    authDomain: "certificate-generator-7911d.firebaseapp.com",
    databaseURL: "https://certificate-generator-7911d.firebaseio.com",
    projectId: "certificate-generator-7911d",
    storageBucket: "certificate-generator-7911d.appspot.com",
    messagingSenderId: "971330613453"
  };
  firebase.initializeApp(config);


var database = firebase.database();
console.log("Success");

function writeUserData(userId, name, email, usn, courses) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        usn: usn,
        courses: courses
    });
}

var courses = {
    "Course1": {
        "date" : "24-12-2019",
        "name" : "FS",
        "type" : "training"
    },
    "Course2": {
        "date" : "24-12-2019",
        "name" : "ML",
        "type" : "training"
    }
}

writeUserData("bTvIo6kdRyRzJhTwUReQMmxdzD72", "Mohammad Khan", "zmmsayeed1@gmail.com", "1DT15CS080", courses);