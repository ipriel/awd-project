import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todaysIncome$: Observable<number>;
  productsSum$: Observable<number>;
  registeredUsers$: Observable<number>;
  peopleOnline$: Observable<number>;
  dataSource$ : Observable<Array<any>>;
  barWidth = 600;
  barHeight = 400;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // get today's income
    this.todaysIncome$ = this.adminService.getTodaysIncome(); // service function required

    // get products sum
    this.productsSum$ = this.adminService.getProductsSum(); // service function required

    // get registered users
    this.registeredUsers$ = this.adminService.getRegisteredUsers(); // service function required

    // get people online
    this.peopleOnline$ = this.adminService.getPeopleOnline(); // service function required

    // get data for bar chart
    this.dataSource$ = this.adminService.getChartData(); // service function required
  }



}
