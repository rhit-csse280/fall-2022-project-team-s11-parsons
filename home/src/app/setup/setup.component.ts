import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // Hide the navbar every second
        // This doesn't do much really other than verify for certain that it is hidden.
        setInterval(() => {
            const navbar = document.getElementById("backgroundDiv");
            if (navbar) {
                navbar.style.display = "hidden";
            }
        }, 1000);
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    deleteAccountAndRedirect() {
        const button = document.getElementById("uselessButtonDeleteAccount");
        if (button) {
            button.click();
            alert("I'm sorry, but you have to accept the Terms of Service to have a Meal Meetings account. If you have any objections to the Terms of Service, email josephcpar@gmail.com.");
            window.location.href = "/";
        }
    }
}
