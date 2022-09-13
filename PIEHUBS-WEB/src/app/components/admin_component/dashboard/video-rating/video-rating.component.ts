import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../../shared/alter-ego.directive';

@Component({
  selector: 'app-video-rating',
  templateUrl: './video-rating.component.html',
  styleUrls: ['./video-rating.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class VideoRatingComponent implements OnInit {
  ratingdata = { rate: '', comments: ''}
  ratingform!: FormGroup
  currentRate = 0
  editRating : boolean = false
  displayStyle = "none";
  vdoPlay : boolean = false
  vdolist = [
    { id : "1", name : "Harini", class: "7", school: "Chem Roast", date : "06-09-2022", activity_name : 'Activity name1', score: '29', profile : '' },
    { id : "2", name : "Jayaharini T", class: "12", school: "Chem Roast ijk uh", date : "16-09-2022", activity_name : 'Activity name2', score: 'New', profile : '' },
    { id : "3", name : "Deepika", class: "3", school: "Chem Roast da", date : "08-09-2022", activity_name : 'Activity name3', score: '29', profile : '' },
  ]
  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator) { }

  get rate() { return this.ratingform.get('rate')!; }
  get comments() { return this.ratingform.get('comments')!; }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.ratingform = new FormGroup({
      rate: new FormControl(this.ratingdata.rate, [
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
  playvdo(val: boolean) {
    let video : any = document.querySelector('video');
    video.pause()
    video.currentTime = 0
  }

}
