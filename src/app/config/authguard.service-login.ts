import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardLoginService implements CanActivate {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem('usertoken')) {
      //console.log('this.usertoken');
      const returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/tsnai";
      //console.log(returnUrl,'this.usertoken');

      // this.router.navigateByUrl('/campaigns');
      // this.router.navigate(['/campaigns'],{queryParams:{returnUrl:state.url}});
      return true;

    }
    this.router.navigate(['/login/v3']);
    return false;

  }
}
