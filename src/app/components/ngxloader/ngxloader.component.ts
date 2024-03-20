import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-ngxloader',
  templateUrl: './ngxloader.component.html',
  styleUrls: ['./ngxloader.component.css']
})
export class NgxloaderComponent implements OnInit {
  @Input() ngxloader: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
}
