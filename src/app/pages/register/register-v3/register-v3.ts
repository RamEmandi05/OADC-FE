import { Component, OnDestroy, Renderer2,OnInit } from '@angular/core';
import { Router }    from '@angular/router';
import { NgForm }    from '@angular/forms';
import appSettings from '../../../config/app-settings';
import { AWSCognitoService } from '../../../services/AWSCognitoService';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js'

// import {IUser} from '../../../models/IUser';
export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

 
@Component({
	selector: 'register-v3',
	templateUrl: './register-v3.html'
})




export class RegisterV3Page implements OnDestroy {
  appSettings = appSettings;
  user:any;
  awserror : boolean = false;
  msg :any;

  isShowConfirmation:boolean = false;
  constructor(private router: Router, private renderer: Renderer2,private awsCognito: AWSCognitoService) {
    this.appSettings.appEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  ngOnInit(){
    this.router.navigateByUrl('/login/v3')
  }

  formSubmit(f: NgForm) {
    this.user = {email:f.value.email,
                  password:f.value.password,
                 // email:f.valid.email
    };
    this.awsCognito.signUp(this.user).then((result: ISignUpResult) => {
      console.log('45 Result from aws=',result);
      if (typeof(result.userConfirmed) === 'boolean' && !result.userConfirmed) {
        this.awserror = false;
        this.msg = '';
        this.isShowConfirmation = true;
      } else if(typeof(result) === 'string' && result['message']){
        this.awserror = true;
        this.msg = result['message'];
      }
      else {
        this.awserror = true;
        this.msg = result;
      }
    }).catch(err => {
      this.awserror = true;
      this.msg = err;
     // displayObject(err)
    });
    
  }

  formConfirmationSubmit(fconfirm: NgForm) {
    debugger;
    this.user.code=fconfirm.value.verificationcode;
    this.awsCognito.confirmSignUp(this.user).then((result: ISignUpResult) => {
      console.log('64 Result from aws=',result);
      this.router.navigate(['login/v3']);
    }).catch(err => {
     // displayObject(err)
    });
  }
}
 