import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {
    @Input() colorlist : readonly string[] = [];
    index: number;
    prompts: readonly string[] = [];
    constructor() { 
        this.index = 0;
        this.prompts = ["What is your name?",
        "What do you think about this app?",
        "What do you think about the design of this app?",
        "Can you think of more prompts to go here?",
        "Is this the last prompt?"];
    }

    ngOnInit(): void {
    }

    getColor (colorName : string) : string {
        return sessionStorage.getItem(colorName) || "black";
    }

    getNewPrompt() {
        this.index = Math.floor(Math.random() * this.prompts.length);
    }
}
