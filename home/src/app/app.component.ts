import { Component } from '@angular/core';
import { collection, Firestore, doc, onSnapshot } from '@angular/fire/firestore';
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
    
    //I based this solution based on this code:
    // https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1
    // response from Michael de Soto (https://stackoverflow.com/users/4151208/michael-de-soto)
    //Somehow this works. I don't fully get why.
    // I guess part of it is it is based on the "Get a Document" section at https://firebase.google.com/docs/firestore/query-data/get-data
    constructor(firestore : Firestore) {
        this.myFirestore = firestore;
        setTimeout(this.beginListening.bind(this), 1000);
    }

    async beginListening() {
        //Listen to the user with the User ID TPgaEVy71RKUQgCNcrei
        const docRef = doc(this.myFirestore, "Users", "TPgaEVy71RKUQgCNcrei");
        this.unsubscribe = onSnapshot(docRef, (userDoc) => {
            console.log(userDoc.data());
        })
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
