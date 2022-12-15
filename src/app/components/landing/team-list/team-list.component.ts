import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MyserviceService } from '../myservice.service';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
  // encapsulation: ViewEncapsulation.Emulated
})
export class TeamListComponent implements OnInit {
  products:any  = [];
  teamlList:any  = [];


  constructor(private route:Router, private httpClient: HttpClient,private service: MyserviceService ) { }

  ngOnInit(): void {
    this.teamLeaderboard()
    this.allTeamlist()
  }

  myTeam() {
    this.route.navigate(['/myteam']);

  }
  teamLeaderboard() {
    this.service.top3().subscribe((res: any)=>{
       this.products = res.teams
       console.log(this.products);
     })
   }
  allTeamlist() {
    this.service.teamAlllist().subscribe((res: any)=>{
       this.teamlList = res.teams
       console.log(this.products);
     })
   }
}
