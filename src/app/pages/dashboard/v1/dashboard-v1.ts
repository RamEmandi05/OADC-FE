import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import global from '../../../config/globals';
import * as moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import * as Highcharts from 'highcharts';
import { AppVariablesService } from '../../../services/app-variables.service';
import appSettings from '../../../config/app-settings';

@Component({
  selector: 'dashboard-v1',
  templateUrl: './dashboard-v1.html',
})

export class DashboardV1Page implements OnInit {
  global = global;
  appVariables = this.appVariablesService.getAppVariables();
  chart2Options: any;
  todolist = [
    { 'title': 'Donec vehicula pretium nisl, id lacinia nisl tincidunt id.', 'checked': true },
    { 'title': 'Duis a ullamcorper massa.' },
    { 'title': 'Phasellus bibendum, odio nec vestibulum ullamcorper.' },
    { 'title': 'Duis pharetra mi sit amet dictum congue.' },
    { 'title': 'Duis pharetra mi sit amet dictum congue.' },
    { 'title': 'Phasellus bibendum, odio nec vestibulum ullamcorper.' },
    { 'title': 'Donec vehicula pretium nisl, id lacinia nisl tincidunt id.' }
  ];

  lineChartData = [{
    "name": "Congo",
    "series": [{ "value": 2377, "name": "Thu 15" }, { "value": 4567, "name": "Sat 17" }, { "value": 2865, "name": "Mon 19" }, { "value": 2060, "name": "Wed 21" }, { "value": 3287, "name": "Fri 23" }]
  }, { "name": "Micronesia", "series": [{ "value": 5234, "name": "Thu 15" }, { "value": 2876, "name": "Sat 17" }, { "value": 4297, "name": "Mon 19" }, { "value": 2558, "name": "Wed 21" }, { "value": 2371, "name": "Fri 23" }] }, { "name": "Malaysia", "series": [{ "value": 2369, "name": "Thu 15" }, { "value": 5229, "name": "Sat 17" }, { "value": 3457, "name": "Mon 19" }, { "value": 4401, "name": "Wed 21" }, { "value": 2835, "name": "Fri 23" }] }, { "name": "Yemen", "series": [{ "value": 2099, "name": "Thu 15" }, { "value": 4383, "name": "Sat 17" }, { "value": 6724, "name": "Mon 19" }, { "value": 2870, "name": "Wed 21" }, { "value": 5753, "name": "Fri 23" }] }, {
    "name": "Åland Islands", "series": [{ "value": 4907, "name": "Thu 15" }, { "value": 2428, "name": "Sat 17" }, { "value": 5384, "name": "Mon 19" }, { "value": 5966, "name": "Wed 21" }, { "value": 2605, "name": "Fri 23" }]
  }];
  lineChartColor = { domain: [global.color.blue, global.color.success, global.color.purple, global.color.componentColor] };

  pieChartData = [{ "name": "Open", "value": 47 }, { "name": "Closed", "value": 32 }, { "name": "Pending", "value": 21 }];
  pieChartColor = { domain: [global.color.red, global.color.orange, global.color.componentColor] };

  defualtTab = 'Appiontments';
  previousTab = 'waiver';

  finalButton = true;
  formState = null;
  sec4Invalid = false;
  sec5Invalid = false;
  sec6Invalid = false;
  sec7Invalid = false;
  sec9Invalid = false;
  sec10Invalid = false;
  sec11Invalid = false;
  sec3Invalid = false;
  sec1Invalid = false;
  sec2Invalid = false;
  sec5_Ques_Invalid = false;
  sec8Invalid = false;
  sec0Invalid = false;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: 'line'
    }]
  };
  chartColor;
  chartData;
  lat: number = 25.304304;
  lng: number = -90.06591800000001;
  mapStyles = [{ featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { lightness: 40 }] }, { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] }, { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }, { lightness: 20 }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] }, { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#d8d8d8" }] }, { featureType: "administrative.neighborhood", elementType: "geometry.fill", stylers: [{ color: "#ff0000" }] }, { featureType: "administrative.land_parcel", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }] }, { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] }, { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }] }, { featureType: "landscape", elementType: "labels.text.fill", stylers: [{ color: "#00acac" }] }, { featureType: "landscape.man_made", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }] }, { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#575d63" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#348fe2" }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 17 }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: .2 }] }, { featureType: "road.highway.controlled_access", elementType: "geometry.fill", stylers: [{ color: "#575d63" }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] }, { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#575d63" }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] }, { featureType: "road.local", elementType: "geometry.fill", stylers: [{ color: "#575d63" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] }, { featureType: "transit", elementType: "geometry.fill", stylers: [{ color: "#2d353c" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] }, { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#1a1f23" }] }];

  /* Daterangepicker */
  selected: { startDate: moment.Moment, endDate: moment.Moment };
  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective;
  inlineDate: any;
  inlineDateTime: any;
  picker: DaterangepickerComponent;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  prevDate: any = moment().subtract('days', 15).format('D MMMM') + ' - ' + moment().subtract('days', 8).format('D MMMM YYYY');
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };
  locale: any = {
    format: 'D MMMM YYYY',
    displayFormat: 'D MMMM YYYY',
    separator: ' - ',
    cancelLabel: 'Cancel',
    applyLabel: 'Apply'
  }

  appointmentType = 'ACTIVE APPOINTMENTS';

  constructor(private appVariablesService: AppVariablesService) {
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    this.selected = {
      startDate: moment().subtract('days', 7),
      endDate: moment()
    };
    this.chart2Options = this.getChart2Options();
  }
  tempArray = new Array(0);
  appSettings;
  bgColor;
  counties = ['Franklin County', 'Jackson County', 'Lincoln County', 'Madison County', 'Greene County'];
  preferredNames = ['Dan', 'Scott', 'Bob', 'Jon', 'Lori', 'Dean', 'Kim'];
  clientNames = ['Roxy', 'James', 'Herman', 'Ricky', 'Bird', 'Walker', 'Cowen'];

  addAppoitment = true;
  ngOnInit() {

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    this.appSettings = appSettings;
    this.bgColor = (this.appSettings['appDarkMode']) ? '#161a1d' : '#FFFFFF';
    this.chartColor = { domain: [global.color.blue, global.color.success, global.color.purple, global.color.componentColor] };
    this.chartData = [{
      "name": "Pending", "series": [{ "value": 23, "name": "Thu 15" }, { "value": 65, "name": "Sat 17" }, { "value": 35, "name": "Mon 19" }, { "value": 40, "name": "Wed 21" }]
    },
    { "name": "Approved", "series": [{ "value": 11, "name": "Thu 15" }, { "value": 54, "name": "Sat 17" }, { "value": 63, "name": "Mon 19" }, { "value": 20, "name": "Wed 21" }] },
    { "name": "Denied", "series": [{ "value": 54, "name": "Thu 15" }, { "value": 27, "name": "Sat 17" }, { "value": 70, "name": "Mon 19" }, { "value": 44, "name": "Wed 21" }] },

    ];
  }

  ngAfterViewInit() {
    this.tempArray = new Array(3);
  }
  validateSections(string = null) {
    console.log('test', string);

    if (string != null) {
      this.previousTab = this.defualtTab;
      this.defualtTab = string;
      // this.checkPreviousSectionValidation(this.previousTab);
      console.log('Previous Tab -', this.previousTab);
      console.log('Current Tab -', this.defualtTab);

    }
    // this.isvalidSections('validDataCheck');
    // this.saveApplicantDetails('autosave')
  }

  open(e) {
    this.pickerDirective.open(e);
  }
  clear(e) {
    this.selected = null;
  }
  ngModelChange(e) {
    var gap = (e.endDate).diff((e.startDate), 'days');
    this.prevDate = moment(e.startDate).subtract('days', gap).format('D MMMM') + ' - ' + moment(e.startDate).subtract('days', 1).format('D MMMM YYYY');
  }
  loadTable(value, type) {
    this.tempArray = new Array(3);
    this.appointmentType = type;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }



  getPreferredName() {
    return this.preferredNames[Math.floor(Math.random() * this.preferredNames.length)];
  }
  getPreferredClient() {
    return this.clientNames[Math.floor(Math.random() * this.clientNames.length)];
  }
  getCountyName() {
    return this.counties[Math.floor(Math.random() * this.counties.length)];
  }

  randomDate() {
    let start = new Date(2024, 0, 1);
    let end = new Date(2024, 0, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  dateOfService() {
    let start = new Date(2024, 1, 1);
    let end = new Date(2024, 3, 14);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getChart2Options() {
    return {
      series: [
        { name: 'Approved', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: 'Pending', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
        { name: 'Denied', data: [56, 45, 61, 80, 36, 45, 11, 24, 19] }

      ],
      title: {
        text: 'Payments Chart',
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: this.appVariables.font.bodyFontFamily,
          // color: this.appVariables.color.bodyColor
        }
      },
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      legend: {
        fontFamily: this.appVariables.font.bodyFontFamily,
        labels: { colors: this.appVariables.color.bodyColor }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.appVariables.font.bodyFontFamily
        }
      },
      grid: { borderColor: this.appVariables.color.borderColor },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      colors: [this.appVariables.color.theme, this.appVariables.color.indigo, this.appVariables.color.inverse],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        axisBorder: {
          show: true,
          color: this.appVariables.color.borderColor,
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: -1
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: this.appVariables.color.borderColor,
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        labels: {
          style: {
            colors: this.appVariables.color.bodyColor,
            fontSize: '12px',
            fontFamily: this.appVariables.font.bodyFontFamily,
            fontWeight: this.appVariables.font.bodyFontWeight,
            cssClass: 'apexcharts-xaxis-label',
          }
        }
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
          style: {
            color: 'rgba(' + this.appVariables.color.bodyColorRgb + ', .5)',
            fontSize: '12px',
            fontFamily: this.appVariables.font.bodyFontFamily,
            fontWeight: this.appVariables.font.bodyFontWeight
          }
        },
        labels: {
          style: {
            colors: this.appVariables.color.bodyColor,
            fontSize: '12px',
            fontFamily: this.appVariables.font.bodyFontFamily,
            fontWeight: this.appVariables.font.bodyFontWeight,
            cssClass: 'apexcharts-xaxis-label',
          }
        }
      },
      fill: { opacity: 1 }
    };
  }
}
