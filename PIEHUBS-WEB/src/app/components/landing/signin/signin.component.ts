import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import {Router} from '@angular/router';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../../../app.component.css']
})
export class SigninComponent implements OnInit {

  initialPage: boolean = true;
  otpPage: boolean = false;
  otp: any;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  data = { email: '', phone: ''}
  signindata = { email: '', password: ''}
  signupform!: FormGroup
  signinform!: FormGroup

  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator) { }

  get email() { return this.signupform.get('email')!; }
  get phone() { return this.signupform.get('phone')!; }
  get username() { return this.signinform.get('username')!; }
  get password() { return this.signinform.get('password')!; }

  ngOnInit(): void {
    this.initialPage = true
    console.log('this.initialPage', this.initialPage)
    this.initForm()
  }

  private initForm() {
		this.signupform = new FormGroup({
        email: new FormControl(this.data.email, [
          Validators.required,
          Validators.email
        ]),
        phone: new FormControl(this.data.phone, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$')
        ])
      },
      { validators: identityRevealedValidator }
    );
    this.signinform = new FormGroup({
      email: new FormControl(this.signindata.email, [
          Validators.required,
        ]),
        password: new FormControl(this.signindata.password, [
          Validators.required
        ])
      },
      { validators: identityRevealedValidator }
    );
	}

  signup(){
    this.initialPage = false
    console.log('this.initialPage11', this.initialPage)
  }

  signin(){
    this.initialPage = true
    console.log('this.initialPage11', this.initialPage)
  }


  sendOTP(){
    if(!this.signupform.invalid){
      this.otpPage = true
      console.log(this.signupform)
    }
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  verifyOTP() {
    console.log(' verifyOTP ')
    this.route.navigate(['/regiter_user']);
  }
}
