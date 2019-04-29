var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLn7SLoHSdqgwOHiEqME6J_YviE-4LYgo",
    authDomain: "some-project-8ade1.firebaseapp.com",
    databaseURL: "https://some-project-8ade1.firebaseio.com",
    projectId: "some-project-8ade1",
    storageBucket: "some-project-8ade1.appspot.com",
    messagingSenderId: "532452740365"
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

writeUserData("0Y4Gn79GxiOSH4l3cr1NdMlBKwG2", "Zimam", "zmmsayeed@gmail.com", "1DT15CS127", courses);