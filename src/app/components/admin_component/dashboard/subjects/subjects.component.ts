import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects = []
  classes = []
  errorShow = ''
  createSubjectform!: FormGroup
  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }


  ngOnInit(): void {
    document.getElementById("collapseTrigger")?.click();
    this.createSubjectform = new FormGroup({
      subjectname: new FormControl("", Validators.required),
      classId: new FormControl("", Validators.required),
    })
    this.getSubjects()
    this.getClasses()
  }

  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      if(response.success) {
        this.classes = response.class
      }
    });
  }

  getSubjects () {
    this.manage.getAllSubjects().subscribe((response: any) => {
      if(response.success) {
        this.subjects = response.subject
      }
    });
  }
  createSubject () {
    console.log('createSubjectform ', this.createSubjectform.value)
    if(this.createSubjectform.value.subjectname == '') {
      this.errorShow = "Please enter the Subject name."
    } else if (this.createSubjectform.value.classId == '') {
      this.errorShow = "Please select the Class name."
    } else {
      var data = {
        subject_name : this.createSubjectform.value.subjectname
      }
      this.manage.createSubject(data, this.createSubjectform.value.classId).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getSubjects ()
        }
      });
    }
  }

}
