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
// import { WebsocketService } from "../../participant_component/websocket.service";
// import { ChatService } from "../../participant_component/chat.service";
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.css']
})
export class ViewSessionComponent implements OnInit {

  questionObj : any = [
  ]
  quesInd = 0
  quesShow: any = {}
  disableShow: any = [false]
  resultShow: any = [false]
  overallResultShow: any = false
  session_id: any
  room_id: any = ''
  org_id: any
  sessionName =''
  enableEndSessionButton = false
  enableStartSessionButton = true
  msg : any
  resultData: any = []
  overallResultData: any = []
  showOverallResultTable: boolean = false
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private socket: Socket
  ) {
  }

  ngOnInit(): void {
    this.org_id =this.routeP.snapshot.paramMap.get('org_id')
    this.login();
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    this.room_id =this.routeP.snapshot.paramMap.get('room_id')
    console.log('this.session_id ', this.session_id);
  }
  login() {
    this.org.participantAuth(this.org_id).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        localStorage.setItem("token", response.token)
        this.getSessionById(this.session_id)
        // this.notifyService.showSuccess(response.success, '');
      } else {
        this.notifyService.showError(response.success, '');
      }
    })
  }

  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  startSession () {
    this.quesInd = 0
    this.quesShow = this.questionObj[this.quesInd]
    this.disableShow[this.quesInd] = false
    this.overallResultShow = false
    this.resultShow[this.quesInd] = false

    this.org.startSession(this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        if(response.msg == "Session started") {
          this.enableEndSessionButton = true
          this.enableStartSessionButton = false
          this.socket.emit("join_room", {room : this.room_id.toString()});
        }
      }
    })
  }
  endSession () {
    this.socket.emit("send_message", {message : "Session ended", room : this.room_id.toString()});
    this.org.endSession(this.session_id).subscribe((response: any) => {
      this.showOverallResult ();
      this.showOverallResultTable = true
    })
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
    this.socket.emit("send_message", {message : this.questionObj[ind], room : this.room_id.toString()});
  }
  showResult (ind:any, question_id: any) {
    this.resultShow[ind] = true
    this.overallResultShow = false
    this.org.participantDetailsForSingleQue(this.session_id, question_id).subscribe((response: any) => {
      if (response.success === true) {
        this.resultData = response.detail
        console.log(' response ', response);
      }
    })
  }
  closeResult (ind:any) {
    this.resultShow[ind] = false
  }
  showOverallResult () {
    this.overallResultShow = true
    this.resultShow[this.quesInd] = false
    this.org.participantDetailsForSession(this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        this.overallResultData = response.s_q
        console.log(' response ', response);
      }
    })
  }
  closeOverallResult () {
    this.overallResultShow = false
  }
  goToSignIn () {
    localStorage.clear()
    this.route.navigate(['/org_signin'], {replaceUrl:true});
  }
}
