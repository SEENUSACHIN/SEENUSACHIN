import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-parent-nav',
  templateUrl: './parent-nav.component.html',
  styleUrls: ['./parent-nav.component.css']
})
export class ParentNavComponent implements OnInit {
  currentpage: string = '';
  parentPic = localStorage.getItem('parentPic');
  studentPic = localStorage.getItem('studentPic');
  userRole:any = localStorage.getItem('userRole');




  constructor(private route:Router) { }

  ngOnInit(): void {
    this.userRole;
    this.parentPic;
    this.studentPic;
    console.log(this.studentPic);
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
