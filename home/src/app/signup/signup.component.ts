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

    sendSignUpData(emailValue: string, passwordValue: string) : number {
        // Determine whether the email is already in the database.
        // If not, allow the account to be created.
        console.log("Sign Up goes here");
        console.log(`${emailValue} ${passwordValue}`);
        // The value stored in session storage uses a CSV-like format
        let currentAccounts : string | null = sessionStorage.getItem("person");
        if (!currentAccounts) {
            currentAccounts = "";
        }
        // Extract the usernames (to avoid repeats) and 
        const accounts : string[] = currentAccounts.split("\n");
        const usernames : string[] = [];
        for (const account of accounts) {
            if (account === "") {
                //Ignore blank lines
                continue;
            }
            const accountProperties : string[] = account.split(",");
            const username = accountProperties[0];
            usernames.push(username);
            const email = accountProperties[1];
            if (email == emailValue) {
                return -1;
            }
        }
        //Add a new entry
        const myUsername = this.generateRandomUsername(usernames, 20);
        currentAccounts += `${myUsername},${emailValue},${passwordValue},,,,,,\n`;
        sessionStorage.setItem("person", currentAccounts);
        sessionStorage.setItem("username", myUsername);
        document.location.href = "/setup";
        return 0;
    }
}
