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