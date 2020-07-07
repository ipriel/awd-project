import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todaysIncome;
  productsSum;
  registeredUsers;
  peopleOnline;

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

    // get people online
    this.adminService.getPeopleOnline()
      .subscribe( value => { this.peopleOnline = value; });
  }



}
