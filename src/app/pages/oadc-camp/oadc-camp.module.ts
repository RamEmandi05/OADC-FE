import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OadcCampRoutingModule } from './oadc-camp-routing.module';
import { OadcCampComponent } from './oadc-camp.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxEditorModule }  from 'ngx-editor';

 

@NgModule({
  declarations: [
    OadcCampComponent
  ],
  imports: [
    CommonModule,
    OadcCampRoutingModule,
    FormsModule,
    SharedModule,
    NgxEditorModule
  ]
})
export class OadcCampModule { }
