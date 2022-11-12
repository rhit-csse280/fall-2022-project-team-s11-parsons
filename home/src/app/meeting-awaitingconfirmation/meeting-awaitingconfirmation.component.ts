import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-meeting-awaitingconfirmation',
    templateUrl: './meeting-awaitingconfirmation.component.html',
    styleUrls: ['./meeting-awaitingconfirmation.component.css']
})
export class MeetingAwaitingconfirmationComponent implements OnInit {
    @Input() meetingSource : string | undefined;
    timeString : string = "";
    location : string = "";
    otherUser : string = "";

    constructor() { }

    ngOnInit(): void {
    }

    // Based on the information in session storage, display this component.
    setInformation() {
        const meetingInfo = sessionStorage.getItem("meetingdata");
        const otherUserNumber = 3 - Number(sessionStorage.getItem("usernumber"));
        if (meetingInfo && this.meetingSource && otherUserNumber) {
            let meetingInfoObject = JSON.parse(meetingInfo);
            const hour = parseInt(String(meetingInfoObject["hour" + this.meetingSource]));
            const minute = parseInt(String(meetingInfoObject["minute" + this.meetingSource]));
            const pm = (String(meetingInfoObject["pm" + this.meetingSource]) == "true") ? "PM" : "AM";
            this.timeString = hour + ":" + minute + " " + pm;
            this.location = String(meetingInfoObject["location" + this.meetingSource]);
            this.otherUser = String(meetingInfoObject["user" + otherUserNumber]);
        }
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    pressButton(buttonName : string) {
        console.log("Hello there!");
        let button = document.getElementById("updateMeetingAwaitingConfirmation");
        if (button) {
            button = document.getElementById("uselessButtonMeetingUpdate");
            if (button) {                
                button.innerHTML = buttonName;
                button.click();
            }
        }
    }

}
