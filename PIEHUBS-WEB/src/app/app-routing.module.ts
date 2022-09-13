import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/landing/signin/signin.component';
import { LandingPageComponent } from './components/landing/landing-page/landing-page.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/landing/registration/registration.component';
import { AdminSigninComponent } from './components/admin_component/admin-signin/admin-signin.component';
import { GoalsComponent } from './components/admin_component/dashboard/goals/goals.component';
import { VideoRatingComponent } from './components/admin_component/dashboard/video-rating/video-rating.component';
import { DashboardLayoutComponent } from './components/admin_component/dashboard/dashboard-layout/dashboard-layout.component';
import { ActivityComponent } from './components/admin_component/dashboard/activity/activity.component';

const routes: Routes = [
  // {path:'', redirectTo: 'AppComponent', pathMatch: 'full'},
  // {path:'LandingPage', component: LandingPageComponent},
  // {path:'SignIn' , component: SigninComponent},
  // {path:'regiter_user' , component: RegistrationComponent},
  // {path:'admin_signin', component: AdminSigninComponent},
  // {path:'admin_dashboard', component: DashboardLayoutComponent},
  // {path:'admin_goals', component: GoalsComponent,},
  // {path:'video_rating', component: VideoRatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponent = [GoalsComponent, VideoRatingComponent]

