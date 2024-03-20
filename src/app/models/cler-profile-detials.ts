import { duration } from "moment";
import { EmergencyContactModel } from "./applicant-form";

export class CollegeUniveristyInfoModel {
    name_of_college_university: string = '';
    street_address: string = '';
    city: string = '';
    zip: string = '';
    date_from: Date = null;
    date_to: Date = null;
    degree_earned: string = '';
    major_area_study: string = '';
    graduated:boolean = false;
}

export class CurAddressInfoModel {
    cur_street_address: string
    city: string;
    state: string;
    zip: string;
    owned_rented: string;
    date_from: Date;
    date_to: Date;
    rented_name_of_owner: string;
    rented_contact_phone: string;
    mailing_address_of_owner: string;
    mailing_address_city: string;
    mailing_address_state: string;
    mailing_address_zip: string;
    contact_phone:string;
    contact_email:string;
}

export class FormerAddressInfoModel {
    former_street_address: string;
    city: string;
    state: string;
    zip: string;
    owned_rented
    date_from: Date;
    date_to: Date;
    rented_name_of_owner: string;
    rented_contact_phone: string;
    mailing_address_of_owner: string;
    mailing_address_city: string;
    mailing_address_state: string;
    mailing_address_zip: string;
    contact_phone:string;
    contact_email:string;
}

class GraduatedModel {
    yes: string;
    no: string;
}

class AddressModel {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}
class WorkAddressModel {
    street_address: string;
    city: string;
    state: string;
    zip: string;
}
class ContactModel {
    home_phone: string;
    work_phone: string;
    cell_phone: string;
}

export class LawEnforcementInfoModel {
    name_academy_course: string = '';
    street_address: string = '';
    city: string = '';
    zip: string = '';
    date_from: Date = null;
    date_to: Date = null;
    graduated: boolean;
    degree_earned: string = '';
    contact_phone: string = '';
}

class OfficerNotesModel {
    description: string;
    updatedDt: Date;
}


export class SchoolsInfoModel {
    name_of_schools: string = '';
    street_address: string = '';
    city: string = '';
    zip: string = '';
    date_from: Date = null;
    date_to: Date = null;
    graduated: boolean = null;
}

export class Section1PersonalDetailsModel {
    personalDetails: PersonalDetailsModel = new PersonalDetailsModel();
}
export class Section2RelativesModel {
    spouse: SpouseModel = new SpouseModel();
    //former_spouseInfo : SpouseModel[]=[];
    formerSpouseInfoData: SpouseModel[] = [];

    //parentInfo :ParentInfoModel= new ParentInfoModel();
    parentsInfoData: ParentInfoModel[] = [];
    //siblingsInfo:ParentInfoModel= new ParentInfoModel();
    siblingsInfoData: ParentInfoModel[] = [];
    //referenceInfo:ReferenceInfoModel = new ReferenceInfoModel();
    referencesInfoData: ReferenceInfoModel[] = [];
}

export class Section3EducationModel {
    schoolsInfo: SchoolsInfoModel[] = [new SchoolsInfoModel()];
    schoolsInfoData: SchoolsInfoModel[] = [];
    collegeUniveristyInfo: CollegeUniveristyInfoModel[] = [new CollegeUniveristyInfoModel()];
    collegeUniveristyInfoData: CollegeUniveristyInfoModel[] = [];
    tradeVocationalInfo: TradeVocationalInfoModel[] = [new TradeVocationalInfoModel()];
    tradeVocationalInfoData: TradeVocationalInfoModel[] = [];
    lawEnforcementInfo: LawEnforcementInfoModel[] = [new LawEnforcementInfoModel()];
    lawEnforcementInfoData: LawEnforcementInfoModel[] = []
}

export class Section4ResidenceModel {
    curAddressInfo: CurAddressInfoModel = new CurAddressInfoModel();;
    curAddressInfoData: CurAddressInfoModel[] = [];
    formerAddressInfo: FormerAddressInfoModel = new FormerAddressInfoModel();
    formerAddressInfoData: FormerAddressInfoModel[] = [];
    asked_to_leave_a_residence: boolean = undefined;
    left_residence_owing_rent_utilities_other_household_expenses: boolean = undefined;
    explain_leave_a_residence_or_left_residence: string;
}

export class SpouseModel {
    name: string;
    home_address: AddressModel = new AddressModel();
    work_address: AddressModel = new AddressModel();
    email: string;
    contact: ContactModel = new ContactModel();;
    date_of_marriage: Date;
    county_of_marriage: string;
    is_stay_away_order_in_effect: boolean;
}

export class ParentInfoModel {
    name: string;
    relation: string;
    is_deceased: boolean = undefined;
    home_address: AddressModel = new AddressModel();
    work_address: AddressModel = new AddressModel();
    email: string;
    contact: ContactModel = new ContactModel();
}
export class ReferenceInfoModel {
    name: string;
    how_do_you_know: string;
    duration: string;
    home_address: AddressModel = new AddressModel();
    work_address: AddressModel = new AddressModel();
    email: string;
    contact: ContactModel = new ContactModel;
    referenceType:string='';
}
export class TradeVocationalInfoModel {
    name: string = '';
    street_address: string = '';
    city: string = '';
    zip: string = '';
    date_from: Date = null;
    date_to: Date = null;
    type_training: string = '';
    degree_earned: string = '';
    major_area_study: string = '';
}
export class PersonalDetailsModel {
    fullName: NameModel = new NameModel();
    aliasNames: NameModel[] = [];
    current_address: AddressModel = new AddressModel();
    mail_address: AddressModel = new AddressModel();
    contact: ContactModel = new ContactModel();
    email: string;
    citizen_of_US: boolean;
    citizen_of_country: string;
    legally_entitled_to_work_in_US: boolean;
    birthPlace: AddressModel = new AddressModel();
    birthDate: Date;
    physicalDescription: PhysicalDescription = new PhysicalDescription();
    emergencyContacts : EmergencyContactModel[] = [];
    other_names  = 'false';
}

export class NameModel {
    first: string;
    middle: string;
    last: string;
}
class PhysicalDescription {
    height: string;
    weight: string;
    hairColor: string;
    eyeColor: string;
    bloodtype: string;
    marks: string;
}

class DateofEmploymentModel {
    from: string;
    to: string;
}
export class ExpEmploymentInfoModel {
    currentExpEmploymentInfo: CurrentPreviousExperienceEmploymentModal = new CurrentPreviousExperienceEmploymentModal()
    formerExpEmploymentInfo: CurrentPreviousExperienceEmploymentModal = new CurrentPreviousExperienceEmploymentModal()
    other_queststion: ExpEmployementOtherQuestionsModal = new ExpEmployementOtherQuestionsModal()
    currentEmployerDetails_yes_no: boolean = undefined;
}

class CurrentPreviousExperienceEmploymentModal {
    employer: string ='';
    street_address: string='';
    city: string ='';
    state: string ='';
    zip: string ='';
    date_of_employment_from: Date;
    date_of_employment_to: Date;
    supervisor_name: string ='';
    phone_number: string ='';
    type_of_employment: Array<any> = [{label:'FT',checked:false},{label:'PT',checked:false}, {label:'Temp',checked:false},{label:'Self',checked:false},{label:'Voluteer',checked:false},{label:'Other',checked:false}];
    duties_assignment: string ='';
    problem_with_employeer: boolean;
    if_yes_why: string ='';
    name_coworker: string ='';
    period_unemployment: PeriodOfUnemployment = new PeriodOfUnemployment();
}

class PeriodOfUnemployment {
    std_jobs_leave_travel_others: string;
    dates_of_unemployment: DateofEmploymentModel = new DateofEmploymentModel();
}

class ExpEmployementOtherQuestionsModal {
    ever_been_disciplined_at_work: boolean;
    ever_been_fired_or_asked_to_resign_from_any_place: boolean;
    ever_involved_in_a_physical_with_supervisor_coworker_customer: boolean;
    ever_quit_without_giving_notice: boolean;
    ever_resigned_in_lieu_of_termination: boolean;
    ver_been_accused_of_discrimination: boolean;
    ever_the_subject_of_a_written_complaint_at_work: boolean;
    ever_been_counseled_at_work_due_to_lateness_or_absences: boolean;
    ever_receive_an_unsatisfactory_performance_review: boolean;
    ever_sold_released_or_given_away_legally_confidential_information: boolean;
    ever_called_in_sick_when_you_were_neither_sick: boolean;
    circumstances_reference_corresponding_numbers: string;
    missed_days_or_been_late_to_work_due_to_drug_or_alcohol_consumption: boolean;
    missed_days_or_been_late_to_work_due_to_drug_or_alcohol_consumption_yes: string;
    ever_been_affected_by_your_use_of_alcohol_or_drugs: boolean;
    ever_been_affected_by_your_use_of_alcohol_or_drugs_yes_name_employer: string;
    been_warned_by_an_employer_about_your_drinking_or_drug_habits_and_their_impact: boolean;
    been_warned_by_an_employer_about_your_drinking_or_drug_habits_and_their_impact_yes_name_employer: string;
    ever_applied_for_any_position_at_another_law_enforcement_agency: boolean;
    empexpagencyInfo: ExpEmploymentAgencyModel = new ExpEmploymentAgencyModel()
}

class ExpEmploymentAgencyModel {
    name_of_agency: string;
    street_address: WorkAddressModel = new WorkAddressModel();
    position_applied: string;
    date: Date;
    check_each_step_in_the_process_that_you_completed: Array<any> = [{label:'Application',checked:false},{label:'Written',checked:false}, {label:'Physical Ability',checked:false},{label:'Oral',checked:false},{label:'Polygraph',checked:false},{label:'Chief’s Oral',checked:false}];;
    status: Array<any> = [{label:'Hired',checked:false},{label:'On Eligibility List',checked:false}, {label:'Physical Ability',checked:false},{label:'Withdrawn',checked:false},{label:'Disqualified',checked:false},{label:'List Expired',checked:false}];
    contact_phone: string = '';
    contact_email: string = '';
}
export class ExpEmploymentUnEmploymentInfoModel {
    std_jobs_leave_travel_others: string;
    unemployment_from: Date;
    unemployment_to: Date;

}



export class Section5ExpEmploymentInfoModel {
    expEmploymentInfo: ExpEmploymentInfoModel[] = [new ExpEmploymentInfoModel()];;
    expEmploymentInfoData: ExpEmploymentInfoModel[] = [];

    expEmploymentUnEmploymentInfo: ExpEmploymentUnEmploymentInfoModel[] = [new ExpEmploymentUnEmploymentInfoModel()];;
    expEmploymentUnEmploymentInfoData: ExpEmploymentUnEmploymentInfoModel[] = []

    formerExpEmploymentInfoData: ExpEmploymentUnEmploymentInfoModel[] = []
    formerExpUnEmploymentInfoData: ExpEmploymentUnEmploymentInfoModel[] = []

    expEmployementOtherQuestionsInfoData: ExpEmployementOtherQuestionsModal[] = [new ExpEmployementOtherQuestionsModal()]
    expEmployementOtherQuestionsAgencyInfoData: ExpEmploymentAgencyModel[] = []

}

export class MilitaryExperienceModal {
    served_in_the_military: boolean;
    served_in_the_military_yes: string;
    branch_service: string ='';
    branch_service_from: Date;
    branch_service_to: Date;
    type_of_discharge: Array<any> = [{label:'Entry Level',checked:false},{label:'Honorable',checked:false}, {label:'General',checked:false},{label:'Other Than Honorable',checked:false},{label:'Bad Conduct',checked:false},{label:'Dishonorable',checked:false}];
    currently_serving_in_one_of: Array<any> = [{label:'Military Reserve',checked:false}, {label:'National Guard',checked:false}];
    date_obiligation_ends: string;
    ever_been_the_subject_of_any_judicial_or_nonjudicial: boolean;
    ever_denied_a_security_clearance_or_had_a_clearance_revoked: boolean;
    ever_taken_military_property_without_permission: boolean;
    subject_of_any_judicial_or_ever_denied_or_ever_taken_military_property_or_yes: string;
}

export class Section6MilitaryExperienceModal {
    militaryExperienceInfo: MilitaryExperienceModal[] = [new MilitaryExperienceModal()];;
    militaryExperienceInfoData: MilitaryExperienceModal[] = [];
}

export class FinancialModal {
    ever_filed_for_or_declared_bankruptcy: boolean = undefined;
    any_of_your_bills_ever_been_turned_over_to_a_collection_agency: boolean = undefined;
    ever_had_purchased_goods_repossessed: boolean = undefined;
    wages_ever_been_garnished: boolean = undefined;
    ever_been_delinquent_on_income_or_other_tax_payments: boolean = undefined;
    ever_failed_to_file_income_tax_or_cheated: boolean = undefined;
    ever_had_an_employment_bond_refused: boolean = undefined;
    ever_avoided_paying_any_lawful_debt_by_moving_away: boolean = undefined;
    ever_defaulted_on_a_loan: boolean = undefined;
    ever_borrowed_money_to_pay_for_a_gambling_debt: boolean = undefined;
    ever_spent_money_for_illegal_purposes: boolean = undefined;
    ever_failed_to_make_or_been_late_on_a_court_ordered_payment: boolean = undefined;
    written_three_or_more_bad_checks_in_a_one_year: boolean = undefined;
    if_you_answered_any_above_question: string
}

export class Section7FinancialModalModal {
    financialInfo: FinancialModal[] = [new FinancialModal()];;
    financialInfoData: FinancialModal[] = [];
}

export class DriverLicenceModel {
    state_of_issue: string = "";
    licence_number: string = "";
    expiry: Date = null;
    type_of_licence: string = "";
}

export class InsuranceCompanyModel {
    insuranceCompany: string = "";
    address: AddressModel = new AddressModel();
    contact: ContactModel = new ContactModel();
    policyNumber: string = "";
    vehicleMake: string = "";
    vehicleLicenceNumber: string = "";
}
export class TrafficViolationModel {
    natureOfViolation: string = "";
    date: Date = null;
    address: AddressModel = new AddressModel();
    actionTaken: string = "";
    //actionTakenType: Array<any> = [{label:'Not Guilty',checked:false}, {label:'Fined',checked:false},{label:'Traffic School',checked:false},{label:'Dismissed',checked:false}];
    actionTakenType: Array<any> = [{label:'Deferred Sentence',checked:false}, {label:'Dismissed',checked:false},{label:'Fined Only',checked:false},{label:'Found Not Guilty',checked:false},{label:'Other (explain below)',checked:false},{label:'Reduced to a Lesser Offense',checked:false},{label:'Traffic Classes',checked:false}];
}
class TrafficCitationResultedInWarrantModel {
    failureToCompleteTrafficSchool: boolean = false;
    failedToPayRequiredFee: boolean = false;
    trafficCitationResultedInWarrant_Types: Array<any> = [{label:'Failed to Appear',checked:false}, {label:'Failure to Complete Traffic School',checked:false},{label:'Failed to Pay the Required Fine',checked:false},{label:'None',checked:false}];
}
export class DriverInAccidentModel {
    dateOfAccident: Date = null;
    fault: boolean = false;
    injuries: boolean = false;
    address: AddressModel = new AddressModel();
    lawEnforcementAgency: string = "";
    policeReport: boolean = false;
}

export class Section9MotorVehicleInformationModel {
    currentDriverLicence: DriverLicenceModel = new DriverLicenceModel();
    previousDriverLicence: DriverLicenceModel = new DriverLicenceModel(); 
    previousDriversLicenceInfoData: DriverLicenceModel[] = [];
    driverLicenceRefused: boolean = undefined;
    reasonForRefuse: string = "";
    driverLicenceSuspendedOrRevoked: boolean = undefined;
    reasonForSuspendOrRevoke: string = "";
    currentliabilityInsuranceInfo: InsuranceCompanyModel = new InsuranceCompanyModel();
    currentLiabilityInsuranceInfoData: InsuranceCompanyModel[] = [];
    trafficViolationsInfo: TrafficViolationModel = new TrafficViolationModel();
    trafficViolationsInfoData: TrafficViolationModel[] = [];
    
    trafficCitationResultedInWarrent: TrafficCitationResultedInWarrantModel = new TrafficCitationResultedInWarrantModel();
    circumstanceforTrafficCitationResultedInWarrent: string = "";

    involvedAsDriverInAccident: boolean = undefined;
    involvedAsDriverInAccidentInfo: DriverInAccidentModel = new DriverInAccidentModel();
    involvedAsDriverInAccidentInfoData: DriverInAccidentModel[] = [];

    drivenWithoutAutoInsurance: boolean = undefined;
    refusedAutomobileInsurance: boolean = undefined;
    drivenWithoutAutoInsurance_yes_no: boolean = undefined;
}
export class Section10OtherTopicsModel {
    refusedPermitToCarryConcealedWeapon: boolean = undefined;
    associateOfCrime: boolean = undefined;
    tattooSignifyingMembership: boolean = undefined;
    details: string = ""
}
export class Section11CertificationModel {
    signatureOfApplicant: string = "";
    date: Date = null;
    pages_to_continue_of_your_responses:string;
}
export class Section8LegalModel{
    arrestsAndConventions : ArrestsAndConventions = new ArrestsAndConventions();
    involvementInCriminalActs : InvolvementInCriminalActs = new InvolvementInCriminalActs()
    illegalUserOfDrugs :IllegalUserOfDrugs= new IllegalUserOfDrugs();
}
class ArrestsAndConventions{
    detainedByLawEnforcement : string = null;
    chargesInfoData : ArrestsAndConventionsChargeModel[]=[];
    placedOnCoutProbation : string = null;
    appearBeforeCout : string = null;
    partyInCivilLawsuit : string = null;
    calledByPolice : string = null;
    youOrYourSpouseReferredToChildProtectiveServices : string = null;
    subjectOfEmergencyProtectiveOrder : string = null;
    settledAnyCivilsuit : string = null;
    fraudulentlyReceivedWelfare : string = null;
    requiredToRepayAnyWelfarePayments : string = null;
    filedFalseInsurance : string = null;
    explainCourtCase : string  = "";
}
class InvolvementInCriminalActs{
    assaultInThirdDegree : string = null;
    sexualAssault :string = null;
    unlawfulSexualContact :string = null;
    sexualAssaultOnClientByPsychotherapist:string = null;
    failureToRegisterAsSexOffender: string = null;
    sexualExploitationOfChildren:  string = null;;
    prostitutionProhibited: string = null;;
    solicitingForProstitution: string = null;;
    pandering: string = null;
    keepingPlaceOfProstitution: string = null;
    promotingSexualImmorality: string = null;
    indecentExposure: string = null;
    dispensingViolentFilmsToMinors: string = null;
    obstructingGovernmentOperations:string = null;
    resistingArrest: string = null;
    obstructingPeaceOfficer: string = null;
    compounding: string = null;
    concealingDeath: string = null;
    falseReportingToAuthorities:string = null;
    impersonatingPeaceOfficer: string = null;
    impersonatingPublicServant: string = null;
    abusePublicRecords: string = null;
    aidingEscape: string = null;
    possessionContrabandSecondDegree:string = null;
    escapes: string = null;
    attemptEscape:string = null;
    violationBailBondConditions:string = null;
    solicitingUnlawfulCompensation: string = null;
    tradingPublicOffice: string = null;
    failingDiscloseConflictInterest: string = null;
    officialOppression: string = null;
    firstDegreeOfficialMisconduct: string = null;
    perjurySecondDegree: string = null;
    simulatingLegalProcess: string = null;
    failureToObeyJurorSummons: string = null;
    willfulMisrepresentationMaterialFactOnJurorQuestionnaire: string = null;
    willfulHarassmentOfJurorByEmployer: string = null;
    dutyToReportUseForceByPeaceOfficers: string = null;
    harassmentStalking: string = null;
    biasmotivatedCrimes: string = null;
    unlawfulUseOfControlledSubstance: string = null;
    unlawfulDistribution: string = null;
    offensesRelatingToMarijuanaAndMarijuanaConcentrate: string = null;
    keepingMaintainingControlling: string = null;
    misdemeanorFederalLaw: string = null;
    anyOtherActAmountingToMisdemeanor: string = null;
    anyOtherActAmountingToFelony: string = null;
    circumstancesForInvolvementInCrime : string = "";
    //“Yes” to any of the items in Question 87
}
export class ArrestsAndConventionsChargeModel
 {
    charge : string = "";
    date : Date=null;
    agency : string ="";
    dispositionOrPenalty : string ="";
}
class Drug{
    isTaken:boolean=false;
    reason : string = "";
}
class DrugActivites{
    sold: boolean = false;
    manufactured : boolean = false;
    purchased : boolean = false;
    furnished : boolean = false;
    cultivated : boolean = false;
    carriedOrHeldForAnother : boolean = false;
    reason : string = "";
}
class IllegalUserOfDrugs{
    amphetamines : Drug = new Drug();
    barbiturates: Drug = new Drug();
    cocaine : Drug = new Drug();
    designerDrug : Drug = new Drug();
    gHB : Drug= new Drug();
    hallucinogens : Drug = new Drug();
    hashish :Drug = new Drug();
    heroin:Drug =new Drug();
    marijuana :Drug = new Drug();
    mescaline:Drug = new Drug();
    morphine:Drug = new Drug();
    pCP:Drug = new Drug();
    quaaludes : Drug = new Drug();
    steroids : Drug = new Drug();
    tetrahydrocannabinal:Drug = new Drug();
    anySubstanceContainingToluene : Drug = new Drug();
    usedAnyDrugsWithInPast3Years: string ="";
    usedAnyDrugsWithInPast3Years_detailsOfDrugsUsed : string ="";
    usedAnyDrugsPriorToPast3Years_usedDrugRecreationally : string ="";
    usedAnyDrugsPriorToPast3Years_triedMoreDrugs_experiment : string ="";
    usedAnyDrugsPriorToPast3Years_triedMoreDrugs_experiment_details : string= "";
    everEngagedInDrugActivity :DrugActivites = new DrugActivites(); 
    everEngagedInDrugActivity_reason : string ="";

}
export class Section0WaiverModel {
    waiverName: string;
    waiverDayOf: Date = null;
    waiverSignature: string;
    waiverCommissionExpires: Date = null;
    waiverDob: Date = null;
    waiverSsn: string;
    waiverNotary: string;
}

export class ClerProfileDetailsModel {
    _id: string;
    organizationId: string;
    emailId: string;
    firstName: string;
    lastName: string;
    mobile: string;
    isdeleted: boolean;
    applicantStatus: string;
    createdOn: Date;
    modifiedOn: Date;
    officerNotes: OfficerNotesModel[] = [];
    cognitoUserId: string;
    section1_personalDetails: Section1PersonalDetailsModel = new Section1PersonalDetailsModel();
    section2_relatives: Section2RelativesModel = new Section2RelativesModel();;
    section3_education: Section3EducationModel = new Section3EducationModel();
    section4_residence: Section4ResidenceModel = new Section4ResidenceModel();
    section5_experience_employment: Section5ExpEmploymentInfoModel = new Section5ExpEmploymentInfoModel();
    section5_military_experience: Section6MilitaryExperienceModal = new Section6MilitaryExperienceModal();
    section7_financial: Section7FinancialModalModal = new Section7FinancialModalModal();
    section8_legal: Section8LegalModel = new Section8LegalModel();
    section9_motorVehicleInformation: Section9MotorVehicleInformationModel = new Section9MotorVehicleInformationModel();
    section10_otherTopic: Section10OtherTopicsModel = new Section10OtherTopicsModel();
    section11_certification: Section11CertificationModel = new Section11CertificationModel();
    section0_waiver: Section0WaiverModel = new Section0WaiverModel();
    applicantId:string;
    constructor() {
        // this.section3_education =new Section3EducationModel();
        //this.section3_education.schoolsInfo = [];
    }
}

