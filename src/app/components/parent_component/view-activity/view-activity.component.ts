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
  showImg:any = ''


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
      onClick: (actImg) => {
        console.log('actImg ', actImg);
        actImg.src = actImg.src.replace(/-[0-9]+\.jpg/, ".jpg");
      }
    });
  }
  // imageShow() {
    // this.showImg = document.getElementById('actImg') as HTMLElement;
    // this.showImg.click();
    myImageFunction(productSmallImg: any) {
      // console.log('productSmallImg ', productSmallImg.mydata.video_url.kid_activity_asset[2].url);
      var productFullImg:any = document.getElementById("img-Box");
      console.log('productFullImg ', productFullImg.src);
      productFullImg.src = productSmallImg;
  }
}
