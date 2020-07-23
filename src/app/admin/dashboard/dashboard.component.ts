import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  dataSource$: Observable<DataPoint[]>;
  barWidth = 600;
  barHeight = 400;

  testDataSource = [
    {
      name: '11-7',
      value: 100
    },
  {
    name: '12-7',
    value: 200
  },
  {
    name: '13-7',
    value: 1000
  },
  {
    name: '14-7',
    value: 200
  },
  {
    name: '15-7',
    value: 20
  },
  {
    name: '16-7',
    value: 200
  },
  {
    name: '17-7',
    value: 254
  },
  {
    name: '18-7',
    value: 600
  }];

  ngOnInit(): void {
    // get today's income
    this.todaysIncome$ = this.adminService
      .getTodaysIncome()
      .pipe(
        map((res) => res.data)
      );

    // get products sum
    this.productsSum$ = this.adminService
      .getProductsSum()
      .pipe(
        map((res) => res.data)
      );

    // get registered users
    this.registeredUsers$ = this.adminService
      .getRegisteredUsers()
      .pipe(
        map((res) => res.data)
      );

    // get people online
    this.peopleOnline$ = this.adminService
      .getPeopleOnline()
      .pipe(
        map((res) => res.data)
      );

    // get data for bar chart
    this.dataSource$ = this.adminService
      .getDailyIncome()
      .pipe(
        tap((data) => console.log(data))
      );
  }

  constructor(private adminService: AdminService) { }

}
