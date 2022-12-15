import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { YoutubeService } from '../../../youtube-service';

@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.component.html',
  styleUrls: ['./playlist-videos.component.css', '../../dashboard-layout/dashboard-layout.component.css']
})
export class PlaylistVideosComponent implements OnInit {

  playListItems: any[] = [];
  playListDetails : any;
  prePageToken : string = ""
  nextPageToken : string = ""
  start = 1
  limit = 10
  end = 0
  total = 0
  pageNo = 0
  paginationText = ""
  playlistId : any
  constructor(public youtubeService: YoutubeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.paramMap.get('id')
    this.getPlaylistDetails(this.playlistId)
    this.getPlaylistItem(this.playlistId, "next")
  }

  getPlaylistDetails(playaListId : any) {
    this.youtubeService.getPlaylistDetails(playaListId).subscribe((data : any) => {
      if(data.body['items'].length > 0) {
        this.playListDetails = data.body['items'][0]
        console.log("this.playListDetails ",this.playListDetails )
      }
    })
  }

  getPlaylistItem(playaListId : any, type : string = "") {
    this.playListItems = []
    var data = {
      pageToken : type == 'next' ? this.nextPageToken : this.prePageToken == undefined ? "" : this.prePageToken,
      resultsPerPage :  this.limit
    }
    this.youtubeService.getPlaylistItems(playaListId, data).subscribe(async (data: any) => {
      if(data.body['items'].length > 0) {
        this.playListItems = data.body['items']
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
        for(let i = 0; i < this.playListItems.length; i++) {
          await this.youtubeService.getVideoLike(this.playListItems[i]['snippet']['resourceId']['videoId']).subscribe((data1: any) => {
            console.log("this.data1 ", data1 )
            this.playListItems[i]['like'] = data1.body['items'][0]['statistics']['likeCount']
            console.log("this.playListItems11231 ",this.playListItems[i] )
          })
          await this.youtubeService.getRating(this.playListItems[i]['snippet']['resourceId']['videoId']).subscribe((data2: any) => {
            console.log("this.data2 ", data2 )
            this.playListItems[i]['liked'] = data2.body['items'][0]['rating']
            console.log("this.playListItems11231 ",this.playListItems[i] )
          })
        }
        console.log("this.playListItems22 ",this.playListItems )
      }
    })
  }

  async setRating(videoId: any, rating: any, dat: any) {
    await this.youtubeService.rate(videoId, rating).subscribe(async (data) => {
      console.log("this.data ", data )
      console.log("this.ind ", dat )
      if(rating == 'like') {
        dat['like'] = Number(dat['like']) + 1
        // this.playListItems[ind]['like'] = Number(this.playListItems[ind]['like']) + 1
      } else {
        dat['like'] = Number(dat['like']) - 1
        // this.playListItems[ind]['like'] = Number(this.playListItems[ind]['like']) - 1
      }
    })
  }

}
