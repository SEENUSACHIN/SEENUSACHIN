import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  showGoals : boolean = false
  showVdoRating : boolean = false
  showDashboard : boolean = true
  constructor(private route:Router) { }

  ngOnInit(): void {
    console.log("localStorage.getItem('token') ",
     localStorage.getItem('token'))
  }
  gotoGoals () {
    this.route.navigate(['/admin_goals']);
  }
  gotoVdoRating () {
    this.route.navigate(['/video_rating']);
  }
  gotoDashboard () {
    this.route.navigate(['/admin_dashboard']);
  }
  gotoActivity () {
    this.route.navigate(['/admin_activity']);
  }
  logoutAdmin() {
    localStorage.clear();
  }
}
