import { Component } from '@angular/core';
import { collection, Firestore, doc, onSnapshot, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
    hour: number,
    minute: number,
    pm: boolean,
    preferredLocation: string,
    username: string,
    xCoordinate: number,
    yCoordinate: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : string = 'Meal Meetings';
    myFirestore : any; // used to represent the firestore object.
    unsubscribe: any;
    userData: any;
    docRef : any;
    
    //I based this solution based on this code:
    // https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1
    // response from Michael de Soto (https://stackoverflow.com/users/4151208/michael-de-soto)
    //Somehow this works. I don't fully get why.
    // I guess part of it is it is based on the "Get a Document" section at https://firebase.google.com/docs/firestore/query-data/get-data
    constructor(firestore : Firestore) {
        this.myFirestore = firestore;
        //If the username is known, create a document reference and begin listening immediately.
        const username : string = this.getUsername() || "";
        if (username) {
            this.docRef = doc(this.myFirestore, "Users", username);
            this.beginListening();
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
        
        //Try to create a document snapshot of the document for this user.
        this.docRef = doc(this.myFirestore, "Users", username);
        const docSnap = await getDoc(this.docRef);
        
        //Account Found
        if (docSnap.exists()) {
            // If the data is not filled out or the user token does not match the username, do nothing.
            if (username === "ANONYMOUS" || usertoken === "NONE") {
                alert("You need to login with Rosefire");
                return;
            }
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
    async beginListening() {
        // Listen to the user with our username
        // Eventually, this needs to be set to the username for the specific person.
        // This comes later.
        this.unsubscribe = onSnapshot(this.docRef, (userDoc : any) => {
            // Captures updates from the server in real time.
            this.userData = userDoc.data();
            console.log(this.userData);
            this.putDataIntoStorage();
        });
    }

    // Used to store the relevant fields of data into session storage.
    // This is useful because this object can be distributed and modified.
    putDataIntoStorage() {
        sessionStorage.setItem("userdata", JSON.stringify(this.userData));

        // Now click several invisible buttons to tell any components on the page to update.
        const buttonIDs = ["updateProfileContainer", "updateSetupContainer"];
        for (const buttonID of buttonIDs) {
            console.log(buttonID);
            document.getElementById(buttonID)?.click();
        }
    }

    // Used to retrieve the relevant fields of data from storage.
    getDataFromStorage() {
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

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
