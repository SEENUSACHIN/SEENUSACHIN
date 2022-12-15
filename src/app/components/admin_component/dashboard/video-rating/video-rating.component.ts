import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../../shared/alter-ego.directive';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'



@Component({
  selector: 'app-video-rating',
  templateUrl: './video-rating.component.html',
  styleUrls: ['./video-rating.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class VideoRatingComponent implements OnInit {
  @ViewChild('closebutton') closebutton : any;
  // RateOrView : string = 'rate'
  activiTab: string = 'dashboard'
  ratingdata = { atoms_scored: '', comments: ''}
  ratingform!: FormGroup
  searchform!: FormGroup
  currentRate = 0
  editRating : boolean = false
  activityId:string = ''
  viewId:string = ''
  displayStyle = "none";
  vdoPlay : boolean = false
  vdoPlay1 : boolean = false
  myapprovalList:any = [];
  myapprovedList:any = [];
  approvedList:any = [];
  myRatedActivity:any = [];
  myapprovalListdetails:any = [];
  approveBtn : boolean = true
  approvedBtn: boolean = false
  unApproved : boolean = false
  approved: boolean = false
  video_url:string = ''
  comments:any = ''
  atoms_scored:any = ''
  search:any = ''
  filteredList:any = [];
  submitted = false

  // vdolist = [
  //   { id : "1", name : "Harini", class: "7", school: "Chem Roast", date : "06-09-2022", activity_name : 'Activity name1', score: '29', profile : '' },
  //   { id : "2", name : "Jayaharini T", class: "12", school: "Chem Roast ijk uh", date : "16-09-2022", activity_name : 'Activity name2', score: 'New', profile : '' },
  //   { id : "3", name : "Deepika", class: "3", school: "Chem Roast da", date : "08-09-2022", activity_name : 'Activity name3', score: '29', profile : '' },
  // ]
  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator,private manage: ManageServiceService, private notifyService : NotificationService, private fb:FormBuilder) { }

  get atomsScored() { return this.ratingform.get('atoms_scored')!; }
  get comment() { return this.ratingform.get('comments')!; }

  ngOnInit(): void {
    this.ratingform = this.fb.group({
      atoms_scored : ['', [Validators.required]],
      comments: ['', [Validators.required ]],
    });

    this.initForm()
    this.getActivityList()
    // this.searchGoal()
    // this.getapprovedActivityList()
  }
  setId(data: any): void {
  this.activityId = data.id;
}
  setviewId(data: any, data1:any): void {
  this.atoms_scored= data;
  this.comments = data1;
  console.log(this.viewId);
}
 setvideoUrl(data: any): void {
this.video_url = data
}
  private initForm() {
    this.searchform = new FormGroup({
      search: new FormControl(this.search)
    })
    this.ratingform = new FormGroup({
      atoms_scored: new FormControl(this.ratingdata.atoms_scored, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(100)
      ]),
      comments: new FormControl(this.ratingdata.comments, [
        Validators.required
      ])
      },
      { validators: identityRevealedValidator }
    );
	}
  onKey(event:any) {
    console.log("search", this.searchform.value.search);
    if(this.searchform.value.search.length == 0) {
      // this.myapprovedList = this.filteredList
    }
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
  get fd() {
    return this.searchform.controls;
  }
  playvdo(val: boolean) {
    let video : any = document.querySelector('video');
    video.pause()
    video.currentTime = 0
  }
  // playvdo1(val: boolean) {
  //   let video : any = document.querySelector('video');
  //   video.pause()
  //   video.currentTime = 0
  // }
  rateActivity() {
    this.submitted = true
    if (!this.ratingform.invalid) {
    var data = {
      atoms_scored : this.ratingform.value.atoms_scored,
      comments : this.ratingform.value.comments,
    }
    this.manage.rateActivity(data, this.activityId).subscribe((response: any) => {
      if(response.success) {
        // setTimeout(() => {
        //   this.ngxService.stop();
        // });
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, "")

        // this.createEvent = response.class
        this.getActivityList()
      }

    });
    return
  }
  }
  // // viewRateActivity(id:any) {

  // //   this.manage.viewRateActivity(id).subscribe((response: any) => {
  // //     this.myRatedActivity = response.user_activity
  // //     console.log(this.myRatedActivity);
  // //   })

  // }
  getActivityList() {
    this.unApproved = false
    this.approved = true
    this.approveBtn = true
    this.approvedBtn = false
    var data = {
      search : this.searchform.value.search
    }
    this.manage.getActivitylist(data).subscribe((response: any) => {
      this.myapprovalList = response.user_activity
      console.log(this.myapprovalList);
    })
  }
  getapprovedActivityList() {
    this.unApproved = true
    this.approved = false
    this.approvedBtn = true
    this.approveBtn = false
    var data = {
      search : this.searchform.value.search
    }
    this.manage.getapprovedActivityList(data).subscribe((response: any) => {
      this.myapprovedList = response.user_activity
      // console.log(this.myapprovedList[0].student);
      // if(this.searchform.value.search > 0) {
      //   this.myapprovedList = this.filteredList
      // } else {
        // this.myapprovedList = response.user_activity
      // }
      console.log(this.myapprovedList);
    })
  }
  // searchGoal( ) {
  //   var data = {
  //     search : this.searchform.value.search
  //   }
  //   console.log(data);
  //   this.manage.search( data).subscribe((res: any)=>{
  //     if(res.success) {
  //       this.filteredList = res.filter_arr
  //         this.myapprovedList = this.filteredList
  //       console.log(this.filteredList);
  //     }
  //   })
  // }
}
