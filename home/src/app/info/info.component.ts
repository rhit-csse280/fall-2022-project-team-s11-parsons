import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    @Input() colorlist : readonly string[] = [];
    constructor() { }

    ngOnInit(): void {
    }

}
