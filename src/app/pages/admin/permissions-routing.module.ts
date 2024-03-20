import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [{path:"", component: PermissionsComponent,title: 'TSN-AI'} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
