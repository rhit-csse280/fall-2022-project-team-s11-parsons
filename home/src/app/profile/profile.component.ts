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
        // Check every 0.1 seconds what the current value for interests is.
        setInterval(this.getInterests.bind(this), 100);
    }

    ngOnInit(): void {
        this.myInput = document.querySelector("#profileContainer input");
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    signOut() {
        sessionStorage.setItem("username", "");
        sessionStorage.setItem("userdata", "{}");
        document.location.href = "/home";
    }

    getUsername() {
        return sessionStorage.getItem("username");
    }

    getInterests() {
        // Get the interests from session storage and set the value of the data field to this.
        const newInterests : string = JSON.parse(sessionStorage.getItem("userdata")||"{'interests':''}")["interests"];
        if (newInterests == this.interests) {
            return;
        }
        if (this.myInput) {
            console.log("Need to change interests");
            this.myInput.value = newInterests;
            this.interests = newInterests;
        }
    }

    setInterests() {
        // Send the interests to the server.
        console.log("Change detected");
        if (this.myInput) {
            const interestString : string =  this.myInput.value || "NULL";
            console.log(interestString);
        }

    }
}
