import { Component, OnInit } from '@angular/core';
import { ParentServiceService } from '../parent-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  details:any = '';
  actid:any = localStorage.getItem('actid');
  kname:any = localStorage.getItem('kidname');



  constructor(private router:Router,private parent:ParentServiceService) { }

  ngOnInit(): void {
    this.activityDetail()
  }
activityDetail() {
  var id = this.actid;
  this.parent.activityDetail(id).subscribe((response: any) => {
    if(response.success) {
      this.details = response.activity
    }
  });

}
}
