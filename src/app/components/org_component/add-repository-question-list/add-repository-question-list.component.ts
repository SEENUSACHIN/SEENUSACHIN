import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'
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
  categoryId : any
  categoryName : any
  session_id: any
  questionObj : any = []
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.categoryId =this.routeP.snapshot.paramMap.get('categoryId')
    this.categoryName =this.routeP.snapshot.paramMap.get('categoryName')
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    this.getQuestionsByCategory()
  }
  getQuestionsByCategory() {
    this.org.getQuesFromCategory(this.categoryId, this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        this.questionObj = response.questions
        for (let index = 0; index < this.questionObj.length; index++) {
          this.questionObj[index]['selected'] = false;
        }
      }
    })
  }
  addQuestion (quesId: any) {
    var index = this.questionObj.findIndex((e : any) => e.id == quesId);
    if(index != -1) {
      this.questionObj[index]['selected'] = true;
    }
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
  goBack() {
    this.location.back()
  }

}
