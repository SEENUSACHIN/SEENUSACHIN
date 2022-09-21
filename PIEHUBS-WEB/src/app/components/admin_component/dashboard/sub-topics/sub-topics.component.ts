import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sub-topics',
  templateUrl: './sub-topics.component.html',
  styleUrls: ['./sub-topics.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class SubTopicsComponent implements OnInit {
  topics = []
  chapters = []
  subjects = []
  classes = []
  subtopics = []
  errorShow = ''
  createSubTopicform!: FormGroup
  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }


  ngOnInit(): void {
    document.getElementById("collapseTrigger")?.click();
    this.getAllSubTopics()
    this.createSubTopicform = new FormGroup({
      subtopicName: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      classId: new FormControl("", Validators.required),
      subjectId: new FormControl("", Validators.required),
      chapterId: new FormControl("", Validators.required),
      topicId: new FormControl("", Validators.required)
    })
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

  getChapters (id : string) {
    this.manage.getChapter(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.chapters = response.chapter
      }
    });
  }

  getTopics (id : string) {
    this.manage.getTopics(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.topics = response.topic
      }
    });
  }

  getAllSubTopics () {
    this.manage.getAllSubTopics().subscribe((response: any) => {
      if(response.success) {
        this.subtopics = response.subject
      }
    });
  }

  createSubTopic () {
    if(this.createSubTopicform.value.subtopicName == '') {
      this.errorShow = "Please enter the Subtopic name."
    } else if(this.createSubTopicform.value.url == '') {
      this.errorShow = "Please enter the url."
    } else if (this.createSubTopicform.value.classId == '') {
      this.errorShow = "Please select the Class."
    } else if (this.createSubTopicform.value.subjectId == '') {
      this.errorShow = "Please select the Subject."
    } else if (this.createSubTopicform.value.chapterId == '') {
      this.errorShow = "Please select the Chapter."
    } else if (this.createSubTopicform.value.topicId == '') {
      this.errorShow = "Please select the Topic."
    } else {
      var data = {
        subtopic_name : this.createSubTopicform.value.subtopicName,
        url : this.createSubTopicform.value.url
      }
      this.manage.createSubTopic(data, this.createSubTopicform.value.topicId).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getAllSubTopics ()
        }
      });
    }
  }
}
