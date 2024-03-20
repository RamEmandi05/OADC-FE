export class DivCheif {     
    name: string = "";
    email:string = "";
    issendEmail:boolean = undefined
}

// export class OrgDivCheif {     
//     orgDivCheifData: DivCheif[] = [];
// }

export class RecruitingStaff {     
    name: string = "";
    email:string = "";
    issendEmail:boolean = undefined
}
export class Payment {     
    paymentType:string='';
    amount:number=null;
}
export class OrgDivCheif {
    orgDivCheif : DivCheif = new DivCheif();
    orgDivCheifData: DivCheif[] = [];
    orgRecruitingStaff : RecruitingStaff = new RecruitingStaff();
    orgRecruitingStaffData: RecruitingStaff[] = [];
    payment : Payment = new Payment();
    paymentData: Payment[] = [];

}
 