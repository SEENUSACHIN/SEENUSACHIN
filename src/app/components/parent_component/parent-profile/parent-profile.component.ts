import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ParentServiceService } from '../parent-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { NotificationService } from '../../../notification.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css'],
})
export class ParentProfileComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton1') closebutton1: any;
  registerForm!: FormGroup;
  registrationform!: FormGroup;
  basicDetailsForm!: FormGroup;
  parentOtpform!: FormGroup;
  addexistingForm!: FormGroup;
  editform!: FormGroup;
  graduateform!: FormGroup;
  parentform!: FormGroup;
  submitted = false;
  parentdata: any = { parentname: '', profile: '' };
  mapdata: any = { Email: '' };
  data: any = { email: '', mobile: '' };
  otpdata: any = { email: '', otp: '' };
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };
  otp: any;
  OtpId: string = '';
  childID: string = '';
  parentId: any = '';
  RegparentId: any = '';
  // graduateLogin: any = '';
  kids: any = [];
  graduateLogin: any = [];
  totalKids: any = [];
  parentInfo: any = '';
  childDatas: any = '';
  newChildemail: any = '';
  mapChildemail: any = '';
  editId: any = '';
  birthDate: any = '';
  parentprofileId: string = '';
  studentprofileId: string = '';

  basicInfo: boolean = true;
  addkids: boolean = true;
  viewChild: boolean = false;
  otpPage: boolean = false;
  myFiles: string[] = [];
  myFiles1: string[] = [];
  // existingChild:boolean = false;
  existing: boolean = true;
  selected = '';
  standards = [
    'Standard 1',
    'Standard 2',
    'Standard 3',
    'Standard 4',
    'Standard 5',
    'Standard 6',
    'Standard 7',
    'Standard 8',
    'Standard 9',
    'Standard 10',
    'Standard 11',
    'Standard 12',
  ];
  childGender = ['Female', 'Male'];
  regdata = {
    first_name: '',
    last_name: '',
    school_name: '',
    standard: '',
    dob: '',
    gender: '',
  };
  editdata = {
    first_name: '',
    last_name: '',
    school_name: '',
    standard: '',
    dob: '',
    gender: '',
    // mobile: '',
    // father_name: '',
    // father_mobile: '',
    // father_email: '',
    // mother_name: '',
    // mother_mobile: '',
    // mother_email: '',
  };
  graduatedata = {
    name: '',
    college_name: '',
    department: '',
    program: '',
    email: '',
    mobile: '',
  };
  userRole:any = localStorage.getItem('userRole');
  studentInfo:any = [];
  ParentProfile: any = '';
  studentProfile: any = '';
  date: any = '';
  selectedDate: any;
  myDatePickerOptions: any;
  registersubmitted = false;
  graduateData: any = localStorage.getItem('details');

  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private parent: ParentServiceService,
    private route: Router,
    private notifyService: NotificationService
  ) {}
  // get myotp() { return this.parentOtpform.get('otp')!;}
  get parentname() {
    return this.parentform.get('parentname')!;
  }
  get email() {
    return this.basicDetailsForm.get('email')!;
  }
  get Email() {
    return this.addexistingForm.get('Email')!;
  }
  get mobile() {
    return this.basicDetailsForm.get('mobile')!;
  }
  // get mother_mobile() {
  //   return this.editform.get('mother_mobile')!;
  // }
  // get father_mobile() {
  //   return this.editform.get('father_mobile')!;
  // }

  // get mother_mobile() {
  //   return this.basicDetailsForm.get('mother_mobile')!;
  // }
  // get name() { return this.parentOtpform.get('name')!;}
  get first_name() {
    return this.registrationform.get('first_name')!;
  }
  get last_name() {
    return this.registrationform.get('last_name')!;
  }
  get school_name() {
    return this.registrationform.get('school_name')!;
  }
  get standard() {
    return this.registrationform.get('standard')!;
  }
  get dob() {
    return this.registrationform.get('dob')!;
  }
  // get username() { return this.registrationform.get('username')!; }
  get gender() {
    return this.registrationform.get('gender')!;
  }
  ngOnInit(): void {

    // this.graduateData
    // this.getStudentInfo()
    (this.registrationform = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      school_name: ['', [Validators.required]],
      standard: ['', [Validators.required]],
      dob: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      gender: ['', [Validators.required]],
    })),
      (this.myDatePickerOptions = {
        dateFormat: 'dd-mm-yyyy',
      });
    // this.newChildemail = this.basicDetailsForm.value.email,
    // this.mapChildemail = this.addexistingForm.value.Email,
    this.childDatas = localStorage.getItem('childrens');
    this.parentId = localStorage.getItem('parent_id');
    this.RegparentId = localStorage.getItem('RegparentId');
    this.graduateLogin = localStorage.getItem('graduateLogin');

    this.kids = JSON.parse(this.childDatas);

    console.log(this.kids);
    this.initForm();
    this.getKids();
    this.getParentInfo();
    var date = new Date();
    var currentdate = new Date();
    this.registrationform.addControl(
      'dob',
      new FormControl({
        day: currentdate.getDate(),
        month: currentdate.getMonth() + 1,
        year: currentdate.getFullYear(),
      })
    );
  }
  private initForm() {
    // this.registrationform = new FormGroup(
    //   {
    //     first_name: new FormControl(this.regdata.first_name, [
    //       Validators.required,
    //     ]),
    //     last_name: new FormControl(this.regdata.last_name, [
    //       Validators.required,
    //     ]),
    //     school_name: new FormControl(this.regdata.school_name, [
    //       Validators.required,
    //     ]),
    //     standard: new FormControl(this.regdata.standard, [Validators.required]),
    //     gender: new FormControl(this.regdata.gender, [
    //       Validators.required ]),
    //       dob: new FormControl(this.regdata.dob, [
    //       Validators.required ]),

    //   },
    //   { validators: identityRevealedValidator }
    // );
    this.basicDetailsForm = new FormGroup(
      {
        email: new FormControl(this.data.email, [
          Validators.required,
          Validators.email,
        ]),
        mobile: new FormControl(this.data.mobile, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
      },
      { validators: identityRevealedValidator }
    );
    this.addexistingForm = new FormGroup({
      Email: new FormControl(this.mapdata.Email, [
        Validators.required,
        Validators.email,
      ]),
    });
    this.parentform = new FormGroup({
      parentname: new FormControl(this.parentdata.parentname, []),
    });
    this.editform = new FormGroup({
      first_name: new FormControl(this.editdata.first_name, []),
      last_name: new FormControl(this.editdata.last_name, []),
      school_name: new FormControl(this.editdata.school_name, []),
      standard: new FormControl(this.editdata.standard, []),
      dob: new FormControl(this.editdata.dob, []),
      gender: new FormControl(this.editdata.gender, []),
    });
    this.graduateform = new FormGroup({
      name: new FormControl(this.graduatedata.name, []),
      college_name: new FormControl(this.graduatedata.college_name, []),
      department: new FormControl(this.graduatedata.department, []),
      program: new FormControl(this.graduatedata.program, []),
      email: new FormControl(this.graduatedata.email, []),
      mobile: new FormControl(this.graduatedata.mobile, []),
    });
  }
  get fd() {
    return this.registrationform.controls;
  }
  setData(data: any) {
    this.editId = data.id;
    this.birthDate = data.dob;
    const bDate = moment(this.birthDate).format('yyyy-MM-DD');
    console.log('setdata', data);
    console.log('asdadasd', this.editId);
    this.editform.setValue({
      first_name: data.first_name,
      last_name: data.last_name,
      school_name: data.school_name,
      standard: data.classes.class_name,
      dob: bDate,
      gender: data.gender,
      // mobile: data.mobile,
      // father_name: data.father_name,
      // father_mobile: data.father_mobile,
      // father_email: data.father_email,
      // mother_name: data.mother_name,
      // mother_mobile: data.mother_mobile,
      // mother_email: data.mother_email,
    });
    console.log('values ', this.editform);
  }
  setparentData(data: any) {
    this.parentprofileId = data.id;
    console.log('parentvalue', data);
    this.parentform.setValue({
      parentname: data.name,
    });
  }
  setstudentData(data: any) {
    this.studentprofileId = data.id;
    console.log('parentvalue', data);
    this.parentform.setValue({
      parentname: data.name,
    });
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    console.log(this.otp);
  }
  verifyOTP() {
    var data = {
      email: this.mapChildemail,
      otp: this.otp,
    };
    this.parent.childOtp(data).subscribe((res: any) => {
      this.OtpId = res.user_id;
      console.log(this.OtpId);
      if (res.success === true) {
        localStorage.setItem('id', this.OtpId);
        this.addkids = true;
        this.otpPage = false;
        this.notifyService.showSuccess('Otp sent successfully!', '');
      } else {
        // this.otpPage = false;
        this.notifyService.showError('Email already exists!', '');
      }
    });
  }
  verifymapOTP() {
    var data = {
      email: this.mapChildemail,
      otp: this.otp,
    };
    this.parent.mapOtp(data).subscribe((res: any) => {
      this.OtpId = res.user_id;
      console.log(this.OtpId);
      if (res.success === true) {
        localStorage.setItem('id', this.OtpId);
        // this.addkids = true;
        this.otpPage = false;
        this.viewChild = true;

        this.notifyService.showSuccess('child added successfully!', '');
      } else {
        // this.otpPage = false;
        this.notifyService.showError('Email already exists!', '');
      }
    });
  }
  addKids() {
    var data = {
      email: this.basicDetailsForm.value.email,
      mobile: this.basicDetailsForm.value.mobile,
    };
    this.parent.signup(data).subscribe((res: any) => {
      if (res.success === true) {
        console.log(res);
        localStorage.setItem('email', this.basicDetailsForm.value.email);
        this.mapChildemail = this.basicDetailsForm.value.email;
        this.otpPage = true;
        this.basicInfo = false;
        // this.existing = false
        this.notifyService.showSuccess('Otp sent successfully!', '');
      } else {
        // this.otpPage = false;
        this.notifyService.showError('Email already exists!', '');
      }
    });
  }
  mapkids() {
    var data = {
      child_email: this.addexistingForm.value.Email,
    };
    this.parent.mapKids(data).subscribe((res: any) => {
      if (res.success === true) {
        localStorage.setItem('mapemail', this.addexistingForm.value.Email);
        this.mapChildemail = this.addexistingForm.value.Email;
        this.otpPage = true;
        this.basicInfo = false;

        // this.existing = false
        this.notifyService.showSuccess('Otp sent successfully!', '');
        this.getKids();
      } else {
        this.otpPage = false;
        this.notifyService.showError('Email already exists!', '');
      }
    });
  }
  viewKids() {
    this.basicInfo = false;
    this.addkids = false;
    this.viewChild = true;
    // this.existing = false
  }
  addKidsInfo() {
    this.basicInfo = false;
    this.addkids = true;
    this.viewChild = false;
    this.otpPage = false;
    // this.existing = true
  }
  submitUser() {
    this.registersubmitted = true;
    if (!this.registrationform.invalid) {
      var data = {
        first_name: this.registrationform.value.first_name,
        last_name: this.registrationform.value.last_name,
        school_name: this.registrationform.value.school_name,
        standard: this.registrationform.value.standard.split(' ')[1],
        dob: this.registrationform.value.dob,
        gender: this.registrationform.value.gender,
      };
      this.parent.register(data).subscribe((res: any) => {
        if (res.success === true) {
          this.viewChild = true;
          // this.vieviewChild = true
          this.notifyService.showSuccess('Child  added successfully!', '');
          this.registrationform.reset();
          this.getKids();
        }
        // this.token = res.data.token
        // console.log(this.token);
        // localStorage.setItem('token', this.token)
      });
    }
    return;
  }
  update(e: any) {
    this.selected = e.target.value;
  }
  getKids() {
    // this.parentId = pid
    this.parent.kidsList().subscribe((response: any) => {
      if (response.success) {
        this.totalKids = response.kid;
        localStorage.setItem('childId', this.childID);
        console.log(this.totalKids);
      }
    });
  }
  // editData() {
  // }
  addnewKid() {
    this.basicInfo = true;
    // this.existingChild = false
    this.viewChild = false;
    this.existing = true;
  }
  addkid() {
    this.basicInfo = true;
    // this.existingChild = true
    this.viewChild = false;
    this.existing = false;
  }
  editChild() {
    var data = {
      first_name: this.editform.value.first_name,
      last_name: this.editform.value.last_name,
      school_name: this.editform.value.school_name,
      standard: this.editform.value.standard,
      dob: this.editform.value.dob,
      gender: this.editform.value.gender,
      // mobile: this.editform.value.mobile,
      // father_name: this.editform.value.father_name,
      // father_mobile: this.editform.value.father_mobile,
      // father_email: this.editform.value.father_email,
      // mother_name: this.editform.value.mother_name,
      // mother_mobile: this.editform.value.mother_mobile,
      // mother_email: this.editform.value.mother_email,
    };
    // const formdata = new FormData();
    // formdata.append(
    //   'first_name',
    //   this.editform.value.first_name == null
    //     ? ''
    //     : this.editform.value.first_name
    // );
    // formdata.append(
    //   'last_name',
    //   this.editform.value.last_name == null ? '' : this.editform.value.last_name
    // );
    // formdata.append(
    //   'school_name',
    //   this.editform.value.school_name == null
    //     ? ''
    //     : this.editform.value.school_name
    // );
    // formdata.append(
    //   'standard',
    //   this.editform.value.standard == null ? '' : this.editform.value.standard
    // );
    // formdata.append(
    //   'dob',
    //   this.editform.value.dob == null ? '' : this.editform.value.dob
    // );
    // formdata.append(
    //   'gender',
    //   this.editform.value.gender == null ? '' : this.editform.value.gender
    // );
    // formdata.append(
    //   'mobile',
    //   this.editform.value.mobile == null ? '' : this.editform.value.mobile
    // );
    // formdata.append(
    //   'father_name',
    //   this.editform.value.father_name == null? '': this.editform.value.father_name
    // );
    // formdata.append(
    //   'father_mobile',
    //   this.editform.value.father_mobile == null? '': this.editform.value.father_mobile
    // );
    // formdata.append(
    //   'father_email',
    //   this.editform.value.father_email == null? '': this.editform.value.father_email
    // );
    // formdata.append(
    //   'mother_name',
    //   this.editform.value.mother_name == null? '': this.editform.value.mother_name
    // );
    // formdata.append(
    //   'mother_mobile',
    //   this.editform.value.mother_mobile == null? '': this.editform.value.mother_mobile
    // );
    // formdata.append(
    //   'mother_email',
    //   this.editform.value.mother_email == null? '': this.editform.value.mother_email
    // );
    // formdata.append('profile', this.myFiles[0]);
    this.parent.editChild(data, this.editId).subscribe((response: any) => {
      if (response.success) {
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');
        this.getKids();
        console.log('asduhasdjh', response);
      }
    });
  }
  getParentInfo() {
    this.parent.parentProfileDetails().subscribe((response: any) => {
      if (response.sucess) {
        this.parentInfo = response.info[0];
        console.log('parentinfo', this.parentInfo);
        this.ParentProfile = this.parentInfo.profile_pic;
        // localStorage.setItem('parentPic', this.ParentProfile);

        // console.log('parentinfopic', this.parentInfo.profile_pic);
      }
    });
  }
  editParent() {
    var data = {
      name: this.parentform.value.parentname,
    };
    console.log('PARENT FORM', data);
    console.log('my edit parent ', data);
    const formdata = new FormData();
    formdata.append('name', this.parentform.value.parentname);
    formdata.append('profile', this.myFiles1[0]);

    // console.log(this.editform.value.name);

    this.parent.editParent(formdata).subscribe((response: any) => {
      if (response.success) {
        this.closebutton1.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');
        this.getParentInfo();

        console.log('asduhasdjh', response);
        // this.createEvent = response.class
        // this.getEvents();
      }
    });
  }
  editGraduate() {

  }
  uploadFiles() {
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append('profile', this.myFiles[i]);
    }
  }
  uploadFiles1() {
    const frmData = new FormData();
    for (var j = 0; j < this.myFiles.length; j++) {
      frmData.append('profile', this.myFiles1[j]);
    }
  }
  getFileDetails(e: any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  getFileDetails1(e: any) {
    //console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myFiles1.push(e.target.files[j]);
    }
  }
  getStudentInfo() {
    this.parent.studentProfileDetails().subscribe((response: any) => {
      console.log('getStudent',response);
      if (response.success == true) {
        this.studentInfo = response.graduate;
        console.log('student', this.studentInfo);
        this.studentProfile = this.studentInfo.profile_pic;
      }
    });
  }

}
