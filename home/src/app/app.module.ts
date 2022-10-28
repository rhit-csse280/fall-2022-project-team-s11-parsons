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
import { SignoutComponent } from './signout/signout.component';
import { SetupComponent } from './setup/setup.component';
import { SignupComponent } from './signup/signup.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupCredentialPageComponent } from './signup-credential-page/signup-credential-page.component';
import { SigninCredentialPageComponent } from './signin-credential-page/signin-credential-page.component';
import { WaitingComponent } from './waiting/waiting.component';
import { AwaitingconfirmationComponent } from './awaitingconfirmation/awaitingconfirmation.component';
import { MeetingWaitingComponent } from './meeting-waiting/meeting-waiting.component';
import { MeetingAwaitingconfirmationComponent } from './meeting-awaitingconfirmation/meeting-awaitingconfirmation.component';
import { MeetingConfirmationComponent } from './meeting-confirmation/meeting-confirmation.component';
import { MeetingComponent } from './meeting/meeting.component';

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
    SignoutComponent,
    SetupComponent,
    SignupComponent,
    LoginModalComponent,
    SignupCredentialPageComponent,
    SigninCredentialPageComponent,
    WaitingComponent,
    AwaitingconfirmationComponent,
    MeetingWaitingComponent,
    MeetingAwaitingconfirmationComponent,
    MeetingConfirmationComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
