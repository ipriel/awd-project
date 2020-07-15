import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint } from '../../shared/types';
import { AdminService } from '../admin.service';

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
  dataSource$ : Observable<DataPoint[]>;
  barWidth = 600;
  barHeight = 400;

  ngOnInit(): void {
    // get today's income
    this.todaysIncome$ = this.adminService.getTodaysIncome();

    // get products sum
    this.productsSum$ = this.adminService.getProductsSum();

    // get registered users
    this.registeredUsers$ = this.adminService.getRegisteredUsers();

    // get people online
    this.peopleOnline$ = this.adminService.getPeopleOnline();

    // get data for bar chart
    this.dataSource$ = this.adminService.getDailyIncome();
  }

  constructor(private adminService: AdminService) { }
  
}
