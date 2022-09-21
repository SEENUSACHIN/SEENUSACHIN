import {  HostListener, Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../dashboard-layout/dashboard-layout.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class HeaderComponent implements OnInit {
  @Input()
  header: string = 'Dashboard'
  constructor(private window: Window) {}

  @HostListener('window:resize', ['$event'])

  onResize(event : any){
    event.target.innerWidth; // window width
    console.log("enter width", event.target.innerWidth)
    if (event.target.innerWidth < 768) {
      // $('.sidebar .collapse').collapse('hide');
    };

    // Toggle the side navigation when window is resized below 480px
    if (event.target.innerWidth < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      // $('.sidebar .collapse').collapse('hide');
    };
  }

  ngOnInit(): void {
    var window: Window
    $('#check').click(function() {
      alert('GeeksForGeeks');
    });
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      console.log("enter toggled")
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        // (<any>$('.sidebar .collapse')).collapse('hide');
      };
    });

  }

  logoutAdmin() {
    console.log("enter logoutAdmin")
    localStorage.clear();
  }
  sidebarToggle () {
    let sidebar : any = document.getElementById('accordionSidebar');
    sidebar.style.display = 'block'
  }
}
