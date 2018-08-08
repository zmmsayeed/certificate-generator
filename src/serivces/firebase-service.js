import firebase from "firebase";
import DataService from "./data-store";

let ds = new DataService();

class FirebaseService {

    getUserCourses = () => {
        var promise = new Promise((resolve, reject) => {
            var userId = firebase.auth().currentUser.uid;

            firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                if (snapshot.val()) {
                    var cs = snapshot.val().courses;
                    var courseList = Object.keys(cs);

                    var list = [];

                    for (var x = 0; x < courseList.length; x++) {
                        list.push(cs[courseList[x]]);
                    }
                    resolve(list);
                } else {
                    resolve([]);
                }
            }).catch(error => {
                reject(error);
            });
        });

        return promise;
    }

    updateCourseWithCertificateIdForUser = (userId, courseId, certificateId) => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + userId + '/courses/' + courseId).update({
                certificate_id: certificateId
            }).then(() => {
                resolve(true);
            }).catch(error => {
                reject(false);
            });
        });
    }

    getUserProfile = () => {
        return new Promise((resolve, reject) => {
            var user = firebase.auth().currentUser;
            if (!user.displayName || user.displayName === "") {
                firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
                    if (snapshot.val() == null) {
                        reject("User data is not available");
                    } else {
                        var profile = {
                            username: snapshot.val().username,
                            usn: snapshot.val().usn
                        };
                        resolve(profile);
                    }
                }).catch(error => {
                    reject(error);
                });
            }
        });
    }

    getCertificateData = (certificateId) =>{
        return new Promise((resolve, reject)=>{
            firebase.database().ref('/certificates/' + certificateId).once('value').then((snapshot)=>{
                if(snapshot.val() == null) {
                    reject("Certificate not available");
                } else {
                    var details = {
                        course: {
                            _id: snapshot.val()._id,
                            name: snapshot.val().name,
                            date: snapshot.val().date,
                            type: snapshot.val().type,
                            fromdate: snapshot.val().fromdate,
                        },
                        username: snapshot.val().username,
                        usn: snapshot.val().usn
                    };
                    resolve(details);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default FirebaseService;