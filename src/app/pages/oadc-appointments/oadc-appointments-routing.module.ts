import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OadcAppointmentsComponent } from './oadc-appointments.component';

const routes: Routes = [{ path: '', component: OadcAppointmentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OadcAppointmentsRoutingModule { }
