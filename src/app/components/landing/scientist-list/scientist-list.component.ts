import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-scientist-list',
  templateUrl: './scientist-list.component.html',
  styleUrls: ['./scientist-list.component.css']
})
export class ScientistListComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  scientistList() {
    this.route.navigate(['/scientist']);

  }

}
