import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'rosefire';

/*
    The setup code for this component was non-trivial. Some sources I used were:
    https://github.com/angular/angularfire/
    https://ada.csse.rose-hulman.edu/rosefire/javascript-sdk
    https://stackoverflow.com/questions/60455433/property-auth-does-not-exist-on-type-angularfireauth
    
    Other sources I saw were:
    https://github.com/angular/angularfire/issues/2409#issuecomment-615993136
    https://github.com/squireaj/angularFireAuth
    https://www.npmjs.com/package/@angular/fire
    https://github.com/IdanCo/angularfire2
    https://stackoverflow.com/questions/66252333/error-nullinjectorerror-r3injectorerrorappmodule
    https://stackoverflow.com/questions/51656933/angular-6-and-firebase-angularfireauth
    https://stackoverflow.com/questions/55241779/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options
    
    Note each source references subpages or related pages which might have been used.
*/

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(public afAuth : AngularFireAuth) { }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    sendSignInData(emailValue: string, passwordValue: string) {
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            }
            console.log(rfUser);
            this.afAuth.signInWithCustomToken(rfUser.token);
        });


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
    }
}
