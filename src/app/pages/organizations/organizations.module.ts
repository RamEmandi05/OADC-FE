import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
//import { OrganizationNewComponent } from './organization-new/organization-new.component';
import { FormsModule } from '@angular/forms';
import { OrganizationUserComponent } from './organization-user/organization-user.component';
// import { PanelComponent } from '../../components/panel/panel.component';
import { SharedModule } from '../../shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrganizationModelComponent } from './organization-model/organization-model.component';
import { OrganizationUploadsComponent } from './organization-uploads/organization-uploads.component';
import { OrginizatiosnCreateModelComponent } from './orginizatiosn-create-model/orginizatiosn-create-model.component';

@NgModule({
  declarations: [
    OrganizationDashboardComponent,
    OrganizationUserComponent,
    OrganizationModelComponent,
    OrganizationUploadsComponent,
    OrginizatiosnCreateModelComponent
    //, OrganizationNewComponent
    //,PanelComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    FormsModule,    
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[
    //SharedModule
  ]
})
export class OrganizationsModule { }
