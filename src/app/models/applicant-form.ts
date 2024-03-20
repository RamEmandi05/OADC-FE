
export class ApplicationFormModel
{
     applicantId:string;
     fullName: NameAFModel= new NameAFModel();
     aliasName :string;//NameModel[]=[]
     classNumber:string;
     maidenName:string;
     current_address: AddressAFModel=new AddressAFModel();
     mail_address:AddressAFModel= new AddressAFModel();
     contact:ContactAFModel= new ContactAFModel();
     email: string;
     ssn:string;
     coloradoDLNo:string;
     postId:string;     
     birthPlace:AddressAFModel= new AddressAFModel();     
     birthDate: Date;
     countryOfBirth:string;
     stateOfBirth:string;
     age:number;
     isMarried:string;
     marrriageYears:number;
     dependents:number;     
     spousesName:string;
     height:number;
     weight:number;
     hair:string;
     eyes:string;
     bloodType:string;
     militaryService:MilitaryServiceModel = new MilitaryServiceModel();
     educationLevel:string;
     degreeAchieved:string;
     degreeAchivedYear:number;
     isArrested:boolean = undefined;
     arrestReason:string;
     isUsedIllegalDrugs:boolean;
     drugUsageDetails:string;
     listOfAllLicensesOrCertificates:string;
     otherInformationNeeded:string;
     employmentHistory: EmploymentHistoryModel[] = [];
     emergencyContact:EmergencyContactModel[] = [];
     appliedDate:Date;
     signatureOfApplicant:string;     
     isSubmitted:boolean;
     userStatus:string; 
     applicantStatus:string; 
    isLoggedIn: boolean;
    otherInformationNeeded_yes_or_no:boolean;
    isApplicantionFeePaid:boolean;
    isPsycEvalFeePaid:boolean;
    isTutionFeePaid:boolean;
    waiverFile:string = '';
    waiverFileSubmittedOn:Date = null;
    isFileUploaded:boolean;
    skipApplicationFee: skipApplicationFeeModel = new skipApplicationFeeModel();
    skipPsycEvalFee: skipPsycEvalFeeModel = new skipPsycEvalFeeModel();
    skipTutionFee: skipTutionFeeModel = new skipTutionFeeModel();
    fingerprint_Pass_Fail: fingerPrintModel = new fingerPrintModel();
    psychologicalEvaluation_Pass_Fail: psycEvalModel = new psycEvalModel();
 }

 class skipApplicationFeeModel {
    skipApplicantionFeePaid:boolean;
    skipApplicantionFeeComments:string;
    skipedBy:string;
    date:Date;
 }

 class skipPsycEvalFeeModel {
    skipPsycEvalFeePaid:boolean;
    skipPsycEvalFeeComments:string;
    skipedBy:string;
    date:Date;
 }

 class skipTutionFeeModel {
    skipTutionFeePaid:boolean;
    skipTutionFeeComments:string;
    skipedBy:string;
    date:Date;
 }

 class fingerPrintModel {
    pass_fail:boolean;
    updatedBy:string;
    date:Date;
 }

 class psycEvalModel {
    pass_fail:boolean;
    updatedBy:string;
    date:Date;
 }

 export class NameAFModel
 {
     first:string;
     middle:string;
     last:string;
     salutaion:string;
 }

 
 export class EmergencyContactModel
 {
     name:string;
     relationship:string;
     phone:string;
     address:string;
     city:string;
     state:string;
     zip_code:string;
 }

 export class AddressAFModel
{
     street:string;
     city:string;
     state:string;
     country:string;
     zip:string;
}

export class ContactAFModel
{
     home_phone:string;
     work_phone:string;
     cell_phone:string;  
     alternate_phone:string;
}



export class EmploymentHistoryModel {
    from: string;
    to: string;
    employersName:string;
    employersAddress:string;
    positionFrom:string;
    positionTo:string;
    reasonForLeaving:string
}

class MilitaryServiceModel
 {
     branch:string;
     numberofYearsofService:number;
     rankTitle:string;
     dischargeType:string;
 }