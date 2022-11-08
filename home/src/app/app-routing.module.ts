import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { InfoComponent } from './info/info.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ProfileComponent } from './profile/profile.component';
import { PromptComponent } from './prompt/prompt.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'meeting', component: MeetingComponent },
    { path: 'prompt', component: PromptComponent },
    { path: 'info', component: InfoComponent },
    { path: 'setup', component: SetupComponent },
    { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
