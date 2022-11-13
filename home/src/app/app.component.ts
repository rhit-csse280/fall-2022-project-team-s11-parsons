import { Component } from '@angular/core';
import { collection, Firestore, doc, onSnapshot, updateDoc, setDoc, getDoc, DocumentReference, CollectionReference, QueryDocumentSnapshot, DocumentSnapshot, deleteDoc } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : string = 'Meal Meetings';
    myFirestore : Firestore; // used to represent the firestore object.
    unsubscribe: any;
    userData: object | undefined;
    docRef : DocumentReference | undefined;
    meetingDocRef : DocumentReference | undefined;
    meetingsRef : CollectionReference | undefined;
    meetingsUnsubscribe : any;
    data$ : any;
    functions : AngularFireFunctions;
    
    callMe() {
        console.log("Calling...");
        const callable = this.functions.httpsCallable("callMe");
        this.data$ = callable({name: "Ada Lovelace"});
    }

    //I based this solution based on this code:
    // https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1
    // response from Michael de Soto (https://stackoverflow.com/users/4151208/michael-de-soto)
    //Somehow this works. I don't fully get why.
    // I guess part of it is it is based on the "Get a Document" section at https://firebase.google.com/docs/firestore/query-data/get-data
    constructor(firestore : Firestore, fns: AngularFireFunctions) {
        this.functions = fns;
        const callable = fns.httpsCallable("executeOnPageLoad");
        this.data$ = callable({name: "Charles Babbage"});

        /*
        this.data$.subscribe({
            next(i : any) { console.log(i); }
        })
        setInterval(() => {
            console.log(this.data$);
            console.log(typeof(this.data$));
        }, 1000);*/

        // Sets the colors
        const colors = [
            { name: "Sugar Hearts You", hex: "#FE4365" },
            { name: "Party Confetti", hex: "#FC9D9A" },
            { name: "Sugar Champagne", hex: "#F9CDAD" },
            { name: "Bursts of Euphoria", hex: "#C8C8A9" },
            { name: "Happy Balloons", hex: "#83AF9B" }
        ];
        for (const color of colors) {
            sessionStorage.setItem(color.name, color.hex);
        }
        this.myFirestore = firestore;
        //If the username is known, create a document reference and begin listening immediately.
        const username : string = this.getUsername() || "";
        if (username) {
            this.docRef = doc(this.myFirestore, "Users", username);
            this.beginListening();
            this.beginMeetingListening();
        }
    }

    // Tell the server that we want to be in a meeting.
    requestMeeting() {
        const myInfo = sessionStorage.getItem("userdata");
        if (myInfo) {
            const tmpDocRef = doc(this.myFirestore, "UsersWaitingForMeal", this.getUsername() || "ANONYMOUS");
            setDoc(tmpDocRef, JSON.parse(myInfo));
        }
    }

    // Determine whether an account exists or not.
    // If an account already exists, then go to the Profile page.
    // If an account does not exist yet, then go to the Terms of Service page.
    async createAccountIfNecessary() {
        console.log("I'm trying to figure out if you need an account or not.");

        // Determine what the username and usertoken stored in session storage are.
        const username : string = this.getUsername() || "ANONYMOUS";
        const usertoken : string = sessionStorage.getItem("usertoken") || "NONE";

        // Only advance if the username and usertoken are valid.
        if (username == "ANONYMOUS" || usertoken == "NONE") {
            return;
        }
        
        //Try to create a document snapshot of the document for this user.
        this.docRef = doc(this.myFirestore, "Users", username);
        const docSnap : DocumentSnapshot = await getDoc(this.docRef);
        
        //Account Found
        if (docSnap.exists()) {
            console.log("Account Already Exists");
            //Otherwise, listen for changes to the user object and direct us to the profile page.
            this.beginListening();
            window.location.href = "/profile";
        } else {
            // Create a new object with this base object and user token.
            // A huge security flaw is that someone could pretend to be anyone else by simply
            // choosing a username and user token.
            // This issue should be addressed, but is ignored for now.
            console.log("A new account should be created");
            const baseObject = {
                "username" : usertoken.substring(0, 10),
            }
            // Create the user and go to setup.
            await setDoc(this.docRef, baseObject);
            window.location.href = '/setup';
        }
    }

    // Used for constantly listening to the database.
    beginListening() {
        // Listen to the user with our username
        // Eventually, this needs to be set to the username for the specific person.
        // This comes later.
        this.unsubscribe = onSnapshot((this.docRef as DocumentReference), (userDoc : any) => {
            // Captures updates from the server in real time.
            this.userData = userDoc.data();
            console.log(this.userData);
            this.putDataIntoStorage();
        });
    }

    

    //Set up a listener to listen for meetings that have been set up.
    beginMeetingListening() {
        this.meetingDocRef = undefined;
        this.meetingsRef = collection(this.myFirestore, "Meeting");
        this.meetingsUnsubscribe = onSnapshot(this.meetingsRef, (querySnapshot) => {
            querySnapshot.forEach((doc1 : QueryDocumentSnapshot) => {
                const meetingInfo = {
                    "hourA" : parseInt(doc1.get("hourA")),
                    "hourB" : parseInt(doc1.get("hourB")),
                    "locationA" : doc1.get("locationA"),
                    "locationB" : doc1.get("locationB"),
                    "minuteA" : parseInt(doc1.get("minuteA")),
                    "minuteB" : parseInt(doc1.get("minuteB")),
                    "pmA" : String(doc1.get("pmA")) == "true",
                    "pmB" : String(doc1.get("pmB")) == "true",
                    "status" : doc1.get("status"),
                    "user1" : doc1.get("user1"),
                    "user2" : doc1.get("user2")
                }
                let userNumber : number = 0;
                // Determine if we are in this meeting, and if so, which user we are.
                if (this.getUsername() == meetingInfo["user1"]) {
                    userNumber = 1;
                } else if (this.getUsername() == meetingInfo["user2"]) {
                    userNumber = 2;
                }
                if (userNumber > 0) {
                    this.meetingDocRef = doc(this.myFirestore, "Meeting", String(doc1.id));
                    if (meetingInfo["status"] != "SUCCESS" && meetingInfo["status"] != "FAILURE") {
                        sessionStorage.setItem("meetingdata", JSON.stringify(meetingInfo));
                        sessionStorage.setItem("usernumber", JSON.stringify(userNumber));
                        this.putDataIntoStorage();
                    } else {
                        this.requestMeeting();
                    }
                }
            });
        });
        // Once a meeting is over, clear it from our session storage.
        if (!this.meetingDocRef) {
            sessionStorage.setItem("meetingdata", "{}")
            sessionStorage.setItem("usernumber", "0");
        }
    }

    // Used to store the relevant fields of data into session storage.
    // This is useful because this object can be distributed and modified.
    putDataIntoStorage() {
        sessionStorage.setItem("userdata", JSON.stringify(this.userData));

        // Now click several invisible buttons to tell any components on the page to update.
        const buttonIDs : readonly string[] = ["updateProfileContainer", "updateSetupContainer", "updateConfirmedContainer", "updateMeeting"];
        for (const buttonID of buttonIDs) {
            console.log(buttonID);
            const myButton : HTMLElement | null = document.getElementById(buttonID);
            if (myButton) {
                myButton.click();
            }
        }
    }

    // Used to retrieve the relevant fields of data from storage.
    getDataFromStorage() : void {
        const storageData : string = sessionStorage.getItem("userdata") || "{}";
        this.userData = JSON.parse(storageData);
    }

    // Set the entire data object on the server equal to what is currently in session storage.
    sendDataToServer() {
        // We don't want to send empty data from before the server can send us data.
        const ourData : string = sessionStorage.getItem("userdata") || "";
        if (ourData && this.docRef) {
            setDoc(this.docRef, JSON.parse(ourData));
        }
    }

    // This determines what the new meeting state should be and sends it to the server.
    sendMeetingDataToServer() {
        const buttonPressed = document.getElementById("uselessButtonMeetingUpdate");
        if (buttonPressed) {
            const buttonPressedName : string = buttonPressed.innerHTML;
            const ourData : string = sessionStorage.getItem("meetingdata") || "";
            const ourDataObject = JSON.parse(ourData);
            const ourUserNumber : number = Number(sessionStorage.getItem("usernumber"));
            if (ourDataObject) {
                const meetingStatus = ourDataObject["status"];
                let newMeetingStatus = meetingStatus;
                if (meetingStatus == "DEFAULT") {
                    if (buttonPressedName == "Accept") {
                        if (ourUserNumber == 1) {
                            newMeetingStatus = "1ACC2";
                        } else {
                            newMeetingStatus = "2ACC1";
                        }
                    } else if (buttonPressedName == "Decline") {
                        newMeetingStatus = "NOT2";
                    }
                } else if (meetingStatus == "1ACC2") {
                    if (buttonPressedName == "Cancel" || buttonPressedName == "Decline") {
                        newMeetingStatus = "NOT2";
                    } else if (buttonPressedName == "Accept") {
                        newMeetingStatus = "12ACC2";
                    }
                } else if (meetingStatus == "2ACC1") {
                    if (buttonPressedName == "Cancel" || buttonPressedName == "Decline") {
                        newMeetingStatus = "NOT2";
                    } else if (buttonPressedName == "Accept") {
                        newMeetingStatus = "12ACC1";
                    }
                } else if (meetingStatus == "NOT2") {
                    if (buttonPressedName == "Accept") {
                        newMeetingStatus = "NOT2-" + ourUserNumber + "ACC1";
                    } else if (buttonPressedName == "Decline") {
                        newMeetingStatus = "FAILURE";
                    }
                } else if (meetingStatus == "NOT1") {
                    if (buttonPressedName == "Accept") {
                        newMeetingStatus = "NOT1-" + ourUserNumber + "ACC2";
                    } else if (buttonPressedName == "Decline") {
                        newMeetingStatus = "FAILURE";
                    }
                } else if (meetingStatus == "12ACC2") {
                    if (buttonPressedName == "Cancel") {
                        newMeetingStatus = "NOT2";
                    } else if (buttonPressedName == "Complete") {
                        newMeetingStatus = "SUCCESS";
                    }
                } else if (meetingStatus == "12ACC1") {
                    if (buttonPressedName == "Cancel") {
                        newMeetingStatus = "NOT1";
                    } else if (buttonPressedName == "Complete") {
                        newMeetingStatus = "SUCCESS";
                    }
                } else if (meetingStatus == "NOT2-1ACC1" || meetingStatus == "NOT2-2ACC1") {
                    if (buttonPressedName == "Cancel" || buttonPressedName == "Decline") {
                        newMeetingStatus = "FAILURE";
                    } else if (buttonPressedName == "Accept") {
                        newMeetingStatus = "NOT2-12ACC1";
                    }
                } else if (meetingStatus == "NOT1-1ACC2" || meetingStatus == "NOT1-2ACC2") {
                    if (buttonPressedName == "Cancel" || buttonPressedName == "Decline") {
                        newMeetingStatus = "FAILURE";
                    } else if (buttonPressedName == "Accept") {
                        newMeetingStatus = "NOT2-12ACC2";
                    }
                } else if (meetingStatus == "NOT2-12ACC1" || meetingStatus == "NOT2-12ACC2") {
                    if (buttonPressedName == "Cancel") {
                        newMeetingStatus = "FAILURE";
                    }
                }
                ourDataObject["status"] = newMeetingStatus;
                if (this.meetingDocRef) {
                    setDoc(this.meetingDocRef, ourDataObject);
                }
            }
        }
    }

    // This tells the server to delete our account.
    requestAccountDeletion() {
        if (this.docRef) {
            deleteDoc(this.docRef);
        }
        if (this.meetingDocRef) {
            deleteDoc(this.meetingDocRef);
        }
    }
    
    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
