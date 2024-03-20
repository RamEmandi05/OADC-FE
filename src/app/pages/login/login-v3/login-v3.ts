import { Component, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import appSettings from '../../../config/app-settings';
import { AccountService, IUser } from '../../../services/account.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading'; 
import { ApplicantsService } from '../../../services/applicants.service';
import { GlobaltoastrService } from '../../../config/globaltoastr.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import appMenus from '../../../config/app-menus';
import { OrganizationService } from '../../../services/organization.service';
import appDafaults from '../../../config/app-defaults';

@Component({
  selector: 'login-v3',
  templateUrl: './login-v3.html',
  styleUrls: ['./login-v3.css'],
  providers: [NgbCarouselConfig]
})

export class LoginV3Page implements OnDestroy {
  passwordMessage = "";
  hideVerifyPassword = false;
  appSettings = appSettings;
  user: any;//IUser;
  isPasswordReset: boolean;
  verifyUser: any;
  currentYear: any = (new Date).getFullYear();
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = '#ffffff';
  public secondaryColour = '#ccc';
  isForgotPassword: boolean = false;
  emailAddress: any;
  verifyForgotPassword: boolean = false;
  errorMessage = "Failed to login to the application";
  showErrorMessage: boolean = false;
  title = 'ng-carousel-demo';
  isMFASetUp = false;
  verificationCode = '';
  userDtls = null;
 

  daystoLockUser: any;

  sId: any = null;
  appDafaults = appDafaults;
  constructor(private router: Router, private renderer: Renderer2, public accountService: AccountService, private activatedRoute: ActivatedRoute, private applicantsService: ApplicantsService, private toastr: GlobaltoastrService, config: NgbCarouselConfig, private organizationService: OrganizationService) {
    this.appSettings.appEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
    config.interval = 6000;
    config.keyboard = true;
    config.pauseOnHover = true;

  }

  ngOnInit() {
    this.accountService.browserName = this.accountService.detectBrowserName();
  }

  getAllOrganizationForLoggedInUser() {
    this.applicantsService.getAllOrganizationForLoggedInUser().subscribe({
      next: (res) => {
        console.log(res);
        // debugger
        if (res && res.orgdays && res.orgdays.length) {
          this.daystoLockUser = res.orgdays[0]['daystoLockUser']
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  formSubmit(f: NgForm) {
    debugger
    this.loading = true;
    this.user = { email: f.value.emailAddress, password: f.value.password }
    this.accountService.signIn(this.user)
      .then((res) => {
        debugger
        localStorage.setItem("usertoken", JSON.stringify(res));
        this.verifyUser = res;
        this.userDtls = res;
        if (res.challengeName == "NEW_PASSWORD_REQUIRED") {
          this.isPasswordReset = true;
          this.loading = false;
        }
        else if (res.challengeName === 'SOFTWARE_TOKEN_MFA') {
          /* this.accountService.mfaSetUp(res).then((resp) => {
             const authCode = "otpauth://totp/AWSCognito:" + resp.username + "?secret=" + resp + "&issuer=Cognito";
             this.isMFASetUp =true;
           }); */
          this.isMFASetUp = true;
          this.loading = false;
        }
        else {
          this.loginUserDetails();

        }
      }).catch((err) => {
        this.loading = false;
        this.accountService.userLog({ logType: 3, email: f.value.emailAddress }).subscribe({
          next: (res) => {
          },
          error: (err) => {
          }
        });
        alert(err.message);
      })
  }
  formResetSubmit(f: NgForm) {
    this.user = { email: this.user.email, password: this.user.password, proposedPassword: f.value.newpassword }
    // this.user = { email: 'clertestuser2@gmail.com', password: '98l$LtSj', proposedPassword: f.value.newpassword }
    this.loading = true;
    // debugger
    this.accountService.resetPassword(this.verifyUser, f.value.newpassword)
      .then((res) => {
        let applicant = {
          email: this.user.email,
          applicantStatus: "Logged In"
        };
        // debugger
        console.log(res, 134);

        this.accountService.userLog({ logType: 5, email: this.user.email }).subscribe({
          next: (res) => {
          },
          error: (err) => {
          }
        });
        // debugger
        this.toastr.suceesToaster("Password reset successfully", "");
        this.loading = false;
        setTimeout(() => {
        localStorage.clear();
        window.location.reload();
        }, 3000);
        
        // this.applicantsService.sendTSNAIWelcomeEmail(applicant).subscribe({
        //   next: (resp) => {
        //     console.log(resp, '146');
        //     if (resp != null && resp.statusCode == 200) {
        //       this.loading = false;
        //       localStorage.clear();
        //       window.location.reload();
        //     }
        //   },
        //   error: (err) => {
        //     this.loading = false;
        //     localStorage.clear();
        //     window.location.reload();
        //   }
        // });

      }).catch((err) => {
        this.loading = false;
        alert(err.message);
      })
  }

  triggerForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
  }
  formForgotPasswordSubmit(f: NgForm) {
    this.loading = true;
    //lets check if user had aready logged in or we should notify user to use temp pwd
    let data = { emailId: f.value.emailAddress };
    this.accountService.VerifyUserExists(data).subscribe((resp) => {
      if (!resp.isExists) {
        this.loading = false;
        this.hideVerifyPassword = true;
        this.passwordMessage = "It appears you’re attempting to reset a password to an account which was not setup completely. Please check your spam folder for the initial temp password email and use it to first login and then change your password.  If you’re still unable to proceed further please reach out to ";
      }
      else {
        this.passwordMessage = "";
        this.hideVerifyPassword = false;
        this.loading = true;
        this.accountService.forgotPassword(f.value.emailAddress)
          .then((res) => {
            this.loading = false;
            this.emailAddress = f.value.emailAddress;
            this.isForgotPassword = false;
            this.verifyForgotPassword = !this.verifyForgotPassword
            console.log(res);
          }).catch((err) => {
            this.loading = false;
            //console.log(err);      
          });
      }


    });

  }
  formVerifyForgotPasswordSubmit(f: NgForm) {
    this.loading = true;
    this.accountService.verifyPasscodeForgotPassword(this.emailAddress, f.value.code, f.value.newpassword)
      .then((res) => {
        console.log(res);
        this.loading = false;
        this.verifyForgotPassword = false;
        this.isForgotPassword = false;
      }).catch((err) => {
        this.loading = false;
        // console.log(err);
      });
  }
  confirmMFACode(f: NgForm) {
    this.loading = true;
    this.verificationCode = f.value.mfacode;
    this.accountService.confirmSignIn(this.userDtls, this.verificationCode).then((res) => {
      this.loading = false;
      if (res.message != null) {
        alert("Enter valid code");
      }
      else {
        setTimeout(() => {
          this.loginUserDetails();
        }, 100);
      }
    }).catch((ex) => {
      this.loading = false;
      this.toastr.errorToaster("Entered code is invalid", "");
    });
  }
  diffInDays: any;
  loginUserDetails() {
    let that = this;
                     
    this.accountService.getUserProfileDetails({ userid: this.userDtls.username, userlogin: true }).subscribe((resp) => {
      console.log(resp, 'resp');
      // debugger
      if (resp != null && resp.length > 0) {
        localStorage.setItem("userprofile", JSON.stringify(resp[0]));


        var returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "dashboard/v1";//  

        if (resp[0].role == "OrganizationViewer") {

          // debugger
          if ((resp[0]['isLoginFirstTime'] || resp[0]['isLoginFirstTime'] === undefined)) {
            if ((resp[0]['isSignUpUserApproved'] === false)) {
              this.toastr.warningToaster("Thank you for your interest. Your account is currently under review and will have an update shortly. If you need immediate assistance please reach out to support@techskillnation.com", "");
              return
            }
            returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/dashboard/v1";

            this.addUserProfile(resp[0]);
            this.loading = false;

          } else {
            returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/dashboard/v1";
            this.loading = false;
            this.router.navigateByUrl(returnUrl);
            setTimeout(() => {
              window.location.reload(); 

            }, 100)
          }
          

        }
        else {
          console.log(resp[0]['isLoginFirstTime'], 292);

          if ((resp[0]['isLoginFirstTime'] || resp[0]['isLoginFirstTime'] === undefined)) {
            if ((resp[0]['isSignUpUserApproved'] === false)) {
              this.toastr.warningToaster("Thank you for your interest. Your account is currently under review and will have an update shortly. If you need immediate assistance please reach out to support@techskillnation.com", "");
              this.loading = false;
              return
            }
            returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/dashboard/v1";

            this.addUserProfile(resp[0]);
            this.loading = false;

          } else {
            // debugger
            returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/dashboard/v1";
            this.loading = false;
            this.router.navigateByUrl(returnUrl);
            setTimeout(() => {
              window.location.reload();
              // this.router.navigateByUrl(returnUrl);

            }, 100);
          }

        }
 
      }
      else {
        this.toastr.errorToaster("Failed to login to the application", "");
        this.loading = false;
      }

    });
    
  }

  addUserProfile(dataObj: any) {
    // console.log(dataObj,327);
    let userAttributes = {
      email: dataObj.email,
      mobile: dataObj.mobile,
      cognitouserid: dataObj.cognitouserid,
      "custom:firstname": dataObj.firstname + ' Test',
      "custom:lastname": dataObj.lastname,
      "custom:role": dataObj.role,
      "custom:organizationId": dataObj.organizationid,
      selectedRecruiters: [],
      "custom:duedateexempted": (dataObj.dueDateExempted) ? dataObj.dueDateExempted.month + '-' + dataObj.dueDateExempted.day + '-' + dataObj.dueDateExempted.year : '',
      isLoginFirstTime: false,
      isSignUpUserApproved:dataObj.isSignUpUserApproved

    };
    let dataObj1 = { "userAttributes": userAttributes };

    let returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/organizations";
    this.loading = true;

    let hideLoader = setTimeout(() => {
      this.loading = false;
    }, 15000);

    this.organizationService.addOrganizationUser(dataObj1)
      .subscribe((res) => {
        this.loading = false;
        clearTimeout(hideLoader);
        if (res != null) {
          if (res.response == "Success") {
            console.log('Successfully updated userinfo');
            this.router.navigateByUrl(returnUrl);
            setTimeout(() => {
              window.location.reload();
              // this.router.navigateByUrl(returnUrl);

            }, 100);

          }
          else {
            console.log(res);
            console.log('Not updated userinfo');
            this.toastr.errorToaster(res.message, null);
          }
        }
      });
  }
}
