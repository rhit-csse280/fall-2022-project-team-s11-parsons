# Welcome to Meal Meetings

## Description
This project was created by Joseph Parsons as part of the CSSE280 course. Meal Meetings is an app intended to help people find another person to eat with, preferably on-campus, but off-campus also works. This is useful for people who are busy and don't have much time to meet new people or for people who don't like to eat alone.

Note that this is intended for Rose-Hulman students, not faculty or staff. Authentication is done via Rosefire.

## Attributions
This code is licensed under the CC-BY-NC-SA license. For each of these below, there are way too many changes to be able to reasonably describe every single change used in incorporating the material into my work. However, a limited attempt to do so will be made here. Keep in mind that some of these component attributions may be incorrect by mistake or some component attributions may be omitted. Despite this, I do think that these do list all of the sources for the Figma components that are ever visible on screen.

If any of the Creative Commons attributions was poorly done, then this will likely fall under the fair use doctrine, since
This is an educational, non-commercial product.
The use of individual components should not reasonably be expected to harm the market value for these creations.
The use of these components is transformative, as it is used in a completely new app.
Only a small fraction of the available components are actually used.

The background image is from Pixabay.

iOS 16 UI Kit created by Marcelo de Araújo licensed under CC BY 4.0
I used an alert dialog box (for Deleting Account warning), Tab Bar (for the four tabs on the screen), top navigational bar (for the little icons at the very top of the screen), probably all of the buttons as well? The fonts and color schemes have changed significantly.
 
Best Practice Design System - Forms created by Daris Ali Mufti licensed under CC BY 4.0
I used the default input to display people’s profiles. The font and color scheme changed.
 
Apple IOS 16 UI Kit created by Osama Zidan licensed under CC BY 4.0
I used the time selector (for meeting time) and a text field (for meeting location). The font and color scheme changed.
 
Icons Set created by Henrich P licensed under CC BY 4.0
I used icons for Profile, Meeting, Prompt, and Info. These icons have been copied without modification.
 
FOOD APP UI DESIGN created by Rakesh Mishra licensed under CC BY 4.0
I did not use any of the components from here, but I did use it as a reference. Notably, I put an image of food in the background of the home page.
 
(???) created by sugar! licensed under CC-BY-NC-SA
This color scheme was used throughout the project.

## Coding Sources
These should include most of the sources I used. Note that I am generally excluding tutorials on basic features, such as
 - W3Schools
 - Bootstrap documentation
 - Firebase documentation

Learning About the Data "Budget": https://web.dev/performance-budgets-with-the-angular-cli/
Figuring out why hosting was stalling: https://github.com/firebase/firebase-tools/issues/3327

Cloud Functions:
https://firebase.google.com/docs/functions/get-started
https://github.com/angular/angularfire/blob/master/docs/functions/functions.md
https://firebase.blog/posts/2018/09/introducing-rxfire-easy-async-firebase
https://firebase.google.com/docs/functions/firestore-events
https://www.educba.com/observable-javascript/
https://stackoverflow.com/questions/47732157/using-observable-and-subscribe-in-angular-with-firebase
https://stackoverflow.com/questions/58886755/how-do-i-use-cloud-functions-with-an-angular-fire-project?rq=1
https://stackoverflow.com/questions/74009031/how-to-call-firebase-cloud-functions-from-angular-and-angularfire
https://github.com/tdkehoe/Firebase-Cloud-Functions-with-Angular/blob/main/README.md
https://firebase.blog/posts/2018/09/introducing-rxfire-easy-async-firebase
https://stackoverflow.com/questions/69366517/could-not-detect-language-for-functions-at-functions

For Cloud Functions, the ones that were particularly useful are visible in the Technical Document.

Managing Version Control for AngularFire:
The most helpful was the response from Michael de Soto (https://stackoverflow.com/users/4151208/michael-de-soto) at
https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1
They based their solution based on the documentation at https://firebase.google.com/docs/firestore/query-data/get-data

More Sources for Managing Version Control for AngularFire:
