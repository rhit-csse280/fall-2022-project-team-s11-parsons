import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    constructor() { }

    hideNavbar() : void {
        console.log("Don't navigate to other pages just yet.");
        const navbar = document.getElementById("myNavbarDiv");
        if (navbar) {
            navbar.style.display = "hidden";
        }
    }

    ngOnInit(): void {
        // Hide the navbar every second
        // This doesn't do much really other than verify for certain that it is hidden.
        setInterval(this.hideNavbar, 100);
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    deleteAccountAndRedirect() {
        //Sign out
        sessionStorage.removeItem("userdata");
        sessionStorage.removeItem("meetingdata");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("usernumber");
        //Delete account
        const button = document.getElementById("uselessButtonDeleteAccount");
        if (button) {
            button.click();
            alert("I'm sorry, but you have to accept the Terms of Service to have a Meal Meetings account. If you have any objections to the Terms of Service, email josephcpar@gmail.com.");
            // Redirect the page in 1 second.
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
    }
}
