import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class VideoUploadComponent implements OnInit {
  activitylist = []
  selectedAct = []
  selectform!: FormGroup
  myFiles: string[] = [];
  classes = []
  chapters = []
  subjects = []
  classId = ''
  subId = ''
  chapterId = ''
  vdolist = [
    { id : "1", name : "Harini", class: "7", school: "Chem Roast", date : "06-09-2022", activity_name : 'Activity name1', score: '29', profile : '' },
    // { id : "2", name : "Jayaharini T", class: "12", school: "Chem Roast ijk uh", date : "16-09-2022", activity_name : 'Activity name2', score: 'New', profile : '' },
    // { id : "3", name : "Deepika", class: "3", school: "Chem Roast da", date : "08-09-2022", activity_name : 'Activity name3', score: '29', profile : '' },
  ]
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.selectform = new FormGroup({
      selectedAct: new FormControl(this.selectedAct, Validators.required),
      username: new FormControl("", Validators.required)
    })
    this.getClasses()
  }

  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      console.log('getClasses', response);
      if(response.success) {
        this.classes = response.class
      }
    });
  }
  getSubjects (id : string) {
    this.classId = id
    this.manage.getSubjects(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.subjects = response.subject
      }
    });
  }
  getChapter (id : string) {
    this.subId = id
    this.manage.getChapter(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.chapters = response.chapter
      }
    });
  }
  getActivities (id : any) {
    this.chapterId = id
    this.manage.getAdminActivity(this.chapterId).subscribe((response: any) => {
      console.log('getAdminActivity', response);
      if(response.success) {
        this.activitylist = response.activity
      }
    });
  }
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
