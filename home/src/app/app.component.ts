import { Component } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
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
    docRef : any; // short for document reference
    docSnap : any; // short for document snapshot
    myFirestore : any; // used to represent the firestore object.
    constructor(firestore : Firestore) {
        this.myFirestore = firestore;
        this.docRef = doc(this.myFirestore, "Users", "TPgaEVy71RKUQgCNcrei");
        getDoc(this.docRef).then((result) => {
            this.docSnap = result;
            console.log("Welcome to Meal Meetings!");
        }).catch((err) => {
            console.error("Could not complete initialization because of ", err);
        })
    }

    //I based this solution based on this code:
    // https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1
    // response from Michael de Soto (https://stackoverflow.com/users/4151208/michael-de-soto)
    //Somehow this works. I don't fully get why.
    async initializer() {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
