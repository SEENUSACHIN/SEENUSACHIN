import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class EventsComponent implements OnInit {
  eventform!: FormGroup
  myFiles: string[] = [];
  @ViewChild('closebutton') closebutton : any;
  eventlist = [
    { id : "1", name : "Harini Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img.jpg' },
    { id : "2", name : "Jayaharini T Event Name", updated_on: "20th Sep 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "3", name : "Deepika Event Name", updated_on: "21th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "1", name : "Harini Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "2", name : "Jayaharini T Event Name  Event Name", updated_on: "12th Oct 11-12pm" , profile : '../../../../../assets/img.jpg' },
    { id : "3", name : "Deepika Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "1", name : "Harini Event Name", updated_on: "18th Sep 11-12pm" , profile : '../../../../../assets/img.jpg' },
    { id : "2", name : "Jayaharini T Event Name", updated_on: "20th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  ]
  constructor() { }

  ngOnInit(): void {
    this.eventform = new FormGroup({
      eventname: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      eventDate: new FormControl("", Validators.required)
    })
  }
  get eventDate() { return this.eventform.get('eventDate')!; }
  get eventname() { return this.eventform.get('eventname')!; }
  get description() { return this.eventform.get('description')!; }
  getFileDetails(e : any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  uploadFiles() {
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }
  }
}
