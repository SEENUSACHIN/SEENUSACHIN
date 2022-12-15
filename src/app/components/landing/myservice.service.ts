import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BaseURL } from '../../classes'
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  private apiURL = BaseURL;
  OtpId =  localStorage.getItem('id')


   constructor(private http: HttpClient) { }
  errorHandler(error: {
      error: {
          message: string;
      };status: any;message: any;
    }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
  }

  signup(data:any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
return this.http.post(this.apiURL + '/api/signup',JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler));
}
signin(data:any) {
  var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  return this.http.post(this.apiURL + '/api/signin',JSON.stringify(data),httpOptions).pipe(catchError(this.errorHandler));
}
otpVerify(data:any) {
  var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  return this.http.post(this.apiURL + '/api/otp',JSON.stringify(data),httpOptions).pipe(catchError(this.errorHandler));
}
register(data:any) {
  var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
return this.http.post(this.apiURL + '/api/user/' + localStorage.getItem('id') + '/signup',JSON.stringify(data),httpOptions).pipe(catchError(this.errorHandler));
}
top3() {
  var token = localStorage.getItem('token')
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/team_leader_board',httpOptions).pipe(catchError(this.errorHandler));
}
teamAlllist() {
  var token = localStorage.getItem('token')
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/team_leader_board_all',httpOptions).pipe(catchError(this.errorHandler));
}
scientistTop3() {
  var token = localStorage.getItem('token')
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/scientists_leader_board',httpOptions).pipe(catchError(this.errorHandler));
}
allScientist() {
  var token = localStorage.getItem('token')
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/scientists_leader_board_all',httpOptions).pipe(catchError(this.errorHandler));
}
createNewTeam(data: any) {
  var token = localStorage.getItem('token')
  const config = {
    headers: {
      "enctype": "multipart/form-data",
      Authorization: 'Bearer ' + token
    }
  };
return this.http.post(this.apiURL + '/api/team', data,config).pipe(catchError(this.errorHandler));

}
myteamlist() {
  var token = localStorage.getItem('token')
  var userId = localStorage.getItem('userId')
console.log(userId);
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/team/user/' + localStorage.getItem('userId'),httpOptions).pipe(catchError(this.errorHandler));
}
myTeamMembers(teamId:any) {
  var token = localStorage.getItem('token')
  var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
    })
  }
return this.http.get(this.apiURL + '/api/team/' + teamId,httpOptions).pipe(catchError(this.errorHandler));
}
addedmemberlist(teamId:any, data: any) {
  var token = localStorage.getItem('token')

  var httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token
 })
  }
return this.http.post(this.apiURL + '/api/team/'+ teamId , JSON.stringify(data),httpOptions).pipe(catchError(this.errorHandler));

}

  }
