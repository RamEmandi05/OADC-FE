import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {DataTablesModule} from 'angular-datatables';
 
//primeng modules
import {TableModule} from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
// import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { PanelComponent } from '../components/panel/panel.component';
import { NgxloaderComponent } from '../components/ngxloader/ngxloader.component';
// import { Table } from '@fullcalendar/daygrid';
import { NgxLoadingModule } from "ngx-loading";
import { NoWhitespaceDirective } from '../config/noWhiteSpace';
import { PdfViewerModule } from 'ng2-pdf-viewer';  
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations:[ PanelComponent,NgxloaderComponent,NoWhitespaceDirective
   ],
  imports:[CommonModule,NgxLoadingModule.forRoot({})],
   exports: [
    CommonModule,
   
    TableModule,
    CarouselModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    PanelComponent,
    NgxloaderComponent,  
    NoWhitespaceDirective,
    PdfViewerModule,
    NgbDatepickerModule,NgbTimepickerModule, MatDatepickerModule,
    MatMenuModule,
    MatButtonModule
 
  ] 
})
export class SharedModule { }
  