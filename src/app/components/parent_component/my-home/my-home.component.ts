import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Observable,Subscriber, throwError } from 'rxjs';

import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ParentServiceService } from '../parent-service.service';
import { NotificationService } from '../../../notification.service';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css'],
})
export class MyHomeComponent implements OnInit {
  // @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('closebutton') closebutton: any;
  loginBtn: boolean = true;
  signupbtn: boolean = true;
  otpPage: boolean = false;
  registrationform!: FormGroup;
  signinform!: FormGroup;
  registerForm!: FormGroup;
  forgotPassword!: FormGroup;
  resetPassword!: FormGroup;
  otpform!: FormGroup;
  graduateform!: FormGroup;
  initialPage: boolean = true;
  graduate: boolean = false;
  data: any = { email: '', mobile: '', password: '', parentname: '', role: '' };
  signindata: any = { loginemail: '', loginpassword: '' };
  forgotdata: any = { forgotemail: '' };
  resetdata: any = { user_id: '', password: '', resetotp: '' };
  graduateData: any = { college_name: '', program: '', department: '' };
  otpdata: any = { name: '', otp: '' };
  otp: any;
  resetotp: any;
  token: string = '';
  parentToken: any = '';
  groupId: any = '';
  parentId: any = '';
  parentPic: any = '';
  studentPic: any = '';
  studentProfile: any = '';
  graduateId: any = '';
  pid: any = '';
  childrens: any = [];
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };
  submitted = false;
  loginsubmitted = false;
  graduateSubmitted = false;
  forgotsubmitted = false;
  resetsubmitted = false;
  forgotpasswordPage = true;
  resetpasswordPage = false;


  role: any = ['parent', 'graduate'];
  selected = '';
  graduateDetail: any = [];
  graduateLogin: any = [];
  graduateToken: any = '';
  regToken: any = '';
  regId: any = '';
  userRole: any = '';
  graduateUserId: any = '';
  stuPic: any = '';
  studentInfo: any = [];
  myId: any = '';
  myFiles1: string[] = [];

  constructor(
    private route: Router,
    private alterEgoValidator: UniqueAlterEgoValidator,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private parent: ParentServiceService,
    private fb: FormBuilder
  ) {
    // this.createForm();
  }
  // createForm() {
  //   this.registerForm = this.fb.group({
  //     sampleEmail: ['', [Validators.required, Validators.sampleEmail]],
  //   }
  //   );
  // }
  get clgname() {
    return this.graduateform.get('college_name')!;
  }
  get coursename() {
    return this.graduateform.get('program')!;
  }
  get deptname() {
    return this.graduateform.get('department')!;
  }
  get name() {
    return this.otpform.get('name')!;
  }
  get parentname() {
    return this.registrationform.get('parentname')!;
  }
  get password() {
    return this.registrationform.get('password')!;
  }
  get email() {
    return this.registrationform.get('email')!;
  }
  get loginemail() {
    return this.signinform.get('loginemail')!;
  }
  get forgotemail() {
    return this.forgotPassword.get('forgotemail')!;
  }

  get mobile() {
    return this.registrationform.get('mobile')!;
  }
  get usertype() {
    return this.registrationform.get('role')!;
  }
  get myotp() {
    return this.otpform.get('otp')!;
  }
  get resetOtp() {
    return this.resetPassword.get('resetotp')!;
  }
  get loginpassword() {
    return this.signinform.get('loginpassword')!;
  }
  ngOnInit(): void {
    console.log('studentPic',this.studentPic);
    this.forgotPassword = this.fb.group({
      forgotemail: ['',[Validators.required, Validators.email]]
    })
    this.resetPassword = this.fb.group({
      resetPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.graduateform = this.fb.group({
      college_name: ['', [Validators.required]],
      program: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signinform = this.fb.group(
      {
        loginemail: ['', [Validators.required, Validators.email]],
        loginpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ],
        ],
      },
      { validators: identityRevealedValidator }
    );
    this.registrationform = this.fb.group(
      {
        parentname: ['', [Validators.required]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ],
        ],
        mobile: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
      },
      { validators: identityRevealedValidator }
    );
    this.otpform = new FormGroup(
      {
        name: new FormControl(this.otpdata.name, [Validators.required]),
      },
      { validators: identityRevealedValidator }
    );
  }
  get f() {
    return this.registerForm.controls;
  }
  get forgot() {
    return this.forgotPassword.controls;
  }
  get reset() {
    return this.resetPassword.controls;
  }
  get fd() {
    return this.signinform.controls;
  }

  get rf() {
    return this.registrationform.controls;
  }
  get gR() {
    return this.graduateform.controls;
  }

  signupBtn() {
    this.initialPage = false;
    this.loginBtn = false;
    this.signupbtn = true;
    console.log('this.initialPage11', this.initialPage);
  }
  signinBtn() {
    this.initialPage = true;
    this.loginBtn = true;
    this.signupbtn = false;

    console.log('this.initialPage11', this.initialPage);
  }
  signin() {
    localStorage.clear();
    this.loginsubmitted = true;
    if (!this.signinform.invalid) {
      var signindata = {
        email: this.signinform.value.loginemail,
        password: this.signinform.value.loginpassword,
      };
      this.parent.parentsignin(signindata).subscribe((response: any) => {
        if (response.success === true) {
          this.parentToken = response.token;
          console.log(response);
          if (response.parent != null) {
            this.userRole = 'parent';
            console.log('if', response.parent);
            this.groupId = response.childrens;
            this.parentId = response.parent.id;
            this.parentPic = response.parent.profile_pic;
            this.childrens = response.childrens;
            console.log('parentToken', this.parentToken);
            console.log('groupId', this.groupId);
            // localStorage.setItem('email', this.signinform.value.email)
            localStorage.setItem('userRole', this.userRole);
            localStorage.setItem('parentPic', this.parentPic);
            localStorage.setItem('parentToken', this.parentToken);
            localStorage.setItem('group_id', this.groupId);
            localStorage.setItem('registerParentId', this.parentId);
            localStorage.setItem('childrens', JSON.stringify(this.childrens));
            this.route.navigate(['/inventory']);
            this.notifyService.showSuccess(response.msg, '');
          } else {
            this.userRole = 'student';
            this.regToken = response.token;
            this.graduateUserId = response.graduate[0].user_id;
            this.stuPic = response.graduate[0].profile_pic;
            this.graduateLogin = response.graduate[0];
            // this.graduateDetail
            localStorage.setItem('studentPic', this.stuPic);
            localStorage.setItem('regToken', this.regToken);
            localStorage.setItem('graduateUserId', this.graduateUserId);
            localStorage.setItem(
              'graduateLogin',
              JSON.stringify(this.graduateLogin)
            );

            console.log('graduateLogin', this.graduateLogin);
            console.log('else', response);
            this.route.navigate(['/student_inventor']);
            this.notifyService.showSuccess(response.msg, '');
          }
        } else {
          this.otpPage = false;
          this.notifyService.showError(response.msg, '');
        }
      });
      return;
    }
  }
  parentsignUp() {
    this.submitted = true;
    localStorage.clear();
    if (!this.registrationform.invalid) {
      var data = {
        name: this.registrationform.value.parentname,
        email: this.registrationform.value.email,
        mobile: this.registrationform.value.mobile,
        password: this.registrationform.value.password,
        role: this.registrationform.value.role,
      };
      console.log('data ', data);
      this.parent.parentsignUp(data).subscribe((response: any) => {
        if (response.success === true) {
          localStorage.setItem(
            'parentemail',
            this.registrationform.value.email
          );
          localStorage.setItem(
            'parentname',
            this.registrationform.value.parentname
          );
          localStorage.setItem('RegparentId', response.user_id);
          console.log(
            'parentId Register',
            localStorage.setItem('parentId', response.user_id)
          );
          this.otpPage = true;
          this.notifyService.showSuccess(response.msg, '');
        } else {
          this.otpPage = false;
          this.notifyService.showError(response.msg, '');
        }
      });
      return;
    }
    // this.otpPage = true
    // this.route.navigate(['/inventory']);
  }
  resendOtp() {
    var data = {
      name: this.registrationform.value.parentname,
      email: this.registrationform.value.email,
      mobile: this.registrationform.value.mobile,
      password: this.registrationform.value.password,
    };
    this.parent.parentsignUp(data).subscribe((response: any) => {
      console.log(response);
    });
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    console.log(this.otp);
  }
  resetOtpChange(otp: any) {
    this.resetotp = otp;
    console.log(this.otp);
  }
  update(e: any) {
    this.selected = e.target.value;
  }
  verifyOTP() {
    var myname = localStorage.getItem('parentname');
    var otpdata = {
      name: myname,
      otp: this.otp,
    };
    this.parent.parentOtp(otpdata).subscribe((response: any) => {
      if (response.success === true) {
        console.log('register', response);
        this.token = response.token;
        if (response.parent != null) {
          this.pid = response.parent.id;
          localStorage.setItem('parentToken', this.token);
          localStorage.setItem('registerParentId', this.pid);
          console.log('askjdklasjldkljasjkl', this.pid);
          this.initialPage = false;
          this.otpPage = false;
        } else {
          this.graduateId = response.user_id;
          console.log('tgid', this.graduateId);
          localStorage.setItem('graduateUserId', this.graduateId);
        }
        console.log('otp', this.otpPage);
        if (response.parent != null) {
          this.route.navigate(['/inventory/']);
          console.log('parent ', response.parent);
        } else {
          this.initialPage = false;
          this.otpPage = false;
          this.graduate = true;
          console.log('graduate', this.graduate);
        }
        this.notifyService.showSuccess(response.msg, '');
      } else {
        // this.otpPage = false
        this.notifyService.showError(response.msg, '');
      }
      //   this.notifyService.showSuccess("Otp Verification Successfull!", "")
      // this.route.navigate(['/inventory']);
    });
  }
  graduateReg() {
    // this.graduateId = id;
    this.graduateSubmitted = true;
    // localStorage.clear();
    if (!this.graduateform.invalid) {
      var data = {
        college_name: this.graduateform.value.college_name,
        program: this.graduateform.value.program,
        department: this.graduateform.value.department,
      };
      const formdata = new FormData();
      formdata.append('college_name', this.graduateform.value.college_name);
      formdata.append('program', this.graduateform.value.program);
      formdata.append('department', this.graduateform.value.department);
      formdata.append('profile', this.myFiles1[0]);

      this.parent.graduateReg(formdata).subscribe((response: any) => {
        console.log(response);
        if (response.success === true) {
          this.graduateDetail = response.graduate;
          this.graduateToken = response.token;
          this.studentPic = response.graduate.profile_pic;
          localStorage.setItem('studentPic', this.studentPic);
          localStorage.setItem('details', this.graduateDetail);
          localStorage.setItem('regToken', this.graduateToken);
          console.log('details', this.graduateDetail);
          console.log('regToken', this.graduateToken);
          console.log('studentPic', this.studentPic);
          this.route.navigate(['/student_inventor']);
          this.getStudentInfo();
          this.notifyService.showSuccess(response.msg, '');
        } else {
          this.notifyService.showError(response.msg, '');
        }
      });
    }
    return;
  }
  uploadFiles1() {
    const frmData = new FormData();
    for (var j = 0; j < this.myFiles1.length; j++) {
      frmData.append('profile', this.myFiles1[j]);
    }
  }
  getFileDetails1(e: any) {
    //console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myFiles1.push(e.target.files[j]);

      console.log('this.myFiles1 ', this.myFiles1);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.studentPic = event.target.result;
      }
    }
  }
  getStudentInfo() {
    this.parent.studentProfileDetails().subscribe((response: any) => {
      console.log('getStudent', response);
      if (response.success == true) {
        this.studentInfo = response.graduate;
        this.studentProfile = this.studentInfo.profile_pic;
        console.log('student', this.studentInfo);
        localStorage.setItem('studentPic', this.studentProfile);
        console.log('pic', this.studentProfile);
      }
    });
  }
  forgotpassword() {
    this.forgotsubmitted = true
    this.forgotpasswordPage = true
    if (!this.forgotPassword.invalid) {
    var data = {
      email: this.forgotPassword.value.forgotemail,
    };
    this.parent.forgotPassword(data).subscribe((response: any) => {
      if(response.success == true) {
        this.myId = response.id
        console.log("sadfasd",this.myId);
        this.forgotpasswordPage = false
        this.resetpasswordPage = true
        this.notifyService.showSuccess(response.msg, '');
      } else {
        this.notifyService.showError(response.msg, '');
      }    })
  }
  return
  }
  resetpassword() {
    this.resetsubmitted = true
    if (!this.resetPassword.invalid) {
    var resetdata = {
      user_id: this.myId,
      password: this.resetPassword.value.resetPassword,
      otp: this.resetotp
    };
    this.parent.resetPassword(resetdata).subscribe((response: any) => {
      if(response.success == true) {
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');
      }else {
        this.notifyService.showError(response.msg, '');
      }
    })

  }
  return
}
}
