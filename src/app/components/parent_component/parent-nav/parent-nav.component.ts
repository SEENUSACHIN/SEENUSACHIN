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



  constructor(private route:Router) { }

  ngOnInit(): void {
    this.parentPic
    // this.currentpage = this.router.history.current.path
  }
  navigation(tabs:any) {
    this.currentpage = tabs
    this.route.navigate([tabs])
    console.log(this.currentpage);
  }
  profile() {
    this.route.navigate(['/parent_profile'])
   }
   learningActivity() {
    this.route.navigate(['/inventory']);
  }
  logout() {
    this.route.navigate(['/parent']);


  }
}
