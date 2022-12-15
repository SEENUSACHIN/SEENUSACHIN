import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  home() {
    this.route.navigate(['/dashboard'])
  }
  team() {
    this.route.navigate(['/teamlist'])
  }
  profile() {
    this.route.navigate(['/profile'])
   }
   project() {
    this.route.navigate(['/goalPage'])
   }
   learningActivity() {
    this.route.navigate(['/activity']);
  }

}
