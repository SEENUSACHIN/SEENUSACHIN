import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class ChaptersComponent implements OnInit {
  chapters = []
  subjects = []
  classes = []
  errorShow = ''
  createChapterform!: FormGroup
  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    document.getElementById("collapseTrigger")?.click();
    this.createChapterform = new FormGroup({
      chaptername: new FormControl("", Validators.required),
      categoryName: new FormControl("", Validators.required),
      classId: new FormControl("", Validators.required),
      subjectId: new FormControl("", Validators.required),
    })
    this.getAllChapters()
    this.getClasses()
  }

  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      if(response.success) {
        this.classes = response.class
      }
    });
  }

  getSubjects (id : string) {
    this.manage.getSubjects(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.subjects = response.subject
      }
    });
  }

  getAllChapters () {
    this.manage.getAllChapters().subscribe((response: any) => {
      if(response.success) {
        this.chapters = response.chapter
      }
    });
  }

  createChapter () {
    if(this.createChapterform.value.chaptername == '') {
      this.errorShow = "Please enter the Chapter name."
    } else if(this.createChapterform.value.categoryName == '') {
      this.errorShow = "Please enter the Category name."
    } else if (this.createChapterform.value.classId == '') {
      this.errorShow = "Please select the Class."
    } else if (this.createChapterform.value.subjectId == '') {
      this.errorShow = "Please select the Subject."
    } else {
      var data = {
        chapter_name : this.createChapterform.value.chaptername,
        category_name : this.createChapterform.value.categoryName
      }
      this.manage.createChapter(data, this.createChapterform.value.subjectId).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getAllChapters ()
        }
      });
    }
  }

}
