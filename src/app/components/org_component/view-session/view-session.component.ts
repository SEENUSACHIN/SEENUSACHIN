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
  selector: 'app-view-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.css']
})
export class ViewSessionComponent implements OnInit {

  questionObj : any = [
    // {
    //   ques : "Entomology is the science that studies",
    //   options : [
    //     "Behavior of human beings",
    //     "Insects",
    //     "The origin and history of technical and scientific terms",
    //     "The formation of rocks"
    //   ]
    // },
    // {
    //   ques : "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
    //   options : [
    //     "Asia",
    //     "Africa",
    //   ]
    // },
    // {
    //   ques : "Garampani sanctuary is located at",
    //   options : [
    //     "Junagarh, Gujarat",
    //     "Diphu, Assam",
    //     "Kohima, Nagaland"
    //   ]
    // },
    // {
    //   ques : "For which of the following disciplines is Nobel Prize awarded?",
    //   options : [
    //     "Physics and Chemistry",
    //     "Diphu, Assam",
    //     "Kohima, Nagaland",
    //     "Literature, Peace and Economics"
    //   ]
    // }
  ]
  quesInd = 0
  quesShow: any = {}
  disableShow: any = [false]
  resultShow: any = [false]
  overallResultShow: any = false
  session_id: any
  sessionName =''
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    console.log('this.session_id ', this.session_id);
    this.getSessionById(this.session_id)
  }
  goToHome () {
    this.route.navigate(['/org_dashboard'], {replaceUrl:true});
  }
  getSessionById(session_id: any) {
    this.org.getSingleSession(session_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        this.sessionName = response.session[0].name
        this.questionObj = response.session[0].s_question
        console.log('this.questionObj ', this.questionObj);
        this.quesShow = this.questionObj[this.quesInd]
        this.disableShow[this.quesInd] = false
        this.resultShow[this.quesInd] = false
        this.overallResultShow = false
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }
  goToNextQues () {
    this.quesInd = this.quesInd + 1
    console.log(' this.quesInd ', this.quesInd);
    this.quesShow = this.questionObj[this.quesInd]
    this.disableShow[this.quesInd] = false
    console.log(' this.quesShow ', this.quesShow);
    this.overallResultShow = false
    this.resultShow[this.quesInd] = false
  }
  showQues (ind:any) {
    this.disableShow[ind] = true
  }
  showResult (ind:any) {
    this.resultShow[ind] = true
    this.overallResultShow = false
  }
  closeResult (ind:any) {
    this.resultShow[ind] = false
  }
  showOverallResult () {
    this.overallResultShow = true
    this.resultShow[this.quesInd] = false
    this.org.getOverAllSessionDetails(this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log(' response ', response);
      }
    })
  }
  closeOverallResult () {
    this.overallResultShow = false
  }
}
