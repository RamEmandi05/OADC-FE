import { Component, OnDestroy } from '@angular/core';
import { Router, } from '@angular/router';
import appSettings from '../../../config/app-settings';
 
@Component({
	selector: 'extra-error',
  templateUrl: './extra-error.html'
})

export class ExtraErrorPage implements OnDestroy {
	appSettings = appSettings;

  constructor(private router:Router) {
    this.appSettings.appEmpty = true;
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
  }

  redirectTo(){
    localStorage.clear();
    this.router.navigate(['/login/v3'])
  }
}
