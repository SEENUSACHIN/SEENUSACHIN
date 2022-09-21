import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseURL } from '../../classes';
// import { Product } from "./product";

@Injectable({
  providedIn: 'root'
})
export class ManageServiceService {
  additem(): any {
    throw new Error('Method not implemented.');
  }

  private apiURL = BaseURL;
  constructor(private httpClient: HttpClient) { }
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
  adminSignIn(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post(this.apiURL + '/api/signin', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  getActivity () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/activity/all', httpOptions).pipe(catchError(this.errorHandler))
  }
  getClasses () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/class', httpOptions).pipe(catchError(this.errorHandler))
  }
  getSubjects (classId : any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/class/' + classId + '/subject', httpOptions).pipe(catchError(this.errorHandler))
  }
  getChapter (subId : any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/subject/' + subId + '/chapter', httpOptions).pipe(catchError(this.errorHandler))
  }
  createActivity(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/user/' + localStorage.getItem('user_id') + '/activity', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  getGoals () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/goal', httpOptions).pipe(catchError(this.errorHandler))
  }
  createGoal(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/goal', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  getAdminActivity (chapterId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/activity/chapter/'+ chapterId, httpOptions).pipe(catchError(this.errorHandler))
  }
  getAllSubjects () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/subject', httpOptions).pipe(catchError(this.errorHandler))
  }
  getAllTopics () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/topic', httpOptions).pipe(catchError(this.errorHandler))
  }
  getAllChapters () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/chapter', httpOptions).pipe(catchError(this.errorHandler))
  }
  createClass(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/class', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  createSubject(data: any, classId : string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/class/'+ classId +'/subject', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  createChapter(data: any, subjectId : string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/subject/'+ subjectId +'/chapter', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  createTopic(data: any, chapterId : string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/chapter/'+ chapterId +'/topic', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  getAllSubTopics () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/subtopic', httpOptions).pipe(catchError(this.errorHandler))
  }
  getTopics (chapId : any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/chapter/' + chapId + '/topic', httpOptions).pipe(catchError(this.errorHandler))
  }
  createSubTopic(data: any, topicId : string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/topic/'+ topicId +'/subtopic', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
}
