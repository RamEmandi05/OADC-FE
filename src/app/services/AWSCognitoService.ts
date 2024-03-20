import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, Amplify } from 'aws-amplify';
import { data } from 'jquery';
import { Router } from '@angular/router';
//import {IUser} from '../models/IUser';
export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class AWSCognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  // nick
  // us-west-2_T3CsuOAEC
  // 33fbflhem3amr0ref1sjepunh6

  // myself
  // us-west-2_B1ZHykgiM
  // 6q1dh8ruqi17jpt5no9k0bbqme

  // myslef coloradmin pool
  // us-west-2_SXmnLBjcz
  // jh2n2anq8ca7evi1uatoc7s9c

  // default test@1234

  // Tech@1234

  // facebook creds
  // b7778d557f5423167451b99df1b05818
  // appid: 578852097435152 jh2n2anq8ca7evi1uatoc7s9c
  // Kiran usrs pool
  // id: us-west-2_Y7d99bgoa
  // webclientid : 1ids1e4gh5i6io5vm9ge6i29j4

  constructor(private router: Router) {
    Amplify.configure({
      Auth: {
         /*dev*/
      // userPoolId: 'us-west-2_LREl1RzHb',
      // userPoolWebClientId: '3av8b3barp5848gib0mjbbvvhs'
      ////dev

        /*dev*/
        userPoolId: 'us-west-2_YLGc0FiP8',
        userPoolWebClientId: '3qrlg52cgte623j9cgtopdm1c2'
        ////dev

      }
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    console.log(user, '39');

    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes:
      {
        email: user.email
      }
    })
      .then((data) => {
        console.log(data, 'error occured while logging in');
        return data;
      }).catch((err) => {
        console.log(err['message'], 'error occured while logging in');
        if (err && err['message']) {
          return err;
        } else {
          return err;
        }
      });
  };

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    console.log(user, 68 + 'signin service');

    return Auth.signIn(user.email, user.password)
      .then((data) => {

        localStorage.setItem('currentUser', JSON.stringify(data['username']));
        this.authenticationSubject.next(true);
      }).catch((err) => {
        console.log(err['message'], 'error occured while logging in');
        if (err['message']) {
          return err['message'];
        } else {
          return err;
        }
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
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

}