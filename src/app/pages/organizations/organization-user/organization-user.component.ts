import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
import genericValidators from '../../../config/validators';

import { OrganizationService } from '../../../services/organization.service';
import * as FileSaver from 'file-saver';
import Swal from "sweetalert2";
import { ApplicantsService } from '../../../services/applicants.service';
//import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AccountService } from '../../../services/account.service';

import { CustomDateParserFormatter } from '../../../config/ngb-date-format';
import { NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ngbDateConfiguration } from '../../../config/ngb-year-format';


@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDatepickerConfig, useFactory: ngbDateConfiguration }]
})
export class OrganizationUserComponent implements OnInit {


  @ViewChild('hidden', { static: false }) myModal;
  organizations: any;
  organizationsUsers: any;
  selectedOrganization: any;
  selectedOrganizationId: string;
  user: any;
  isAdmin: boolean;
  userProfile: any = {};
  organizationUserPagePer: any = {};
  totalRecords: number;
  loading: boolean;
  ngxloading: boolean = false;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  addApplicant = false;
  constructor(private organizationService: OrganizationService, private applicantService: ApplicantsService, private toastr: GlobaltoastrService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    // this.dropdownList = [
    //   { item_id: '4fa9717d-a2f9-40ef-b904-85506cbccb9b', item_text: 'Nick P' },
    //   { item_id: '708c021b-1162-4069-910c-936ad07f78af', item_text: 'Aj V' },
    //   { item_id: 'ca8d7f35-de40-4652-a0f1-6731aa66105a', item_text: 'Vik Manne' },
    //   { item_id: '4', item_text: 'Ram E' },
    //   { item_id: '5', item_text: 'Kiran K' }
    // ];
    //console.log(this.dropdownList);
    // this.selectedItems = [
    //   { item_id: "89497699-d64a-4713-af2d-953fb84012f7", item_text: 'Nick P' },
    //   { item_id: "f45b4797-c603-4dec-8e99-2a3d69a11e06", item_text: 'Aj V' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    if (localStorage.userprofile != null) {

      this.getAllOrganizations();
      this.user = {
        lastName: "",
        firstName: "",
        email: "",
        mobile: "",
        organization: this.selectedOrganization,
        role: "OrganizationViewer",
        Username: "",
        dueDateExempted: null
      }
    }
    if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
      this.selectedOrganizationId = localStorage.getItem('tsnoId');
    }

    // this.verifyBucket();
  }

  


  onItemSelect(item: any) {
    var arrItem = [{ item_id: item.item_id, item_text: item.item_text }];
    this.selectedItems = arrItem
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
    var arrItems = [];
    for (let i = 0; i < items.length; i++) {
      arrItems.push({ item_id: items[i].item_id, item_text: items[i].item_text });

    }
    this.selectedItems = arrItems
    console.log(this.selectedItems);
  }
  getAllOrganizations() {
    this.userProfile = JSON.parse(localStorage.userprofile);
    // this.organizationUserPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organization Users")[0].permissions;

    if (this.userProfile.role == "Admin") {
      this.isAdmin = true;
      this.organizationService.getAllOrganizations().subscribe({
        next: (res) => {
          console.log('Ram Testing');

          this.organizations = res.body;
          this.selectedOrganizationId = this.organizations[0]._id;
          if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
            this.selectedOrganizationId = localStorage.getItem('tsnoId');
          }
          this.changeOrganization();
        },
        error: (err) => {
          if (err.errorCode === 401) {
            this.toastr.errorToaster(err.message + '...please login again.', null);
          } else {
            this.toastr.errorToaster(err.message, null);
          }
        }
      })

    } else {
      this.selectedOrganizationId = this.userProfile.organizationid;
      if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
        this.selectedOrganizationId = localStorage.getItem('tsnoId');
      }
      this.changeOrganization();
    }
  }

  changeOrganization() {
    let arrSample = [];
    this.loading = true;
    var dat = { "organizationid": this.selectedOrganizationId, "userid": "" };
    localStorage.setItem('tsnoId', this.selectedOrganizationId);
    this.organizationService.getOrganizationUerByOrganizationId(dat).subscribe((res) => {
      this.loading = false;
      this.organizationsUsers = res;
      for (let i = 0; i < this.organizationsUsers.length; i++) {
        this.organizationsUsers[i]['isValidEmail'] = this.validateRow(this.organizationsUsers[i].email, 'email')
        this.organizationsUsers[i]['isValidPhone'] = this.validateRow(this.organizationsUsers[i].phone, 'phone');
        //debugger;
        if (this.organizationsUsers[i].role == "Recruiter" || this.organizationsUsers[i].role == "OrganizationAdmin" || this.organizationsUsers[i].role == "Admin") {
          let jsonObj = {
            item_id: this.organizationsUsers[i].cognitouserid,
            item_text: this.organizationsUsers[i].firstname + " " + this.organizationsUsers[i].lastname
          };
          arrSample.push(jsonObj);
        }
      }
      this.dropdownList = arrSample;
      // this.selectedItems = [
      //   { item_id: "89497699-d64a-4713-af2d-953fb84012f7", item_text: 'Vik Manne-MWW' }
      // ];
    })
  }
  validateRow(customer: any, type: string) {
    //console.log(customer,'customerObj');
    if (customer != undefined) {
      if (type === 'email') {
        let validEmailCheck = genericValidators.email(customer);
        //console.log(validEmailCheck,'validEmailCheck');

        if (!validEmailCheck) {
          return false;
        } else {
          return true
        }
      } else if (type === 'phone') {
        let validPhoneCheck = genericValidators.phone(customer);
        //console.log(validPhoneCheck,'validPhoneCheck');

        if (!validPhoneCheck) {
          return false;
        } else {
          return true
        }
      }
    }
  }



  editOrganizationUser1(userId: string) {
    debugger
    var dat = { "organizationid": this.selectedOrganizationId, "userid": userId };

    this.organizationService.getOrganizationUerByOrganizationId(dat).subscribe((res) => {
      console.log(res);
      if (res && res.length) {
        if (res[0].role === "OrganizationViewer") {
          this.addApplicant = true;
        } else {
          this.addApplicant = false;
        }
        this.user.lastName = res[0].lastname;
        this.user.firstName = res[0].firstname;
        this.user.email = res[0].email;
        this.user.mobile = res[0].phone;
        this.user.role = res[0].role;
        this.user.organizationId = res[0].organizationid;
        this.user.cognitouserid = res[0].cognitouserid;
        this.selectedItems = res[0].selectedRecruiters;
        if (res[0].duedateexempted && res[0].duedateexempted != '') {
          let dueDateExempted = res[0].duedateexempted.split('-');
          if (dueDateExempted && dueDateExempted.length == 3)
            this.user.dueDateExempted = { "year": +dueDateExempted[2], "month": +dueDateExempted[0], "day": +dueDateExempted[1] };
        }

      } else {
        this.toastr.errorToaster('Something went wrong...please try again', "");
      }

    })
  }

  deleteOrganizationUser(userId: string, userName: string, email: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this organization user? ' + userName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // let data = { "cognitouserid": userId };
        // this.organizationService.deleteOrganizationUser(data)
        //   .subscribe({
        //     next: (res) => {
        //       if (res != null && res.response == "Success") {
        //         this.toastr.suceesToaster("Organization user deleted", "");
        //         this.changeOrganization()
        //       } else if (res != null && res.message != null) {
        //         this.toastr.errorToaster(res.message, "");
        //       }
        //     },
        //     error: (err) => {
        //       console.log(err);
        //       this.toastr.errorToaster("Something went wrong", "");
        //     }
        //   });
        /*  this.organizationService.deleteOrganizationUser(data).subscribe((res)=>{
            console.log(res);
            if (res!=null &&res.body!=null &&res.body.response == "Success"){
             debugger;
              this.toastr.suceesToaster("Organization user deleted","");
            }else if (res!=null && res.message!=null){
              this.toastr.errorToaster(res.message,"");        
            }  
            }, function(err){
              console.log(err);
              this.toastr.errorToaster("Something went wrong","");
            });*/
        let data = { "cognitoUserId": userId, "isDeleted": true, "email": email };
        this.organizationService.deleteOrgaUser(data)
          .subscribe({
            next: (res) => {
              if (res != null && res.response == "Success") {
                this.accountService.deleteOrganizationUser({ "username": userId }).subscribe({
                  next: (res) => {
                    //console.log(res);

                    /*
                    if (res!=null &&res.body!=null &&res.body.response == "Success"){
                      this.toastr.suceesToaster("Organization user deleted", "");
                      this.changeOrganization();
                    }else if (res!=null && res.message!=null){
                      this.toastr.errorToaster("Something went wrong","");        
                    }  */
                  }, error: (err) => {
                    console.log(err);
                    this.toastr.errorToaster("Something went wrong", "");
                  }
                });
                this.toastr.suceesToaster("Organization user deleted", "");
                this.changeOrganization();
              } else if (res != null && res.message != null) {
                this.toastr.errorToaster(res.message, "");
              }
            },
            error: (err) => {
              console.log(err);
              this.toastr.errorToaster("Something went wrong", "");
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  onRowSelect($event) {
    console.log($event, 'event');
    //console.log(this.selectedRecords, 'selectedRecords');
  }

  addOrganizationUser() {
    this.user = {};
    this.user.organizationId = this.selectedOrganizationId;
    if (this.addApplicant) {
      this.user.role = 'OrganizationViewer';
    } else {
      this.user.role = '';
    }
  }

  //editOrganizationUser()
  formSubmit(f: NgForm) {
    console.log(this.user);
    if (this.user.firstName) {
      this.user.firstName = this.user.firstName.trim();
    }
    if (this.user.lastName) {
      this.user.lastName = this.user.lastName.trim();
    }
    if (this.user.email) {
      this.user.email = this.user.email.trim();
    }
    if (this.user.organizationId) {
      this.user.organizationId = this.user.organizationId.trim();
    }
    if (this.user.role) {
      this.user.role = this.user.role.trim();
    }


    if (this.user.firstName == "" || this.user.firstName == null) {
      this.toastr.errorToaster("Please provide first name", "");
    }
    else if (this.user.lastName == "" || this.user.lastName == null) {
      this.toastr.errorToaster("Please provide last name", "");
    }
    else if (this.user.email == "" || this.user.email == null) {
      this.toastr.errorToaster("Please provide email", "");
    }
    else if (this.user.organizationId == "" || this.user.organizationId == null) {
      this.toastr.errorToaster("Please select organization", "");
    }
    else if (this.user.role == null || this.user.role == "") {
      this.toastr.errorToaster("Please select role", "")
    }
    else {
      let userAttributes = {
        email: this.user.email,
        mobile: this.user.mobile,
        cognitouserid: this.user.cognitouserid,
        "custom:firstname": this.user.firstName,
        "custom:lastname": this.user.lastName,
        "custom:role": this.user.role,
        "custom:organizationId": this.user.organizationId,
        selectedRecruiters: this.selectedItems,
        "custom:duedateexempted": (this.user.dueDateExempted) ? this.user.dueDateExempted.month + '-' + this.user.dueDateExempted.day + '-' + this.user.dueDateExempted.year : '',
        isLoginFirstTime: true

      };
      let dataObj = { "userAttributes": userAttributes };
      this.ngxloading = true;
      console.log(this.user.cognitouserid, '340');

      if (this.user.cognitouserid == null || this.user.cognitouserid == '') {
        this.organizationService.addUserIncognito(dataObj)
          //this.organizationService.addOrganizationUser(dataObj)
          .subscribe((res) => {
            if (res != null) {
              if (res.message == "Success")//if (res.statusCode==200)
              {
                dataObj.userAttributes.cognitouserid = res.cognitouserid;
                this.addUserProfile(dataObj);
                let applicantDtls = {
                  emailId: this.user.email,
                  mobile: this.user.mobile,
                  firstName: this.user.firstName,
                  lastName: this.user.lastName,
                  organizationId: this.user.organizationId
                };
                // if (this.user.role == 'OrganizationViewer') {
                //   this.applicantService.addApplicant(applicantDtls)
                //     .subscribe((resp) => {
                //       if (resp.response == "Success") {
                //         this.changeOrganization();
                //         this.toastr.suceesToaster("User registered", "");
                //         this.user = { email: "", mobile: "", firstName: "", lastName: "" };
                //       }
                //       else {
                //         this.toastr.errorToaster("Email already used", "");
                //       }
                //     });
                // }
                // else {
                //   this.changeOrganization();
                //   this.toastr.suceesToaster("User registered", "");
                //   this.user = { email: "", mobile: "", firstName: "", lastName: "" };
                // }
              }
              else {
                //console.log(res);
                this.ngxloading = false;
                this.toastr.errorToaster(res.message, null);
              }
            }
          });
      }
      else {
        this.addUserProfile(dataObj);
      }
    }
  }

  
  addUserProfile(dataObj: any, updateUser = null) {
    let hideLoader = setTimeout(() => {
      this.ngxloading = false;
    }, 15000);
    this.ngxloading = true;
    debugger;
    this.organizationService.addOrganizationUser(dataObj)
      .subscribe((res) => {
        this.ngxloading = false;
        clearTimeout(hideLoader);
        if (res != null) {
          if (res.response == "Success") {
            if (updateUser == 'update') {
              this.toastr.suceesToaster('User approved successfully', "");
              this.sendApprovalEmail(dataObj);
              this.selectedOrganizationId = this.user.organizationId;
              this.changeOrganization();
              updateUser = null;

            } else {
              this.toastr.suceesToaster(res.response, "")
              // this.myModal.nativeElement.click();
              this.selectedOrganizationId = this.user.organizationId;
              this.changeOrganization();
            }

          }
          else {
            console.log(res);
            this.toastr.errorToaster(res.message, null);
          }
        }
      });
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.organizationsUsers);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "organization_user");
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

  refreshGrid() {
    this.ngOnInit();
  }


  editOrganizationUser(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want approve this user? ' + user.lastname +' '+ user.firstname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        let userAttributes = {
          email: user.email,
          mobile: user.mobile,
          cognitouserid: user.cognitouserid,
          "custom:firstname": user.firstname,
          "custom:lastname": user.lastname,
          "custom:role": user.role,
          "custom:organizationId": user.organizationid,
          selectedRecruiters: [],
          "custom:duedateexempted": (user.dueDateExempted) ? user.dueDateExempted.month + '-' + user.dueDateExempted.day + '-' + user.dueDateExempted.year : '',
          isLoginFirstTime: true,
          isSignUpUserApproved: true

        };
        let dataObj = { "userAttributes": userAttributes };
        this.user.organizationId = user.organizationid;
        this.addUserProfile(dataObj, 'update');
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })




  }

  sendApprovalEmail(userData:any){
          let data  = {email:userData['userAttributes']['email'], name:userData['userAttributes']['custom:lastname']+' '+userData['userAttributes']['custom:firstname']}
          this.applicantService.sendUserApprovalEmail(data).subscribe({
          next: (resp) => {
            console.log(resp, '146');
            if (resp != null && resp.statusCode == 200) {
              this.loading = false;
              console.log('Confirmation email sent');
            }
          },
          error: (err) => {
            this.loading = false;
            console.log('Confirmation email not sent');
          }
        });
  }
}