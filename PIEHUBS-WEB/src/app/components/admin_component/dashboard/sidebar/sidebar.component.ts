import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  activiTab: string = 'dashboard'
  @Input()
  collapseTwo : boolean = false
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  gotoGoals () {
    this.route.navigate(['/admin_goals']);
  }
  gotoVdoRating () {
    this.route.navigate(['/video_rating']);
  }
  gotoVdoUpload () {
    this.route.navigate(['/video_upload']);
  }
  gotoDashboard () {
    this.route.navigate(['/admin_dashboard']);
  }
  gotoActivity () {
    this.route.navigate(['/admin_activity']);
  }
  gotoClass () {
    this.route.navigate(['/admin_classes']);
  }
  gotoSubject () {
    this.route.navigate(['/admin_subjects']);
  }
  gotoChapter () {
    this.route.navigate(['/admin_chapters']);
  }
  gotoTopic () {
    this.route.navigate(['/admin_topics']);
  }
  gotoSubTopic () {
    this.route.navigate(['/admin_subtopics']);
  }
  gotoYoutube () {
    this.route.navigate(['/youtube']);
  }
  gotoEvents () {
    this.route.navigate(['/admin_event']);
  }
  logoutAdmin() {
    console.log("enter logoutAdmin")
    localStorage.clear();
  }
}
