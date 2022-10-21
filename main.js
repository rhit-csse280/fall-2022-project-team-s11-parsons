// Last modified by Joseph Parsons on October 21, 2022

//Configuration information to handle multiple tabs
navbarLinks = [];
sections = [];
//Unfortunately, these three variables have to be defined manually.
navbarLinkIDs = ["profileTab", "meetingTab", "promptTab", "infoTab"];
sectionIDs = ["profilePage", "meetingPage", "promptPage", "infoPage"];
sectionCount = 4;


function main() {
    //Extract the configuration information from the page.
    for (let i = 0; i < sectionCount; i++) {
        const navbarElement = document.getElementById(navbarLinkIDs[i]);
        const documentSection = document.getElementById(sectionIDs[i]);
        navbarLinks.push(navbarElement);
        sections.push(documentSection);
        console.log(documentSection);
    }
    makeSectionVisible(3);
}
function makeSectionVisible(index) {
    //Make the section with the given index visible.
    for (let i = 0; i < sectionCount; i++) {
        if (i == index) {
            navbarLinks[i].classList.add("active");
            sections[i].classList.remove("hidden");
            sections[i].classList.add("visible");
        } else {
            navbarLinks[i].classList.remove("active");
            sections[i].classList.remove("visible");
            sections[i].classList.add("hidden");
        }
    }
}
main();