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
        "name" : "Full Stack Web Development",
        "type" : "training"
    },
    "Course2": {
        "date" : "24-12-2019",
        "name" : "Machine Learning",
        "type" : "training"
    }
}

writeUserData("0Y4Gn79GxiOSH4l3cr1NdMlBKwG2", "Rafa Zamier", "rafazamier1@gmail.com", "1DT15CS088", courses);