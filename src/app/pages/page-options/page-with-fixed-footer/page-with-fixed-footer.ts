import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import appSettings from '../../../config/app-settings';

@Component({
  selector: 'page-with-fixed-footer',
  templateUrl: './page-with-fixed-footer.html'
})

export class PageFixedFooter implements OnInit, OnDestroy {
  appSettings = appSettings;
  
  code = `<!-- page.ts -->
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import appSettings from '../../../config/app-settings';

export class PageClassName implements OnInit, OnDestroy {
  appSettings = appSettings;
  
  constructor(private elRef:ElementRef) {
    this.appSettings.appContentFullHeight = true;
    this.appSettings.appContentClass = 'p-0';
  }
  ngOnInit() {
    this.elRef.nativeElement.classList.add('d-flex', 'flex-column', 'h-100');
  }
  ngOnDestroy() {
    this.appSettings.appContentFullHeight = false;
    this.appSettings.appContentClass = '';
  }
}

<!-- page.html -->
<div class="flex-grow-1 overflow-hidden">
  <perfect-scrollbar class="h-100">
    <div class="app-content-padding">
      ...
    </div>
  </perfect-scrollbar>
</div>

<div id="footer" class="app-footer m-0">
  &copy; 2022 Color Admin Responsive Admin Template - Sean Ngu All Rights Reserved
</div>
`;

  constructor(private elRef:ElementRef) {
    this.appSettings.appContentFullHeight = true;
    this.appSettings.appContentClass = 'p-0 ';
  }
  
  ngOnInit() {
  	this.elRef.nativeElement.classList.add('d-flex', 'flex-column', 'h-100');
  }

  ngOnDestroy() {
    this.appSettings.appContentFullHeight = false;
    this.appSettings.appContentClass = '';
  }
}
