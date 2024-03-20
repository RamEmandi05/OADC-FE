
export class ApplicantVerificationModel {
     isApplicantSubmitted: boolean = false;
     applicantComment: string = '';
     isPHSSubmitted: boolean = false;
     phsComment: string = '';
     isPESubmitted: boolean = false;
     peComment: string = '';
     isFPSubmitted: boolean = false;
     fpComment: string = '';
     isMESubmitted: boolean = false;
     meComment: string = '';
     isHSSubmitted: boolean = false;
     hsComment: string = '';
     isDLSubmitted: boolean = false;
     dlComment: string = '';
     isDDSubmitted: boolean = false;
     ddComment: string = '';
     isFASubmitted: boolean = false;
     faComment: string = '';
     isSSNSubmitted: boolean = false;
     ssnComment: string = '';
     isBCSubmitted: boolean = false;
     bcComment: string = '';
     isCHPSubmitted: boolean = false;
     chpComment: string = '';
     isPIFSubmitted: boolean = false;
     pifComment: string = '';
     buiRecommendation:  BiuObject[]  =  []
     pePaymentComment : string = '';
    
    
}

class BiuObject {
     comments : string = "";
     buiRecomandation : boolean = undefined
     addedDt: Date = null
}

export class ApplicantDeskInvestigationModal{
     verify_documents:string='Verifiy Documents';
     verify_documents_data:Array<any> = [];

     colorado_courts:string='Colorado Courts';
     colorado_courts_data:Array<any> = [];

     ebs:string='EBS';
     ebs_data:Array<any> = [];

     pacer:string='PACER';
     pacer_data:Array<any> = [];

     google:string='Google';
     google_data:Array<any> = [];

     facebook:string='Facebook';
     facebook_data:Array<any> = [];

     other_social_media:string='Other Social Media';
     other_social_media_data:Array<any> = [];

     other_states_counties:string='Other States/Counties';
     other_states_counties_data:Array<any> = [];

     other_le_agencies:string='Other LE Agencies';
     other_le_agencies_data:Array<any> = [];

     education:string='Education';
     education_data:Array<any> = [];

     court:string='Court';
     court_data:Array<any> = [];

     other:string='Other';
     other_data:Array<any> = [];
}

export class ApplicantFieldInvestigationModal{
     relatives_references:string='Relatives & References';
     relatives_references_data:Array<any> = [];

     employers_supervisors_coworkers:string='Employers, Supervisors, Co-workers';
     employers_supervisors_coworkers_data:Array<any> = [];

     neighbors_landlords:string='Neighbors & Landlords';
     neighbors_landlords_data:Array<any> = [];

     secondary_references:string='Secondary References';
     secondary_references_data:Array<any> = [];

     biu:string='BIU Recommendation Decision Memo Sent';
     biu_data:Array<any> = [];

     biustatus: boolean = undefined;
}

export class ApplicantBIUFilesModal{
     biu_files_data:Array<any> = []; 
}

