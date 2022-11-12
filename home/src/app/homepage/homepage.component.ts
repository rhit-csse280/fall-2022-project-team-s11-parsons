import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/*
These provided lines may throw an error. I used

to get it to work, but here are other sources.

 https://github.com/angular/angularfire/
https://ada.csse.rose-hulman.edu/rosefire/javascript-sdk
https://stackoverflow.com/questions/60455433/property-auth-does-not-exist-on-type-angularfireauth
https://github.com/angular/angularfire/issues/2409#issuecomment-615993136
https://github.com/squireaj/angularFireAuth
https://www.npmjs.com/package/@angular/fire
https://github.com/IdanCo/angularfire2
https://stackoverflow.com/questions/66252333/error-nullinjectorerror-r3injectorerrorappmodule
https://stackoverflow.com/questions/51656933/angular-6-and-firebase-angularfireauth
https://stackoverflow.com/questions/55241779/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options

*/

import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'rosefire';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    constructor(private afAuth : AngularFireAuth) { }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    // sign in or sign up using Rosefire
    rosefireSignIn() : void {
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            } else {
                // Use the token to authenticate with your server
                // checkout the server SDKs for more information.
                console.log(rfUser);
                // Ensure that the correct users are allowed.
                if (rfUser.username === "scrivner") {
                    alert("You are allowed to use this for demo purposes only. This app is intended for students.");
                } else if (rfUser.group !== "OTHER") {
                    alert("Your Rosefire token suggests that you are not a student. This app is only for students. Please email josephcpar@gmail.com if this is a mistake.");
                    return;
                }
                //Set the username appropriately.
                sessionStorage.setItem("username", rfUser.username);
                sessionStorage.setItem("usertoken", rfUser.token);
                //Redirect to the appropriate page.
                const uselessButtonLogin : HTMLElement | null = document.getElementById("uselessButtonLogin");
                if (uselessButtonLogin) {
                    uselessButtonLogin.click();
                }
                console.log("Waiting for a redirect...");
            }
            this.afAuth.signInWithCustomToken(rfUser.token);
        });
    }
}
