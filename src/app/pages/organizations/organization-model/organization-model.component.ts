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
import * as _ from 'underscore';
 

@Component({
  selector: 'app-organization-model',
  templateUrl: './organization-model.component.html',
  styleUrls: ['./organization-model.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDatepickerConfig, useFactory: ngbDateConfiguration }]
})
export class OrganizationModelComponent implements OnInit {
  

  @ViewChild('hidden', { static: false }) myModal;
  organizations: any;
  organizationsUsers: any;
  selectedOrganization: any;
  selectedOrganizationId: string;
  orgModel: any;
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
  organizationsModels: any;

  constructor(private organizationService: OrganizationService, private applicantService: ApplicantsService, private toastr: GlobaltoastrService, private accountService: AccountService) { 
   

  }

  ngOnInit(): void {


    if (localStorage.userprofile != null) {

      this.getAllOrganizations();
      // this.getAllOrganizationModels();
      this.orgModel = {
        organizationModel: "",
        organizationId: ""
      }
    }
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
      this.organizationService.getAllOrganizations().subscribe((res) => {
        this.organizations = res.body;
        this.selectedOrganizationId = this.organizations[0]._id;
        // this.changeOrganization();
        if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
          this.selectedOrganizationId = localStorage.getItem('tsnoId');
        }
        this.getAllOrganizationModels();

      });
    } else if (this.userProfile.role == "OrganizationAdmin") {
      this.organizationService.getAllOrganizations().subscribe((res) => {
        this.organizations = res.body;
        this.organizations = this.organizations.filter((org) => org._id === this.userProfile.organizationid);
        this.selectedOrganizationId = this.userProfile.organizationid;
        if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
          this.selectedOrganizationId = localStorage.getItem('tsnoId');
        }
        this.getAllOrganizationModels();

        // this.changeOrganization();
      });

    } else {
      this.selectedOrganizationId = this.userProfile.organizationid;
      // this.changeOrganization();
    }
  }

  changeOrganization() {
    // let arrSample = [];
    this.loading = true;
    var dat = { "organizationid": this.selectedOrganizationId, "userid": "" };
    localStorage.setItem('tsnoId', this.selectedOrganizationId);
    this.organizationService.getAllOrganizationModels(this.selectedOrganizationId).subscribe((res) => {
      console.log(res, 'organizationsModels');
      this.ngxloading = false;
      this.loading = false;

      this.organizationsModels = res.body;
      this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId !== null)
      // for (let m = 0; m < this.organizationsModels.length; m++) {
      //   const element = this.organizationsModels[m];
      //   this.organizationsModels[m]['orgName'] = (this.organizationsModels[m]?.organizationId && this.organizationsModels[m]?.organizationId !="") ? _.findWhere(this.organizations ,{"_id":this.organizationsModels[m]?.organizationId})['organizationName']:'';
      // }  

      if (this.userProfile.role == "Admin") {
        this.isAdmin = true;
      }
      else if (this.userProfile.role !== "Admin") {
        this.selectedOrganizationId = this.userProfile.organizationid;
        this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId === this.userProfile.organizationid);


        // this.changeOrganization();
      } else {
        this.selectedOrganizationId = this.userProfile.organizationid;
        // this.changeOrganization();/
      }

    })
    // this.getAllOrganizationModels();
  }





  onRowSelect($event) {
    console.log($event, 'event');
    //console.log(this.selectedRecords, 'selectedRecords');
  }

  addOrganizationUser() {
    this.orgModel = {};
    this.orgModel.organizationId = this.selectedOrganizationId;
    if (this.addApplicant) {
      this.orgModel.role = 'OrganizationViewer';
    } else {
      this.orgModel.role = '';
    }
  }

  //editOrganizationUser()
  formSubmit(f: NgForm) {
    console.log(this.orgModel);


    if (this.orgModel.organizationId) {
      this.orgModel.organizationId = this.orgModel.organizationId.trim();
      console.log(this.organizations);

      let selorgModel = this.organizations.filter((orgid) => orgid._id === this.orgModel.organizationId)

      if (selorgModel && selorgModel.length) {
        this.orgModel.organizationModel = selorgModel[0].organizationName.trim();
      } else {
        return
      }
    }

    if (this.orgModel.organizationModel) {
      this.orgModel.organizationModel = this.orgModel.organizationModel.trim();
    }

    if (this.orgModel.organizationModel == "" || this.orgModel.organizationModel == null) {
      this.toastr.errorToaster("Please provide model name", "");
    }
    else if (this.orgModel.organizationId == "" || this.orgModel.organizationId == null) {
      this.toastr.errorToaster("Please select organization", "");
    }

    else {
      let modelAttributes = {
        modelName: this.orgModel.organizationModel.toLowerCase(),
        organizationId: this.orgModel.organizationId
      };

      this.ngxloading = true;
      debugger

      if (this.orgModel.organizationModel && this.orgModel.organizationId) {
        debugger
        this.organizationService.addOrganizationModel(modelAttributes).subscribe({
          next:(res)=>{
            console.log(res,208);
            
            if (res != null) {
              if (res.result == "success")//if (res.statusCode==200)
              {
                this.ngxloading = false;
                // this.toastr.suceesToaster("Request is processing...please wait", "");
                this.changeOrganization();
                this.orgModel = { organizationModel: "", organizationId: "" };
                this.getAllOrganizationModels();

              }
              else {
                //console.log(res);
                this.ngxloading = false;
                // this.toastr.errorToaster(res.message, null);
              }
            } else {
              this.ngxloading = false;
                // this.toastr.errorToaster('Something went wrong...please try again', null);
            }
          },
          error:(err)=>{
            this.ngxloading = false;
            this.toastr.errorToaster(err.message, null);
          }
        })
          //this.organizationService.addOrganizationUser(dataObj)
          // .subscribe((res) => {
          //   if (res != null) {
          //     if (res.result == "success")//if (res.statusCode==200)
          //     {
          //       this.ngxloading = false;
          //       this.toastr.suceesToaster("Request is processing...please wait", "");
          //       this.changeOrganization();
          //       this.orgModel = { organizationModel: "", organizationId: "" };
          //       this.getAllOrganizationModels();

          //     }
          //     else {
          //       //console.log(res);
          //       this.ngxloading = false;
          //       this.toastr.errorToaster(res.message, null);
          //     }
          //   }
          // });
      }
      else {
        this.toastr.errorToaster("Please submit valid details", "");
      }
    }
  }

  getAllOrganizationModels() {
    this.userProfile = JSON.parse(localStorage.userprofile);
    // this.organizationUserPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organization Users")[0].permissions;

    this.ngxloading = true;
    this.organizationService.getAllOrganizationModels(this.selectedOrganizationId).subscribe((res) => {
      console.log(res, 'organizationsModels');
      if (res.status) {
        this.ngxloading = false;
        this.loading = false;
        this.organizationsModels = res.body;
        this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId !== null)
        // for (let m = 0; m < this.organizationsModels.length; m++) {
        //   const element = this.organizationsModels[m];
        //   this.organizationsModels[m]['orgName'] = (this.organizationsModels[m]?.organizationId && this.organizationsModels[m]?.organizationId !="") ? _.findWhere(this.organizations ,{"_id":this.organizationsModels[m]?.organizationId})['organizationName']:'';
        // }  
        this.selectedOrganizationId = this.userProfile.organizationid;

        if (this.userProfile.role == "Admin") {
          this.isAdmin = true;
        }
        else if (this.userProfile.role !== "Admin") {
          this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId === this.userProfile.organizationid)
          // this.changeOrganization();
        } else {
          this.selectedOrganizationId = this.userProfile.organizationid;
          // this.changeOrganization();
        }
      } else {
        this.ngxloading = false;
        this.loading = false;
      }


    });



  }


  trinModel(modelName) {
    if (modelName && modelName != '') {
      debugger
      this.organizationService.trainOrganizatioModel({ "modelName": modelName })
        //this.organizationService.addOrganizationUser(dataObj)
        .subscribe((res) => {
          if (res != null) {
            if (res.result == "success")//if (res.statusCode==200)
            {
              this.ngxloading = false;
              this.toastr.suceesToaster("Request is processing...please wait", "");
              this.changeOrganization();
              this.orgModel = { organizationModel: "", organizationId: "" };

              this.getAllOrganizationModels();

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
      this.toastr.errorToaster("Please submit valid details", "");
    }
  }

  trainModelConfirmation(s3bucket) {
    Swal.fire({
      title: 'Train Model ',
      html: `Are you sure you want to train the model<br/> <span style='color:red';font-weight:'bold'> ${s3bucket['model']} </span> <br/> <br/> <span style='font-size:13px;'>Training a model can take a while. Please do not close or refresh the page while the training is in progress</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.trainModeljs(s3bucket);
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  trainModel(orgModel) {
    let modelName = (orgModel['s3bucketName']) ? orgModel.s3bucketName : orgModel.model;
    if (modelName) {
        this.trainModelConfirmation(orgModel);
    } else {
        this.toastr.warningToaster('Invalid model', null);
    }

  }


  async trainModeljs(orgModel) {
    if (orgModel) {
      let modelName = (orgModel['s3bucketName']) ? orgModel.s3bucketName : orgModel.model;
      this.ngxloading = true;
      await fetch("https://eip.techskillnation.com/tsnai/genmodel/?modelName=" + modelName, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          this.ngxloading = false;
          if (result.message === 'Successfuly generated model') {
            this.toastr.suceesToaster("Successfuly trained the model", "");
          } else {
            this.toastr.errorToaster("Something went wrong...please try again", "");
          }

        })
        .catch(error => {
          this.ngxloading = false;
          console.log('error', error)
          this.toastr.errorToaster(error, "");
        });
    } else {
      this.ngxloading = false;
      this.toastr.suceesToaster("No model found ", "");
    }

  }

  refreshGrid() {
    this.loading = true;
    this.ngOnInit();
  }

}