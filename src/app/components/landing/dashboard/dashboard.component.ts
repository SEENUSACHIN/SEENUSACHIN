// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MyserviceService } from '../myservice.service';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  leaders:any  = [];
  scientist:any  = [];
  firstname:any = ''
  starleader:any = ''
  starscientist:any = ''

  constructor(private route:Router, private httpClient: HttpClient,private service: MyserviceService ) {

  }

  ngOnInit(): void {
    this.firstname = localStorage.getItem('firstname');
console.log(this.firstname);
    // this.service.top3().subscribe(data => {
    //   console.log(data);
    // });
this.topLeaderboard()
this.scientistLeaderboard()
  }
  teamlist() {
    this.route.navigate(['/teamlist'])
  }
  scientistList() {
    this.route.navigate(['/scientist'])
}
  topLeaderboard() {
   this.service.top3().subscribe((res: any)=>{
      this.leaders = res.teams
      this.starleader = res.teams[0]
      console.log(this.starleader);
    })
  }
  scientistLeaderboard() {
   this.service.scientistTop3().subscribe((res: any)=>{
      this.scientist = res.student
      this.starscientist = res.student[0]

      console.log(this.starscientist);
    })
  }
}
