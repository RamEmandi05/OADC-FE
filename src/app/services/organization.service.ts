import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap, retry } from 'rxjs';
import apiUrlSettings from '../config/api-urls.setttings';
import { Router } from '@angular/router';
import { GlobaltoastrService } from '../config/globaltoastr.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  tempVar: any; // JSON.parse(localStorage.getItem('usertoken'));
  authorizationToken: any;// this.tempVar.storage[this.tempVar.keyPrefix+"."+this.tempVar.username+".idToken"];
  loginUserId: string;//this.tempVar.username;
  headers: any;//new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.authorizationToken).set('X-API-Key','secret');
  that = this;
  constructor(private http: HttpClient, private router: Router, private toastrService:GlobaltoastrService) {
    if (localStorage.getItem('usertoken') != null) {
      this.tempVar = JSON.parse(localStorage.getItem('usertoken'));
      this.authorizationToken = this.tempVar.storage[this.tempVar.keyPrefix + "." + this.tempVar.username + ".idToken"];
      this.loginUserId = this.tempVar.username;
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.authorizationToken).set('X-API-Key', 'secret');
    }
  }


  saveOrganization(data: any): Observable<any> {
    if (data.organizationId == '' || data.organizationId == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    } else {
      data.createdBy = data.createdBy;
      data.createdOn = data.createdOn;
    }
    data.modifiedBy = this.loginUserId;
    data.modifiedOn = new Date();
    data.isDeleted = false;
    //debugger; 
    return this.http.post(apiUrlSettings.TSNBASEcreateOrganization, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

  getAllOrganizations(): Observable<any> {
    return this.http.get(apiUrlSettings.TSNBASEgetOrganizationsDetails, { headers: this.headers }).pipe(catchError(this.error));
  }
  


  deleteOrganization(data: any): Observable<any> {
    data.deletedBy = this.loginUserId;
    data.deletedOn = new Date();
    return this.http.post(apiUrlSettings.deleteOrganization, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

  addUserIncognito(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.TSNBASEcreatecognitouser, JSON.stringify(data), { headers: this.headers }).pipe(retry({ count: 3, delay: 1000 }), catchError(this.error));
  }

  addOrganizationUser(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.TSNBASEsaveOrganizationUserDetails, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

  getOrganizationUerByOrganizationId(data: any): Observable<any> {
    return this.http.post(apiUrlSettings.TSNBASEGetUserProfileDetails, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

  deleteOrganizationUser(data: any): Observable<any> {
    data.deletedBy = this.loginUserId;
    data.deletedOn = new Date();
    return this.http.post(apiUrlSettings.deleteOrganizationUser, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

 

  deleteOrgaUser(data: any): Observable<any> {
    data.modifedBy = this.loginUserId;

    return this.http.post(apiUrlSettings.deleteOrgUser, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }


  getAuditLog(data: any): Observable<any> {
    return this.http.post(apiUrlSettings.getAuditLog, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.error));
  }

  addOrganizationModel(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifiedBy = this.loginUserId
    data.modifiedOn = new Date();
    // data.isDeleted = false;
    console.log(data, 'sent to org model api'); 
    return this.http.post(apiUrlSettings.tsnai_createOrganizationModel, JSON.stringify(data),{ headers: this.headers } ).pipe( retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }

  getAllOrganizationModels(orgid?: string,modelId?: string): Observable<any> {
    return this.http.post(apiUrlSettings.tsnai_getAllOrganizationModels,JSON.stringify({"orgid":orgid,"modelid":modelId}), { headers: this.headers }).pipe(retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }

  trainOrganizatioModel(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifiedBy = this.loginUserId
    data.modifiedOn = new Date();
    // data.isDeleted = false;
    console.log(data, 'sent to org model api');
    debugger
 
    return this.http.get("https://eip.techskillnation.com/tsnai/genmodel/?modelName="+data.modelName,{ headers: this.headers }).pipe(catchError(this.error));
    
  } 

  deleteOrganizationFile(data:any):Observable<any>{    
    // data.deletedBy=this.loginUserId; 
    data.modifedBy=this.loginUserId;
    data.deletedOn=new Date();
    debugger
    return this.http.post(apiUrlSettings.deleteOrganizationFile,JSON.stringify(data),{ headers: this.headers }).pipe( 
      retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }
 
 
// SignUp User
  createSignUpUserInCongito(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.tsnai_signupUser, JSON.stringify(data), { headers: this.headers }).pipe( retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }
 
  saveSignUpUser(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.tsnai_saveSignUpUserDetails, JSON.stringify(data), { headers: this.headers }).pipe( retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }


  createSignUpUserOrganization(data: any): Observable<any> {
    if (data.cognitouserid == "" || data.cognitouserid == undefined) {
      data.createdBy = this.loginUserId;
      data.createdOn = new Date();
    }
    data.modifedBy = this.loginUserId
    data.modifiedOn = new Date();
    data.isDeleted = false;
    return this.http.post(apiUrlSettings.tsnai_createSignUpUserOrganization, JSON.stringify(data), { headers: this.headers }).pipe( retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }

  getOrgsbySearchkey(data: any): Observable<any> {
 
    return this.http.post(apiUrlSettings.tsnai_getOrgsbySearchkey, JSON.stringify(data), { headers: this.headers }).pipe( retry({
      count: 3,
      delay: 1000
    }),catchError(this.error));
  }



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
        // alert('Token expired...Please login again.')
        // this.toastrService.errorToaster(errorMessage,null)
        errorMessage['message'] = error.error.message
        errorMessage['errorCode'] = error.status
        return  throwError(() => {
          return errorMessage;
        });
      }
    }
    if (error.status === 401) {
      //this.router.navigate(['login/v3']);
      //  localStorage.clear();
      //  window.location.href = "/login/v3";
      // this.toastrService.errorToaster(errorMessage,null)
      errorMessage['message'] = error.error.message
      errorMessage['errorCode'] = error.status
      return errorMessage;

    }
    //console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
