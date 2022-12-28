import { Component, OnInit, ViewChild, Input, Output,EventEmitter } from '@angular/core';
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
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  // @Input("pic") public pic;
  // @Output() public eventEmitter = new EventEmitter();
  @ViewChild('closebutton') closebutton: any;
  // @ViewChild('closebutton1') closebutton1: any;
  profilePic:any = localStorage.getItem('studentPic');
  graduateform!: FormGroup;
  studentInfo:any = [];
  graduatedata = {
    name: '',
    college_name: '',
    department: '',
    program: '',
    // email: '',
    // mobile: '',
  };
  myFiles1: string[] = [];
  graduateUserId: any = '';
  studentprofileId: any = '';
  studentProfile: any = '';
  // graduateInfo: any = localStorage("graduate")
  graduateLogin: any = localStorage.getItem('graduateLogin');
  gLogin: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private parent: ParentServiceService,
    private route: Router,
    private notifyService: NotificationService
  ) {}

  get college_name() {
    return this.graduateform.get('college_name')!;
  }
  get program() {
    return this.graduateform.get('program')!;
  }
  get department() {
    return this.graduateform.get('department')!;
  }
  get name() {
    return this.graduateform.get('name')!;
  }

  setData(data: any) {
    // this.editId = data.id;
    // this.birthDate = data.dob;
    // const bDate = moment(this.birthDate).format('yyyy-MM-DD');
    // console.log('setdata', data);
    // console.log('asdadasd', this.editId);
  }
  ngOnInit(): void {
    // this.studentProfile
    this.getStudentInfo()
    this.gLogin = JSON.parse(this.graduateLogin);
    console.log('glogin', this.graduateLogin);
    this.graduateform = new FormGroup({
      name: new FormControl(this.graduatedata.name, []),
      college_name: new FormControl(this.graduatedata.college_name, []),
      department: new FormControl(this.graduatedata.department, []),
      program: new FormControl(this.graduatedata.program, []),
    });
    // this.getStudentInfo()
  }
  get gl() {
    return this.graduateform.controls;
  }
  setstudentData(data: any) {
    this.studentprofileId = data.id;
    console.log('parentvalue', data);
    this.graduateform.setValue({
      name: data.name,
      college_name: data.college_name,
      department: data.department,
      program: data.program,
    });
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
    }
  }
  editStudent() {
    var data = {
      college_name: this.graduateform.value.college_name,
      program: this.graduateform.value.program,
      department: this.graduateform.value.department,
      name: this.graduateform.value.name,
      // mobile: this.graduateform.value.mobile,
      // email: this.graduateform.value.email,
    };
    const formdata = new FormData();
    formdata.append('college_name', this.graduateform.value.college_name);
    formdata.append('program', this.graduateform.value.program);
    formdata.append('department', this.graduateform.value.department);
    formdata.append('name', this.graduateform.value.name);
    formdata.append('profile', this.myFiles1[0]);

    this.parent.editStudent(formdata).subscribe((response: any) => {
      if (response.success) {
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');
        this.getStudentInfo()

        console.log('asduhasdjh', response);
      }
    });

  }
  getStudentInfo() {
    this.parent.studentProfileDetails().subscribe((response: any) => {
      console.log('getStudent',response);
      if (response.success == true) {
        this.studentInfo = response.graduate;
        console.log('student', this.studentInfo);
        this.studentProfile = response.graduate.profile_pic;
        console.log("stuprofileImgae",this.studentProfile);
        // this.studentPic = this.studentProfile
        localStorage.setItem('studentPic', this.studentProfile);
        this.route.navigate(['/student_profile']);
      }
    });
  }
  // profilePicture() {
  //   this.eventEmitter.emit()
  // }
}
