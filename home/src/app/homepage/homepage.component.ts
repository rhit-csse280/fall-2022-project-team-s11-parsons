import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }


    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

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
                sessionStorage.setItem("username", rfUser.token);
                window.location.href = `/profile`;
            }
        });

    }
}
