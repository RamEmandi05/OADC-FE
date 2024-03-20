import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
import { OrganizationService } from '../../../services/organization.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  isAdmin: boolean;
  isOganizationViewer : boolean;
  selectedRole:string="";
  lnkDetails:any;
  ngxloading: boolean = false;
  
  rolePermissions:any=[
    {
      "pageName":"ManageApplicants",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    },
    {
      "pageName":"Organizations",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    },
    {
      "pageName":"Organization Users",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    }
  ];
  defaultPermissions:any=[
    {
      "pageName":"ManageApplicants",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    },
    {
      "pageName":"Organizations",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    },
    {
      "pageName":"Organization Users",
      "permissions":{"create":false,"update":false,"delete":false,"view":false}
    }
  ];
  userProfile: any;
  organizations: any;
  selectedOrganizationId: any;
  
  constructor(private accountService : AccountService , private toastr: GlobaltoastrService, private  organizationService : OrganizationService) { }

  ngOnInit(): void {
    this.getAllOrganizations()
    //this.bindAdminNotification();  
  }
     
  changeRole() 
  {
    if (this.selectedOrganizationId == null || this.selectedOrganizationId == "") 
    {
      this.toastr.errorToaster("Please select organization","");
    } 
    else if (this.selectedRole == null || this.selectedRole == "")
    {
      this.toastr.errorToaster("plese select role","");
    } 
    else 
    {
      
      this.ngxloading = true;
      var dat = {"roleName" : this.selectedRole, "organizationId": this.selectedOrganizationId};
      this.accountService.getUserRolePermissions(dat)
      .subscribe((res)=>{
        //debugger;
        if(res != null && res.length > 0)
        {
          if(res[0] != null){
            if(res[0].pagePermissions != null && res[0].pagePermissions.length>0){
              this.rolePermissions = res[0].pagePermissions;
            }
          }
          else{
            this.rolePermissions = JSON.parse(JSON.stringify(this.defaultPermissions));
          }
          
          
        }
        else
        {
          this.rolePermissions = JSON.parse(JSON.stringify(this.defaultPermissions));
        }
        this.ngxloading = false;
      });
    }
  }
  
  formSubmit(f: NgForm) {  
        let obj = {
                organizationId:this.selectedOrganizationId,
                roleName: this.selectedRole,
                pagePermissions : this.rolePermissions
              };            
        this.accountService.saveUserRolePermissions(obj)
           .subscribe((res)=>{
              if (res.response=="Success"){
                this.toastr.suceesToaster("User role permissions saved successfully","");                            
              }else{
                this.toastr.errorToaster("please enter valid data","");
              }
           });           
    }  

     
    
  

  
  

    getAllOrganizations() {
      this.userProfile = JSON.parse(localStorage.userprofile);   
      if (this.userProfile.role == "OrganizationViewer")
            this.isOganizationViewer = true;
      if (this.userProfile.role=="Admin") {
        this.isAdmin = true;  
        this.organizationService.getAllOrganizations().subscribe((res)=>{
          this.organizations = res.body;
          this.selectedOrganizationId = this.organizations[0]._id;//organizationid;
        });
      } else {
        this.organizationService.getAllOrganizations().subscribe((res)=>{
          const tempOrgs =[];
          res.body.forEach((element,index)=>{
            if(element.organizationId==this.userProfile._id)//organizationid) 
              tempOrgs.push(element);
            if (index == (res.body.length-1) ){
              this.organizations = tempOrgs;
              this.selectedOrganizationId = this.organizations[0]._id;//organizationId;
            }
          });
        });
      }     
    }  
}