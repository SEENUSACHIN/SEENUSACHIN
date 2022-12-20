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
import { Router } from '@angular/router';
import { OrgServiceService } from '../org-service.service';

@Component({
  selector: 'app-org-signin',
  templateUrl: './org-signin.component.html',
  styleUrls: ['./org-signin.component.css']
})
export class OrgSigninComponent implements OnInit {

  signinform!: FormGroup;
  registerForm!: FormGroup;
  registerOtpForm!: FormGroup;
  loginsubmitted = false;
  regSubmitted = false;
  regOtpSubmitted = false;
  signupPage = false;
  signinPage = true;
  otpsignupPage = false;
  org_id = ""

  constructor(
    private route: Router,
    private alterEgoValidator: UniqueAlterEgoValidator,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private org: OrgServiceService,
    private fb: FormBuilder
  ) { }

  get loginEmail() {
    return this.signinform.get('loginEmail')!;
  }
  get loginPassword() {
    return this.signinform.get('loginPassword')!;
  }
  get fd() {
    return this.signinform.controls;
  }
  get regName() {
    return this.registerForm.get('regName')!;
  }
  get regOtp() {
    return this.registerForm.get('regOtp')!;
  }
  get regMobile() {
    return this.registerForm.get('regMobile')!;
  }
  get regPassword() {
    return this.registerForm.get('regPassword')!;
  }
  get rf() {
    return this.registerForm.controls;
  }
  get otpEmail() {
    return this.registerOtpForm.get('otpEmail')!;
  }
  get rof() {
    return this.registerOtpForm.controls;
  }
  ngOnInit(): void {
    this.signinform = this.fb.group(
      {
        loginEmail: ['', [Validators.required, Validators.email]],
        loginPassword: [
          '', [
            Validators.required ],
        ],
      },
      { validators: identityRevealedValidator }
    );
    this.registerForm = this.fb.group({
      regName: ['', [Validators.required]],
      regOtp: ['', [Validators.required]],
      regMobile: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ],],
      regPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerOtpForm = this.fb.group({
      otpEmail: ['', [Validators.required, Validators.email]]
    });
  }

  signin() {
    this.loginsubmitted = true;
    console.log("enter signin ", this.signinform);
    if (!this.signinform.invalid) {
      var regdata = {
        email: this.signinform.value.loginEmail,
        password: this.signinform.value.loginPassword,
      };
      this.org.orgSignin(regdata).subscribe((response: any) => {
        if (response.success === true) {
          localStorage.setItem("token", response.token)
          localStorage.setItem("org_id", response.id)
          localStorage.setItem("org_name", response.name)
          this.notifyService.showSuccess(response.msg, '');
          this.route.navigate(['/org_dashboard'], {replaceUrl:true});
        } else {
          this.notifyService.showError(response.msg, '');
        }
      })
    }
  }
  sendOTP() {
    this.org_id = ""
    localStorage.clear();
    this.regOtpSubmitted = true;
    console.log("enter registerOtpForm ", this.registerOtpForm);
    if (!this.registerOtpForm.invalid) {
      var otpRegdata = {
        email: this.registerOtpForm.value.otpEmail
      };
      this.org.orgSignup(otpRegdata).subscribe((response: any) => {
        if (response.success === true) {
          this.signupPage = false;
          this.otpsignupPage = true;
          this.org_id = response.id;
          localStorage.setItem("org_id", this.org_id)
        } else {
          this.notifyService.showError(response.msg, '');
        }
      })
    }
  }
  signUp() {
    this.regSubmitted = true;
    console.log("enter signUp ", this.registerForm);
    if (!this.registerForm.invalid) {
      var regdata = {
        name: this.registerForm.value.regName,
        otp: this.registerForm.value.regOtp,
        password: this.registerForm.value.regPassword,
        mobile: this.registerForm.value.regMobile
      };
      this.org.orgRegister(regdata, this.org_id).subscribe((response: any) => {
        if (response.success === true) {
          localStorage.setItem("token", response.token)
          this.notifyService.showSuccess(response.msg, '');
          this.route.navigate(['/org_dashboard'], {replaceUrl:true});
        } else {
          this.notifyService.showError(response.msg, '');
        }
      })
    }
  }
  showSignup() {
    this.signupPage = true;
    this.signinPage = false;
  }
  showSignin() {
    this.signupPage = false;
    this.signinPage = true;
  }

}
