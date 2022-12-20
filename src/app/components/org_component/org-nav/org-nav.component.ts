import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-org-nav',
  templateUrl: './org-nav.component.html',
  styleUrls: ['./org-nav.component.css']
})
export class OrgNavComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.route.navigate(['/org_signin']);
  }
  gotoDashboard() {
    this.route.navigate(['/org_dashboard'], {replaceUrl:true});
  }

}
