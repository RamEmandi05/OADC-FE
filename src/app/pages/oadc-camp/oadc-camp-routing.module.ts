import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OadcCampComponent } from './oadc-camp.component';

const routes: Routes = [{ path: '', component: OadcCampComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OadcCampRoutingModule { }
