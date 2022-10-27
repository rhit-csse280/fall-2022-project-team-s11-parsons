import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-setup',
    templateUrl: './meeting-setup.component.html',
    styleUrls: ['./meeting-setup.component.css']
})
export class MeetingSetupComponent implements OnInit {
    state : string = "INVITATIONRECEIVED";
    constructor() { }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
