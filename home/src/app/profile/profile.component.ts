import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @Input() colorlist : readonly string[] = [];
    interests: any;

    constructor() { 
        // Check every 0.1 seconds what the current value for interests is.
        setInterval(this.getInterests.bind(this), 100);
    }

    ngOnInit(): void {
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
        this.interests = JSON.parse(sessionStorage.getItem("userdata")||"{}")["interests"];
    }

    setInterests() {
        const myInput : any = document.querySelector("#profileContainer input");
        console.log("Change detected");
        if (myInput) {
            const interestString : string =  myInput.value || "NULL";
            console.log(interestString);
        }

    }
}
