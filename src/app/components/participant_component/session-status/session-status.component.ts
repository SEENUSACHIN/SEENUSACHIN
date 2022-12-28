import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-status',
  templateUrl: './session-status.component.html',
  styleUrls: ['./session-status.component.css']
})
export class SessionStatusComponent implements OnInit {
  status : any
  session_id : any
  constructor(
    private routeP: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.status = this.routeP.snapshot.paramMap.get('status')
    this.session_id = this.routeP.snapshot.paramMap.get('session_id')
  }

}
