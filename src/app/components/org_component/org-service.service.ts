import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseURL } from '../../classes';

@Injectable({
  providedIn: 'root',
})
export class OrgServiceService {
  private apiURL = BaseURL;
  constructor(private http: HttpClient) {}
  errorHandler(error: {
    error: {
      message: string;
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  orgSignin(signIndata: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/signin',
        JSON.stringify(signIndata),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  orgSignup(signUpdata: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/signup',
        JSON.stringify(signUpdata),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  orgRegister(regdata: any, org_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/organizer/' + org_id,
        JSON.stringify(regdata),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getOrgSession() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  createSession(sessionData: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/session',
        JSON.stringify(sessionData),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getSingleSession(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getOverAllSessionDetails(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id + '/ans',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllQuestion(searchString: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/question/search',
        JSON.stringify({search : searchString}),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addQuestiontoSession(sessionData : any , session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/session/' + session_id + '/add_qn',
        JSON.stringify(sessionData),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addQuestion(quesData : any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/question',
        quesData,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addOption(optData : any, questionId : any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/' + questionId + '/option',
        optData,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  participantRegister(regdata: any, session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/participant/' + session_id,
        JSON.stringify(regdata),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getParticipantSession() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/participant/session',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  participantMakePayment(participant_id: any, session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/participant/'+ participant_id + '/' + session_id,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

}