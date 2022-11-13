import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-invitationreceived',
    templateUrl: './meeting-invitationreceived.component.html',
    styleUrls: ['./meeting-invitationreceived.component.css']
})
export class MeetingInvitationreceivedComponent implements OnInit {
    @Input() meetingSource : string | undefined;
    timeString : string = "";
    location : string = "";
    otherUser : string = "";
    constructor() {
    }

    ngOnInit(): void {
        this.setInformation();
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

    pressButton(buttonName : string) {
        let button = document.getElementById("updateMeetingInvitationReceived");
        if (button) {
            button = document.getElementById("uselessButtonMeetingUpdate");
            if (button) {                
                button.innerHTML = buttonName;
                button.click();
            }
        }
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
