import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item {
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
    usersCollection: AngularFirestoreCollection<Item> | null = null;
    users: Observable<Item[]> | null = null;
    constructor(afs: AngularFirestore) {
        this.usersCollection = afs.collection<Item>('Users');
        this.users = this.usersCollection.valueChanges();
        console.log(this.usersCollection);
        console.log(this.users);
    }
    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getUsername() : string | null {
        return sessionStorage.getItem("username");
    }
}
