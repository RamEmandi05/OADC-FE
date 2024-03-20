import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, retry, tap, map } from 'rxjs';
import apiUrlSettings from '../config/api-urls.setttings';
import { Router } from '@angular/router';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('usertoken') != null) {
      this.tempVar = JSON.parse(localStorage.getItem('usertoken'));
      this.authorizationToken = this.tempVar.storage[this.tempVar.keyPrefix + "." + this.tempVar.username + ".idToken"];
      this.loginUserId = this.tempVar.username;
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.authorizationToken).set('X-API-Key', 'secret');
      this.headerpdf = new HttpHeaders().set('Content-Type', 'application/pdf').set('Authorization', this.authorizationToken).set('X-API-Key', 'secret');
    }
  }
  tempVar: any; // JSON.parse(localStorage.getItem('usertoken'));
  authorizationToken: any;// this.tempVar.storage[this.tempVar.keyPrefix+"."+this.tempVar.username+".idToken"];
  loginUserId: string;//this.tempVar.username;
  headers: any;//new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.authorizationToken).set('X-API-Key','secret');
  headerpdf: any;

  

  addApplicant(data: any): Observable<any> {
    data.modifiedBy = this.loginUserId
    //data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.registerUser, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }
  
  
  sendUserApprovalEmail(data: any): Observable<any> {
    data.modifiedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.sendUserConfirmationEmail, JSON.stringify(data), { headers: this.headers }).pipe(retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }
  

  // Handle Errors  
  error(error: HttpErrorResponse) {
    let errorMessage :any = {};
    debugger;
    if (error.error instanceof ErrorEvent) {
      errorMessage['message'] = error.error.message;
      // this.toastrService.errorToaster(errorMessage,null)
      errorMessage['message'] = error.error.message
      errorMessage['errorCode'] = error.status
      return errorMessage
    } else {
      errorMessage['message'] = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 401) {         
        errorMessage['message'] = error.error.message
        errorMessage['errorCode'] = error.status
        return  throwError(() => {
          return errorMessage;
        });
      }
    }
    if (error.status === 401) {
    
      errorMessage['message'] = error.error.message
      errorMessage['errorCode'] = error.status
      return errorMessage;

    }
    //console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
 
 
 
  getAllOrganizationForLoggedInUser(): Observable<any> {
    return this.http.post(apiUrlSettings.getAllOrganizations, JSON.stringify({ organizationId: '' }), { headers: this.headers }).pipe(
      map(org => ({ orgdays: org['body'] })
      ), catchError(this.error))
  }
}
