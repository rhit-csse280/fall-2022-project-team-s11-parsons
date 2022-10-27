import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() colorlist !: readonly string[];
    @Input() colorindex !: number;

    navigationTabs = [
        { materialIcon: "account_circle", tabName: "Profile" },
        { materialIcon: "restaurant", tabName: "Meeting" },
        { materialIcon: "lightbulb", tabName: "Prompt" },
        { materialIcon: "info", tabName: "Info" }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
