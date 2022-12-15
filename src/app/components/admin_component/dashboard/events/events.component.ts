import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgImageSliderComponent } from 'ng-image-slider';
import { NgImageSliderModule } from 'ng-image-slider';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: [
    './events.component.css',
    '../dashboard-layout/dashboard-layout.component.css',
  ],
})
export class EventsComponent implements OnInit {
  eventform!: FormGroup;
  searchform!: FormGroup;
  datefilterform!: FormGroup;
  myFiles: string[] = [];
  myassetFiles: string[] = [];
  createOrEdit: string = 'create';
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('close') close: any;
  @ViewChild('closesort') closesort: any;
  @ViewChild('nav') slider: any;
  // options sample with default values
  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'yyyy-LL-dd', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };
  date1 = new Date();
  date2 = new Date();

  // eventlist = [
  //   { id : "1", name : "Harini Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img.jpg' },
  //   { id : "2", name : "Jayaharini T Event Name", updated_on: "20th Sep 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  //   { id : "3", name : "Deepika Event Name", updated_on: "21th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  //   { id : "1", name : "Harini Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  //   { id : "2", name : "Jayaharini T Event Name  Event Name", updated_on: "12th Oct 11-12pm" , profile : '../../../../../assets/img.jpg' },
  //   { id : "3", name : "Deepika Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  //   { id : "1", name : "Harini Event Name", updated_on: "18th Sep 11-12pm" , profile : '../../../../../assets/img.jpg' },
  //   { id : "2", name : "Jayaharini T Event Name", updated_on: "20th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  // ]
  events: any = [];
  // createEvent:any = []
  eventId: string = '';
  myevent: any = [];
  editId: string = '';
  assetId: string = '';
  search: any = '';
  filteredList: any = [];
  filteredLists: any = [];
  data: any = { name: '', Date: '', description: '' };
  constructor(
    private manage: ManageServiceService,
    private datePipe: DatePipe,
    private notifyService: NotificationService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.datefilterform = new FormGroup({
      from_date: new FormControl(''),
      to_date: new FormControl(''),
    });
    this.searchform = new FormGroup({
      search: new FormControl(''),
    });

    this.eventform = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // Date: new FormControl(null, Validators.required),
      files: new FormControl(''),
    });
    var currentdate = new Date();
    this.eventform.addControl(
      'Date',
      new FormControl({
        day: currentdate.getDate(),
        month: currentdate.getMonth() + 1,
        year: currentdate.getFullYear(),
      })
    );
    this.eventform.valueChanges.subscribe((val) => {
      console.log(val);
    });
    console.log(this.eventform.value);
    this.getEvents();
  }
  get from_date() {
    return this.datefilterform.get('from_date')!;
  }
  get to_date() {
    return this.datefilterform.get('to_date')!;
  }

  get Date() {
    return this.eventform.get('Date')!;
  }
  get name() {
    return this.eventform.get('name')!;
  }
  get description() {
    return this.eventform.get('description')!;
  }
  get files() {
    return this.eventform.get('files')!;
  }
  setData(data: any) {
    this.editId = data.id;
    console.log('my ', data.id);
    var currentdate = new Date();
    this.eventform.setValue({
      name: '',
      description: '',
      Date: {
        day: currentdate.getDate(),
        month: currentdate.getMonth() + 1,
        year: currentdate.getFullYear(),
      },
      files: '',
    });
    var date = data.date;
    console.log('date ', date);
    const format = 'yyyy-MM-dd';
    const myDate = date;
    const locale = '';
    // const formattedDate = formatDate(myDate, format, locale);
    // var formatval = date.year + '-' + date.month + '-' + date.day;
    // console.log('formattedDate ', formattedDate);
    const myFormattedDate = moment(date).format('yyyy-MM-DD');
    console.log(' typeof data1 ', typeof myFormattedDate);
    const myFormattedDate1 = new Date(myFormattedDate);
    console.log('  data1 ', myFormattedDate);
    // this.eventform.addControl("Date", new FormControl({day: 20, month:4, year:1969}))
    // this.eventform.valueChanges.subscribe(val => {
    //   console.log(val);
    // })
    console.log('myFormattedDate.getDate() ', myFormattedDate1.getDate());
    this.eventform.setValue({
      name: data.name,
      description: data.description,
      Date: {
        day: myFormattedDate1.getDate(),
        month: myFormattedDate1.getMonth() + 1,
        year: myFormattedDate1.getFullYear(),
      },
      files: '',
    });
    this.createOrEdit = 'edit';
  }
  onKey(event: any) {
    console.log('search', this.searchform.value.search);
    if (this.searchform.value.search.length == 0) {
      this.getEvents();
      // this.myapprovedList = this.filteredList
    }
  }
  getFileDetails(e: any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  getassetFileDetails(e: any) {
    //console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myassetFiles.push(e.target.files[j]);
      console.log(e.target.files);
    }
  }
  uploadFiles() {
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append('files', this.myFiles[i]);
    }
  }
  uploadassetFiles() {
    const frmData = new FormData();
    for (var j = 0; j < this.myassetFiles.length; j++) {
      frmData.append('files', this.myassetFiles[j]);
    }
  }
  createEvent() {
    this.ngxService.start();

    var date = this.eventform.value.Date;
    var formatval = date.year + '-' + date.month + '-' + date.day;
    const myFormattedDate = moment(formatval).format('YYYY-MM-DD');
    // const formdata = new FormData();
    // formdata.append('name', this.eventform.value.name,);
    // formdata.append('description', this.eventform.value.description,);
    // formdata.append('date', myFormattedDate);
    // var formData = new FormData()
    var data = {
      name: this.eventform.value.name,
      date: myFormattedDate,
      description: this.eventform.value.description,
      // files : this.myFiles
    };
    const formdata = new FormData();
    formdata.append('name', this.eventform.value.name);
    formdata.append('date', myFormattedDate);
    formdata.append('description', this.eventform.value.description);
    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append('files', this.myFiles[i]);
    }

    console.log(formdata);
    console.log('data ', data);
    this.manage.createEvents(formdata).subscribe((response: any) => {
      console.log('getClasses', response);
      if (response.success) {
        setTimeout(() => {
          this.ngxService.stop();
          // stop foreground spinner of the master loader with 'default' taskId
        });
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');

        console.log('asduhasdjh', response);
        // this.createEvent = response.class
        this.getEvents();
      }
      // this.uploadFiles()
    });
  }
  editEvents() {
    var date = this.eventform.value.Date;
    console.log("date",date);
    var formatval = date.year + '-' + date.month + '-' + date.day;
    const myFormattedDate = moment(formatval).format('YYYY-MM-DD');
    var data = {
      name: this.eventform.value.name,
      date: myFormattedDate,
      description: this.eventform.value.description,
      // files : this.myFiles
    };
    this.manage.editEvents(data, this.editId).subscribe((response: any) => {
      if (response.success) {
        this.closebutton.nativeElement.click();
        this.notifyService.showSuccess(response.msg, '');

        console.log('asduhasdjh', response);
        // this.createEvent = response.class
        this.getEvents();
      }
    });
  }
  getEvents() {
    this.manage.getEvents().subscribe((response: any) => {
      console.log('getEvents', response);
      if (response.success) {
        this.events = response.event;
        // this.eventId = this.events[i].id

        // for(let i=0;i<this.events.length ;i++){
        //   console.log(this.events[i].id);
        //   this.eventId = this.events[i].id
        //   this.singleEvent(this.eventId)
        //   }
      }
    });
  }
  singleEvent(id: any) {
    console.log('enter singleEvent');
    this.myevent = '';
    this.manage.singleEvent(id).subscribe((res: any) => {
      this.myevent = res.event[0];
      console.log(this.myevent);
    });
  }
  deleteEvent(id: any) {
    this.manage.deleteEvent(id).subscribe((res: any) => {
      if (res.success) {
        this.getEvents();
        this.notifyService.showSuccess(res.msg, '');
      }
    });
  }
  updateAsset(id: any) {
    const formdata = new FormData();
    for (var j = 0; j < this.myassetFiles.length; j++) {
      formdata.append('files', this.myassetFiles[j]);
    }
    console.log('enter update');
    this.manage.updateAsset(id, formdata).subscribe((res: any) => {
      if (res.success) {
        setTimeout(() => {
          this.ngxService.stop();
          // stop foreground spinner of the master loader with 'default' taskId
        });
        this.close.nativeElement.click();
        this.notifyService.showSuccess(res.msg, '');
        this.getEvents()
        this.myassetFiles = [];
      }
    });
  }
  deleteAsset(id: any, eventId: any) {
    console.log('enter delete');
    this.manage.deleteAsset(id).subscribe((res: any) => {
      if (res.success) {
        this.singleEvent(eventId);
        this.getEvents();
        this.notifyService.showSuccess(res.msg, '');
      }
    });
  }
  prevImageClick() {
    this.slider.prev();
  }
  nextImageClick() {
    this.slider.next();
  }
  searchEvent() {
    var data = {
      search: this.searchform.value.search,
      // from_date: this.datefilterform.value.from_date,
      // to_date: this.datefilterform.value.to_date
    };
    console.log(data);
    this.manage.searchEvent(data).subscribe((res: any) => {
      if (res.success) {
        this.filteredList = res.event;
        this.events = this.filteredList;
        console.log(this.filteredList);
      }
    });
  }
  filterEvent() {
    var fromdate = this.datefilterform.value.from_date;
    console.log("fromdate",fromdate);
    var fromDatesort = fromdate.year + '-' + fromdate.month + '-' + fromdate.day;
    // console.log(fromtDatesort);
    var todate = this.datefilterform.value.to_date;
    console.log('todate',todate);

    var toDatesort = todate.year + '-' + todate.month + '-' + todate.day;
    // console.log('toDatesort',toDatesort);
    const sortFromDate = moment(fromDatesort).format('YYYY-MM-DD');
    const sortToDate = moment(toDatesort).format('YYYY-MM-DD');
    console.log(fromDatesort);
    console.log(toDatesort);
    var data = {
      search: this.searchform.value.search,
      from_date: sortFromDate,
      to_date: sortToDate,
    };
    console.log(data);
    this.manage.searchEvent(data).subscribe((res: any) => {
      if (res.success == true) {
        this.closesort.nativeElement.click();

        this.filteredLists = res.event;
        this.events = this.filteredLists;

        console.log(this.filteredLists);
      }
    });
  }
}
