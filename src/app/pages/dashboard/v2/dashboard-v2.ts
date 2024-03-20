import { Component, OnInit, Renderer2 } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import global from '../../../config/globals';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
import { OrganizationService } from '../../../services/organization.service';
import { AccountService } from '../../../services/account.service';
import appSettings from '../../../config/app-settings';
// import { PeerTubePlayer } from '@peertube/embed-api'
//import { NgImageSliderModule } from 'ng-image-slider';

declare let d3: any;

@Component({
  selector: 'dashboard-v2',
  templateUrl: './dashboard-v2.html',
  styleUrls: ['./dashboard-v2.css']
})

export class DashboardV2Page implements OnInit {
  appSettings = appSettings;
  todolist = [
    { 'title': 'Donec vehicula pretium nisl, id lacinia nisl tincidunt id.', 'checked': true },
    { 'title': 'Duis a ullamcorper massa.' },
    { 'title': 'Phasellus bibendum, odio nec vestibulum ullamcorper.' },
    { 'title': 'Duis pharetra mi sit amet dictum congue.' },
    { 'title': 'Duis pharetra mi sit amet dictum congue.' },
    { 'title': 'Phasellus bibendum, odio nec vestibulum ullamcorper.' },
    { 'title': 'Donec vehicula pretium nisl, id lacinia nisl tincidunt id.' }
  ];
  imageObject = [
//     {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
//     title: 'Hummingbirds are amazing creatures'
// }
// {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
//     title: 'Example with title.'
// },{
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
//     title: 'Hummingbirds are amazing creatures'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
// }, {
//     image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
//     thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
//     title: 'Example two with title.'
// }
];
responsiveOptions: any[] | undefined;
  lstVideos:any;
  chartColor;
  chartData;
  pieChartData;
  viewDate: Date = new Date();
  events = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: global.color.success
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: '#ff5b57'
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: '#348fe2'
  }, {
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'A draggable and resizable event',
    color: '#727cb6'
  }];
  
  constructor(private accountService: AccountService,private renderer: Renderer2, private toastr: GlobaltoastrService, private organizationService: OrganizationService) { }

  ngOnInit() {
  //   this.appSettings.appDarkMode = true;
  //   this.renderer.addClass(document.body, 'bg-black');
    // this.getToken();
		this.chartColor = { domain: [global.color.blue, global.color.success, global.color.purple, global.color.componentColor] };
    this.chartData = [{
			"name":"Congo",
			"series":[{"value":2377,"name":"Thu 15"},{"value":4567,"name":"Sat 17"},{"value":2865,"name":"Mon 19"},{"value":2060,"name":"Wed 21"},{"value":3287,"name":"Fri 23"}]},{"name":"Micronesia","series":[{"value":5234,"name":"Thu 15"},{"value":2876,"name":"Sat 17"},{"value":4297,"name":"Mon 19"},{"value":2558,"name":"Wed 21"},{"value":2371,"name":"Fri 23"}]},{"name":"Malaysia","series":[{"value":2369,"name":"Thu 15"},{"value":5229,"name":"Sat 17"},{"value":3457,"name":"Mon 19"},{"value":4401,"name":"Wed 21"},{"value":2835,"name":"Fri 23"}]},{"name":"Yemen","series":[{"value":2099,"name":"Thu 15"},{"value":4383,"name":"Sat 17"},{"value":6724,"name":"Mon 19"},{"value":2870,"name":"Wed 21"},{"value":5753,"name":"Fri 23"}]},{"name":"Åland Islands","series":[{"value":4907,"name":"Thu 15"},{"value":2428,"name":"Sat 17"},{"value":5384,"name":"Mon 19"},{"value":5966,"name":"Wed 21"},{"value":2605,"name":"Fri 23"}]
		}];
    this.pieChartData = [{"name":"Germany","value":8940000},{"name":"USA","value":5000000},{"name":"France","value":7200000}];
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnDestroy() {
    //this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-black');
  }

  


}


