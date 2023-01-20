import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { NotificationService } from '../../../notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrgServiceService } from '../../org_component/org-service.service';

@Component({
  selector: 'app-participant-register',
  templateUrl: './participant-quiz-login.component.html',
  styleUrls: ['./participant-quiz-login.component.css']
})
export class ParticipantQuizLoginComponent implements OnInit {
  registerForm!: FormGroup;
  regSubmitted = false
  successMessage = ""
  showSuccess = false
  session_id : any
  participant_id : any
  session_name : any
  constructor(
    private routeP: ActivatedRoute,
    private route: Router,
    private alterEgoValidator: UniqueAlterEgoValidator,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private org: OrgServiceService,
    private fb: FormBuilder
  ) { }

  get meeting_id() {
    return this.registerForm.get('meeting_id')!;
  }
  get rf() {
    return this.registerForm.controls;
  }
  ngOnInit(): void {
    this.session_id = this.routeP.snapshot.paramMap.get('sessionId')
    this.participant_id = this.routeP.snapshot.paramMap.get('participantId')
    this.registerForm = this.fb.group({
      meeting_id: ['', [Validators.required]]
    });
  }

  login() {
    this.regSubmitted = true;
    console.log(' this.registerForm ', this.registerForm);
    if (!this.registerForm.invalid) {
      localStorage.setItem("room_id",  this.registerForm.value.meeting_id)
      this.org.participantAuth(this.participant_id).subscribe((response: any) => {
        if (response.success === true) {
          console.log('response ', response);
          localStorage.setItem("participantToken", response.token)
          // this.notifyService.showSuccess(response.success, '');
          this.route.navigate(['/participant_quiz_start/'+ this.session_id + '/' + this.participant_id]);
        } else {
          this.notifyService.showError(response.success, '');
        }
      })

    }
  }
}
