import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-confirmation',
    templateUrl: './meeting-confirmation.component.html',
    styleUrls: ['./meeting-confirmation.component.css']
})
export class MeetingConfirmationComponent implements OnInit {
    images = [
        {url: "/assets/PercopoHall3.PNG", width: 1736, height: 487},
        // This image was cropped from the sign close to Career Services.
        {url: "/assets/vonderschmittcafe.jpg", width: 1332, height: 1780}
    ];
    index: number = 1;
    myProportionX: number = 0;
    myProportionY: number = 0;


    constructor() { }

    ngOnInit(): void {
        const userPosition = this.getUserPosition();
        this.myProportionX = userPosition["propX"];
        this.myProportionY = userPosition["propY"];
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    sendUserPosition(propX: number, propY: number) : void {
        const myUsername : string = sessionStorage.getItem("username") || "ERROR";

        // Figure out what is stored in the current accounts.
        let currentAccounts : string | null = sessionStorage.getItem("person");
        if (!currentAccounts) {
            // This should never be run in practice.
            currentAccounts = "";
        }

        //Look at each account.
        const accounts : string[] = currentAccounts.split("\n");
        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            if (account === "") {
                //Ignore blank lines
                continue;
            }
            const accountProperties : string[] = account.split(",");
            const username = accountProperties[0];
            if (myUsername === username) {
                // Change the appropriate properties, generate a new string, and put it back into acounts.
                accountProperties[7] = "" + propX;
                accountProperties[8] = "" + propY;
                accounts[i] = accountProperties.join(",");
            }
        }
        currentAccounts = accounts.join("\n");
        sessionStorage.setItem("person", currentAccounts);
    }

    getUserPosition() {
        const myUsername : string = sessionStorage.getItem("username") || "ERROR";

        // Figure out what is stored in the current accounts.
        let currentAccounts : string | null = sessionStorage.getItem("person");
        if (!currentAccounts) {
            // This should never be run in practice.
            currentAccounts = "";
        }

        //Look at each account.
        const accounts : string[] = currentAccounts.split("\n");
        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            if (account === "") {
                //Ignore blank lines
                continue;
            }
            const accountProperties : string[] = account.split(",");
            const username = accountProperties[0];
            if (myUsername === username) {
                // Change the appropriate properties, generate a new string, and put it back into acounts.
                return {"propX" : Number(accountProperties[7]), "propY" : Number(accountProperties[8])};
            }
        }
        return {"propX" : 0, "propY" : 0};
    }

    logClick(e : MouseEvent, imageWidth: number, imageHeight: number) {
        /* Chrome developer tools allow me to see properties that I didn't know existed. */
        /* For example, finding the width and height of an image. */
        console.log(e);
        // TypeScript casting (see https://www.w3schools.com/typescript/typescript_casting.php)
        this.myProportionX = (e as PointerEvent).offsetX / imageWidth;
        this.myProportionY = (e as PointerEvent).offsetY / imageHeight;
        console.log(`${this.myProportionX} ${this.myProportionY}`);
        this.positionDiv(imageWidth, imageHeight);
        this.sendUserPosition(this.myProportionX, this.myProportionY);
    }

    positionDiv(imageWidth : number, imageHeight: number) {
        console.log("Positioning div");
        // Figuring out this.myProportionX * imageWidth gets the appropriate x position relative to the div.
        // Since the div is the image plus a bit of space beneath it, this gets the appropriate x location for the center of the div.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the width.
        const locationIndicatorLeft = this.myProportionX * imageWidth - 5;
        // Recall that by default, this red box would be below the image.
        // Hence, changing it to -imageHeight moves it to the top of the image.
        // Adding this.myProportionY * imageHeight gets the appropriate center Y position.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the height.
        const locationIndicatorTop = -imageHeight + this.myProportionY * imageHeight - 5;
        let locationIndicator = document.getElementById("currentLocation");
        console.log(locationIndicator);
        if (locationIndicator) {
            locationIndicator.style.left = locationIndicatorLeft + "px";
            locationIndicator.style.top = locationIndicatorTop + "px";
        }
    }
}
