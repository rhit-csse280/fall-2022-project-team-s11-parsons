import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MeetingSetupComponent } from './meeting-setup/meeting-setup.component';
import { PromptComponent } from './prompt/prompt.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SetupComponent } from './setup/setup.component';
import { SignupComponent } from './signup/signup.component';
import { MeetingWaitingComponent } from './meeting-waiting/meeting-waiting.component';
import { MeetingAwaitingconfirmationComponent } from './meeting-awaitingconfirmation/meeting-awaitingconfirmation.component';
import { MeetingConfirmationComponent } from './meeting-confirmation/meeting-confirmation.component';
import { MeetingComponent } from './meeting/meeting.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SigninupComponent } from './signinup/signinup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MeetingSetupComponent,
    PromptComponent,
    InfoComponent,
    ProfileComponent,
    HomepageComponent,
    SigninComponent,
    SetupComponent,
    SignupComponent,
    MeetingWaitingComponent,
    MeetingAwaitingconfirmationComponent,
    MeetingConfirmationComponent,
    MeetingComponent,
    SigninupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  //I looked at https://stackoverflow.com/questions/66252333/error-nullinjectorerror-r3injectorerrorappmodule
  //However, https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021?noredirect=1&lq=1 provided the answer.
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
