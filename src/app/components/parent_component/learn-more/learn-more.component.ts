import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ParentServiceService } from '../parent-service.service';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit {
  activGroupList:any = [];
  actGroupId:any = '';
  // groupId:any  = localStorage.getItem('group_id');
  parentId:any = localStorage.getItem('parent_id');
  kId:any = localStorage.getItem('kid');
  gId:any = localStorage.getItem('gId');
  cId:any = localStorage.getItem('cId');
  kname:any = localStorage.getItem('kidname');

  constructor(private route:Router,private parent: ParentServiceService) { }

  ngOnInit(): void {
    console.log(this.kname);
    // this.kname;
this.activityGroup()
  }
  viewMore(id:any) {
    localStorage.setItem('grpActId', id)

    this.route.navigate(['/activity_list/'+ id]);
  }
  activityGroup() {
    var kId = this.kId;
    var gId = this.gId;
    var cId = this.cId;
     this.parent.activityGroup(kId, gId, cId).subscribe((response: any) => {
       if(response.success) {
         this.activGroupList = response.activity_group
         this.actGroupId = response.activity_group.group_id
        //  localStorage.setItem('groupActId', this.actGroupId)
         console.log("list",this.activGroupList );
       }
     });
   }

}
