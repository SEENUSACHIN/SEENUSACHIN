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
import { MyserviceService } from './components/landing/myservice.service';
import { ParentServiceService } from './components/parent_component/parent-service.service';

import { DashboardComponent } from './components/landing/dashboard/dashboard.component';
import { TeamListComponent } from './components/landing/team-list/team-list.component';
import { NavbarComponent } from './components/landing/navbar/navbar.component';
import { MyteamListComponent } from './components/landing/myteam-list/myteam-list.component';
import { ScientistListComponent } from './components/landing/scientist-list/scientist-list.component';
import { GoalListComponent } from './components/landing/goal-list/goal-list.component';
import { EventListComponent } from './components/landing/event-list/event-list.component';
import { ActivityListComponent } from './components/landing/activity-list/activity-list.component';
import { UploadActivityComponent } from './components/landing/upload-activity/upload-activity.component';
import { ActivitiesComponent } from './components/landing/activities/activities.component';
import { ProfileComponent } from './components/landing/profile/profile.component';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { RecentActivityComponent } from './components/landing/recent-activity/recent-activity.component';
import { KidsInventoryComponent } from './components/parent_component/kids-inventory/kids-inventory.component';
import { MyActivityComponent } from './components/parent_component/my-activity/my-activity.component';
import { MyHomeComponent } from './components/parent_component/my-home/my-home.component';
import { LearnMoreComponent } from './components/parent_component/learn-more/learn-more.component';
import { ParentNavComponent } from './components/parent_component/parent-nav/parent-nav.component';
import { ListPageComponent } from './components/parent_component/list-page/list-page.component';
import { DetailsPageComponent } from './components/parent_component/details-page/details-page.component';
import { ViewActivityComponent } from './components/parent_component/view-activity/view-activity.component';
import { ParentProfileComponent } from './components/parent_component/parent-profile/parent-profile.component';







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

