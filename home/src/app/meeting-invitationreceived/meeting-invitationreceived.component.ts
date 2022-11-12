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
        const meetingInfo = sessionStorage.getItem("meetingdata");
        const otherUserNumber = 3 - Number(sessionStorage.getItem("usernumber"));
        if (meetingInfo && this.meetingSource && otherUserNumber) {
            let meetingInfoObject = JSON.parse(meetingInfo);
            console.log(meetingInfoObject);
            const hour = parseInt(String(meetingInfoObject["hour" + this.meetingSource]));
            const minute = parseInt(String(meetingInfoObject["minute" + this.meetingSource]));
            const pm = (String(meetingInfoObject["pm" + this.meetingSource]) == "true") ? "PM" : "AM";
            this.timeString = hour + ":" + minute + " " + pm;
            this.location = String(meetingInfoObject["location" + this.meetingSource]);
            this.otherUser = String(meetingInfoObject["user" + otherUserNumber]);
        }
    }

    ngOnInit(): void {
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
