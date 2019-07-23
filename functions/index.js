const functions = require('firebase-functions');


var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swu-attends.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.test = functions.https.onRequest((req, res) => {
    // Grab the parameter named "text".
    // const original = req.query.text;
    console.log('test Called')
    return admin.database().ref('Courses/-LilWkqoSN4ytIauvrwE/summary/studentsList').once('value').then(function(snapshot) {
        console.log('fn Called: ', snapshot.val())
        res.send(snapshot.val())
        // ...
      });

    console.log("test Finished")
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });
