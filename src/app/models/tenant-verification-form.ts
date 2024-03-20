
export class TenantVerificationFormModel
{
     applicantId:string;
     tenantReferenceId:string;

     landLordName:string;
     landLordAddr1:string;
     landLordAddr2:string;
     refApplicantName:string;
     applicantPeriodOfResidency:string;
     applicantResidencyAddress:string;
     investigatorName:string;
     
     //1-5
     nameOfApartmentComplex:string;
     tenantName:string;
     relatedToTenant:string;
     tenantRelationship:string;
     isRentPaidRegularly:string;
     tenancyFromDate:Date;
     tenancyToDate:Date;
     //6-11
     propertyTerminationOrSeparationReason:string;
     wasPoliceCalled:boolean;
     policeCalledReason:string;
     isRecommendedForPoliceOfficerPosition:boolean;
     publicServiceCircumstancesUnderstandingReply:string;
     drugUsageByTenant:string;
     additionalInformation:string;
     
     isSubmitted:boolean;
     signature:string;
     title:string;
     appliedDate:Date;
     printedName:string;
     address:string;

     firstName:string;
     lastName:string;
     middleName:string;
     dob:Date;     
     gender:string;
 }

 
 