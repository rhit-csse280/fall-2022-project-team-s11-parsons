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

    sendSignUpData(emailValue: string, passwordValue: string) {
        console.log("Sign Up goes here");
        console.log(`${emailValue} ${passwordValue}`);
    }
}
