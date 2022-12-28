import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { OrgServiceService } from '../org-service.service';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnInit {
  sessionform!: FormGroup;
  @ViewChild('closebutton') closebutton: any;
  sessionList: any = [
    // { name: 'Session1', topic: 'Topic1', date: '10-10-2022 10.30am' },
    // { name: 'Session2', topic: 'Topic2', date: '10-10-2022 10.30am' },
    // { name: 'Session3', topic: 'Topic3', date: '10-10-2022 10.30am' },
    // { name: 'Session4', topic: 'Topic4', date: '10-10-2022 10.30am' },
    // { name: 'Session5', topic: 'Topic5', date: '10-10-2022 10.30am' },
    // { name: 'Session6', topic: 'Topic6', date: '10-10-2022 10.30am' },
  ];
  sessionSubmitted = false;
  minTime: any;
  copiedText = '';
  constructor(
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const d = new Date();
    this.minTime = d.toISOString().substring(0, 16);
    console.log('this.minTime ', this.minTime);
    this.getSession()
    this.sessionform = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      registration_fees: ['', [Validators.required]],
      total_questions: ['', [Validators.required]],
      competition_type: ['', [Validators.required]],
      meeting_link: ['', [Validators.required]],
      start_datetime: ['', [Validators.required]],
      end_datetime: ['', [Validators.required]],
    });
  }
  get name() {
    return this.sessionform.get('name')!;
  }
  get description() {
    return this.sessionform.get('description')!;
  }
  get registration_fees() {
    return this.sessionform.get('registration_fees')!;
  }
  get total_questions() {
    return this.sessionform.get('total_questions')!;
  }
  get competition_type() {
    return this.sessionform.get('competition_type')!;
  }
  get meeting_link() {
    return this.sessionform.get('meeting_link')!;
  }
  get start_datetime() {
    return this.sessionform.get('start_datetime')!;
  }
  get end_datetime() {
    return this.sessionform.get('end_datetime')!;
  }
  get sf() {
    return this.sessionform.controls;
  }

  getSession() {
    this.org.getOrgSession().subscribe((response: any) => {
      if (response.success === true) {
        this.sessionList = response.session
        var now_date = new Date()
        for (var i = 0; i < this.sessionList.length; i++) {
          var end_datetime = new Date(this.sessionList[i].end_datetime)
          if(now_date >= end_datetime ) {
            console.log("enter drfghj");
            this.sessionList[i]['expired'] = true
          }
        }
      }
    });
  }

  startSession(session_id: any) {
    this.route.navigate(['/view_session/' + session_id]);
  }
  viewSession(session_id: any) {
    this.route.navigate(['/view_question/' + session_id]);
  }
  addSession () {
    this.sessionSubmitted = true;
    console.log("sessionform ", this.sessionform)
    if (!this.sessionform.invalid) {
      this.closebutton.nativeElement.click();
      console.log("sessionform ", this.sessionform.value)
      console.log(' moment ', new Date(this.sessionform.value.start_datetime));
      let start_datetime = (moment(new Date(this.sessionform.value.start_datetime))).format('YYYY-MM-DD HH:mm:ss')
      let end_datetime = (moment(new Date(this.sessionform.value.end_datetime))).format('YYYY-MM-DD HH:mm:ss')
      var sessionData = {
        name: this.sessionform.value.name,
        description: this.sessionform.value.description,
        registration_fees: this.sessionform.value.registration_fees,
        total_questions: this.sessionform.value.total_questions,
        competition_type: this.sessionform.value.competition_type,
        start_datetime: start_datetime,
        end_datetime: end_datetime,
        org_id: localStorage.getItem('org_id'),
        meeting_link: this.sessionform.value.meeting_link
      };
      this.org.createSession(sessionData).subscribe((response: any) => {
        if (response.success === true) {
          console.log('response ', response);
          this.notifyService.showSuccess(response.msg, '');
          this.getSession()
        } else {
          this.notifyService.showError(response.msg, '');
        }
      })
    }
  }
  goToCentralRep() {
    this.route.navigate(['/question_repository']);
  }
  onSuccess(e: any) {
    this.copiedText = e.text;
    console.log('this.copiedText ', this.copiedText);
  }

  onError(e: any) {
    this.copiedText = 'Error trying to copy your text';
  }
  copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
