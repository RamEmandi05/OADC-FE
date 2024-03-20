import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { OadcUsersRoutingModule } from './oadc-users-routing.module';
import { OadcUsersComponent } from './oadc-users.component';


@NgModule({
  declarations: [
    OadcUsersComponent
  ],
  imports: [
    CommonModule,
    OadcUsersRoutingModule,    
    FormsModule,    
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class OadcUsersModule { }
