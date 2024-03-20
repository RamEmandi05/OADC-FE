import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrganizationService } from '../../../services/organization.service';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
// import { GlobaltoastrService } from '../../config/globaltoastr.service';
import * as _ from 'underscore';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-organization-uploads',
  templateUrl: './organization-uploads.component.html',
  styleUrls: ['./organization-uploads.component.css']
})
export class OrganizationUploadsComponent implements OnInit {


  ngxloading = false;
  @ViewChild('applicantFile') applicantFileVariable: ElementRef;
  fileType: string = '';
  applicantId = "";
  uploadedFile: any;
  userProfile: any = {};
  organizations: any;
  selectedOrganizationId: any;
  isAdmin: boolean = false;
  organizationsModels: any;
  selectedOrganization;
  organizationFiles: any = [];
  organizationFilesTotalRecords: any;
  dummyfiles = [
    {
      "_id": "6536a9c17c675a73eee94436",
      "organizationId": "6531040da2504da065a19056",
      "fileType": "text/plain",
      "createdBy": "6881b350-60e1-7065-b58e-c73aa583afe7",
      "createdDt": "2023-10-23T17:13:37.000Z",
      "isDeleted": false,
      "fileName": "lonely elephant.txt",
      "modifiedOn": "2023-10-23T17:13:37.000Z",
      "createdOn": "2023-10-23T17:13:37.000Z",
      "modifiedBy": "6881b350-60e1-7065-b58e-c73aa583afe7"
    },
    {
      "_id": "6536aa757c675a73eee94437",
      "organizationId": "651ea4561af9f97a05c00de4",
      "fileType": "text/plain",
      "createdBy": "6881b350-60e1-7065-b58e-c73aa583afe7",
      "createdDt": "2023-10-23T17:16:37.000Z",
      "isDeleted": false,
      "fileName": "boy and wolf.txt",
      "modifiedOn": "2023-10-23T17:16:37.000Z",
      "createdOn": "2023-10-23T17:16:37.000Z",
      "modifiedBy": "6881b350-60e1-7065-b58e-c73aa583afe7"
    },
    {
      "_id": "6536b9fb98524446c973a3b1",
      "organizationId": "6531040da2504da065a19056",
      "fileType": "text/plain",
      "createdBy": "6881b350-60e1-7065-b58e-c73aa583afe7",
      "createdDt": "2023-10-23T18:22:51.000Z",
      "isDeleted": false,
      "fileName": "golden-egg.txt",
      "modifiedOn": "2023-10-23T18:22:51.000Z",
      "createdOn": "2023-10-23T18:22:51.000Z",
      "modifiedBy": "6881b350-60e1-7065-b58e-c73aa583afe7"
    },
    {
      "_id": "6537d582ae5118a53d918f52",
      "organizationId": "6531040da2504da065a19056",
      "fileType": "application/pdf",
      "createdBy": "a270f9fd-3eb4-4469-83b9-524cd5db6981",
      "createdDt": "2023-10-24T14:32:34.000Z",
      "isDeleted": false,
      "fileName": "en-us-text-1_samuel-l01-intro.pdf",
      "modifiedOn": "2023-10-24T14:32:34.000Z",
      "createdOn": "2023-10-24T14:32:34.000Z",
      "modifiedBy": "a270f9fd-3eb4-4469-83b9-524cd5db6981"
    },
    {
      "_id": "6538f8baa09ccd3b03c5e9aa",
      "organizationId": "6531040da2504da065a19056",
      "fileType": "text/plain",
      "createdBy": "6881b350-60e1-7065-b58e-c73aa583afe7",
      "createdDt": "2023-10-25T11:15:06.000Z",
      "isDeleted": false,
      "fileName": "talking birds.txt",
      "modifiedOn": "2023-10-25T11:15:06.000Z",
      "createdOn": "2023-10-25T11:15:06.000Z",
      "modifiedBy": "6881b350-60e1-7065-b58e-c73aa583afe7"
    },
    {
      "_id": "6538fa4ba09ccd3b03c5e9ab",
      "organizationId": "6531040da2504da065a19056",
      "fileType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "createdBy": "6881b350-60e1-7065-b58e-c73aa583afe7",
      "createdDt": "2023-10-25T11:21:47.000Z",
      "isDeleted": false,
      "fileName": "two best friends.docx",
      "modifiedOn": "2023-10-25T11:21:47.000Z",
      "createdOn": "2023-10-25T11:21:47.000Z",
      "modifiedBy": "6881b350-60e1-7065-b58e-c73aa583afe7"
    }
  ];
  selectedModelId: any;
  
  uploadedFiles: any;
  loading = false;
  defualtTab = 'files';
 
  constructor(private organizationService: OrganizationService, private toastr: GlobaltoastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    if (localStorage.userprofile != null) {

      this.getAllOrganizations();
      if (localStorage.getItem('tsnmId') != null && localStorage.getItem('tsnmId') != '' && localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
        this.selectedModelId = localStorage.getItem('tsnmId');
        this.selectedOrganizationId = localStorage.getItem('tsnoId');
        this.getAllOrganizationModels(this.selectedOrganizationId, this.selectedModelId);
      } else {
        this.getAllOrganizationModels();
      }
 

    }
  }
  
 

  getAllOrganizationModels(selectedOrgId = null, selectedModelId = null) {
    this.userProfile = JSON.parse(localStorage.userprofile);
    this.selectedOrganizationId = selectedOrgId;
    // this.selectedModelId = selectedModelId;
    this.organizationService.getAllOrganizationModels(this.selectedOrganizationId).subscribe((res) => {
      console.log(res, 'organizationsModels');
      this.organizationsModels = res.body;
      this.selectedOrganization = this.organizationsModels.find((model) => model.organizationId == this.userProfile.organizationid);
      console.log(this.selectedOrganization, 'selectedOrganization');

      if (this.userProfile.role == "Admin") {
        this.isAdmin = true;
        if (this.organizationsModels && this.organizationsModels.length) {
          this.selectedModelId = this.organizationsModels['0']['_id']
          console.log(this.organizationsModels, 'organizationsModels 255');
        }
      }
      else if (this.userProfile.role !== "Admin") {
        this.selectedOrganizationId = this.userProfile.organizationid;
        this.organizationsModels = this.organizationsModels.filter((model) => model.organizationId === this.userProfile.organizationid)
        if (this.organizationsModels && this.organizationsModels.length) {
          this.selectedModelId = this.organizationsModels['0']['_id']
          console.log(this.organizationsModels, 'organizationsModels 255');
        }


      } else {
        this.selectedOrganizationId = this.userProfile.organizationid;

      }

    });
  }

 
  getAllOrganizations() {
    this.userProfile = JSON.parse(localStorage.userprofile);
    // this.organizationUserPagePer = this.userProfile.pagePermissions.filter(e => e.pageName == "Organization Users")[0].permissions;

    if (this.userProfile.role == "Admin") {
      this.isAdmin = true;
      this.organizationService.getAllOrganizations().subscribe((res) => {
        this.organizations = res.body;
        this.selectedOrganizationId = "";
        if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
          this.selectedOrganizationId = localStorage.getItem('tsnoId');
        }
        // this.changeOrganization();
      });
    } else if (this.userProfile.role == "OrganizationAdmin") {
      this.organizationService.getAllOrganizations().subscribe((res) => {
        this.organizations = res.body;
        this.organizations = this.organizations.filter((org) => org._id === this.userProfile.organizationid);
        this.selectedOrganizationId = this.userProfile.organizationid;
        if (localStorage.getItem('tsnoId') != null && localStorage.getItem('tsnoId') != '') {
          this.selectedOrganizationId = localStorage.getItem('tsnoId');
        }
        // this.changeOrganization();
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
    // debugger
    var dat = { "organizationid": this.selectedOrganizationId, "userid": "" };
    localStorage.setItem('tsnoId', this.selectedOrganizationId);
    this.getAllOrganizationModels(this.selectedOrganizationId);
     
  }
 
  downloadFile(file) {
    //debugger; 
    this.ngxloading = true; 

  }

  
  checkModelSelection() {

    if (this.selectedModelId && this.selectedModelId != '' && this.selectedOrganizationId && this.selectedOrganizationId != '') {
      this.fileType = this.organizationsModels.find((model) => model._id === this.selectedModelId)['model'];
    }
  }
 
 
 

  refreshGrid() {
    this.loading = true;
    this.ngOnInit();
  }
 
    
}
