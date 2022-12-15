import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class TopicsComponent implements OnInit {
  topics = []
  chapters = []
  subjects = []
  classes = []
  errorShow = ''
  createTopicform!: FormGroup
  @ViewChild('closebutton') closebutton : any;
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    document.getElementById("collapseTrigger")?.click();
    this.getAllTopics()
    this.createTopicform = new FormGroup({
      topicName: new FormControl("", Validators.required),
      classId: new FormControl("", Validators.required),
      subjectId: new FormControl("", Validators.required),
      chapterId: new FormControl("", Validators.required)
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

  getAllTopics () {
    this.manage.getAllTopics().subscribe((response: any) => {
      if(response.success) {
        this.topics = response.topic
      }
    });
  }

  createTopic () {
    if(this.createTopicform.value.topicName == '') {
      this.errorShow = "Please enter the Topic name."
    } else if (this.createTopicform.value.classId == '') {
      this.errorShow = "Please select the Class."
    } else if (this.createTopicform.value.subjectId == '') {
      this.errorShow = "Please select the Subject."
    } else if (this.createTopicform.value.chapterId == '') {
      this.errorShow = "Please select the Chapter."
    } else {
      var data = {
        topic_name : this.createTopicform.value.topicName,
      }
      this.manage.createTopic(data, this.createTopicform.value.chapterId).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getAllTopics ()
        }
      });
    }
  }

}
