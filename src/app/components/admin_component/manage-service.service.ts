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
    return this.httpClient.get(this.apiURL + '/api/master/activity', httpOptions).pipe(catchError(this.errorHandler))
  }
  rateActivity (data:any , eventId:any ) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')

      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/activity/'+ eventId , data, httpOptions).pipe(catchError(this.errorHandler))

  }
  viewRateActivity (id:any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/user_activity', httpOptions).pipe(catchError(this.errorHandler))

  }
  getActivitylist(data:any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/user_activity',data, httpOptions).pipe(catchError(this.errorHandler))
  }
  getapprovedActivityList(data:any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/user_activity_approved',data, httpOptions).pipe(catchError(this.errorHandler))
  }
  getSchools() {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/school', httpOptions).pipe(catchError(this.errorHandler))
  }
  getClasses () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/standard', httpOptions).pipe(catchError(this.errorHandler))
  }
  getStudents(schoolName:any ,classId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/student/' + schoolName + '/' + classId, httpOptions).pipe(catchError(this.errorHandler))
  }
  exploreList() {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/explore', httpOptions).pipe(catchError(this.errorHandler))

  }
  getSubjects (classId : any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/standard/' + classId + '/subject', httpOptions).pipe(catchError(this.errorHandler))
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
  getGroupActivities (id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/'+ id + '/list', httpOptions).pipe(catchError(this.errorHandler))
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
    return this.httpClient.post(this.apiURL + '/api/master/standard', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
  }
  createSubject(data: any, classId : string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/standard/'+ classId +'/subject', JSON.stringify(data), httpOptions).pipe(catchError(this.errorHandler))
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
  getWeeks () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/week', httpOptions).pipe(catchError(this.errorHandler))
  }
  createEvents(data:any) {
    const config = {
      headers: {
        "enctype": "multipart/form-data",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  return this.httpClient.post(this.apiURL + '/api/master/event',data,config).pipe(catchError(this.errorHandler));

  }
  editEvents(data :any,eventId:any) {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  return this.httpClient.put(this.apiURL + '/api/master/event/' + eventId,data,config).pipe(catchError(this.errorHandler));

  }
  getEvents () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/event', httpOptions).pipe(catchError(this.errorHandler))
  }
  singleEvent(eventId:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.get(this.apiURL + '/api/master/event/' + eventId,httpOptions).pipe(catchError(this.errorHandler));
  }
  deleteEvent(eventId:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.delete(this.apiURL + '/api/master/event/' + eventId,httpOptions).pipe(catchError(this.errorHandler));

  }
  updateAsset(eventId:any, data: any) {
    // var token = localStorage.getItem('token')
    // const config = {
    //   headers: new HttpHeaders({
    //     "enctype": "multipart/form-data",
    //     'Authorization': 'Bearer ' + token
    //   })
    // }
    const config = {
      headers: {
        "enctype": "multipart/form-data",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    // return this.httpClient.post(this.apiURL + '/api/master/event',data,config).pipe(catchError(this.errorHandler));
  return this.httpClient.put(this.apiURL + '/api/master/event/' + eventId + '/upload',data,config).pipe(catchError(this.errorHandler));
  }
  deleteAsset(eventId:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.delete(this.apiURL + '/api/master/event/' + eventId +'/asset',httpOptions).pipe(catchError(this.errorHandler));

  }
  uploadVideo(data: any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
        "enctype": "multipart/form-data",
        'Authorization': 'Bearer ' + localStorage.getItem('token')

      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/user_activity_upload', data, httpOptions).pipe(catchError(this.errorHandler))
  }
  getGoal(goalId:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.get(this.apiURL + '/api/master/goal/' + goalId ,httpOptions).pipe(catchError(this.errorHandler));
  }
  updateGoal(data :any, goalId:any) {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  return this.httpClient.put(this.apiURL + '/api/master/goal/' + goalId,data,config).pipe(catchError(this.errorHandler));

  }
  deleteGoal(data:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.post(this.apiURL + '/api/master/goal/delete_activity',data,httpOptions).pipe(catchError(this.errorHandler));

  }
  search(data:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.post(this.apiURL + '/api/master/activity',data,httpOptions).pipe(catchError(this.errorHandler));
  }
  searchEvent(data:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.post(this.apiURL + '/api/master/event_search',data,httpOptions).pipe(catchError(this.errorHandler));
  }

  activityPagination(data:any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
      })
    }
  return this.httpClient.post(this.apiURL + '/api/master/activity',data,httpOptions).pipe(catchError(this.errorHandler));
  }

  filterbyStandard(classId:string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/activity/standard/' + classId, httpOptions).pipe(catchError(this.errorHandler))
  }
  filterbyChapter(chapterId:string) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/activity/chapter/' + chapterId, httpOptions).pipe(catchError(this.errorHandler))
  }
  getKidSchools() {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/kid/school', httpOptions).pipe(catchError(this.errorHandler))
  }
  uploadVideoParent(data: any) {
    var token = localStorage.getItem('token')
    var httpOptions = {
      headers: new HttpHeaders({
        "enctype": "multipart/form-data",
        'Authorization': 'Bearer ' + localStorage.getItem('token')

      })
    }
    return this.httpClient.post(this.apiURL + '/api/master/kid/activity_upload', data, httpOptions).pipe(catchError(this.errorHandler))
  }
  studentBySchool(schoolName:any ,classId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/' + schoolName + '/' + classId +'/kid', httpOptions).pipe(catchError(this.errorHandler))
  }
  kidsInventoryList () {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/kids_inventor', httpOptions).pipe(catchError(this.errorHandler))
  }

  activityGroup(kidsId:any, groupId:any ) {
    var httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get(this.apiURL + '/api/master/' + kidsId + '/' + groupId + '/activity', httpOptions).pipe(catchError(this.errorHandler))
  }


}
