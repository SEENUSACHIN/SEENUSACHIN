import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { TimelineModule } from "primeng/timeline";
import { CardModule } from "primeng/card";
import { ParentServiceService } from '../parent-service.service';

@Component({
  selector: 'app-kids-inventory',
  templateUrl: './kids-inventory.component.html',
  styleUrls: ['./kids-inventory.component.css']
})
export class KidsInventoryComponent implements OnInit {
  inventorList:any = [];
  totalKids: any = [];
  childName:any = '';
  myChildId:any = ''
  selectedOption:any ='';
  activetChild:any = [];
  activetChildId:any = [];
  gId:any = [];
  @ViewChild('child') child : any;
  graduateData: any = localStorage.getItem('details')
  userRole:any = localStorage.getItem('userRole')


  eventlist = [
    { id : "1", name : "PLAY (Foundation)", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img.jpg' },
    { id : "2", name : "EXPLORE (Intermediate)", updated_on: "21th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "3", name : "INVENT (Advanced)", updated_on: "12th Oct 11-12pm" , profile : '../../../../../assets/img.jpg' },
    { id : "4", name : "KYI - 1", updated_on: "20th Sep 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    { id : "5", name : "KYI - 2", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    // { id : "3", name : "Deepika Event Name", updated_on: "28th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
    // { id : "1", name : "Harini Event Name", updated_on: "18th Sep 11-12pm" , profile : '../../../../../assets/img.jpg' },
    // { id : "2", name : "Jayaharini T Event Name", updated_on: "20th Aug 11-12pm" , profile : '../../../../../assets/img1.jpg' },
  ]

  constructor(private route:Router,private parent: ParentServiceService ) { }

  ngOnInit(): void {
    this.graduateData

    // this.arr = [
    //   {
    //     status: "Time1",
    //   },
    //   {
    //     status: "Time2",
    //   },
    //   {
    //     status: "Time3",
    //   },
    //   {
    //     status: "Time4",
    //   },
    // ];
    if(this.userRole == "parent") {

      this.getKids()
    }
    // this.kyidetails()
  }
setData(data:any) {
  this.myChildId = data.id
  this.child.nativeElement.value = data.myChildId
console.log(data.myChildId);
console.log(this.activetChild);
}
  learnMore(id:any, level:any) {
    console.log();
    localStorage.setItem('kid', id)
    localStorage.setItem('level', level)

    this.route.navigate(['/learn_more/'+ this.activetChildId]);

  }
  learnMore1(id:any) {
    localStorage.setItem('kid', id)
    this.route.navigate(['/activity_list/'+ id]);
    console.log('kyi',localStorage.setItem('kid', id));
  }
  kyidetails(id: any) {
      this.parent.kidsInventoryList(id).subscribe((response: any) => {
        if(response.success) {
          this.inventorList = response.kids_inventors
          console.log('LIST',this.inventorList);
        }
      });
    // this.route.navigate(['/activity_list']);
  }
  getKids() {
    // this.parentId = pid
    this.parent.kidsList().subscribe((response: any) => {
      if (response.success) {
        this.totalKids = response.kid;
        this.activetChild = response.kid[0].first_name;
        this.activetChildId = response.kid[0].id;
        this.gId = response.kid[0].group_id;
        localStorage.setItem('cId', this.activetChildId)
        localStorage.setItem('gId', this.gId)
        localStorage.setItem('kidname', this.activetChild)

        console.log(this.totalKids);
        console.log('selectetChild',this.activetChildId);
        this.kyidetails(this.activetChildId)
      }
    });
  }
  selectChild(id:any, childId:any, groupId:any) {
    this.childName = id
    this.activetChildId = childId;
    this.gId = groupId;
    this.activetChild = this.childName;
    this.kyidetails(this.activetChildId)
    console.log('kidname',this.childName);
    localStorage.setItem('kidname', this.childName)
    localStorage.setItem('cId', this.activetChildId)
    localStorage.setItem('gId', this.gId)
  }
  create() {
    // this.route.navigate(['/parent_profile/'+ this.activetChildId]);
    this.route.navigate(['/parent_profile']);
  }

}
