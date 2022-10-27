import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : string = 'Meal Meetings';
    colorList : readonly string[] = 
        ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"];
}
