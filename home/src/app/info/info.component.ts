import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    displayAttributionsAndLicense : boolean = false;
    constructor() { }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

}
