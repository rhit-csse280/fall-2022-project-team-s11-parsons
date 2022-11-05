import { Component, OnInit } from '@angular/core';
import 'rosefire';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    afAuth : AngularFireAuth;
    constructor(afAuth : AngularFireAuth) {
        this.afAuth = afAuth;
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
                this.afAuth.auth().signInWithCustomToken(rfUser.token);
            }
        });
    }
}
