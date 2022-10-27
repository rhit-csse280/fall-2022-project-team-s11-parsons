import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : string = 'Meal Meetings';
    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }
}
