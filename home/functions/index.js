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
    // This should write back to the file.
    fs.writeFile(__dirname + "/db.json", "Test", (err) => {
        console.log(err);
    });

    // Get the data
    const myData = snap.data();
    let minutesAfterMidnight = (myData["hour"] % 12) * 60 + myData["minute"];
    if (myData["pm"]) {
        minutesAfterMidnight += 60 * 12;
    }
    // Because users cannot change their preferences once they submit
    // We know that any compatible matches must be with this new user.
    const newElement = {"totalMinutes" : minutesAfterMidnight, "location" : myData["location"], "username" : myData["username"], "userid" : myData["userid"]};
    console.log(newElement);
    database.push(newElement);
    
    // Figure out which users are close enough to form a match.
    let lowestDifferenceScore = 120.5;
    let bestIndex = -1;
    let matchUserData = null;
    for (let i = 0; i < database.length - 1; i++) {
        const myElement = database[i];
        let timeDifference = myElement["totalMinutes"] - newElement["totalMinutes"];
        if (timeDifference < 0) {
            timeDifference = -timeDifference;
        }
        if (timeDifference < 12 * 60) {
            timeDifference = 24 * 60 - timeDifference;
        }
        const locationDifference = (myElement["location"] == newElement["location"]) ? 0 : 60;
        const totalDifference = timeDifference + locationDifference;
        console.log(totalDifference);
        if (timeDifference < lowestDifferenceScore) {
            bestIndex = i;
            lowestDifferenceScore = timeDifference;
            matchUserData = myElement;
        }
    }

    if (bestIndex != -1) {
        console.log("Found a match!");
        const minutesAfterMidnight = matchUserData["totalMinutes"];
        const otherMinute = minutesAfterMidnight % 60;
        const otherHour = (minutesAfterMidnight - otherMinute) / 60;
        const otherPM = (otherHour >= 12);
        if (otherPM) {
            otherHour -= 12;
            if (otherHour == 0) {
                otherHour = 12;
            }
        }
        const newObject = {
            "hourA" : Number(myData["hour"]),
            "minuteA" : Number(myData["minute"]),
            "pmA" : String(myData["pm"]) == "true",
            "locationA" : String(myData["location"]),
            "hourB" : otherHour,
            "minuteB" : otherMinute,
            "pmB" : otherPM,
            "locationB" : myData["location"],
            "user1" : myData["username"],
            "user2" : myElement["username"],
            "status" : "DEFAULT"
        };
        const user1ID = database[bestIndex]["userid"];
        const user2ID = database[bestIndex]["userid"];
        database.splice(bestIndex, 1);
        database.pop();
    } else {
        console.log("No available matches");
    }

    // This should write back to the file.
    fs.writeFile(__dirname + "/db.json", JSON.stringify(myData), (err) => {
        console.log(err);
    });
});