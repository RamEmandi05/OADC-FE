import { Address } from "cluster";
import { AddressInfo } from "net";

export class CollegeUniveristyInfoModel
{
    name_of_college_university:string;
    street_address :string;
    city:string;
     zip:string;
     date_from:Date;
     date_to:Date;
     graduated:boolean
}

class CurAddressInfoModel
{
     cur_street_address:string
     city:string;
     state:string;
     zip:string;
     owned_rented:string;
     date_from:Date;
     date_to:Date;
     rented_name_of_owner:string;
     rented_contact_phone:string;
     mailing_address_of_owner:string;
     mailing_address_city:string;
     mailing_address_state:string;
     mailing_address_zip:string;
}

class FormerAddressInfoModel
{
     former_street_address:string;
     city:string;
     state:string;
     zip:string;
     owned_rented
    date_from:Date;
     date_to:Date;
     rented_name_of_owner:string;
     rented_contact_phone:string;
     mailing_address_of_owner:string;
     mailing_address_city:string;
     mailing_address_state:string;
     mailing_address_zip:string;
}

class FormerSpouseInfoModel
{
    name:string;
     home_address:HomeAddressModel=new HomeAddressModel();
     work_address:WorkAddressModel=new WorkAddressModel();
    email:string;
     home_phone:string;
     work_phone:string;
     cell_phone:string;
     date_of_marriage:Date;
     county_of_marriage:string;
     is_stay_away_order_in_effect:boolean
}

class GraduatedModel
{
     yes:string;
    no:string;
}

class HomeAddressModel
{
     street_address:string;
     city:string;
     state:string;
     zip:string;
}

class LawEnforcementInfoModel
{
    name_academy_course:string;
     street_address:string;
     city:string;
     zip:string;
     date_from:Date;
     date_to:Date;
     graduated:boolean;
     degree_earned:string;
     contact_phone:string;
}

class ParentInfoModel
{
     name:string;
     relation:string;
     is_deceased:boolean;
    home_address:HomeAddressModel=new HomeAddressModel();
     work_address:WorkAddressModel=new WorkAddressModel();
     email:string;
     home_phone:string;
     work_phone:string;
     cell_phone:string;
}

class ReferenceInfoModel
{
    name:string;
     reason_to_know:string;
     duration:string;
     home_address:HomeAddressModel=new HomeAddressModel();
     work_address:WorkAddressModel=new WorkAddressModel();
     email:string;
     home_phone:string;
     work_phone:string;
     cell_phone:string;
}
class OfficerNotesModel
{
    description:string;
    updatedDt:Date;
}


export class SchoolsInfoModel
{
    name_of_schools:string;
    street_address:string;
     city:string;
     zip:string;
     date_from:Date;
     date_to:Date;
     graduated:boolean;
}

class Section2RelativesModel
{
     spouse:SpouseModel=new SpouseModel();;
    former_spouseInfo:FormerSpouseInfoModel[]=[];
    parentsInfoData:[]=[];
     parentInfo :ParentInfoModel=new ParentInfoModel();
     siblingsInfoData:[]=[];
    referencesInfoData:[]=[];
     referenceInfo:ReferenceInfoModel=new ReferenceInfoModel();
}

class Section3EducationModel
{
     schoolsInfo:SchoolsInfoModel[]=[];
    schoolsInfoData:SchoolsInfoModel[]=[];
    collegeUniveristyInfo:CollegeUniveristyInfoModel[]=[];
     collegeUniveristyInfoData:CollegeUniveristyInfoModel[]=[];
    tradeVocationalInfo:TradeVocationalInfoModel[]=[];
     tradeVocationalInfoData :TradeVocationalInfoModel[]=[];
    lawEnforcementInfo:LawEnforcementInfoModel[]=[];
    lawEnforcementInfoData:LawEnforcementInfoModel[]=[]
}

class Section4ResidenceModel
{
    curAddressInfo:CurAddressInfoModel=new CurAddressInfoModel();;
     curAddressInfoData:CurAddressInfoModel[]=[];
    formerAddressInfo:FormerAddressInfoModel=new FormerAddressInfoModel();
    formerAddressInfoData:FormerAddressInfoModel[]=[];
     asked_to_leave_a_residence:string;
     left_residence_owing_rent_utilities_other_household_expenses:string;
     explain_leave_a_residence_or_left_residence:string;
}

class SpouseModel
{
    name:string;
     home_address:HomeAddressModel=new HomeAddressModel();
     work_address:WorkAddressModel=new WorkAddressModel();
     email:string;
     home_phone:string;
     work_phone:string;
     cell_phone:string;
     date_of_marriage:Date;
     county_of_marriage:string;
     is_stay_away_order_in_effect:boolean;
}

class TradeVocationalInfoModel
{
     name:string;
     street_address:string;
     city:string;
     zip:string;
     date_from:Date;
     date_to:Date;
     type_training:string;
     degree_earned:string;
     major_area_study:string;
}

class WorkAddressModel
{
     street_address:string;
     city:string;
     state:string;
     zip:string;
}


export class ClerProfileDetailsModel
{
     _id:string;
     organizationId:string;
     emailId:string;
     firstName:string;
     lastName:string;
     mobile:string;
     isdeleted:boolean;
     applicantStatus:string;
     createdOn:Date;
     modifiedOn:Date;
    officerNotes:OfficerNotesModel[]=[];
     cognitoUserId:string;
     section2_relatives:Section2RelativesModel=new Section2RelativesModel();;
     section3_education:Section3EducationModel=new Section3EducationModel();
     section4_residence:Section4ResidenceModel=new Section4ResidenceModel();
     
     constructor(){
         // this.section3_education =new Section3EducationModel();
          //this.section3_education.schoolsInfo = [];
     }
}
