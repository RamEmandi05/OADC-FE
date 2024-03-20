import { Component, OnDestroy, OnInit,Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicantsService } from '../../services/applicants.service';
import appSettings from '../../config/app-settings';
import { GlobaltoastrService } from '../../config/globaltoastr.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  //styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy {

  appSettings = appSettings;
  user : any;
  
  constructor(private applicantService : ApplicantsService, private toastr: GlobaltoastrService, private renderer: Renderer2) { 
    this.appSettings.appEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }
  
  ngOnInit(): void {
    this.user = { email : "", mobile : "", firstName : "", lastName : "" };
  }
  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }  
  formSubmit(f: NgForm) {
    // let obj = {
    //         organizationId:this.selectedOrganizationId,
    //         roleName: this.selectedRole,
    //         pagePermissions : this.rolePermissions
    //       };            
    this.applicantService.addApplicant(f.value)
      .subscribe((res)=>{
        if (res.response=="Success"){
          this.toastr.suceesToaster("User registered","");  
          this.user = {email : "", mobile : "", firstName : "", lastName : "" };
        }else{
          this.toastr.errorToaster("Email already used","");
        }
      });           
  } 
}
