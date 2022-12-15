import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}
  myTeamDetails() {
    this.route.navigate(['/myteam']);
  }
}
