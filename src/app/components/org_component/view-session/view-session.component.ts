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
  room_id: any = ''
  sessionName =''
  enableEndSessionButton = false
  enableStartSessionButton = true
  msg : any
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
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    this.room_id =this.routeP.snapshot.paramMap.get('room_id')
    console.log('this.session_id ', this.session_id);
    this.getSessionById(this.session_id)

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
    this.org.endSession(this.session_id).subscribe((response: any) => {
      if (response.success === true) {
        this.route.navigate(['/org_dashboard'], {replaceUrl:true});
      }
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
