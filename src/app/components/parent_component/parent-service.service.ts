import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseURL } from '../../classes';

@Injectable({
  providedIn: 'root',
})
export class ParentServiceService {
  private apiURL = BaseURL;
  OtpId = localStorage.getItem('parentId');
  registerToken = localStorage.getItem('registerToken');
  parentToken = localStorage.getItem('parentToken');
  userId = localStorage.getItem('id');
  kidsId = '551bb082-39b1-430b-9d96-8358c4a20b9a';
  // groupId = "58165da1-bd10-4a4e-ad01-4d5ab9475f18"

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

  parentsignin(signindata: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/signin',
        JSON.stringify(signindata),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  parentsignUp(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(this.apiURL + '/api/parent', JSON.stringify(data), httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  signup(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(this.apiURL + '/api/signup', JSON.stringify(data), httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  parentOtp(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.registerToken,
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/parent/' + localStorage.getItem('parentId'),
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  childOtp(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(this.apiURL + '/api/otp', JSON.stringify(data), httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  mapOtp(data: any) {
    var pId = localStorage.getItem('parent_id');

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/parent/' + pId + '/verify_child',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  kidsInventoryList(id: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(this.apiURL + '/api/parent/kids_inventor/' + id, httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // learn more page
  activityGroup(kidsInvId: any, groupId: any, kidsId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(
        this.apiURL +
          '/api/parent/' +
          kidsInvId +
          '/' +
          groupId +
          '/' +
          kidsId +
          '/activity',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  groupListData(id: any, kidsId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(
        this.apiURL + '/api/parent/' + id + '/' + kidsId + '/list',
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  activityDetail(actId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(this.apiURL + '/api/parent/' + actId + '/details', httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  register(data: any) {
    var pId = localStorage.getItem('registerParentId');

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/parent/' + pId + '/kid',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  kidsList() {
    var pId = localStorage.getItem('registerParentId');

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(this.apiURL + '/api/parent/' + pId + '/kid', httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  mapKids(data: any) {
    var pId = localStorage.getItem('parent_id');
    console.log(this.apiURL);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/parent/' + pId + '/add_child',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  parentProfileDetails() {
    var pId = localStorage.getItem('registerParentId');
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .get(this.apiURL + '/api/parent/' + pId + '/info', httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  studentProfileDetails() {
    var gId = localStorage.getItem('graduateUserId');
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('regToken'),
      }),
    };
    return this.http
      .get(this.apiURL + '/api/graduate/' + gId , httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  editChild(data: any, editId: any) {
    //  var childId = localStorage.getItem('childId')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      },
    };
    return this.http
      .put(this.apiURL + '/api/parent/' + editId + '/kid', data, config)
      .pipe(catchError(this.errorHandler));
  }
  editParent(data: any) {
    var pId = localStorage.getItem('registerParentId');
    const config = {
      headers: {
        enctype: 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      },
    };
    return this.http
      .put(this.apiURL + '/api/parent/' + pId + '/info', data, config)
      .pipe(catchError(this.errorHandler));
  }
  editStudent(data: any) {
    var gId = localStorage.getItem('graduateUserId');
    console.log("id",gId);
    const config = {
      headers: {
        enctype: 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('regToken'),
      },
    };
    return this.http
      .put(this.apiURL + '/api/graduate/' + gId , data, config)
      .pipe(catchError(this.errorHandler));
  }
  // editParent(data :any,editId:any) {
  // editParent(data :any) {
  //   console.log(data);
  //     var pId =  localStorage.getItem('parent_id')
  //     const config = {
  //       headers: {
  //         'enctype': 'application/json',
  //         Authorization: 'Bearer ' + localStorage.getItem('token')
  //       }
  //     };
  //     return this.http.put(this.apiURL + '/api/parent/' + pId + '/info',data,config).pipe(catchError(this.errorHandler))
  //   }
  selectActivity(data: any) {
    var pId = localStorage.getItem('parent_id');
    console.log(this.apiURL);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('parentToken'),
      }),
    };
    return this.http
      .post(
        this.apiURL + '/api/parent/activity/select',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  graduateReg(data: any) {
    var gId = localStorage.getItem('graduateUserId');
    const config = {
      headers: {
        enctype: 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('regToken')
      },
    };
    return this.http
      .post(this.apiURL + '/api/graduate/' + gId, data, config)
      .pipe(catchError(this.errorHandler));
  }
}
