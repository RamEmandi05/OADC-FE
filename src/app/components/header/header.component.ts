import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import appSettings from '../../config/app-settings';
import { AccountService } from '../../services/account.service';
import { ApplicantsService } from '../../services/applicants.service';
import appDafaults from '../../config/app-defaults';


@Component({
	selector: 'header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
	@Input() appSidebarTwo;
	@Output() appSidebarEndToggled = new EventEmitter<boolean>();
	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();
	appSettings = appSettings;
	appDafaults = appDafaults;
	ngOnInit() {
		this.accountService.browserName = this.accountService.detectBrowserName();	 
		appDafaults.appName
	}

	toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
	}

	toggleAppSidebarEnd() {
		this.appSidebarEndToggled.emit(true);
	}

	toggleAppSidebarEndMobile() {
		this.appSidebarEndMobileToggled.emit(true);
	}

	toggleAppTopMenuMobile() {
		this.appSettings.appTopMenuMobileToggled = !this.appSettings.appTopMenuMobileToggled;
	}

	toggleAppHeaderMegaMenuMobile() {
		this.appSettings.appHeaderMegaMenuMobileToggled = !this.appSettings.appHeaderMegaMenuMobileToggled;
	}

	ngOnDestroy() {
		this.appSettings.appTopMenuMobileToggled = false;
		this.appSettings.appHeaderMegaMenuMobileToggled = false;
	}
	logOut() {
		this.accountService.userLog({ logType: 1 }).subscribe({
			next: (res) => {
			},
			error: (err) => {

			}
		});
		this.accountService.signOut().then(() => {
			this.router.navigate(['login/v3']);
		});
	}
	editProfile() {
		this.router.navigate(['user-profile']);
	}

	constructor(private renderer: Renderer2, public accountService: AccountService, private router: Router, private applicantsService: ApplicantsService) {
		this.bindLoggedInUserDetails()
	}

	loggedInUserProfile: any = {};


	bindLoggedInUserDetails() {
		if (localStorage.userprofile != null && window.location.href.toLowerCase().indexOf('login') == -1) {
			this.loggedInUserProfile = JSON.parse(localStorage.userprofile);
			var dat = { "organizationid": "", "applicantId": this.loggedInUserProfile.applicantId, "applicantStatus": "" };
			//debugger;
			let res = JSON.parse(localStorage.userprofile);
			this.loggedInUserProfile.firstname = res.firstname;
			this.loggedInUserProfile.lastname = res.lastname;
			/*this.applicantsService.getApplicantApplicationForm(dat).subscribe({
				next: (res) => {
					if (res != null && res.length > 0) {
						let applicantDtls = res[0];
						console.log(applicantDtls.fullName.first);
						console.log(applicantDtls.fullName.last);
						this.loggedInUserProfile.firstname = applicantDtls.fullName.first;
						this.loggedInUserProfile.lastname = applicantDtls.fullName.last;
					}
				},
				error: (err) => {
					console.log(err, 'applicantDtls');

				}
			});*/
		}
	}

}
