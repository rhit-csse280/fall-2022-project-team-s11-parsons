import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    // Generates a random username with the given length that is not an element of forbidden.
    generateRandomUsername(forbidden: string[], length: number) : string {
        let possibility = "";
        const space = "0123456789";
        for (let i = 0; i < length; i++) {
            possibility += space[Math.floor(Math.random() * space.length)];
        }
        for (const forbiddenOption of forbidden) {
            if (forbiddenOption == space) {
                return this.generateRandomUsername(forbidden, length);
            }
        }
        return possibility;
    }

    rosefireSignUp() {
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            } else {
                // Use the token to authenticate with your server
                // checkout the server SDKs for more information.
                sessionStorage.setItem("username", rfUser.token);
                console.log(rfUser);
                window.location.href = `/setup`;
            }
        });
    }
}
