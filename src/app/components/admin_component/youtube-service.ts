/// <reference path="C:\Users\TTS-BUF-05\OneDrive\Desktop\pi-hubs\pi-hubs4\piehubs-web\node_modules\@types\gapi.auth2\index.d.ts" />
/// <reference path="C:\Users\TTS-BUF-05\OneDrive\Desktop\pi-hubs\pi-hubs4\piehubs-web\node_modules\@types\gapi\index.d.ts" />
import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import BasicProfile = gapi.auth2.BasicProfile;
import {BehaviorSubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private auth!: GoogleAuth;
  // private user$ = new BehaviorSubject<GoogleUser>(null);
  public isSignedIn$ = new BehaviorSubject<any>(false);
  public isAuthInit$ = new BehaviorSubject<any>(false);
  public profile$?: BehaviorSubject<BasicProfile>;
  private accessToken: string | null = null;
  public currentUser : string | null = null;
  public signedIn : boolean = false

  constructor(private httpClient: HttpClient, private zone: NgZone) {
    console.log("enter1")
    gapi.load('auth2', () => {
      console.log("enter2")
      this.zone.run(() => {
        console.log("enter3")
        this.initAuth();
      });
    });
    // this.profile$ = this.user$.pipe(map(user => user && user.getBasicProfile()
    //   ? user.getBasicProfile() : null)) as BehaviorSubject<BasicProfile>;
    // this.user$.subscribe((user) => {
    //   if (user) {
    //     this.accessToken = user.getAuthResponse().access_token;
    //   }
    // });
  }
  ngOnInit() {
    console.log("component has been initialized!")
  }

  initAuth() {
    const params = {
      apiKey: 'AIzaSyBTDVuLt8HBaLN54iGAWByhfurj46Sh6o8',
      clientId: '1012187689490-34qtan7q0t0uv0s6fam9nua2hhn3ndjq.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      plugin_name: "chat",
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl"
      ].join(' ')
    };
    console.log("enter 4 initAuth")
    gapi.load('auth2', () => {
      this.auth = gapi.auth2.init(params);
      console.log("this.auth ", this.auth)
      this.auth.isSignedIn.listen((signedIn: boolean) => {
        console.log("this.auth.isSignedIn ", signedIn)
        this.signedIn = signedIn
      })
      console.log("this.auth ", this.auth)
      this.auth.currentUser.listen((user: GoogleUser) => {
        console.log("this.currentUser ", user.getBasicProfile().getEmail())
        this.currentUser = user.getBasicProfile().getEmail()
        this.accessToken = user.getAuthResponse().access_token
      })
    });

    console.log("this.currentUser1 ", this.currentUser)

    // console.log("enter 1111", document.getElementById("uploadVideo"))
    this.auth.attachClickHandler(document.getElementById("uploadVideo"), {},
      (googleUser) => {
        console.log("enter 1111")
        let profile = googleUser.getBasicProfile();
        console.log(" this.getAuthResponse ", profile);
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('Access Token || ' + googleUser.getAuthResponse().access_token);
        this.accessToken = googleUser.getAuthResponse().access_token
        console.log('ID: ' + profile.getId());
        this.currentUser = googleUser.getBasicProfile().getEmail()
        // ...
      }, function (error) {
        console.log("enter error", error)
        console.log(JSON.stringify(error, undefined, 2));
      }
    );
  }

  public signIn() {
    this.auth.signIn({prompt: 'select_account'});
  }

  getPlaylist(data : any) {
    console.log("enter")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = `https://www.googleapis.com/youtube/v3/playlists?part=id,snippet,status&mine=true&maxResults=${data.resultsPerPage}&pageToken=${data.pageToken}`;
    return this.httpClient.get(url, {headers, observe: 'response', responseType: 'json'})
  }

  uploadVideo(video: any,
              input: {
                playListName: string,
                title: string, description: string,
                tags?: string[],
              }) {
    if (!this.accessToken) {
      throw  new Error('authentication is required');
    }

    const data = {
      snippet: {
        title: input.title,
        description: input.description,
        tags: input.tags,
        categoryId: 22
      },
      status: {
        privacyStatus: 'public',
        embeddable: true
      }
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/octet-stream')
      .set('X-Upload-Content-Length', video.size + '')
      .set('X-Upload-Content-Type', 'video/*')
      // .set('Access-Control-Allow-Origin', '*');
    const url = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails';
    return this.httpClient.post(url, data, {headers, observe: 'response', responseType: 'text'})
      .pipe(switchMap((newData:any) => {
        console.log(" newData ", newData)
        const newRequest = new HttpRequest('PUT', newData.headers.get('location'), video, {reportProgress: true});
        // newData.headers.get('location'),
        return this.httpClient.request(newRequest);
    }));
      // return this.httpClient.post(url, data, {headers, observe: 'response', responseType: 'text'})
  }

  uploadVideoToPlatlist(videoId: string,
    input: {
      playListName: string,
      title: string, description: string,
      tags?: string[],
    }) {
      console.log("input.playList ", input.playListName)
      if (input.playListName == null || input.playListName == '') {
        throw  new Error('Please select the playlist');
      }
      const data = {
        snippet: {
          playlistId :input. playListName,
          resourceId :{
              kind : "youtube#video",
              videoId : videoId
          }
        }
      };

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/octet-stream');


    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,id,snippet,status';
    return this.httpClient.post(url, data, {headers, observe: 'response', responseType: 'json'});

  }

  createPlaylist(input: {
    playListName: string
    description: string
  }) {
    if (input.playListName == null || input.playListName == '') {
      throw  new Error('Please enter the playlist name');
    }
    const data = {
      snippet: {
        title: input.playListName,
        description: input.description
      },
      status: {
        privacyStatus: "public"
      }
    };
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/octet-stream');


    const url = 'https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,id,player,snippet,status';
    return this.httpClient.post(url, data, {headers, observe: 'response', responseType: 'json'});
  }

  getPlaylistItems(id: any, data : any){
    console.log("enter getPlaylistItems")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,id,snippet,status&playlistId=${id}&maxResults=${data.resultsPerPage}&pageToken=${data.pageToken}`;
    return this.httpClient.get(url, {headers, observe: 'response', responseType: 'json'})
  }

  getVideoLike(id: any) {
    console.log("enter getVideoLike")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id='+id;
    return this.httpClient.get(url, {headers, observe: 'response', responseType: 'json'})
  }
  getRating(id: any) {
    console.log("enter getVideoLike")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = 'https://www.googleapis.com/youtube/v3/videos/getRating?id='+id;
    return this.httpClient.get(url, {headers, observe: 'response', responseType: 'json'})
  }
  rate(videoId: any, rating: any) {
    console.log("enter rate")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = 'https://www.googleapis.com/youtube/v3/videos/rate?id='+videoId+'&rating='+rating;
    return this.httpClient.post(url, {}, {headers, observe: 'response', responseType: 'json'})
  }

  getPlaylistDetails(id: any) {
    console.log("enter")
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    let url = 'https://www.googleapis.com/youtube/v3/playlists?part=id,snippet,status&id='+ id;
    return this.httpClient.get(url, {headers, observe: 'response', responseType: 'json'})
  }


  public signOut() {
    this.auth.signOut();
  }
}
