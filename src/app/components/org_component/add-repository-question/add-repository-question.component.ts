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
  selector: 'app-add-repository-question',
  templateUrl: './add-repository-question.component.html',
  styleUrls: ['./add-repository-question.component.css']
})
export class AddRepositoryQuestionComponent implements OnInit {
  session_id: any
  session_name: any
  categoryList : string[] = [
    'testing',
    'abandon',
    'ability',
    'able',
    'abortion',
    'about',
    'abroad',
    'abandon',
    'ability',
    'able',
    'abortion',
    'about',
    'abroad',
    'abandon',
    'African-American',
    'able',
    'abortion',
    'about',
    'abroad',
    'abandon',
    'ability',
    'African-American',
    'abortion',
    'about',
    'abroad',
    'abandon',
    'ability',
    'able',
    'abortion',
    'African-American',
    'abroad',
    'abandon',
    'ability',
    'able',
    'abortion',
    'about',
    'abroad',
    'abandon',
    'admire',
    'able',
    'abortion',
    'about',
    'adequate',
    'abandon',
    'ability',
    'able',
    'abortion',
    'about',
    'adjustment'
  ]
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
    this.session_name =this.routeP.snapshot.paramMap.get('session_name')
    this.getCategories()
  }

  getCategories() {
    this.org.getCategories().subscribe((response: any) => {
      if (response.success === true) {
        // this.categoryList = response.category
      }
    })
  }
  getCategoryQuestions(cat : any) {
    this.route.navigate(['/add_repository_question_list/'+ cat + '/' + this.session_id]);
  }
}
