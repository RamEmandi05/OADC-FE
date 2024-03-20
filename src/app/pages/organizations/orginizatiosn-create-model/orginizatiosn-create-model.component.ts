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
import { Router } from '@angular/router';


@Component({
  selector: 'app-orginizatiosn-create-model',
  templateUrl: './orginizatiosn-create-model.component.html',
  styleUrls: ['./orginizatiosn-create-model.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDatepickerConfig, useFactory: ngbDateConfiguration }]
})
export class OrginizatiosnCreateModelComponent implements OnInit {


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
  bucketValidation = new RegExp(`(?!(^xn--|^sthree-|^sthree-configurator-|.+--ol-s3|.+-s3alias$))^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$`);
  dateFormat = new Date();
  s3BucketName: any;
  connectionTypes = [{id:1,name:'Files'},{id:2,name:'Web Connectors'},{id:3,name:'Databases'}];
  organizationsModelsCount = 0;
  constructor(private organizationService: OrganizationService, private applicantService: ApplicantsService, private toastr: GlobaltoastrService, private accountService: AccountService, private router:Router) {
    // this.appSettings.appEmpty = true;

  }

  ngOnInit(): void {


    if (localStorage.userprofile != null) {

      this.getAllOrganizations();
      this.getAllOrganizationModels();
      this.orgModel = {
        organizationModel: "",
        connectionType:"",
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
      this.organizationService.getAllOrganizations().subscribe({
        next: (res) => {
          this.organizations = res.body;
          this.selectedOrganizationId = this.organizations[0]._id;
          if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
            this.selectedOrganizationId = localStorage.getItem('tsnoId');
          }
          this.changeOrganization();
        },
        error: (err) => {

          if (err.message === 'The incoming token has expired') {
            this.toastr.errorToaster("Your session expired, please login and retry...", "");
          } else {
            this.toastr.errorToaster("Something went wrong.", "");
          }
          this.ngxloading = false;
        }

      });
    } else if (this.userProfile.role == "OrganizationAdmin") {
      this.organizationService.getAllOrganizations().subscribe({
        next: (res) => {
          this.organizations = res.body;
          this.organizations = this.organizations.filter((org) => org._id === this.userProfile.organizationid);
          this.selectedOrganizationId = this.userProfile.organizationid;
          if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
            this.selectedOrganizationId = localStorage.getItem('tsnoId');
          }
          this.changeOrganization();
        },
        error: (err) => {

          if (err.message === 'The incoming token has expired') {
            this.toastr.errorToaster("Your session expired, please login and retry...", "");
          } else {
            this.toastr.errorToaster("Something went wrong.", "");
          }
          this.ngxloading = false;
        }

      });

    } else {
      this.selectedOrganizationId = this.userProfile.organizationid;
      if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
        this.selectedOrganizationId = localStorage.getItem('tsnoId');
      }
      this.changeOrganization();
    }
  }

  changeOrganization() {

    this.loading = true;
    let t = localStorage.setItem('tsnoId', this.selectedOrganizationId);

    this.getAllOrganizationModels();
    this.loading = false;

  }





  onRowSelect($event) {
    console.log($event, 'event');
    //console.log(this.selectedRecords, 'selectedRecords');
  }

  addOrganizationUser() {
    this.orgModel = {};
    this.orgModel.organizationId = this.selectedOrganizationId;

  }

  //editOrganizationUser()
  formSubmit(f: NgForm) {
    // console.log(this.orgModel, this.orgModel.organizationModel.length);
    // console.log(this.bucketValidation.test(this.orgModel.organizationModel));


    if (this.orgModel.organizationId) {
      this.orgModel.organizationId = this.orgModel.organizationId.trim();
    }

    if (this.orgModel.organizationModel) {
      this.orgModel.organizationModel = this.orgModel.organizationModel.trim();
    }

    if (this.orgModel.organizationModel == "" || this.orgModel.organizationModel == null) {
      this.toastr.errorToaster("Please provide model name", "");
      return;
    }

    else if (this.orgModel.organizationId == "" || this.orgModel.organizationId == null) {
      this.toastr.errorToaster("Please select organization", "");
      return;
    }

    else if (this.orgModel.connectionType == "" || this.orgModel.connectionType == null) {
      this.toastr.errorToaster("Please select connection type", "");
      return;
    }

    else if (this.orgModel.organizationModel && (this.orgModel.organizationModel.length <= 2 || this.orgModel.organizationModel.length >= 42)) {
      this.toastr.errorToaster("Model name must be between 3 (min) and 42 (max) characters long.", "");
      return;
    }
    // else if (this.orgModel.organizationModel && this.bucketValidation.test(this.orgModel.organizationModel) == false && this.bucketValidation.test(s3BucketName)) {
    //   this.toastr.errorToaster(`<span>1.Bucket or Model names can consist only of lowercase letters, numbers, dots (.), and hyphens (-).</span> </br> 
    //   <span>2.Bucket or Model names must begin and end with a letter or number.</span> </br> 
    //   <span>3.Bucket or Model names must not contain two adjacent periods. </span></br>
    //   <span>4.Bucket or Model names must not be formatted as an IP address (for example, 192.168.5.4). </span></br>
    //   <span>5.Bucket or Model names must not start with the prefix xn--. </span></br>
    //   <span>6.Bucket or Model names must not start with the prefix sthree- and the prefix sthree-configurator. </span></br>
    //   <span>7.Bucket or Model names must not end with the suffix -s3alias. This suffix is reserved for access point alias names. </span></br>
    //   <span>8.Bucket or Model names must not end with the suffix --ol-s3. This suffix is reserved for Object Lambda Access Point alias names. </span></br>
    //   <span>9.A bucket or Model name cannot be used by another AWS account in the same partition until the bucket or Model is deleted.. </span></br>
    //   <span>10.Bucket or Models used with Amazon S3 Transfer Acceleration can't have dots (.) in their names. For more information about Transfer Acceleration, <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html" target="_blank">see Configuring fast, secure file transfers using Amazon S3 Transfer Acceleration..</a> </span>
    //   `, "");
    //   return;
    // }

    else {
      let temporganizationModel = this.orgModel.organizationModel;
      temporganizationModel = temporganizationModel.toLowerCase()
      temporganizationModel = temporganizationModel.replace(/\s+/g, '');

      if (this.orgModel.organizationModel) {
        this.orgModel.organizationModel = this.orgModel.organizationModel.trim();
        this.s3BucketName = (this.dateFormat.getMonth() + 1) + '' + this.dateFormat.getDate() + '' + this.dateFormat.getFullYear() + '' + this.dateFormat.getHours() + '' + this.dateFormat.getMinutes() + '' + this.dateFormat.getSeconds();
        this.s3BucketName = 'tsn-' + temporganizationModel + '-' + this.s3BucketName;
        console.log(this.s3BucketName, 156);
        console.log(this.orgModel.organizationModel, this.orgModel.organizationId);
        console.log(this.bucketValidation.test(this.s3BucketName));


      }


      let modelAttributes = {
        model: this.orgModel.organizationModel,
        organizationId: this.orgModel.organizationId,
        s3bucketName: this.s3BucketName,
        connectionType: this.orgModel.connectionType
      };

      this.ngxloading = true;
      if (this.orgModel.organizationModel && this.orgModel.organizationId && this.orgModel.connectionType) {
        debugger

        // this.organizationService.checkModelExistsinAws({ orgName: modelAttributes.s3bucketName }).subscribe({
        //   next: (res) => {
        //     this.ngxloading = false;
        //     console.log(res);

        //     if (res.status) {
        //       this.toastr.warningToaster("Model already existed...please change model name and try again.", "");
        //       return true;
        //     } else {
        this.organizationService.addOrganizationModel(modelAttributes)
          .subscribe({
            next: (res) => {
              if (res != null) {
                if (res.result == "success") {
                  this.ngxloading = false;
                  this.toastr.suceesToaster("Model created successfully.", "");

                  this.orgModel = { organizationModel: "", organizationId: "" };
                  this.getAllOrganizationModels();
                }
                else if(res.statusCode == 400){
                  this.ngxloading = false;
                  this.toastr.errorToaster('Invalid Model/Bucket Name', null);
                }
                else {
                  this.ngxloading = false;
                  this.toastr.errorToaster(res.message, null);
                }
              }
            },
            error: (err) => {
              console.log(err, 'ERR Test');
              if (err.message === 'The incoming token has expired') {
                this.toastr.errorToaster("Your session expired, please login and retry...", "");
              } else if(err.statusCode === 400) {
                this.toastr.errorToaster("Invalid Bucket Name", "");
              }
              this.ngxloading = false;
            }

          });
        //     }
        //   },
        //   error: (err) => {
        //     this.toastr.errorToaster("Failed to check model is existed or not.", "");
        //     this.ngxloading = false;
        //     return true;
        //   }
        // });
      }
      else {
        this.toastr.errorToaster("Please submit valid data", "");
      }
    }
  }

  getAllOrganizationModels() {
    this.userProfile = JSON.parse(localStorage.userprofile);
    // this.organizationUserPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organization Users")[0].permissions;

    if (this.selectedOrganizationId) {


      this.ngxloading = true;
      this.organizationService.getAllOrganizationModels(this.selectedOrganizationId).subscribe({
        next: (res) => {

          this.ngxloading = true;
          this.loading = false;
          this.organizationsModels = res.body;

          if (this.userProfile.role == "Admin") {
            this.isAdmin = true;
            if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
              this.selectedOrganizationId = localStorage.getItem('tsnoId');
            }
          }
          else if (this.userProfile.role !== "Admin") {
            this.selectedOrganizationId = this.userProfile.organizationid;
            this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId === this.userProfile.organizationid)

          } else {
            this.selectedOrganizationId = this.userProfile.organizationid;

          }
          this.organizationsModelsCount = this.organizationsModels.length;
          this.ngxloading = false;
        },
        error: (err) => {
          console.log(err, 'ERR Test');
          if (err.message === 'The incoming token has expired') {
            this.toastr.errorToaster("Your session expired, please login and retry...", "");
          } else if (err.status == false) {
            this.toastr.errorToaster("No Data found", null);
          } else {
            this.toastr.errorToaster("Something went wrong.", "");
          }
          this.ngxloading = false;
        }


      });
    }
  }

  refreshGrid() {
    this.loading = true;
    this.ngOnInit();
  }

  deleteModel(orgmodel: any) {

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure you want to delete this model <br/> <span style='color:red';font-weight:'bold'> ${orgmodel['model']} </span> <br/> <br/> <span style='font-size:13px;'>Are you sure you want to delete the model and the underlying data? This action cannot be undone</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        let data = orgmodel;//{ "_id": file._id };
        data['isModelDelete'] = true;
        //data.modelName = "tsnai-dev";
        this.ngxloading = true;
        this.organizationService.deleteOrganizationFile(data).subscribe({
          next: (res) => {
            //debugger;
            this.ngxloading = false;

            if (res != null && res.result == "Success") {
              setTimeout(() => {
                this.toastr.suceesToaster(res.message, "");
              }, 3000);
              this.getAllOrganizationModels();
            } else {
              console.log(res);
              this.toastr.errorToaster("Model deletion failed...please try again.", "");
            }
          },
          error: (err) => {
            console.log(err);
            this.ngxloading = false;
            if (err.errorCode === 401) {
              this.toastr.errorToaster("Unauthorized Access", "");
            }
            else if (err.message === 'Endpoint request timed out') {
              this.toastr.errorToaster("Endpoint request timed out", "");
            } else {
              this.toastr.errorToaster("Something went wrong", "");
            }

          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  gotoDataTab(model:any){
    this.router.navigateByUrl('/organizations/uploads?id='+model._id)  
  }

  gotoTsnaiTab(model:any){
    this.router.navigateByUrl('/tsnai?id='+model.s3bucketName)
  }

}