import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-meeting-confirmation',
    templateUrl: './meeting-confirmation.component.html',
    styleUrls: ['./meeting-confirmation.component.css']
})
export class MeetingConfirmationComponent implements OnInit {
    @Input() meetingSource : string | undefined;

    images = [{url: "/assets/'Rose-Hulman Map'.PNG", width: 1358, height: 1046}]
    index: number = 0;
    myProportionX: number = 0;
    myProportionY: number = 0;
    otherUser: string = "";
    timeString: string = "";
    location: string = "";


    constructor() { }

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

    ngOnInit(): void {
        const userPosition = this.getUserPosition();
        this.myProportionX = userPosition["propX"];
        this.myProportionY = userPosition["propY"];
        console.log(userPosition);
        this.setInformation();
    }

    getColor(colorName: string): string {
        return sessionStorage.getItem(colorName) || "black";
    }

    sendUserPosition(propX: number, propY: number) : void {
        // Get the current data object
        const myUserString = sessionStorage.getItem("userdata") || "{}";
        const myUserObject = JSON.parse(myUserString);

        // Add the user object
        myUserObject["xCoordinate"] = propX;
        myUserObject["yCoordinate"] = propY;

        // Put the data object back into session storage.
        sessionStorage.setItem("userdata", JSON.stringify(myUserObject));
        const button = document.getElementById("uselessButtonServerSend");
        if (button) {
            button.click();
        }
    }

    //Handles data sent from the server and stored in session storage.
    handleServerData(imageWidth: number, imageHeight: number) : void {
        const coordinates : any = this.getUserPosition();
        this.myProportionX = coordinates["propX"];
        this.myProportionY = coordinates["propY"];
        this.positionDiv(imageWidth, imageHeight);
    }

    // Based on the data in session storage, determine where the user's last map click was.
    getUserPosition() {
        const myUserString : string = sessionStorage.getItem("userdata") || "{}";
        const myUserObject = JSON.parse(myUserString);
        if (myUserObject["xCoordinate"]) {
            return {"propX" : Number(myUserObject["xCoordinate"]),
            "propY" : Number(myUserObject["yCoordinate"])};
        } else {
            return {"propX" : 0, "propY" : 0};
        }
    }

    logClick(e : MouseEvent, imageWidth: number, imageHeight: number) : void {
        /* Chrome developer tools allow me to see properties that I didn't know existed. */
        /* For example, finding the width and height of an image. */
        console.log(e);
        // TypeScript casting (see https://www.w3schools.com/typescript/typescript_casting.php)
        this.myProportionX = (e as PointerEvent).offsetX / imageWidth;
        this.myProportionY = (e as PointerEvent).offsetY / imageHeight;
        console.log(`${this.myProportionX} ${this.myProportionY}`);
        this.positionDiv(imageWidth, imageHeight);
        this.sendUserPosition(this.myProportionX, this.myProportionY);
    }

    positionDiv(imageWidth : number, imageHeight: number) : void {
        console.log("Positioning div");
        // Figuring out this.myProportionX * imageWidth gets the appropriate x position relative to the div.
        // Since the div is the image plus a bit of space beneath it, this gets the appropriate x location for the center of the div.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the width.
        const locationIndicatorLeft = this.myProportionX * imageWidth - 5;
        // Recall that by default, this red box would be below the image.
        // Hence, changing it to -imageHeight moves it to the top of the image.
        // Adding this.myProportionY * imageHeight gets the appropriate center Y position.
        // To move it so the div is centered where you click, rather than have the top left corner placed there, subtract half the height.
        const locationIndicatorTop = -imageHeight + this.myProportionY * imageHeight - 5;
        let locationIndicator = document.getElementById("currentLocation");
        console.log(locationIndicator);
        if (locationIndicator) {
            locationIndicator.style.left = locationIndicatorLeft + "px";
            locationIndicator.style.top = locationIndicatorTop + "px";
        }
    }

    pressButton(buttonName : string) {
        console.log("Hello there!");
        const button = document.getElementById("uselessButtonMeetingUpdate");
        if (button) {                
            button.innerHTML = buttonName;
            button.click();
        }
    }
}
