import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OadcUsersComponent } from './oadc-users.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [{ path: '', component: OadcUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),MatMenuModule,MatButtonModule],
  exports: [RouterModule]
})
export class OadcUsersRoutingModule { }
