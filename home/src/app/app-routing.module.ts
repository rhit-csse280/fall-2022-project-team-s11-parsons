import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { MeetingSetupComponent } from './meeting-setup/meeting-setup.component';
import { ProfileComponent } from './profile/profile.component';
import { PromptComponent } from './prompt/prompt.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'meeting', component: MeetingSetupComponent },
    { path: 'prompt', component: PromptComponent },
    { path: 'info', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
