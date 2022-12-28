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
  templateUrl: './participant-register.component.html',
  styleUrls: ['./participant-register.component.css']
})
export class ParticipantRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  regSubmitted = false
  successMessage = ""
  showSuccess = false
  showPaymentSuccess = false
  session_id : any
  session_name : any
  participant_id : any
  constructor(
    private routeP: ActivatedRoute,
    private route: Router,
    private alterEgoValidator: UniqueAlterEgoValidator,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private org: OrgServiceService,
    private fb: FormBuilder
  ) { }

  get regName() {
    return this.registerForm.get('regName')!;
  }
  get regEmail() {
    return this.registerForm.get('regEmail')!;
  }
  get regMobile() {
    return this.registerForm.get('regMobile')!;
  }
  get rf() {
    return this.registerForm.controls;
  }
  ngOnInit(): void {
    this.session_id = this.routeP.snapshot.paramMap.get('session_id')
    this.session_name = this.routeP.snapshot.paramMap.get('name')
    this.registerForm = this.fb.group({
      regName: ['', [Validators.required]],
      regEmail: ['', [Validators.required, Validators.email]],
      regMobile: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ],],
    });
  }

  Regiter() {
    // participantRegister
    this.regSubmitted = true;
    console.log("enter signUp ", this.registerForm);
    if (!this.registerForm.invalid) {
      var regdata = {
        name: this.registerForm.value.regName,
        email: this.registerForm.value.regEmail,
        mobile: this.registerForm.value.regMobile
      };
      this.org.participantRegister(regdata, this.session_id).subscribe((response: any) => {
        if (response.success === true) {
          this.showSuccess = true
          this.successMessage = response.msg
          this.participant_id = response.id
          // this.notifyService.showSuccess(response.msg, '');
        } else if (response.success === false) {
          if (response.msg == 'Not paid') {
            this.participant_id = response.id
            this.showSuccess = true
            this.successMessage = response.msg
          } else if (response.msg == 'Check email') {
            this.notifyService.showError("You have already registered for this game. Please check your mail.", '');
          } else {
            this.notifyService.showError(response.msg, '');
          }
        }
      })
    }
  }
  makePayment() {
    this.org.participantMakePayment(this.participant_id, this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        this.showSuccess = false
        this.showPaymentSuccess = true
        this.successMessage = response.msg
        // this.notifyService.showSuccess(response.msg, '');
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }
  gotoMainPage() {
    this.route.navigate(['/participant_games'], {replaceUrl:true});
  }
}
