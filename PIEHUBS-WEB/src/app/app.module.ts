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

const routes: Routes = [
  {path:'', redirectTo: localStorage.getItem('token') != null && localStorage.getItem('token') != '' ? 'admin_dashboard' : 'admin_signin', pathMatch: 'full'},
  // {path:'', redirectTo: 'LandingPage', pathMatch: 'full'},
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
  {path:'youtube', component: YoutubeComponent},
  {path:'playlist_video/:id', component: PlaylistVideosComponent},
  {path:'admin_event', component: EventsComponent},
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
    EventsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    { provide: Window, useValue: window },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export const routingComponent = [GoalsComponent, VideoRatingComponent]
