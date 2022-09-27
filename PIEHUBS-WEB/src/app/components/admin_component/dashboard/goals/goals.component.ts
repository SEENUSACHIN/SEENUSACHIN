import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class GoalsComponent implements OnInit {
  activitylist = [];
  selectedCar = [];
  goalslist = []
  classes = []
  chapters = []
  subjects = []
  classId = ''
  subId = ''
  chapterId = ''
  errorShow = ''
  weekId = ''
  selectedAct = []
  selectedWeek = []
  createGoalform!: FormGroup
  weeks :  { id: string; label1: string }[] = []
  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.createGoalform = new FormGroup({
      selectedAct: new FormControl(this.selectedAct, Validators.required),
      goalname: new FormControl("", Validators.required)
    })
    this.getWeeks()
    this.getGoals()
    this.getClasses()
  }
  onSelect (e : any) {
    this.selectedCar = e
  }
  removeUploading (id : number) {
    let index = this.createGoalform.value.selectedAct.findIndex((x : number) => x == id);
    this.createGoalform.value.selectedAct.splice(index, 1)
    this.selectedAct = []
    console.log("this.createGoalform.value.selectedAct ", this.createGoalform.value.selectedAct)
    let index1 = this.selectedCar.findIndex((x : any) => x['id'] == id);
    this.selectedCar.splice(index, 1)
  }
  createGoal () {
    if(this.createGoalform.value.goalname == '') {
      this.errorShow = "Please enter the Goal name."
    } else if (this.createGoalform.value.selectedAct.length == 0) {
      this.errorShow = "Please select the activities."
    } else if (this.weekId == '') {
      this.errorShow = "Please select the week."
    } else {
      var activityIds = this.createGoalform.value.selectedAct.join(", ");
      var data = {
        class_id : this.classId,
        activity_id : activityIds,
        goal_name : this.createGoalform.value.goalname,
        week_id : this.weekId,
      }
      this.manage.createGoal(data).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.classId = ''
          this.subId = ''
          this.chapterId = ''
          this.createGoalform.value.goalname = ''
          this.errorShow = ''
          this.weekId = ''
          this.selectedCar = [];
          this.getGoals ()
        }
      });
    }
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
  getGoals () {
    this.manage.getGoals().subscribe((response: any) => {
      if(response.success) {
        this.goalslist = response.goal
      }
    });
    // this.getActivities()
  }
  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      console.log('getClasses', response);
      if(response.success) {
        this.classes = response.class
      }
    });
  }
  getWeeks () {
    this.manage.getWeeks().subscribe((response: any) => {
      console.log('getWeeks', response);
      if(response.success) {
        response.week.forEach((element : any) => {
          var labels = this.datepipe.transform(element['from_date'], 'dd MMM yyyy') + ' - ' + this.datepipe.transform(element['to_date'], 'dd MMM yyyy')
          this.weeks.push({ id: element['id'], label1 : labels })
        });
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

}
