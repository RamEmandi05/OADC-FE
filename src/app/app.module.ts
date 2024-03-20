// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { BrowserModule, Title }                  from '@angular/platform-browser';
import { AppRoutingModule }                      from './app-routing.module';
import { NgModule }                              from '@angular/core';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import * as global                               from './config/globals';
import 'bootstrap';

// Main Component
import { AppComponent }                    from './app.component';
import { HeaderComponent }                 from './components/header/header.component';
import { SidebarComponent }                from './components/sidebar/sidebar.component';
import { SidebarRightComponent }           from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                from './components/top-menu/top-menu.component';
// import { PanelComponent }                  from './components/panel/panel.component';
import { FloatSubMenuComponent }           from './components/float-sub-menu/float-sub-menu.component';
import { ThemePanelComponent }             from './components/theme-panel/theme-panel.component';

// Component Module
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule }                          from 'ngx-countdown';
import { HighlightModule, HIGHLIGHT_OPTIONS }       from 'ngx-highlightjs';
import { NgApexchartsModule }              from 'ng-apexcharts';
import { FullCalendarModule }              from '@fullcalendar/angular';
import dayGridPlugin                       from '@fullcalendar/daygrid';
import timeGridPlugin                      from '@fullcalendar/timegrid';
import interactionPlugin                   from "@fullcalendar/interaction";
import listPlugin                          from '@fullcalendar/list';
import bootstrapPlugin                     from '@fullcalendar/bootstrap';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  listPlugin,
  bootstrapPlugin
]);

import { LoadingBarRouterModule }          from '@ngx-loading-bar/router';
import { CalendarModule, DateAdapter }     from 'angular-calendar';
import { adapterFactory }                  from 'angular-calendar/date-adapters/date-fns';
import { TrendModule }                     from 'ngx-trend';
import { NgxDaterangepickerMd }            from 'ngx-daterangepicker-material';
import { NgxChartsModule }                 from '@swimlane/ngx-charts';
import { SweetAlert2Module }               from '@sweetalert2/ngx-sweetalert2';
import { NgxEditorModule }                 from 'ngx-editor';
import { ColorSketchModule }               from 'ngx-color/sketch';
import { NgxDatatableModule }              from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG }        from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Pages
import { DashboardV1Page }          from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page }          from './pages/dashboard/v2/dashboard-v2';
import { DashboardV3Page }          from './pages/dashboard/v3/dashboard-v3';

// Email
import { EmailInboxPage }           from './pages/email/inbox/email-inbox';
import { EmailComposePage }         from './pages/email/compose/email-compose';
import { EmailDetailPage }          from './pages/email/detail/email-detail';

// Widgets
import { WidgetPage }               from './pages/widget/widget';

// UI Element
import { UIGeneralPage }            from './pages/ui-elements/general/general';
import { UITypographyPage }         from './pages/ui-elements/typography/typography';
import { UITabsAccordionsPage }     from './pages/ui-elements/tabs-accordions/tabs-accordions';
import { UIModalNotificationPage }  from './pages/ui-elements/modal-notification/modal-notification';
import { UIWidgetBoxesPage }        from './pages/ui-elements/widget-boxes/widget-boxes';
import { UIMediaObjectPage }        from './pages/ui-elements/media-object/media-object';
import { UIButtonsPage }            from './pages/ui-elements/buttons/buttons';
import { UIIconFontAwesomePage }    from './pages/ui-elements/icon-fontawesome/icon-fontawesome';
import { UIIconSimpleLineIconsPage }from './pages/ui-elements/icon-simple-line-icons/icon-simple-line-icons';
import { UIIconBootstrapPage }      from './pages/ui-elements/icon-bootstrap/icon-bootstrap';
import { UILanguageIconPage }       from './pages/ui-elements/language-icon/language-icon';
import { UISocialButtonsPage }      from './pages/ui-elements/social-buttons/social-buttons';

// Bootstrap 5
import { Bootstrap5Page }           from './pages/bootstrap-5/bootstrap-5';

// Form
import { FormElementsPage }         from './pages/form/form-elements/form-elements';
import { FormPluginsPage }         from './pages/form/form-plugins/form-plugins';
import { FormWizardsPage }          from './pages/form/form-wizards/form-wizards';

// Table
import { TableBasicPage }           from './pages/tables/table-basic/table-basic';
import { TableDataPage }            from './pages/tables/table-data/table-data';

// Pos
import { PosCounterCheckoutPage }   from './pages/pos/counter-checkout/counter-checkout';
import { PosKitchenOrderPage }      from './pages/pos/kitchen-order/kitchen-order';
import { PosCustomerOrderPage }     from './pages/pos/customer-order/customer-order';
import { PosMenuStockPage }         from './pages/pos/menu-stock/menu-stock';
import { PosTableBookingPage }      from './pages/pos/table-booking/table-booking';

// Chart
import { ChartNgxPage }             from './pages/chart/chart-ngx/chart-ngx';

// Calendar
import { CalendarPage }             from './pages/calendar/calendar';

// Map
import { MapPage }                  from './pages/map/map';

// Gallery
import { GalleryV1Page }            from './pages/gallery/gallery-v1/gallery-v1';
import { GalleryV2Page }            from './pages/gallery/gallery-v2/gallery-v2';

// Page Options
import { PageBlank }                from './pages/page-options/page-blank/page-blank';
import { PageFooter }               from './pages/page-options/page-with-footer/page-with-footer';
import { PageFixedFooter }          from './pages/page-options/page-with-fixed-footer/page-with-fixed-footer';
import { PageWithoutSidebar }       from './pages/page-options/page-without-sidebar/page-without-sidebar';
import { PageSidebarRight }         from './pages/page-options/page-with-right-sidebar/page-with-right-sidebar';
import { PageSidebarMinified }      from './pages/page-options/page-with-minified-sidebar/page-with-minified-sidebar';
import { PageFullHeight }           from './pages/page-options/page-full-height/page-full-height';
import { PageTwoSidebar }           from './pages/page-options/page-with-two-sidebar/page-with-two-sidebar';
import { PageSidebarWide }          from './pages/page-options/page-with-wide-sidebar/page-with-wide-sidebar';
import { PageSidebarLight }         from './pages/page-options/page-with-light-sidebar/page-with-light-sidebar';
import { PageSidebarTransparent }   from './pages/page-options/page-with-transparent-sidebar/page-with-transparent-sidebar';
import { PageTopMenu }              from './pages/page-options/page-with-top-menu/page-with-top-menu';
import { PageMixedMenu }            from './pages/page-options/page-with-mixed-menu/page-with-mixed-menu';
import { PageMegaMenu }             from './pages/page-options/page-with-mega-menu/page-with-mega-menu';
import { PageBoxedLayout }          from './pages/page-options/page-with-boxed-layout/page-with-boxed-layout';
import { PageBoxedLayoutMixedMenu } from './pages/page-options/page-boxed-layout-with-mixed-menu/page-boxed-layout-with-mixed-menu';
import { PageSidebarSearch }        from './pages/page-options/page-with-search-sidebar/page-with-search-sidebar';

// Extra Pages
import { ExtraTimelinePage }        from './pages/extra/extra-timeline/extra-timeline';
import { ExtraComingSoonPage }      from './pages/extra/extra-coming-soon/extra-coming-soon';
import { ExtraSearchResultsPage }   from './pages/extra/extra-search-results/extra-search-results';
import { ExtraInvoicePage }         from './pages/extra/extra-invoice/extra-invoice';
import { ExtraErrorPage }           from './pages/extra/extra-error/extra-error';
import { ExtraProfilePage }         from './pages/extra/extra-profile/extra-profile';
import { ExtraScrumBoardPage }      from './pages/extra/extra-scrum-board/extra-scrum-board';
import { ExtraCookieAcceptanceBannerPage } from './pages/extra/extra-cookie-acceptance-banner/extra-cookie-acceptance-banner';
import { ExtraOrdersPage }          from './pages/extra/extra-orders/extra-orders';
import { ExtraOrderDetailsPage }    from './pages/extra/extra-order-details/extra-order-details';
import { ExtraProductsPage }        from './pages/extra/extra-products/extra-products';
import { ExtraProductDetailsPage }        from './pages/extra/extra-product-details/extra-product-details';

// User Login / Register
import { LoginV1Page }              from './pages/login/login-v1/login-v1';
import { LoginV2Page }              from './pages/login/login-v2/login-v2';
import { LoginV3Page }              from './pages/login/login-v3/login-v3';
import { RegisterV3Page }           from './pages/register/register-v3/register-v3';

// Helper
import { HelperCssPage }            from './pages/helper/helper-css/helper-css';
// import { CampaignComponent } from './pages/campaign/campaign/campaign.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { OrganizationsModule } from './pages/organizations/organizations.module';
//import { ConstituentsComponent } from './pages/constituents/constituents/constituents.component';
//import { ConsComponent } from './pages/cons/cons.component';

import { ToastrModule } from 'ngx-toastr';
// import { NgxloaderComponent } from './components/ngxloader/ngxloader.component';
import { NgxLoadingModule } from "ngx-loading";
import { QRCodeModule } from 'angularx-qrcode';
// import { GroupsComponent } from './pages/groups/groups.component';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
//import { Select2Module } from 'ng-select2-component';
import { PermissionsComponent } from './pages/admin/permissions/permissions.component'; 
 
import { HighchartsChartModule } from 'highcharts-angular';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { RegistrationComponent } from './pages/registration/registration.component';
 
import { ModalComponent } from './pages/modal/modal.component';
 
// import { NotificationsComponent } from './pages/admin/notifications/notifications.component';  
  
import { NgxSummernoteModule } from "ngx-summernote";
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { OadcAppointmentsModule } from './pages/oadc-appointments/oadc-appointments.module';

 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    // PanelComponent,
    FloatSubMenuComponent,
    ThemePanelComponent,
    
    DashboardV1Page,
    DashboardV2Page,
    DashboardV3Page,
    
    EmailInboxPage,
    EmailComposePage,
    EmailDetailPage,
    
    WidgetPage,
    
    UIGeneralPage,
    UITypographyPage,
    UITabsAccordionsPage,
    UIModalNotificationPage,
    UIWidgetBoxesPage,
    UIMediaObjectPage,
    UIButtonsPage,
    UIIconFontAwesomePage,
    UIIconSimpleLineIconsPage,
    UIIconBootstrapPage,
    UILanguageIconPage,
    UISocialButtonsPage,
    
    Bootstrap5Page,
    
    FormElementsPage,
    FormPluginsPage,
    FormWizardsPage,
    
    TableBasicPage,
    TableDataPage,
    
    PosCounterCheckoutPage,
    PosKitchenOrderPage,
    PosCustomerOrderPage,
    PosTableBookingPage,
    PosMenuStockPage,
    
    ChartNgxPage,
    
    CalendarPage,
    
    MapPage,
    
    GalleryV1Page,
    GalleryV2Page,
    
    PageBlank,
    PageFooter,
    PageFixedFooter,
    PageWithoutSidebar,
    PageSidebarRight,
    PageSidebarMinified,
    PageFullHeight,
    PageTwoSidebar,
    PageSidebarWide,
    PageSidebarLight,
    PageSidebarTransparent,
    PageSidebarSearch,
    PageTopMenu,
    PageMixedMenu,
    PageBoxedLayout,
    PageMegaMenu,
    PageBoxedLayoutMixedMenu,
    
    ExtraTimelinePage,
    ExtraComingSoonPage,
    ExtraSearchResultsPage,
    ExtraInvoicePage,
    ExtraErrorPage,
    ExtraProfilePage,
    ExtraScrumBoardPage,
    ExtraCookieAcceptanceBannerPage,
    ExtraOrdersPage,
    ExtraOrderDetailsPage,
    ExtraProductsPage,
    ExtraProductDetailsPage,
    
    LoginV1Page,
    LoginV2Page,
    LoginV3Page,
    RegisterV3Page,
    
    HelperCssPage,

 
          PermissionsComponent,
          
          RegistrationComponent,
          
          ModalComponent,
     
          ConfirmationPageComponent
          
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CountdownModule,
    ColorSketchModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    FullCalendarModule,
    HighlightModule,
    LoadingBarRouterModule,
    NgApexchartsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgxDatatableModule,
    NgxEditorModule,
    NgxChartsModule,
    NgxDaterangepickerMd.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    TrendModule,
    HttpClientModule,
    SharedModule,
    OrganizationsModule,
    // ReportsModule,
    
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),   
    //NgMultiSelectDropDownModule, 
    //NgSelectModule ,
    //Select2Module,
    //NgMultiSelectDropDownModule.forRoot(),
    HighchartsChartModule ,
    NgIdleKeepaliveModule.forRoot(),
    NgxSummernoteModule,
    NgImageSliderModule,
    //SlickCarouselModule,
    NgbModule,
    QRCodeModule,
    NgSelectModule, 
    OadcAppointmentsModule
  ],
  exports:[SharedModule,OadcAppointmentsModule],
  providers: [ Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }, {
		provide: HIGHLIGHT_OPTIONS,
		useValue: {
			coreLibraryLoader: () => import('highlight.js/lib/core'),
			lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
			languages: {
				typescript: () => import('highlight.js/lib/languages/typescript'),
				css: () => import('highlight.js/lib/languages/css'),
				xml: () => import('highlight.js/lib/languages/xml')
			}
		}
	}],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'TSN-Base Template' + (this.route.snapshot.firstChild.data['title'] != null ? (' | ' +this.route.snapshot.firstChild.data['title']) : "") ;
        this.titleService.setTitle(title);
      }
    });
  }
}
