import { Component, OnInit,Input , ViewChild, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
// import { MyHomeComponent } from './components/parent_component/my-home/my-home.component';
import { Observable,Subscriber, throwError } from 'rxjs';
import { ParentServiceService } from '../parent-service.service';
import { StudentProfileComponent } from '../student-profile/student-profile.component';






@Component({
  selector: 'app-parent-nav',
   template: `
    Message: {{message}}
    <!-- <app-child (messageEvent)="receiveMessage($event)"></app-child> -->
    <app-student-profile></app-student-profile>
  `,
  templateUrl: './parent-nav.component.html',
  styleUrls: ['./parent-nav.component.css']
})
export class ParentNavComponent implements OnInit {
  @Input() myProfile: any;
  @ViewChild(StudentProfileComponent)
  child:any;
  currentpage: string = '';
  parentPic = localStorage.getItem('parentPic');
  studentPic = localStorage.getItem('studentPic');
  userRole:any = localStorage.getItem('userRole');




  constructor(private route:Router,private parent: ParentServiceService,
    ) {
  }
  // ngAfterViewInit() {
  //   this.profilePic = this.child.profilePic
  //   console.log(this.profilePic);
  // }
  ngOnInit(): void {
    this.userRole;
    this.parentPic;
    this.studentPic;
       this.myProfile = this.studentPic
    console.log(this.studentPic);
    // this.ngAfterViewInit();
    // this.currentpage = this.router.history.current.path
  }
  navigation(tabs:any) {
    this.currentpage = tabs
    this.route.navigate([tabs])
    console.log(this.currentpage);
  }
  profile() {
    // this.route.navigate(['/parent_profile'])
    if (this.userRole == 'parent') {
      this.route.navigate(['/parent_profile'])
    }else {
      this.route.navigate(['/student_profile'])
    }
   }
   learningActivity() {
    this.route.navigate(['/inventory']);
  }
  studentActivity() {
    this.route.navigate(['/student_inventor']);
  }
  logout() {
    this.route.navigate(['/parent']);
  }

}
