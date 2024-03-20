import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, throwError,tap  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import  { Amplify,Auth } from 'aws-amplify';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import apiUrlSettings from '../config/api-urls.setttings'
import { promise } from 'protractor';
import { Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root'
//})
export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  proposedPassword:string;
}

@Injectable({
  providedIn: 'root',
})

export class AccountService {
  private authenticationSubject: BehaviorSubject<any>;
  browserName;

  constructor(private http: HttpClient, private router: Router) {//
    Amplify.configure({      
     

      /*dev-tsnai*/
      // userPoolId: 'us-west-2_WhANWEEYC',
      // userPoolWebClientId: '7gqkueacota50gtnh89iljhabm'
      //dev

      /*dev-tsnai*/
       userPoolId: 'us-west-2_YLGc0FiP8',
        userPoolWebClientId: '3qrlg52cgte623j9cgtopdm1c2'
      //dev
 
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public async setupTOTP(user): Promise<any> {
    //const res = Auth.setupTOTP(user);
   // const authCode = "otpauth://totp/AWSCognito:" + user.username + "?secret=" + res + "&issuer=Cognito";
   // let user = JSON.parse(localStorage.usertoken);
   let userd = await Auth.currentAuthenticatedUser();
    return Auth.setupTOTP(userd);
  }
  public async currentAuthenticatedUser() {
    let user = await Auth.currentAuthenticatedUser();
    return user;
  };
  public async confirmSignUp(userd,verificationCode) {
    return await Auth.verifyTotpToken(userd, verificationCode);
  }
  public async setPreferredMFA(userd,enable) {   
    return await Auth.setPreferredMFA(userd,((enable !=null && !enable)? "NOMFA":"TOTP"));
  }
  public async getPreferredMFA(userd){
    return await Auth.getPreferredMFA(userd, {
      // Optional, by default is false.
      // If set to true, it will get the MFA type from server side instead of from local cache.
      bypassCache: false
    });
  }
  public signIn(user: IUser): Promise<any> {    
    return Auth.signIn(user.email, user.password)
  }
  public  confirmSignIn(user , code) {    
    //Auth.currentAuthenticatedUser().then((userd: any) => {
      return Auth.confirmSignIn(user, code, "SOFTWARE_TOKEN_MFA");
    //});
  }
  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
      localStorage.clear();
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public  resetPassword(user: any,proposedPassword): Promise<any> {
     return Auth.completeNewPassword(user, proposedPassword,[]).then((data) => {
      console.log(data);
     });
  }

  public forgotPassword(username:string) : Promise<any> {
    return Auth.forgotPassword(username)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  public verifyPasscodeForgotPassword(username:string, code:string, new_password:string ): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, new_password)
      .then(data => console.log(data))
      .catch(err => console.log(err));  
  }

  getUserProfileDetails(userProfileReqObj:any):Observable<any>{
    let getUserProfileAPI = apiUrlSettings.TSNBASEGetUserProfileDetails;
    let tempVar = JSON.parse(localStorage.getItem('usertoken'));
    let authorizationToken = tempVar.storage[tempVar.keyPrefix + "." + tempVar.username + ".idToken"];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authorizationToken).set('X-API-Key', 'secret');
    return this.http.post(getUserProfileAPI, JSON.stringify(userProfileReqObj), { headers: headers }).pipe(tap((res: any) => {
      localStorage.setItem("userprofile", JSON.stringify(res[0]));  
    }),catchError(this.error));    
  }
  userLog(logData:any):Observable<any>{    
    if(localStorage.userprofile != null){
      logData.userId = JSON.parse(localStorage.userprofile).cognitouserid;  
    }
    let logEvent = apiUrlSettings.logUserEvent; 
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('X-API-Key', 'secret');
    return this.http.post(logEvent, JSON.stringify(logData), { headers: headers }).pipe(catchError(this.error));    
  }


  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if(error.status === 401){
      //this.router.navigate(['login/v3']);
      //  localStorage.clear();
      //  window.location.href = "/login/v3";
    }
    //console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getUserRolePermissions(userProfileReqObj:any):Observable<any>{
    let getUserProfileAPI = apiUrlSettings.getUserRolePermissions;
    let tempVar = JSON.parse(localStorage.getItem('usertoken'));
    let authorizationToken = tempVar.storage[tempVar.keyPrefix + "." + tempVar.username + ".idToken"];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authorizationToken).set('X-API-Key', 'secret');
    return this.http.post(getUserProfileAPI, JSON.stringify(userProfileReqObj), { headers: headers }).pipe(catchError(this.error));    
  }
  saveUserRolePermissions(userRolePermissions:any):Observable<any>{
    let getUserProfileAPI = apiUrlSettings.saveUserRolePermissions;
    let tempVar = JSON.parse(localStorage.getItem('usertoken'));
    let authorizationToken = tempVar.storage[tempVar.keyPrefix + "." + tempVar.username + ".idToken"];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authorizationToken).set('X-API-Key', 'secret');

    if (userRolePermissions.createdBy == null ||userRolePermissions.createdBy == ''){
      userRolePermissions.createdBy = tempVar.username;
      userRolePermissions.createdOn = new Date();
    }else{
      userRolePermissions.createdBy = userRolePermissions.createdBy;
      userRolePermissions.createdOn = userRolePermissions.createdOn;
    }
    userRolePermissions.modifiedBy = tempVar.username;
    userRolePermissions.modifiedOn = new Date();  
    userRolePermissions.isDeleted = false;    

    return this.http.post(getUserProfileAPI, JSON.stringify(userRolePermissions), { headers: headers }).pipe(catchError(this.error));    
  }
/*
  keepTokenAlive():Observable<any>{
    let tempVar = JSON.parse(localStorage.getItem('usertoken'));
    let authorizationToken = tempVar.storage[tempVar.keyPrefix + "." + tempVar.username + ".idToken"];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authorizationToken).set('X-API-Key', 'secret');
    return this.http.get(apiUrlSettings.keepTokenAlive, { headers: headers }).pipe(catchError(this.error));    
  }*/


  RegisterUser(user:any):Observable<any>{
    let registerUserAPI = apiUrlSettings.registerUser;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(registerUserAPI, JSON.stringify(user), {headers:headers}).pipe(catchError(this.error));
  }

  VerifyUserExists(data:any):Observable<any>{
    return this.http.post(apiUrlSettings.verifyUserLoginExists, JSON.stringify(data)).pipe(catchError(this.error));
  }
  deleteOrganizationUser(data:any): Observable<any> {
    let tempVar = JSON.parse(localStorage.getItem('usertoken'));
    let authorizationToken = tempVar.storage[tempVar.keyPrefix + "." + tempVar.username + ".idToken"];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authorizationToken).set('X-API-Key', 'secret');
    return this.http.post(apiUrlSettings.deleteOrganizationUser, JSON.stringify(data), { headers: headers }).pipe(catchError(this.error));
  }

  detectBrowserName() { 
    const agent = window.navigator.userAgent.toLowerCase();
    console.log(agent,'225');
    
    switch (true) {
      case agent.indexOf('edg') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
}
