import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { OrgServiceService } from '../../org_component/org-service.service';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-participant-game-list',
  templateUrl: './participant-game-list.component.html',
  styleUrls: ['./participant-game-list.component.css']
})
export class ParticipantGameListComponent implements OnInit {
  sessionList: any = []
  constructor(
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSession()
  }

  getSession() {
    this.org.getParticipantSession().subscribe((response: any) => {
      if (response.success === true) {
        this.sessionList = response.session
        var now_date = new Date()
        for (var i = 0; i < this.sessionList.length; i++) {
          var end_datetime = new Date(this.sessionList[i].end_datetime)
          if(now_date >= end_datetime ) {
            console.log("enter drfghj");
            this.sessionList[i]['expired'] = true
          }
        }
      }
    });
  }
  registerGame(session_id : any, gameName : any) {
    this.route.navigate(['/participant_register/' + gameName + '/' + session_id]);
  }
}
