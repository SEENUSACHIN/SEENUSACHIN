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
  selector: 'app-add-repository-question-list',
  templateUrl: './add-repository-question-list.component.html',
  styleUrls: ['./add-repository-question-list.component.css']
})
export class AddRepositoryQuestionListComponent implements OnInit {
  category: any
  session_id: any
  questionObj : any = []
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.category =this.routeP.snapshot.paramMap.get('category')
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    this.getQuestionsByCategory()
  }
  getQuestionsByCategory() {
    this.org.getQuesFromCategory(this.category).subscribe((response: any) => {
      if (response.success === true) {
        this.questionObj = response.question
      }
    })
  }
  addQuestion (quesId: any) {
    var sessionData = {
      question_id: quesId
    };
    this.org.addQuestiontoSession(sessionData, this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        this.notifyService.showSuccess(response.msg, '');
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }

}
