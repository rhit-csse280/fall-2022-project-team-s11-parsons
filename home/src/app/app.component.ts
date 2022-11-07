import { Component } from '@angular/core';
import { collection, Firestore, doc, onSnapshot, updateDoc, setDoc } from '@angular/fire/firestore';
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
        setTimeout(this.beginListening.bind(this), 1000);
    }

    // Used for constantly listening to the database.
    async beginListening() {
        //Listen to the user with the User ID TPgaEVy71RKUQgCNcrei
        this.docRef = doc(this.myFirestore, "Users", "TPgaEVy71RKUQgCNcrei");
        this.unsubscribe = onSnapshot(this.docRef, (userDoc : any) => {
            this.userData = userDoc.data();
            console.log(this.userData);
            this.putDataIntoStorage();
        })
        // Every 0.1 seconds, send whatever data we have locally to the server.
        setInterval(this.sendDataToStorage.bind(this), 100);
    }

    // Used to store the relevant fields of data into storage.
    putDataIntoStorage() {
        sessionStorage.setItem("userdata", JSON.stringify(this.userData));
    }

    // Used to retrieve the relevant fields of data from storage.
    getDataFromStorage() {
        const storageData : string | null = sessionStorage.getItem("userdata");
        if (storageData) {
            this.userData = JSON.parse(storageData);
        }
    }

    // Set the entire data object on the server equal to what is currently in session storage.
    sendDataToStorage() {
        setDoc(this.docRef, JSON.parse(sessionStorage.getItem("userdata") || "{}"));
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
