import { Component, OnInit } from '@angular/core';
import { stringLength } from '@firebase/util';

@Component({
    selector: 'app-meeting-setup',
    templateUrl: './meeting-setup.component.html',
    styleUrls: ['./meeting-setup.component.css']
})
export class MeetingSetupComponent implements OnInit {
    pm: boolean = false;
    hour: number = 0;
    minute: number = 0;
    location: string = "";

    constructor() { }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    setAmPm(pmTrue : boolean) : void {
        this.pm = pmTrue;
    }

    setLocation(location : string) : void {
        this.location = location;
    }

    // A helper function for converting a string to a non-negative integer.
    // If the expression provided is not a valid 2-digit decimal number, then return -1.
    convert2DigitStringToInteger(expression: string) : number {
        const firstDigit = "0123456789".indexOf(expression.charAt(0));
        const secondDigit = "0123456789".indexOf(expression.charAt(1));
        if (firstDigit !== -1 && secondDigit != -1) {
            return firstDigit * 10 + secondDigit;
        } else {
            return -1;
        }
    }

    // Given a time expression, if it is valid, set the hour and minute properties of this class to the values from this time expression.
    convertToDetails(timeExpression : string) : void {
        if (timeExpression.length != 5 || timeExpression.charAt(2) != ":") {
            // Do validation to check that this is in HH:MM format.
            console.log("Not in HH:MM format");
            this.hour = -1;
            this.minute = -1;
        } else {
            // Extract the hour and minute in the form of integers.
            const newHour : string = timeExpression.substring(0, 2);
            const newMinute : string = timeExpression.substring(3, 5);
            const newHourConverted : number = this.convert2DigitStringToInteger(newHour);
            const newMinuteConverted : number = this.convert2DigitStringToInteger(newMinute);
            if (newHourConverted >= 1 && newHourConverted <= 12 && newMinuteConverted >= 0 && newMinuteConverted <= 59) {
                // Update the hour and minute here.
                this.hour = newHourConverted;
                this.minute = newMinuteConverted;
                console.log(`${this.hour} ${this.minute}`);
            } else {
                // -1 and -1 for hour and minute represents INVALID DATE
                this.hour = -1;
                this.minute = -1;
                console.log("Invalid time");
            }
        }
    }

    

    sendPreferredDetails(timeExpression : string, locationValue : string) : void {
        // Make sure the time expression is valid.
        this.convertToDetails(timeExpression);
        if (this.hour == -1 || this.minute == -1) {
            return;
        }

        // Get the current user data.
        const userDataString : string = sessionStorage.getItem("userdata") || "{}";
        const userDataJSON = JSON.parse(userDataString);
        userDataJSON["hour"] = this.hour;
        userDataJSON["minute"] = this.minute;
        userDataJSON["pm"] = this.pm;
        userDataJSON["location"] = this.location;

        //Put this data back in session storage and send to the server.
        sessionStorage.setItem("userdata", JSON.stringify(userDataJSON));
        document.getElementById("uselessButtonServerSend")?.click();
    }
}
