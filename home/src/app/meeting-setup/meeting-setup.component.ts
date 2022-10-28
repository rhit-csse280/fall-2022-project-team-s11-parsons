import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-setup',
    templateUrl: './meeting-setup.component.html',
    styleUrls: ['./meeting-setup.component.css']
})
export class MeetingSetupComponent implements OnInit {
    state : string = "CONFIRMED";
    pm: boolean = false;
    hour: number = 0;
    minute: number = 0;
    images = [
        {url: "/assets/PercopoHall3.PNG", width: 1736, height: 487}
    ];
    index: number = 0;
    myProportionX: number = 0;
    myProportionY: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    setAmPm(pmTrue : boolean) : void {
        this.pm = pmTrue;
    }

    // A helper function for converting a string to a non-negative integer.
    // If the integer representation of the string is >= low and <= high,
    // Then the output should be the value of the integer.
    // Otherwise, return -1.
    convertStringToInteger(expression : string, low : number, high : number) : number {
        for (let i = low; i <= high; i++) {
            let iString = "" + i;
            while (iString.length < expression.length) {
                iString = "0" + iString;
            }
            if (iString === expression) {
                return i;
            }
        }
        return -1;
    }

    // Given a time expression, if it is valid, set the hour and minute properties of this class to the values from this time expression.
    convertToDetails(timeExpression : string) : void {
        if (timeExpression.length != 5) {
            console.log("Wrong Length for HH:MM format");
            return;
        } else {
            const newHour : string = timeExpression.substring(0, 2);
            const newMinute : string = timeExpression.substring(3, 5);
            const newHourConverted : number = this.convertStringToInteger(newHour, 1, 12);
            const newMinuteConverted : number = this.convertStringToInteger(newMinute, 0, 59);
            if (newHourConverted != -1 && newMinuteConverted != -1) {
                this.hour = newHourConverted;
                this.minute = newMinuteConverted;
                console.log(`${this.hour} ${this.minute}`);
            }
        }
    }

    sendPreferredDetails(timeExpression : string, locationValue : string) : void {
        // Make sure the time expression is valid.
        this.convertToDetails(timeExpression);
        if (this.hour == 0 || this.minute == 0) {
            return;
        }

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
                accountProperties[3] = "" + this.hour;
                accountProperties[4] = "" + this.minute;
                accountProperties[5] = this.pm ? "1" : "0";
                accountProperties[6] = locationValue;
                accounts[i] = accountProperties.join(",");
            }
        }
        currentAccounts = accounts.join("\n");
        sessionStorage.setItem("person", currentAccounts);
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
    }

    positionDiv(imageWidth : number, imageHeight: number) {
        // Figuring out this.myProportionX * imageWidth gets the appropriate x position relative to the div.
        // Since the div is the image plus a bit of space beneath it, this gets the appropriate x location for the center of the div.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the width.
        const locationIndicatorLeft = this.myProportionX * imageWidth - 5;
        // Recall that by default, this red box would be below the image.
        // Hence, changing it to -imageHeight moves it to the top of the image.
        // Adding this.myProportionY * imageHeight gets the appropriate center Y position.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the height.
        const locationIndicatorTop = -imageHeight + this.myProportionY * imageHeight - 5;
        const locationIndicator = document.getElementById("currentLocation");
        if (locationIndicator) {
            locationIndicator.style.left = locationIndicatorLeft + "px";
            locationIndicator.style.top = locationIndicatorTop + "px";
        }
    }

}
