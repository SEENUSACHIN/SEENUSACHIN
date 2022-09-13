import { NgModule } from '@angular/core';
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
  {path:'admin_activity', component: ActivityComponent}
];

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
    SidebarComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export const routingComponent = [GoalsComponent, VideoRatingComponent]
