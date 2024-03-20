import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { OadcAppointmentsRoutingModule } from './oadc-appointments-routing.module';
import { OadcAppointmentsComponent } from './oadc-appointments.component';


@NgModule({
  declarations: [
    OadcAppointmentsComponent
  ],
  imports: [
    CommonModule,
    OadcAppointmentsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class OadcAppointmentsModule { }
 