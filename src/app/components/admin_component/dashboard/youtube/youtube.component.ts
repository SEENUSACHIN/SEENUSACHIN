import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { YoutubeService } from '../../youtube-service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import { NotificationService } from '../../../../notification.service'

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class YoutubeComponent implements OnInit {

  playLists : any[] = [];
  // youtubeService : any
  playListItems: any[] = [];
  videoForm!: FormGroup;
  percentageUpload = 0;
  subscription!: Subscription;
  videoUrl!: string;
  loading = false;
  file!: File;
  isUploaded = false;
  url: any;
  errorShow: string = ''
  playListForm!: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  prePageToken : string = ""
  nextPageToken : string = ""
  start = 1
  limit = 5
  end = 0
  total = 0
  pageNo = 0
  paginationText = ""

  constructor(public youtubeService: YoutubeService, private route:Router, private notifyService : NotificationService) {
    this.videoForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      playListName: new FormControl("", [Validators.required]),
    });
    this.playListForm = new FormGroup({
      playListName: new FormControl(null, [Validators.required]),
      description: new FormControl(),
    });
    // this.getPlaylist()
  }
  onSelectFile(event: any) {
    this.file = event.target.files && event.target.files[0];
    if (this.file) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  onSubmit() {
    console.log("this.videoForm.value ", this.videoForm.value)
    if (this.videoForm.value.title == null || this.videoForm.value.title == '') {
      this.errorShow = 'Video title is required'
      return
    } else if (this.videoForm.value.playListName == null || this.videoForm.value.playListName == '') {
      this.errorShow = 'Please select the playlist'
      return
    }
    this.loading = true
    this.subscription = this.youtubeService
      .uploadVideo(this.file, this.videoForm.value).subscribe((data: any) => {
        console.log("data1 ", data)
        const response: any = data.body;
        console.log("data3 ", response)
        this.videoUrl = 'https://www.youtube.com/watch?v=' + response.id;
        this.youtubeService.uploadVideoToPlatlist(response.id, this.videoForm.value).subscribe((data1) => {
          const responseP: any = data1.body;
          console.log("responseP ", responseP)
        });
        this.loading = false
        document.getElementById("closebutton")?.click()
        this.notifyService.showSuccess('video is uploaded to youtube successfully', '');
        // if (data.type === HttpEventType.UploadProgress) {
        //   this.percentageUpload = Math.round(100 * data.loaded / data.total);
        //   console.log("data2 ", this.percentageUpload)
        // } else if (data instanceof HttpResponse) {
        //   const response: any = data.body;
        //   console.log("data3 ", response)
        //   this.videoUrl = 'https://www.youtube.com/watch?v=' + response.id;
        //   this.youtubeService.uploadVideoToPlatlist(response.id, this.videoForm.value).subscribe((data1) => {
        //     const responseP: any = data1.body;
        //     console.log("responseP ", responseP)
        //   });
        //   document.getElementById("closebutton")?.click()
        //   this.notifyService.showSuccess('video is uploaded to youtube successfully', '');
        //   // upload to my server
        // }
      }, (error => {
        console.log("error ", error)
        if (error instanceof Error) {
          this.notifyService.showError(error.message,'');
        } else {
          const errorObject = JSON.parse(error.error);
          if (errorObject.error.errors[0].reason === 'youtubeSignupRequired') {
            // this.snackBar.open('You need to create a youtube channel', 'Create Channel', {
            //   horizontalPosition: 'center',
            //   verticalPosition: 'top',
            //   panelClass: ['alert-error']
            // }).onAction().subscribe(() => {
            //   window.open('https://www.youtube.com/create_channel',
            //     '_blank');
            // });
          } else {
            this.notifyService.showError(errorObject.error.message, '');
          }
        }
      }));
  }

  getPlaylist(type : string = "") {
    var data = {
      pageToken : type == 'next' ? this.nextPageToken : this.prePageToken == undefined ? "" : this.prePageToken,
      resultsPerPage :  this.limit
    }
    this.youtubeService.getPlaylist(data).subscribe((data : any) => {
      if(data.body['items'].length > 0) {
        this.playListItems = []
        this.playLists = data.body['items']
        this.nextPageToken = data.body['nextPageToken']
        this.prePageToken = data.body['prePageToken']
        this.total = data.body['pageInfo']['totalResults']
        if(type == "pre"){
          this.pageNo--
          this.start = this.start - this.limit
          if(this.start == 0) {
            this.start = 1
          }
          this.end = this.start + (this.limit - 1)
        } else {
          this.pageNo++
          if(this.start == 0){
            this.start = this.start * this.pageNo
          } else {
            this.start = this.end + 1
          }
          this.end = this.start + (this.limit - 1)
        }
        if(this.end > this.total){
          this.end = this.total
        }
        this.paginationText = this.start + " - " + this.end + " of " + this.total + " "
        console.log("start ",this.start,  "end ",this.end,  "total ",this.total)
        console.log("this.playLists ",this.playLists )
      }
    })
  }
  displayHello() {
    document.getElementById("content")?.click()
    document.getElementById("getPlaylistid")?.click()
  }

  getPlaylistItem(playaListId: any) {
    this.route.navigate(['/playlist_video/'+playaListId]);
  }

  ngOnInit()  {
    setTimeout(this.displayHello, 100);
  }

  onCreatePlaylistSubmit() {
    console.log("this.playListForm.value ", this.playListForm.value)
    if (this.playListForm.value.playListName == null || this.playListForm.value.playListName == '') {
      this.errorShow = 'PlayListName is required'
      return
    }
    this.loading = true
    this.youtubeService.createPlaylist(this.playListForm.value).subscribe((data) => {
      if (data instanceof HttpResponse) {
          const response: any = data.body;
          console.log("playlist created response", response)
          this.notifyService.showSuccess('Playlist created successfully', "");
          this.loading = false
          setTimeout(this.displayHello, 1000)
          document.getElementById("closebuttonPlaylist")?.click()
          // this.youtubeUploadComponent.getPlaylist();
        }
      }, (error) => {
        if (error instanceof Error) {
          this.notifyService.showError(error.message, "");
        }
      }
    );
  }
}
