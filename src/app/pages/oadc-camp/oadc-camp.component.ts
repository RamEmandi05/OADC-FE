import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-oadc-camp',
  templateUrl: './oadc-camp.component.html',
  styleUrls: ['./oadc-camp.component.css']
})
export class OadcCampComponent implements OnInit {
  defualtTab = 'availabilities';
  // ngx-editor
  editor: Editor;
  html: '';
  // ngx-color
  color;

  contract = {
    contractId:'',
    type:'',
    startdate:'',
    enddate:'',
    datesent:'',
    status:'',
    firstcontract:'',
    donotreview:'',
    juvenile:'',
   };
   courtobs = {
    date:'',
    hearingtype:'',
    observer:'',
    caseportion:'',
    case:'',
    casename:'',
    casejurisdiction:'',
    observations:'',
    fileview:'' 
  }
  constructor() { }

  ngOnInit() {
    this.editor = new Editor();
    this.color = '#0074ff';
  }

  ngOnDestroy() {
    this.editor.destroy();
  }

}
