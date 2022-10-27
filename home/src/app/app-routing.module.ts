import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { InfoComponent } from './info/info.component';
import { MeetingSetupComponent } from './meeting-setup/meeting-setup.component';
import { ProfileComponent } from './profile/profile.component';
import { PromptComponent } from './prompt/prompt.component';
import { SetupComponent } from './setup/setup.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'meeting', component: MeetingSetupComponent },
    { path: 'prompt', component: PromptComponent },
    { path: 'info', component: InfoComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'setup', component: SetupComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
