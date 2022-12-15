import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import {Router} from '@angular/router';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MyserviceService } from '../myservice.service';
import { NotificationService } from '../../../notification.service';
// import { GoogleApiService  } from '../../../google-api.service';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';








@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../../../app.component.css']
})
export class SigninComponent implements OnInit {
  loginBtn: boolean = true;
  signupbtn: boolean = false;
  initialPage: boolean = true;
  otpPage: boolean = false;
  otp: any;
  errorMsg: string = '';
  OtpId: string = '';
  show:boolean = false;
  userId: any;
  localdata: any;
  token: any;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  data: any = { email: '', mobile: ''}
  signindata: any = { email: '', password: ''}
  otpdata: any = { email: '', otp: '' }
  signupform!: FormGroup
  signinform!: FormGroup
  otpform!: FormGroup

  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator,private httpClient: HttpClient,private service: MyserviceService,private notifyService : NotificationService,
    // private readonly google:GoogleApiService
     ) {
  }

  get email() { return this.signupform.get('email')!; }
  get mobile() { return this.signupform.get('mobile')!; }
  get username() { return this.signinform.get('username')!; }
  get password() { return this.signinform.get('password')!; }
  get myotp() { return this.otpform.get('otp')!; }


  ngOnInit(): void {
    // this.localdata =  localStorage.getItem('email')
    this.initialPage = true
    console.log('this.initialPage', this.initialPage)
    this.initForm()
    // this.signup()
  }

  private initForm() {
		this.signupform = new FormGroup({
        email: new FormControl(this.data.email, [
          Validators.required,
          Validators.email
        ]),
        mobile: new FormControl(this.data.mobile, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
        ])
      },
      { validators: identityRevealedValidator }
    );
    this.signinform = new FormGroup({
      email: new FormControl(this.signindata.email, [
          Validators.required,
        ]),
        password: new FormControl(this.signindata.password, [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      },
      { validators: identityRevealedValidator }
    );
    this.otpform = new FormGroup({
      // email: new FormControl(this.signindata.email, [
      //     Validators.required,
      //   ]),
        // otp: new FormControl(this.otpdata.otp, [
        //   Validators.required
        // ])
      },
      { validators: identityRevealedValidator }
    );
	}
  admin() {
    this.route.navigate(['/admin_signin']);
  }
  parent() {
    this.route.navigate(['/my_home']);
  }
  signupBtn(){
    this.initialPage = false
    this.loginBtn = false
    this.signupbtn = true
    console.log('this.initialPage11', this.initialPage)
  }
  signinBtn(){
    this.loginBtn = true
    this.signupbtn = false
    this.initialPage = true
    console.log('this.initialPage11', this.initialPage)
  }
  signup(){
    var data = {
    email : this.signupform.value.email,
    mobile : this.signupform.value.mobile
  }
    this.service.signup(data).subscribe((res: any)=>{
      if (res.success === true) {
        localStorage.setItem('email', this.signupform.value.email)
        this.otpPage = true
        this.notifyService.showSuccess("Otp sent successfully!", "")
      } else {
        this.otpPage = false
        this.notifyService.showError("Email already exists!", "")
      }
    })
    // if(!this.signupform.invalid){
    //   this.otpPage = true
    //   console.log(this.signupform)
    // }
  }
  signin(){
    var signindata = {
      email : this.signinform.value.email,
      password : this.signinform.value.password
    }
      this.service.signin(signindata).subscribe((res: any)=>{
      if ( res.success === true) {
        this.notifyService.showSuccess("Login success!", "")
        // this.errorMsg = res.msg;
        this.token = res.token;
        this.userId =res.student;
        localStorage.setItem('token', this.token)
        localStorage.setItem('userId', this.userId.user_id)
        localStorage.setItem('firstname', this.userId.first_name)
      console.log(this.token);
      console.log(this.userId);
      this.route.navigate(['/dashboard']);
      } else {
        this.notifyService.showError("Login failed!", "")
      }
      })
      if(!this.signinform.invalid){
        this.initialPage = true
        console.log(this.signinform)
      }
  }
  sendOTP(){
    // if(!this.signupform.invalid){
    //   this.otpPage = true
    //   console.log(this.signupform)
    // }
  }
  // click event function toggle
  passwordView() {
      this.show = !this.show;
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    console.log(this.otp);
  }

  verifyOTP() {
    var data = {
      email : localStorage.getItem('email'),
      otp : this.otp
    }
    this.service.otpVerify(data).subscribe((res: any)=>{
      this.OtpId = res.id;
      console.log(this.OtpId);
      localStorage.setItem('id', this.OtpId)
      this.notifyService.showSuccess("Otp Verification Successfull!", "")
      this.route.navigate(['/regiter_user']);

      })
  }
}
