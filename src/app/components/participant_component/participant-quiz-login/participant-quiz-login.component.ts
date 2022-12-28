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
    this.registerForm = this.fb.group({
      meeting_id: ['', [Validators.required]]
    });
  }

  login() {
    this.regSubmitted = true;
    if (!this.registerForm.invalid) {
      this.route.navigate(['/participant_quiz']);
    }
  }
}
