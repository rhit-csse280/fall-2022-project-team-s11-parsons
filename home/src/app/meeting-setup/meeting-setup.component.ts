import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-setup',
    templateUrl: './meeting-setup.component.html',
    styleUrls: ['./meeting-setup.component.css']
})
export class MeetingSetupComponent implements OnInit {
    pm: boolean = false;
    hour: number = 0;
    minute: number = 0;

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

        // Get the current user data.
        const userDataString : string = sessionStorage.getItem("userdata") || "{}";
        const userDataJSON : object = JSON.parse(userDataString);

        // Modify the relevant portions.
        console.log("Attempting to modify things...");
        //userDataJSON.hour = this.hour;
        //userDataJSON.minute = this.minute;
        //userDataJSON.pm = this.pm;
    }
}
