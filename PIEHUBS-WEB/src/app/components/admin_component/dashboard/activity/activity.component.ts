import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class ActivityComponent implements OnInit {
  activitylist = []
  chapters = []
  subjects = []
  classes = []
  activityName = ''
  atoms = ''
  url = ''
  classId = ''
  subId = ''
  chapterId = ''
  errorShow = ''

  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router, private manage: ManageServiceService, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.getActivities()
    this.getClasses()
  }

  gotoGoals () {
    this.route.navigate(['/admin_goals']);
  }
  gotoVdoRating () {
    this.route.navigate(['/video_rating']);
  }
  gotoDashboard () {
    this.route.navigate(['/admin_dashboard']);
  }
  gotoActivity () {
    this.route.navigate(['/admin_activity']);
  }
  getActivities () {
    this.manage.getActivity().subscribe((response: any) => {
      console.log('getActivity', response);
      if(response.success) {
        this.activitylist = response.activity
      }
    });
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
  createActivity () {
    console.log('classId', this.classId)
    if(this.activityName == '') {
      this.errorShow = "Please enter the Activity name."
    } else if (this.atoms == '') {
      this.errorShow = "Please enter the Atoms."
    } else if (this.url == '') {
      this.errorShow = "Please enter the Url."
    } else if (this.classId == '') {
      this.errorShow = "Please select the Class."
    } else if (this.subId == '') {
      this.errorShow = "Please select the Subject."
    } else if (this.chapterId == '') {
      this.errorShow = "Please select the Chapter."
    } else {
      var data = {
        activity_name : this.activityName,
        atoms : this.atoms,
        url : this.url,
        class_id : this.classId,
        subject_id : this.subId,
        chapter_id : this.chapterId
      }
      this.manage.createActivity(data).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getActivities ()
        }
      });
    }

  }
}
