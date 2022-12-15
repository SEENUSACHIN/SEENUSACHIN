import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  viewEvents() {
    this.route.navigate(['/eventpage'])
}
  viewTasks() {
    this.route.navigate(['/goalPage'])
}

}
