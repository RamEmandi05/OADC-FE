// const baseUrl = "https://ats-api.coloradorangers.gov/";//"https://devapi.quickappnow.com/"; // // "https://ats-api.coloradorangers.gov/";//"https://api.quickappnow.com/";//
const baseUrl = "https://devapi.quickappnow.com/";
const baseUrl2 = "https://xhzew4d95b.execute-api.us-west-2.amazonaws.com/dev/";
const TSNBaseOrganizationDetails = "https://7l40o6trp5.execute-api.us-west-2.amazonaws.com/dev/";
const TSNBaseOrganizationUserDetails = "https://yfxrqd70u1.execute-api.us-west-2.amazonaws.com/dev/";  

const apiUrlSettings = {

     "TSNBASEcreateOrganization": TSNBaseOrganizationDetails + "create-organization",//creates the organization
     "TSNBASEgetOrganizationsDetails": TSNBaseOrganizationDetails + "get-organizations-details", //gets the organizations
     "TSNBASEcreatecognitouser": TSNBaseOrganizationUserDetails + "create-cognito-user",   //creates the user in cognito user pool.
     "TSNBASEsaveOrganizationUserDetails": TSNBaseOrganizationUserDetails + "save-organization-user-details",  //save the user info in tsnbase db.
     "TSNBASEGetUserProfileDetails": TSNBaseOrganizationUserDetails + "get-user-profile-details", //fetch user info

     "tsnai_getOrganizationUerByUserId": "https://9s9pohxs53.execute-api.us-west-2.amazonaws.com/dev/getuserprofiledetails",
     "tsnai_createOrganizationModel": "https://xhzew4d95b.execute-api.us-west-2.amazonaws.com/dev/create-organization-model",
     "tsnai_getAllOrganizationModels1": "https://xhzew4d95b.execute-api.us-west-2.amazonaws.com/dev/getorganizationmodels",
     "tsnai_getAllOrganizationModels": " https://xhzew4d95b.execute-api.us-west-2.amazonaws.com/dev/getorganizationmodelsbyid",
     "deleteOrganizationFile": baseUrl2 + "delete-organization-file",
     "sendUserConfirmationEmail": "https://9s9pohxs53.execute-api.us-west-2.amazonaws.com/dev/senduserconfirmationemail",




     //signup APIs
     "tsnai_signupUser": "https://9s9pohxs53.execute-api.us-west-2.amazonaws.com/dev/signupUser", // save signup user in cognito
     "tsnai_saveSignUpUserDetails": "https://9s9pohxs53.execute-api.us-west-2.amazonaws.com/dev/saveSignUpUserDetails", //  save signup user in userprofiles
     "tsnai_createSignUpUserOrganization": "https://9s9pohxs53.execute-api.us-west-2.amazonaws.com/dev/createSignUpUserOrganization", //  save signup user in userprofiles
     "tsnai_getOrgsbySearchkey": "https://xhzew4d95b.execute-api.us-west-2.amazonaws.com/dev/getSearchedOrganizations", //  get organizations by search word
     // signup APIS END


 
     "getUserProfileDetails": baseUrl + "UserProfileDetails/getuserprofiledetails",
     "saveUserRolePermissions": baseUrl + "UserProfileDetails/userrolepermissions",
     "getUserRolePermissions": baseUrl + "UserProfileDetails/getuserrolepermissions",
     "deleteOrganization": baseUrl + "ClerOrganizationDetails/deleteorganization", //kiran   
     "getAllOrganizations": baseUrl + "ClerOrganizationDetails/getorganizationdetails",// "https://6vgcr6hv0m.execute-api.us-west-2.amazonaws.com/dev/getorganizationdetails",
     "addOrganizationUser": baseUrl + "organizationUserDetails/organizationuserdetails",//baseUrl + "OrganizationUserDetails/organizationuserdetails",//kiran
     "getOrganizationUerByOrganizationId": baseUrl + "UserProfileDetails/getuserprofiledetails",


     //"keepTokenAlive": baseUrl + "UserProfileDetails/keeptokenalive",//kiran


     "registerUser": baseUrl + "ClerApplicants/applicantregistration", //kiran---------------------------- 
     "deleteOrgUser": baseUrl + "organizationUserDetails/delete-organization-user",// ram
     "deleteOrganizationUser": baseUrl + "organizationUserDetails/delete-organization-useraccount",// ram
     "verifyUserLoginExists": baseUrl + "organizationUserDetails/verify-user-login-exists",//aj
     "getAuditLog": baseUrl + "ClerAuditLog/get-log",
     "logUserEvent": baseUrl + "ClerAuditLog/log-user-event",

};


export default apiUrlSettings;
