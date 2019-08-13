import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { OutreachMemoriesComponent } from './outreach-memories/outreach-memories.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'Outreach', pathMatch: 'full' }, 
  { path: 'Outreach', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: AdminComponent},
  { path: 'feedback', component: UserFeedbackComponent}, 
  { path: 'Memories', component: OutreachMemoriesComponent},
  { path: '**', redirectTo: 'Outreach', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
