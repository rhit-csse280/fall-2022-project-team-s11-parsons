const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/*
exports.executeOnPageLoad = functions.https.onCall((data, context) => {
    console.log("The page is loaded!");
    console.log(data);
    console.log(data.name);
    return 22;
});

exports.callMe = functions.https.onCall((data, context) => {
    console.log("Thanks for calling!");
    console.log(data);
    console.log(data.name);
    return 57;
});
*/

const fs = require("fs");
let database; // db.json stores the entire database of meeting requests
fs.readFile(__dirname + "/db.json", (err, data) => {
    database = JSON.parse(data.toString());
})

exports.formAMeeting = functions.firestore.document("/UsersWaitingForMeal/{userid}")
.onCreate((snap, context) => {
    // Get the data
    const myData = snap.data();
    let minutesAfterMidnight = (myData["hour"] % 12) * 60 + myData["minute"];
    if (myData["pm"]) {
        minutesAfterMidnight += 60 * 12;
    }
    // Because users cannot change their preferences once they submit
    // We know that any compatible matches must be with this new user.
    database.push({"totalMinutes" : minutesAfterMidnight, "location" : myData["location"], "username" : myData["username"], "userid" : myData["userid"]});
    
    // This should write back to the file.
    fs.writeFile(__dirname + "/db.json", JSON.stringify(myData));
});