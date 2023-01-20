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
  getSingleSessionParticipant(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('participantToken'),
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
  startSession(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id + '/start',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  endSession(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id + '/end',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  attendSession(session_id: any, ansData: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('participantToken'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/session/' + session_id + '/ans',
        JSON.stringify(ansData),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getCategories() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/category',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addCategories(newCategory: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/question/category',
        JSON.stringify({category : newCategory}),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getQuesFromCategory(category: any, sessionId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/question/category/'+ category + '/' + sessionId,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addQuestionWithOption(quesData: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/qa/question/add',
        quesData,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  participantAuth(part_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/participant/'+ part_id,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  participantDetailsForSingleQue(session_id: any, question_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id + '/' + question_id,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  participantDetailsForSession(session_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/session/' + session_id + '/result',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  deleteQueInSession(session_id: any, question_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .delete(
        this.apiURL + '/api/qa/session/' + session_id + '/' + question_id,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getParticipantScore(session_id: any, participant_id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('participantToken'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/qa/' + session_id + '/' + participant_id + '/result',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }


}
