import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todaysIncome;
  productsSum;
  registeredUsers;
  onlinePeople;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // get today's income
    this.adminService.getTodaysIncome()
      .subscribe( value => { this.todaysIncome = value; });

    // get products sum
    this.adminService.getProductsSum()
      .subscribe( value => { this.productsSum = value; });

    // get registered users
    this.adminService.getRegisteredUsers()
      .subscribe( value => { this.registeredUsers = value; });

    // get online people
    this.adminService.getOnlinePeople()
      .subscribe( value => { this.onlinePeople = value; });
  }



}
