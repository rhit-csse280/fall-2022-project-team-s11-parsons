import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting-waiting',
    templateUrl: './meeting-waiting.component.html',
    styleUrls: ['./meeting-waiting.component.css']
})
export class MeetingWaitingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
