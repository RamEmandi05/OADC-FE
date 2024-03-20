import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import appSettings from '../../../config/app-settings';
import 'lity';

@Component({
	selector: 'extra-profile',
  templateUrl: './extra-profile.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './extra-profile.css' ]
})

export class ExtraProfilePage implements OnDestroy {
  appSettings = appSettings;

  constructor() {
    this.appSettings.appContentClass = 'p-0';
  }

  ngOnDestroy() {
    this.appSettings.appContentClass = '';
  }
}
