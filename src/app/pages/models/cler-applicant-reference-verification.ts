import { AddressInfo } from "net";
import { CurAddressInfoModel } from "../../models/cler-profile-detials";

export class ApplicantReferenceVerificationModel
{
    fullName : FullName = new FullName()
     gender : string;
     dateOfBirth: Date;

     isRelatedToApplicant : boolean;
     relationship : boolean;
     knownFromYears : number;
     knownBy:string;
     acquaintedBy :string;
     disqualifyApplicant: string;
     policeEverCalled : string;
     recommendForPolice:string ;
     applicantUseDrugs:string;
     reliableIndividual:string;
     assistPersonName: string;
     assistPersonAddress: AddressModel = new AddressModel();
     assistPersonContact: string;
     assistPersonEmail: AddressModel = new AddressModel();
     additionalInformation:string;
}
class FullName {
    first:string;
    last:string;
    middle:string;
   
}

class AddressModel {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}