import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-oadc-users',
  templateUrl: './oadc-users.component.html',
  styleUrls: ['./oadc-users.component.css'] 
})
export class OadcUsersComponent implements OnInit {
  ngxloading: boolean = false;
  loading = false;
  user = {
    "email": "",
    "firstname": "",
    "lastname": "",
    "phone": "",
    "accountType": "OADC"
  }
  organizationsUsers: any = [
    {

      "email": "johnSmith@yahoo.com",
      "firstname": "John",
      "lastname": "Smith",
      "phone": "+19866563790",
      "accountType": "OADC",
      "lastLogin": "10-03-2024"
    },
    {

      "email": "kanewilliams@gmail.com",
      "firstname": "Williams",
      "lastname": "Kane",
      "phone": "+17856656790",
      "accountType": "OADC",
      "lastLogin": "11-03-2024"
    },
    {

      "email": "stephen.fleming@gmail.com",
      "firstname": "Stephen",
      "lastname": "Fleming",
      "phone": "+17856656790",
      "accountType": "OADC",
      "lastLogin": "11-03-2024"
    },
    {

      "email": "davidjack@gmail.com",
      "firstname": "David",
      "lastname": "Jack",
      "phone": "+18666656666",
      "accountType": "OADC",
      "lastLogin": "11-03-2024"
    },
    {

      "email": "rohitkl@gmail.com",
      "firstname": "Rohit",
      "lastname": "Kl",
      "phone": "+17897897890",
      "accountType": "OADC",
      "lastLogin": "09-03-2024"
    }
  ];
  totalRecords = 5;
  selectedOrganizationId: any = null;
  toggleFormView : boolean = false;
  // First Name, Last Name, Email, Phone, Account Type, Last Login
  constructor() { }

  ngOnInit(): void {
    this.initMultiLevelDropDown();
  }

  formSubmit(f: NgForm) {
    console.log(this.user);
  }

  initMultiLevelDropDown() {
    let dropdowns = document.querySelectorAll('.dropdown-toggle')
    dropdowns.forEach((dd) => {
      dd.addEventListener('click', function (e) {
        var el = this.nextElementSibling
        el.style.display = el.style.display === 'block' ? 'none' : 'block'
      })
    })
  }

  toggleForm(){
    this.toggleFormView = !this.toggleFormView;
  }

}
