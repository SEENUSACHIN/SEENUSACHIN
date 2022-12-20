import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { OrgServiceService } from '../org-service.service';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../notification.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  sessionName = ''
  questionObj : any = []
  questionList : any = []
  session_id: any
  selectedQues: any
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    console.log('this.session_id ', this.session_id);
    this.getSessionById(this.session_id)
    this.getAllQuestion()
  }
  getSessionById(session_id: any) {
    this.org.getSingleSession(session_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        this.sessionName = response.session[0].name
        this.questionObj = response.session[0].s_question
        console.log('this.questionObj ', this.questionObj);
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }
  getAllQuestion() {
    this.org.getAllQuestion().subscribe((response: any) => {
      if (response.success === true) {
        this.questionList = response.question
        console.log('this.questionList ', this.questionList);
      }
    })
  }
  onSelect(e: any) {
    console.log('e ', e);
    this.selectedQues = e
  }
  addQuestion () {
    var sessionData = {
      question_id: this.selectedQues.id
    };
    this.org.addQuestiontoSession(sessionData, this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        this.notifyService.showSuccess(response.msg, '');
        this.selectedQues = null
        this.getSessionById(this.session_id)
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }
}
