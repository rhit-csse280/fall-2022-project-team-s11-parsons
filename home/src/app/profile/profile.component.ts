import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @Input() colorlist : readonly string[] = [];
    interests: any; // Stores the interests as the server would have it.
    myInput : any; // The input field for interests

    constructor() {
    }

    ngOnInit(): void {
        // Locate the profile container's input.
        this.myInput = document.querySelector("#profileContainer input");
        this.interests = JSON.parse(sessionStorage.getItem("userdata")||"{'interests':''}")["interests"];
        if (this.myInput) {
            this.myInput.value = this.interests;
        }
        setInterval(() => {
            //I have no idea why this redeclaration is needed.
            //It is annoying, but it works, so...
            this.myInput = document.querySelector("#profileContainer input");
            this.getInterests();
        }, 100);
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    signOut() {
        // To sign out, clear all user information.
        sessionStorage.setItem("username", "");
        sessionStorage.setItem("userdata", "{}");
        document.location.href = "/home";
    }

    getUsername() {
        // The username can be gotten from session storage.
        return JSON.parse(sessionStorage.getItem("userdata") || "{'username': 'ANONYMOUS'}")["username"];
    }

    getInterests() {
        // Get the interests from session storage and set the value of the data field to this.
        const newInterests : string = JSON.parse(sessionStorage.getItem("userdata")||"{'interests':''}")["interests"];
        if (newInterests === this.interests) {
            // Only change the interests if the server sent new data.
            // This allows us to change the interests text field when the server has not sent new data.
            return;
        }
        console.log(this.myInput);
        if (this.myInput) {
            // If there is new data from the server, alert us and change the view appropriately.
            console.log("Need to change interests");
            this.myInput.value = newInterests;
            this.interests = newInterests;
        }
    }

    setInterests() {
        // Send the interests to the session storage.
        if (this.myInput) {
            const interestString : string =  this.myInput.value || "NULL";

            //Get the data currently in session storage, add the new username, and put it back into session storage.
            const currentUserInfo = JSON.parse(sessionStorage.getItem("userdata") || "{}");
            currentUserInfo["interests"] = interestString;
            sessionStorage.setItem("userdata", JSON.stringify(currentUserInfo));
            document.getElementById("uselessButtonServerSend")?.click();
        }
    }
}
