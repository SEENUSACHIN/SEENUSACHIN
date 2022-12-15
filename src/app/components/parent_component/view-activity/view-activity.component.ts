import { Component, OnInit } from '@angular/core';
import Zoom from "smooth-zoom";

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  video:any = localStorage.getItem('video');
  mydata = JSON.parse(this.video)
  videolist:any = []
  kname:any = localStorage.getItem('kidname');

  // videolist = this.mydata.video_url.kid_activity_asset

  constructor() { }
  ngOnInit(): void {
    console.log('asdasd',this.mydata);
    console.log('kid_activity_asset ',this.mydata.video_url.kid_activity_asset);

    // this.myVideos()
  }
  // myVideos() {
  //   this.videolist =  this.mydata.video_url.kid_activity_asset;
  //   console.log("myList",this.videolist);

  // }
  viewImg() {
    // const zoom = Zoom(".zoomable");
    // zoom.attach(".another-elements");

    Zoom(".zoomable",{
      onClick: (img) => {
        console.log('img ', img);
        img.src = img.src.replace(/-[0-9]+\.jpg/, ".jpg");
      },
      // onTransitionEnd: (img) => {
      //   img.src = img.src.replace(/-[0-9]+\.jpg/, ".jpg");
      // },
    });
  }
}
