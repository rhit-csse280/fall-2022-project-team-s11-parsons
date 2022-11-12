import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
    state : string = "SETUP";
    meetingInfoSource : string = "";

    constructor() {
        this.chooseWhatToDisplay();
    }

    // Determine which component should be displayed for the meeting based on the meeting state.
    chooseWhatToDisplay() {
        let meetingInfo : any = sessionStorage.getItem("meetingdata");
        if (!meetingInfo) {
            this.state = "SETUP";
        } else {
            meetingInfo = JSON.parse(meetingInfo);
            const userNumber = parseInt(sessionStorage.getItem("usernumber") as any);
            // See the below link for more information.
            // https://docs.google.com/document/d/1JSff4SZplRbZXeFIzsd8AOPMmGNJSJnmIdCy_oMsBcI/edit?usp=sharing
            if (meetingInfo["status"] == "DEFAULT") {
                this.state = "INVITATIONRECEIVED";
                this.meetingInfoSource = (userNumber == 1) ? "B" : "A";
            } else if (meetingInfo["status"] == "1ACC2") {
                this.state = (userNumber == 1) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "B";
            } else if (meetingInfo["status"] == "2ACC1") {
                this.state = (userNumber == 2) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT2") {
                this.state = "INVITATIONRECEIVED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT1") {
                this.state = "INVITATIONRECEIVED";
                this.meetingInfoSource = "B";
            } else if (meetingInfo["status"] == "12ACC2") {
                this.state = "CONFIRMED";
                this.meetingInfoSource = "B";
            } else if (meetingInfo["status"] == "12ACC1") {
                this.state = "CONFIRMED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT2-1ACC1") {
                this.state = (userNumber == 1) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT2-2ACC1") {
                this.state = (userNumber == 2) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT1-1ACC2") {
                this.state = (userNumber == 1) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "B";
            } else if (meetingInfo["status"] == "NOT1-2ACC2") {
                this.state = (userNumber == 1) ? "AWAITINGCONFIRMATION" : "INVITATIONRECEIVED";
                this.meetingInfoSource = "B";
            } else if (meetingInfo["status"] == "NOT2-12ACC1") {
                this.state = "CONFIRMED";
                this.meetingInfoSource = "A";
            } else if (meetingInfo["status"] == "NOT1-12ACC2") {
                this.state = "CONFIRMED";
                this.meetingInfoSource = "B";
            }
        }
        // Tell the subcomponents to update their information if applicable.
        const subcomponentNames = ["updateMeetingInvitationReceived", "updateMeetingAwaitingConfirmation"];
        for (const subcomponentName of subcomponentNames) {
            const button = document.getElementById(subcomponentName);
            if (button) {
                button.click();
            }
        }
    }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
