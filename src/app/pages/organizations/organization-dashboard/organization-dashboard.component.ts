import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debug } from 'console';
import { tr } from 'date-fns/locale';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { $ } from 'protractor';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
import { OrganizationService } from '../../../services/organization.service';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { OrgDivCheif, DivCheif } from '../../../models/orgnization-div-chief';
import lookups from '../../../config/lookups'; 

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.css']
})

export class OrganizationDashboardComponent implements OnInit {
 

  
  @ViewChild('hidden', { static: false }) myModal; //  ---1

  organizationName = '';
  _id = '';
  isVerificationEnabled: boolean = true;
  isReminderEmailEnabled: boolean = false;
  selectedEmailFequency: string = "";
  fromEmail: boolean = true;
  createdBy = '';
  organization: any;
  router: any;
  organizations: any;
  isAdmin: boolean;
  userProfile: any = {};
  organizationPagePer: any = {};
  messagingServiceSid: string = "";
  sendGridAPIKey: string = "";
  selectedOrganizations: any[];
  totalRecords: number;
  loading: boolean;
  ngxloading: boolean = false;
  emailFrequencyMessage: string = "";
  defualtTab = 'org_details';
  OrgDivCheifData = new OrgDivCheif();
  divCheifObj: DivCheif = new DivCheif();
  OrgDivCheif = {
    name: "",
    email: "",
    isSendEmail: undefined
  };
  OrgRecruitingStaff = {
    name: "", 
    email: "",
    isSendEmail: undefined
  };
  orgDivupdateId = null;
  orgRecruitingupdateId = null;
  orgRecruitingStaffData = new OrgDivCheif();
  // paymentData = [{ paymentType: "Application Fee",  amount: '200'},{ paymentType: "Psychological Evaluation(PE)",  amount: '400'}];
  paymentTypes: any = lookups.paymentType;

  daystoLockUser:number = 0;

  constructor(private organizationService: OrganizationService, private toastr: GlobaltoastrService) { 
  
  }

  ngOnInit(): void {
    this.getAllOrganizations();
    // this.OrgDivCheif.orgDivCheifData.push(this.divCheifObj)
    // console.log(typeof (this.OrgDivCheif.orgDivCheifData ,'test'));
    // console.log((this.OrgDivCheif.orgDivCheifData ,'test'));


  }

  changeEmailFrequency(): void {
    if (this.selectedEmailFequency == "WEEKLY") {
      this.emailFrequencyMessage = "Email is sent to users on weekday on which they were registered";
    }
    else if (this.selectedEmailFequency == "MONTHLY") {
      this.emailFrequencyMessage = "Email is sent to users on 1st of every month";
    }
    else {
      this.emailFrequencyMessage = "";
    }
  }

  getAllOrganizations() {
    this.ngxloading = true;
   
    this.userProfile = JSON.parse(localStorage.userprofile);
    this.organizationService.getAllOrganizations().subscribe({
    next:(res)=>{
      this.ngxloading = false;
      // this.organizationPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organizations")[0].permissions;
      this.loading = false;
      if (this.userProfile.role == "Admin") {
        this.isAdmin = true;
        this.organizations = res.body;
      } else {
        const tempOrgs = [];
        res.body.forEach((element, index) => {
          if (element._id == this.userProfile.organizationid)
            tempOrgs.push(element);
          if (index == (res.body.length - 1)) {
            this.organizations = tempOrgs;
          }
        });
      }
    },
    error:(err)=>{
      if(err.errorCode === 401){
        this.toastr.errorToaster(err.message+'...please login again.',null)
      } else {
        this.toastr.errorToaster(err.message,null)
      }
      this.ngxloading = false;
       this.loading = false;
    }
    })
    // this.organizationService.getAllOrganizations().subscribe((res) => {
    //   this.ngxloading = false;
    //   // this.organizationPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organizations")[0].permissions;
    //   this.loading = false;
    //   if (this.userProfile.role == "Admin") {
    //     this.isAdmin = true;
    //     this.organizations = res.body;
    //   } else {
    //     const tempOrgs = [];
    //     res.body.forEach((element, index) => {
    //       if (element._id == this.userProfile.organizationid)
    //         tempOrgs.push(element);
    //       if (index == (res.body.length - 1)) {
    //         this.organizations = tempOrgs;
    //       }
    //     });
    //   }
    // });
  }

  addOrganization() {
    this.organizationName = "";
    this._id = undefined;
    this.isVerificationEnabled = true;
    this.isReminderEmailEnabled = false;
    this.selectedEmailFequency = "Not Required";
    this.fromEmail = true;
    this.messagingServiceSid =  "Not Required";
    this.sendGridAPIKey =  "Not Required";
    this.isReminderEmailEnabled = false;
    this.selectedEmailFequency = "";
    this.daystoLockUser = 0
  }

  editOrganization(organization: any) {
    this.organizationName = organization.organizationName;
    // this.organizationId = organization.organizationId;
    this._id = organization._id;
    this.isVerificationEnabled = organization.isVerificationEnabled;
    this.isReminderEmailEnabled = organization.isReminderEmailEnabled;
    this.selectedEmailFequency = organization.selectedEmailFequency;
    this.fromEmail = organization.fromEmail;
    this.messagingServiceSid = organization.messagingServiceSid;
    this.sendGridAPIKey = organization.sendGridAPIKey;
    this.createdBy = organization.createdBy;
    let orgDivCheifs = this.organizations.filter((org) => { return org._id === organization._id });
    let orgRecruitStaff = this.organizations.filter((org) => { return org._id === organization._id });
 

    if (orgDivCheifs && orgDivCheifs.length) {
      this.OrgDivCheifData.orgDivCheifData = orgDivCheifs[0]['divisionChiefs'];
    }
    if (orgRecruitStaff && orgRecruitStaff.length) {
      this.orgRecruitingStaffData.orgRecruitingStaffData = orgRecruitStaff[0]['recruitingStaff'];
      this.orgRecruitingStaffData.paymentData = orgRecruitStaff[0]['paymentsInfo'];
    }

    this.daystoLockUser = organization.daystoLockUser;

  }
  
  deleteOrganization(orgName: string, orgId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this organization? ' + orgName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        let data = { "_id": orgId };
        this.organizationService.deleteOrganization(data).subscribe({
          next: (res) => {
            debugger;
            if (res != null && res.body != null && res.body.response == "Success") {
              this.toastr.suceesToaster("Organization deleted", "");
              this.getAllOrganizations();
            } else if (res != null && res.message != null) {
              this.toastr.errorToaster(res.message, "");
            }
          },
          error: (err) => {
            console.log(err);
            this.toastr.errorToaster("Something went wrong", "");
          }
        });
        //   this.organizationService.deleteOrganization(data).subscribe((res)=>{
        //     console.log(res);
        //     if (res!=null &&res.body!=null &&res.body.response == "Success"){
        //       this.toastr.suceesToaster("Organization deleted","");
        //     }else if (res!=null && res.message!=null){
        //       this.toastr.errorToaster(res.message,"");        
        //     }
        //     }, function(err){
        //       console.log(err);
        //       this.toastr.errorToaster("Something went wrong","");
        //     });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  //})
  //}


  formSubmit(f: NgForm) {
    if (f.value.organizationName == null || f.value.organizationName == "") {
      this.toastr.errorToaster("Please provide organization name", "")
    } else {
      this.ngxloading = true;
      this.organization = {
        organizationName: f.value.organizationName
        , _id: f.value._id
        //, isMobileVerificationEnabled: f.value.isMobileVerificationEnabled
        , isVerificationEnabled: f.value.isVerificationEnabled
        , isReminderEmailEnabled: f.value.isReminderEmailEnabled
        , selectedEmailFequency: f.value.selectedEmailFequency
        , fromEmail: f.value.fromEmail
        , messagingServiceSid: f.value.messagingServiceSid
        , sendGridAPIKey: f.value.sendGridAPIKey
        , createdBy: f.value.createdBy
        , divisionChiefs: this.OrgDivCheifData.orgDivCheifData
        , recruitingStaff: this.orgRecruitingStaffData.orgRecruitingStaffData
        , paymentsInfo: this.orgRecruitingStaffData.paymentData
        , daystoLockUser : this.daystoLockUser
      }
      //debugger;
      this.organizationService.saveOrganization(this.organization)
        .subscribe((res) => {
          this.ngxloading = false;
          if (res.statusCode == 200) {
            this.myModal.nativeElement.click();
            // this.toastr.suceesToaster('Organization added successfully',null);//          alert("organization added successfully");
            if (this.organization?._id && this.organization?._id !== '') {
              this.toastr.suceesToaster('Organization updated successfully', "Success");
            } else {
              // this.toastr.suceesToaster(res.response,"");            
              this.toastr.suceesToaster('Organization created successfully', "Success");
            }
            this.getAllOrganizations()
          } else {
            console.log(res);
            //alert(res);          
            this.toastr.errorToaster(res, null);
          }
        })
    }
  }



  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.organizations);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "organizations");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  addDivChief(data: any, orgUpdateId: number = null) {
    if (this.orgDivupdateId != null && this.orgDivupdateId > -1) {
      this.OrgDivCheifData.orgDivCheifData[orgUpdateId] = data;
    } else {
      this.OrgDivCheifData.orgDivCheifData.push(data);
    }
    this.OrgDivCheif = {
      name: '',
      email: '',
      isSendEmail: undefined
    }
    this.orgDivupdateId = null;
  }

  isSendStatus(status: boolean) {
    if (status) {
      return 'Yes';
    } else {
      return 'No';
    }
  }


  editOrgDivCheif(orgData: any, index) {
    if (orgData) {
      this.OrgDivCheif = orgData;
      this.orgDivupdateId = index;
    }
  }
  deleteOrgDivCheif(deleteOrgDivCheif: any, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this divison cheif - ' + deleteOrgDivCheif.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.OrgDivCheifData.orgDivCheifData.splice(index, 1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })

  }

  addRecruitingStaff(data: any, orgUpdateId: number = null) {
    if (this.orgRecruitingupdateId != null && this.orgRecruitingupdateId > -1) {
      this.orgRecruitingStaffData.orgRecruitingStaffData[orgUpdateId] = data;
    } else {
      this.orgRecruitingStaffData.orgRecruitingStaffData.push(data);
    }
    this.OrgRecruitingStaff = {
      name: '',
      email: '',
      isSendEmail: undefined
    }
    this.orgRecruitingupdateId = null;
  }

  editOrgrecruitStaff(orgData: any, index) {
    if (orgData) {
      this.OrgRecruitingStaff = orgData;
      this.orgRecruitingupdateId = index;
    }
  }
  deleteOrgrecruitStaff(deleteOrgRecruitStaff: any, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this Recruiting Staff - ' + deleteOrgRecruitStaff.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.orgRecruitingStaffData.orgRecruitingStaffData.splice(index, 1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })

  }

  paymentValidation(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  addPayment(data: any, paymentId: number = null) {
    if (this.paymentUpdateId != null && this.paymentUpdateId > -1) {
      this.orgRecruitingStaffData.paymentData[paymentId] = data;
    } else {
      this.orgRecruitingStaffData.paymentData.push(data);
    }
     this.orgRecruitingStaffData.payment = {paymentType:'',amount:null}
    this.paymentUpdateId = null;
  }

  paymentUpdateId= null;
  editPayment(paymentData: any, index) {
    this.paymentUpdateId = index;
    if (paymentData) {
      this.orgRecruitingStaffData.payment = paymentData;
    }

  }
  deletePayment(deleteOrgRecruitStaff: any, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this Payment - ' + deleteOrgRecruitStaff.paymentType + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.orgRecruitingStaffData.paymentData.splice(index, 1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })

  }

  refreshGrid(){
    this.loading = true;
    this.ngOnInit();
  }
   
}
