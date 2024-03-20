import { Component, OnInit } from '@angular/core';
import appSettings from '../../config/app-settings';
import lookups from '../../config/lookups';
 
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  appSettings = appSettings;
  colorado = lookups.coloradoLogo;
  constructor() {
    this.appSettings.appSidebarNone = true;
    this.appSettings.appHeaderNone  = true;
  }

  ngOnDestroy(): void {
    this.appSettings.appSidebarNone = true;
    this.appSettings.appHeaderNone  = true;
  }

  ngOnInit(): void {
  }

}
