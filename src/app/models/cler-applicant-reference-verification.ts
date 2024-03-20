export class ApplicantReferenceVerificationModel {
    //fullName : FullName = new FullName()
    //gender : string;
    //dateOfBirth: Date;
    applicantId: string = "";
    verificationReferenceId: string = "";

    isRelatedToApplicant: boolean = false;
    relationship: string = "";
    knownFromYears: number = 1;
    knownBy: string = "";
    acquaintedBy: string = "";
    disqualifyApplicant: string = "";
    policeEverCalled: string = "";
    recommendForPolice: string = "";
    applicantUseDrugs: string = "";
    reliableIndividual: string = "";
    assistPersonName: string = "";
    assistPersonAddress: AddressModel = new AddressModel();
    assistPersonContact: string = "";
    assistPersonEmail: string = "";
    additionalInformation: string = "";
    referenceSubmitted : boolean = false;
}

class AddressModel {
    street: string = "";
    city: string = "";
    state: string = "";
    country: string = "";
    zip: string = "";
}
export class ApplicantDetails {
    firstName: string = "";
    lastName: string = "";
    middleName: string = "";
    birthDate: DOB = new DOB();

    //"gender": null
}
class DOB {
    year: number;
    month: number;
    day: number;
}