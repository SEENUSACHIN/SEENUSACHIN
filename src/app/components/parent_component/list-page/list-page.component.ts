import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ParentServiceService } from '../parent-service.service';
import { NotificationService } from '../../../notification.service';



@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  lists:any = [];
  video:any = [];
  selectedList:any = [];
  selected:any = false;
  grpId:any = localStorage.getItem('grpActId');
  kidsId:any= localStorage.getItem('cId')
  kidInvId:any= localStorage.getItem('kid')
  selectedData :any = []
  level:any = localStorage.getItem('level');
  kname:any = localStorage.getItem('kidname');





  constructor(private route : Router,private parent: ParentServiceService, private notify: NotificationService) { }

  ngOnInit(): void {
    this.groupListData()
  }
  viewActivity(id:any) {
    localStorage.setItem('actid', id)
    this.route.navigate(['/detailsPage/' + id]);
  }
  playVideo(data:any) {
    // localStorage.setItem('actid', id)
    // localStorage.setItem('actid', id)
    localStorage.setItem('video',JSON.stringify(data));

    this.route.navigate(['/view_activity/']);
  }
  groupListData() {
    var id = this.grpId;
    var kidId = this.kidsId;
     this.parent.groupListData(id, kidId).subscribe((response: any) => {
       if(response.success) {
         this.lists = response.activity_list
         for (let index = 0; index < this.lists.length; index++) {
          this.lists[index]["selected"] = false
         }
         console.log("video",this.lists);
       }
     });

  }
  selectActivity() {
    console.log('this.selectedData ', this.selectedData);
    var data = {
      activity_id: this.selectedData.join(','),
      kid_id: this.kidsId,
      activity_group_id: this.grpId,
      kids_inventor_id: this.kidInvId
    };

    console.log("data ", data);
    this.parent.selectActivity(data).subscribe((response: any) => {
      if(response.success == true) {
        this.notify.showSuccess(response.msg, '');

      } else {
        this.notify.showSuccess(response.msg, '');

      }
    });

  }
  updateCheckedOptions(data : any, event : any) {
    console.log('data ', data);
    console.log('event ', event);
    if(event.target.checked) {
      this.selectedData.push(data['id'])
    } else {
      var ind = this.selectedData.findIndex((x:any) => x == data['id'])
      if(ind != -1) {
        this.selectedData.splice(ind, 1);
      }
    }
  }

}
