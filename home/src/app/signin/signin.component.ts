import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'rosefire';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    /*
    The setup code for this component was non-trivial. Some sources I used were:
    https://github.com/angular/angularfire/ and subpages
    https://ada.csse.rose-hulman.edu/rosefire/javascript-sdk and subpages
    https://github.com/angular/angularfire/issues/2409#issuecomment-615993136

    Other sources I saw were:
    https://stackoverflow.com/questions/51656933/angular-6-and-firebase-angularfireauth
    https://github.com/angular/angularfire/issues/2409#issuecomment-615993136

    */
    myAfAuth : AngularFireAuth;
    constructor(public afAuth : AngularFireAuth) {
        this.myAfAuth = afAuth;
    }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    sendSignInData(emailValue: string, passwordValue: string) {
        /*
        let currentAccounts : string | null = sessionStorage.getItem("person");
        if (!currentAccounts) {
            currentAccounts = "";
        }
        const accounts : string[] = currentAccounts.split("\n");
        for (const account of accounts) {
            if (account === "") {
                //Ignore blank lines
                continue;
            }
            const accountProperties : string[] = account.split(",");
            const username = accountProperties[0];
            const email = accountProperties[1];
            const password = accountProperties[2];
            if (email === emailValue && password === passwordValue) {
                sessionStorage.setItem("username", username);
                document.location.href = "/info";
                return 0;
            }
        }
        return -1;
        */
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            } else {
                // Use the token to authenticate with your server
                // checkout the server SDKs for more information.
                console.log(rfUser);
                this.myAfAuth.signInWithCustomToken(rfUser.token);
            }
        });
    }
}
