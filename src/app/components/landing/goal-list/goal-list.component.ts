import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  @ViewChild('closepopup') closebutton : any;

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  selectActivity() {

  }
  uploadActivity() {
   this.route.navigate(['/upload']),
   this.closebutton.nativeElement.click();
  }
}
