import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from "@ng-select/ng-select";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing/landing-page/landing-page.component';
import { SigninComponent } from './components/landing/signin/signin.component';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';
import { RegistrationComponent } from './components/landing/registration/registration.component';
import { AdminSigninComponent } from './components/admin_component/admin-signin/admin-signin.component';
import { DashboardLayoutComponent } from './components/admin_component/dashboard/dashboard-layout/dashboard-layout.component';
import { GoalsComponent } from './components/admin_component/dashboard/goals/goals.component';
import { VideoRatingComponent } from './components/admin_component/dashboard/video-rating/video-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityComponent } from './components/admin_component/dashboard/activity/activity.component';
import { HeaderComponent } from './components/admin_component/dashboard/header/header.component';
import { SidebarComponent } from './components/admin_component/dashboard/sidebar/sidebar.component';
import { ClassesComponent } from './components/admin_component/dashboard/classes/classes.component';
import { SubjectsComponent } from './components/admin_component/dashboard/subjects/subjects.component';
import { ChaptersComponent } from './components/admin_component/dashboard/chapters/chapters.component';
import { TopicsComponent } from './components/admin_component/dashboard/topics/topics.component';
import { SubTopicsComponent } from './components/admin_component/dashboard/sub-topics/sub-topics.component';
import { VideoUploadComponent } from './components/admin_component/dashboard/video-upload/video-upload.component';
import { YoutubeComponent } from './components/admin_component/dashboard/youtube/youtube.component';
import { PlaylistVideosComponent } from './components/admin_component/dashboard/youtube/playlist-videos/playlist-videos.component';
import { EventsComponent } from './components/admin_component/dashboard/events/events.component';
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
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgImageSliderModule } from 'ng-image-slider';
import { DatepickerModule } from 'ng2-datepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import { KidsInventoryComponent } from './components/parent_component/kids-inventory/kids-inventory.component';
import { MyActivityComponent } from './components/parent_component/my-activity/my-activity.component';
import { MyHomeComponent } from './components/parent_component/my-home/my-home.component';
import { LearnMoreComponent } from './components/parent_component/learn-more/learn-more.component';
import { ParentNavComponent } from './components/parent_component/parent-nav/parent-nav.component';
import { ListPageComponent } from './components/parent_component/list-page/list-page.component';
import { DetailsPageComponent } from './components/parent_component/details-page/details-page.component';
import { ViewActivityComponent } from './components/parent_component/view-activity/view-activity.component';
import { TimelineModule } from "primeng/timeline";
import { CardModule } from "primeng/card";
import { ParentProfileComponent } from './components/parent_component/parent-profile/parent-profile.component';
import { ParentComponent } from './components/admin_component/dashboard/parent/parent.component';
import Zoom from "smooth-zoom";
import { StudentProfileComponent } from './components/parent_component/student-profile/student-profile.component';
import { StudentInventorComponent } from './components/parent_component/student-inventor/student-inventor.component';

// org-component
import { OrgSigninComponent } from './components/org_component/org-signin/org-signin.component';
import { OrgDashboardComponent } from './components/org_component/org-dashboard/org-dashboard.component';
import { OrgNavComponent } from './components/org_component/org-nav/org-nav.component';
import { ViewSessionComponent } from './components/org_component/view-session/view-session.component';
import { ViewQuestionComponent } from './components/org_component/view-question/view-question.component';

const routes: Routes = [
  // {path:'', redirectTo: localStorage.getItem('token') != null && localStorage.getItem('token') != '' ? 'admin_dashboard' : 'admin_signin', pathMatch: 'full'},
  {path:'', redirectTo: 'SignIn', pathMatch: 'full'},
  {path:'LandingPage', component: LandingPageComponent},
  {path:'SignIn' , component: SigninComponent},
  {path:'regiter_user' , component: RegistrationComponent},
  {path:'admin_signin', component: AdminSigninComponent},
  {path:'admin_dashboard', component: DashboardLayoutComponent},
  {path:'admin_goals', component: GoalsComponent},
  {path:'video_rating', component: VideoRatingComponent},
  {path:'admin_activity', component: ActivityComponent},
  {path:'admin_classes', component: ClassesComponent},
  {path:'admin_subjects', component: SubjectsComponent},
  {path:'admin_chapters', component: ChaptersComponent},
  {path:'admin_topics', component: TopicsComponent},
  {path:'admin_subtopics', component: SubTopicsComponent},
  {path:'video_upload', component: VideoUploadComponent},
  {path:'parentvideo_upload', component: ParentComponent},
  {path:'youtube', component: YoutubeComponent},
  {path:'playlist_video/:id', component: PlaylistVideosComponent},
  {path:'admin_event', component: EventsComponent},
  {path:'dashboard' , component: DashboardComponent},
  {path:'teamlist' , component: TeamListComponent},
  {path:'navbar' , component: NavbarComponent},
  {path:'myteam' , component: MyteamListComponent},
  {path:'scientist' , component: ScientistListComponent},
  {path:'goalPage' , component: GoalListComponent},
  {path:'eventpage' , component: EventListComponent},
  {path:'activity' , component: ActivityListComponent},
  {path:'upload' , component: UploadActivityComponent},
  {path:'activities' , component: ActivitiesComponent},
  {path:'profile' , component: ProfileComponent},
  {path:'recent' , component: RecentActivityComponent},
  {path:'inventory' , component: KidsInventoryComponent},
  {path:'my_activity' , component: MyActivityComponent},
  {path:'parent' , component: MyHomeComponent},
  {path:'learn_more/:id' , component: LearnMoreComponent},
  {path:'parentnav' , component: ParentNavComponent},
  {path:'activity_list/:id' , component: ListPageComponent},
  {path:'detailsPage/:id' , component: DetailsPageComponent},
  {path:'view_activity' , component: ViewActivityComponent},
  {path:'parent_profile' , component: ParentProfileComponent},
  {path:'student_profile' , component: StudentProfileComponent},
  {path:'student_inventor' , component: StudentInventorComponent},
  {path:'org_signin' , component: OrgSigninComponent},
  {path:'org_dashboard' , component: OrgDashboardComponent},
  {path:'view_session/:session_id' , component: ViewSessionComponent},
  {path:'view_question/:session_id' , component: ViewQuestionComponent}

];
declare global {
  interface Window {
    resize?: any;
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SigninComponent,
    RegistrationComponent,
    AdminSigninComponent,
    DashboardLayoutComponent,
    GoalsComponent,
    VideoRatingComponent,
    ActivityComponent,
    HeaderComponent,
    SidebarComponent,
    ClassesComponent,
    SubjectsComponent,
    ChaptersComponent,
    TopicsComponent,
    SubTopicsComponent,
    VideoUploadComponent,
    YoutubeComponent,
    PlaylistVideosComponent,
    EventsComponent,
    DashboardComponent,
TeamListComponent,
NavbarComponent,
MyteamListComponent,
ScientistListComponent,
GoalListComponent,
EventListComponent,
ActivityListComponent,
UploadActivityComponent,
ActivitiesComponent,
ProfileComponent,
RecentActivityComponent,
KidsInventoryComponent,
MyActivityComponent,
MyHomeComponent,
LearnMoreComponent,
ParentNavComponent,
ListPageComponent,
DetailsPageComponent,
ViewActivityComponent,
ParentProfileComponent,
ParentComponent,
StudentProfileComponent,
StudentInventorComponent,
OrgSigninComponent,
OrgDashboardComponent,
OrgNavComponent,
ViewSessionComponent,
ViewQuestionComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash : true}),
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    NgxUiLoaderModule,
    Ng2SearchPipeModule,
    NgImageSliderModule,
    DatepickerModule,
    NgxPaginationModule,
    TimelineModule,
    CardModule

  ],
  providers: [
    { provide: Window, useValue: window },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export const routingComponent = [GoalsComponent, VideoRatingComponent]
