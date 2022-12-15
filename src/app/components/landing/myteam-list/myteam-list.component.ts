import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MyserviceService } from '../myservice.service';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { NotificationService } from '../../../notification.service';




@Component({
  selector: 'app-myteam-list',
  templateUrl: './myteam-list.component.html',
  styleUrls: ['./myteam-list.component.css']
})
export class MyteamListComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  name = 'Angular 4';
  url:any = '';
  teamId:string = '';
  myteam:any = [];
  data: any = { team_name: '', user_id: '', members:''}
  createTeam!: FormGroup
  userId:any = ''
  addedteamlList:any = []


  constructor(private route:Router,private httpClient: HttpClient,private service: MyserviceService,private alterEgoValidator: UniqueAlterEgoValidator,private fb: FormBuilder,     private notifyService: NotificationService
    ) { }
  get team_name() { return this.createTeam.get('team_name')!; }
  get members() { return this.createTeam.get('members')!; }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.createTeam = this.fb.group({
      team_name: ['', Validators.required],
      members: ['', [Validators.required, Validators.email]],
    });
    this.initForm()
    $(".upload-button").on('click', function() {
      $(".file-upload").click();
   });
   this.myTeams()
  }

  private initForm() {

		// this.createTeam = new FormGroup({
    //   members: new FormControl(this.data.members, [
    //     Validators.required,
    //     Validators.email
    //   ])
    // });
  }

  myTeamDetails() {
    this.route.navigate(['/myteam']);
  }

  scientistLeaderboard() {
    this.service.scientistTop3().subscribe((res: any)=>{
       this.myteam = res.teams
       console.log(this.myteam);
     })
   }
    myTeams() {
    this.service.myteamlist().subscribe(async (res: any)=>{
       this.myteam = res.teams;
       for(let i=0;i<this.myteam.length ;i++){
        console.log(this.myteam[i].id);
        this.teamId = this.myteam[i].id
        this.service.myTeamMembers(this.teamId).subscribe((res: any)=>{
          this.myteam[i]['teamMem'] =  res.student
          // let myteamMem = []
          // myteamMem = res.student
          //  console.log("team members ", myteamMem);
          // return myteamMem
        })
        //  var myTmembers =  await this.mymembers(this.teamId)
        //  console.log("myTmembers ", myTmembers);
        //  this.myteam[i]['teamMem'] =  myTmembers
        }
       console.log(this.myteam);
     })
   }
   mymembers(id :any) {

    this.service.myTeamMembers(id).subscribe((res: any)=>{
      let myteamMem = []
      myteamMem = res.student
       console.log("team members ", myteamMem);
      return myteamMem
     })

   }
onSelectFile(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
  }
}
addedmemberlist(teamId:any) {
  var data = {
    email : this.createTeam.value.email,
  }
  this.service.addedmemberlist(this.teamId,data).subscribe((response: any) => {
    if(response.success) {
      this.closebutton.nativeElement.click();
      this.notifyService.showSuccess(response.msg, "")
    }
  })
}
createNewTeam() {
  var data = {
    team_name : this.createTeam.value.team_name,
    user_id : this.userId,
    members : this.createTeam.value.members,
  }
  const formdata = new FormData();
    formdata.append('team_name', this.createTeam.value.team_name);
    formdata.append('user_id', this.userId);
    formdata.append('members', this.createTeam.value.members);

  this.service.createNewTeam(formdata).subscribe((response: any) => {
    if(response.success) {
      this.closebutton.nativeElement.click();
      this.notifyService.showSuccess(response.msg, "")
    }
  })
}
}
