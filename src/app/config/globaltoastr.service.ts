import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobaltoastrService {
  toastObj = {
    timeOut: 10000,
    progressBar: true,
    // progressAnimation:'decreasing',
    closeButton: true,
    positionClass: 'toast-top-right',
    enableHtml:true
  };
  title = "";
  defaultMessage = "Request completed";
  constructor(private toastr: ToastrService) { }

  suceesToaster(message,title) {
    this.defaultMessage = (message) ? message : this.defaultMessage
    this.toastr.success(this.defaultMessage,title,  this.toastObj);
  }

  infoToaster(message,title) {
    this.defaultMessage = (message) ? message : this.defaultMessage
    this.toastr.info(this.defaultMessage,title,  this.toastObj);
  }

  errorToaster(message,title ) {
    this.defaultMessage = (message) ? message : this.defaultMessage
    this.toastr.error(this.defaultMessage,title,  this.toastObj);
  }

  warningToaster(message,title ) {
    this.defaultMessage = (message) ? message : this.defaultMessage
    this.toastr.warning(this.defaultMessage,title,  this.toastObj);
  }
}
