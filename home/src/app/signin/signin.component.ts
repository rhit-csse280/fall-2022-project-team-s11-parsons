import { Component, OnInit } from '@angular/core';
import 'rosefire';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    rosefireSignIn() {
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            } else {
                // Use the token to authenticate with your server
                // checkout the server SDKs for more information.
                console.log(rfUser);
            }
        });

    }
}
