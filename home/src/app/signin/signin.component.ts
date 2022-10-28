import { Component, OnInit } from '@angular/core';

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

    sendSignInData(emailValue : string, passwordValue : string) {
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
    }
}
