import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import appSettings from '../../../config/app-settings';

@Component({
  selector: 'customer-order',
  templateUrl: './customer-order.html'
})

export class PosCustomerOrderPage implements OnDestroy {
  appSettings = appSettings;
  posMobileSidebarToggled = false;
  
	togglePosMobileSidebar() {
	  this.posMobileSidebarToggled = !this.posMobileSidebarToggled;
	}

  constructor() {
    this.appSettings.appEmpty = true;
    this.appSettings.appContentFullHeight = true;
  }
  
  ngAfterViewInit() {
  	var targets = [].slice.call(document.querySelectorAll('.pos-menu [data-filter]'));
  	
  	targets.map(function(target) {
  		target.onclick = function(e) {
  			e.preventDefault();
  			
  			var targetBtn = e.target;
  			var targetFilter = targetBtn.getAttribute('data-filter');
				
				targetBtn.classList.add('active');
				
				var allFilter = [].slice.call(document.querySelectorAll('.pos-menu [data-filter]'));
				
				allFilter.map(function(filterElm) {
					var filterElmFilter = filterElm.getAttribute('data-filter');
					
					if (targetFilter != filterElmFilter) {
						filterElm.classList.remove('active');
					}
				});
				
				var allContent = [].slice.call(document.querySelectorAll('.pos-content [data-type]'));
				allContent.map(function(contentElm) {
					var contentType = contentElm.getAttribute('data-type');
					
					if (targetFilter == 'all') {
						contentElm.classList.remove('d-none');
					} else {
						if (contentType != targetFilter) {
							contentElm.classList.add('d-none');
						} else {
							contentElm.classList.remove('d-none');
						}
					}
				});
  		}
  	});
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.appSettings.appContentFullHeight = false;
  }
}
