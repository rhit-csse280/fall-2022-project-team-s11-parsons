import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @Input() colorlist : readonly string[] = [];
    interests: any;
    myInput : any;

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
        this.interests = JSON.parse(sessionStorage.getItem("userdata")||"{}")["interests"];
        if (this.myInput) {
            this.myInput.value = this.interests;
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
