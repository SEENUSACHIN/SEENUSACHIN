import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logoutAdmin() {
    console.log("enter logoutAdmin")
    localStorage.clear();
  }
}
