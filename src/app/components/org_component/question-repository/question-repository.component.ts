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
  selector: 'app-question-repository',
  templateUrl: './question-repository.component.html',
  styleUrls: ['./question-repository.component.css']
})
export class QuestionRepositoryComponent implements OnInit {
  questionObj : any = []
  search:any = null
  constructor(
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllQuestion()
  }
  loadQues(e : any) {
    // this.newItemEvent.emit(false);
    this.getAllQuestion()
  }
  getAllQuestion() {
    this.org.getAllQuestion(this.search).subscribe((response: any) => {
      if (response.success === true) {
        this.questionObj = response.question
        console.log('this.questionObj ', this.questionObj);
      }
    })
  }
}
