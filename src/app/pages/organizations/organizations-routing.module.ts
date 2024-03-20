import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { OrganizationUserComponent } from './organization-user/organization-user.component';
import { OrganizationModelComponent } from './organization-model/organization-model.component';
import { OrganizationUploadsComponent } from './organization-uploads/organization-uploads.component';
import { OrginizatiosnCreateModelComponent } from './orginizatiosn-create-model/orginizatiosn-create-model.component';

const routes: Routes = [
  { path: "", component: OrganizationDashboardComponent, title: 'Organizations' },
  { path: "user", component: OrganizationUserComponent, title: 'Organization Users' }, 
  { path: "model", component: OrganizationModelComponent, title: 'Organization Models' },
  { path: "uploads", component: OrganizationUploadsComponent, title: 'Organization Uploads' },
  { path: "createmodel", component: OrginizatiosnCreateModelComponent, title: 'Organization Create Models' }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    // NgxEditorModule
  ]
})
export class OrganizationsRoutingModule { }
