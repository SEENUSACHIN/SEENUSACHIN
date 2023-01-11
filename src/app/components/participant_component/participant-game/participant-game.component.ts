import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { SocketService } from "../../org_component/services/socket.service"
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { OrgServiceService } from '../../org_component/org-service.service';
import { NotificationService } from '../../../notification.service';

@Component({
  selector: 'app-participant-game',
  templateUrl: './participant-game.component.html',
  styleUrls: ['./participant-game.component.css']
})
export class ParticipantGameComponent implements OnInit {
  room_id : any
  questionObj : any
  ans: any
  participantId: any
  sessionId: any
  enableSubmit= true
  sessionName: any

  constructor(
    private socket: Socket,
    private routeP: ActivatedRoute,
    private route: Router,
    private notifyService: NotificationService,
    private org: OrgServiceService,
  ) { }

  ngOnInit(): void {
    this.room_id = localStorage.getItem("room_id")
    this.participantId = this.routeP.snapshot.paramMap.get('participantId')
    this.sessionId = this.routeP.snapshot.paramMap.get('sessionId')
    this.getSessionDetails();
    this.socket.emit("join_room", {room : this.room_id});
    this.socket.on("received_message", (data : any) => {
      console.log("received_message ",data)
      this.questionObj = data.message
      this.enableSubmit = true
    });
  }
  getSessionDetails(){
    this.org.getSingleSessionParticipant(this.routeP.snapshot.paramMap.get('sessionId')).subscribe((response: any) => {
      if (response.success === true) {
        console.log('response ', response);
        this.sessionName = response.session[0].name
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }
  submitAns() {
    if(this.ans == null) {
      this.notifyService.showError("Please choose the option", '');
      return
    }
    var data = {
      participant_id: this.participantId,
      question_id: this.questionObj.question.id,
      option_id: this.ans
    }
    this.org.attendSession(this.sessionId, data).subscribe((response: any) => {
      if (response.success === true) {
        this.enableSubmit = false
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })

  }

}
