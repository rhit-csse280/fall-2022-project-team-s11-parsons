import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'rosefire';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    @Output() loginRequest = new EventEmitter<string>();
    constructor() { }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    // sign in or sign up using Rosefire
    rosefireSignIn() {
        Rosefire.signIn('fdcea3b8-924f-48eb-8602-9c9355591911', (error, rfUser: RosefireUser) => {
            if (error) {
                // User not logged in!
                console.error(error);
                return;
            } else {
                // Use the token to authenticate with your server
                // checkout the server SDKs for more information.
                console.log(rfUser);
                // Ensure that the correct users are allowed.
                if (rfUser.username === "scrivner") {
                    alert("You are allowed to use this for demo purposes only. This app is intended for students.");
                } else if (rfUser.group !== "OTHER") {
                    alert("Your Rosefire token suggests that you are not a student. This app is only for students. Please email josephcpar@gmail.com if this is a mistake.");
                    return;
                }
                //Set the username appropriately.
                sessionStorage.setItem("username", rfUser.username);
                sessionStorage.setItem("usertoken", rfUser.token);
                //Redirect to the appropriate page.
                document.getElementById("uselessButtonLogin")?.click();
                console.log("Waiting for a redirect...");
            }
        });
    }
}
